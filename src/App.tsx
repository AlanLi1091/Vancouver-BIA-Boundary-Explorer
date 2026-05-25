/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from "react";
import { vancouverBIAs, BIA_CATEGORIES, neighborhoodThemes } from "./data/biaData";
import { BIAFeature, BIACategory } from "./types";
import MapComponent from "./components/MapComponent";
import {
  MapPin,
  Search,
  Sliders,
  RotateCcw,
  Layers,
  ChevronDown,
  Building2,
  Calendar,
  Compass,
  Bus,
  ExternalLink,
  Filter,
  CheckCircle,
  Hash,
  Sparkles,
  Map as MapIcon,
  HelpCircle,
  Menu,
  Languages
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  TRANSLATIONS,
  LanguageCode,
  LANGUAGE_OPTIONS,
  getTranslatedCategoryName,
  getLocalizedBiaText
} from "./data/translations";

export default function App() {
  // --- States ---
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [bias, setBias] = useState<BIAFeature[]>(vancouverBIAs);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "success" | "error">("idle");
  const [syncError, setSyncError] = useState<string | null>(null);
  const [showSyncBanner, setShowSyncBanner] = useState(false);
  const [bannerType, setBannerType] = useState<"success" | "error">("success");

  const [selectedBiaId, setSelectedBiaId] = useState<string | null>(null); // Starts null so greeted with map
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"name" | "nameDesc" | "businesses" | "established">("businesses");
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  
  // Custom Map Controls
  const [mapStyle, setMapStyle] = useState<"light" | "dark" | "street">("light");
  const [showLabels, setShowLabels] = useState(true);
  const [borderThickness, setBorderThickness] = useState(2);
  const [opacity, setOpacity] = useState(0.45);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // --- Multilingual Real-time Sync helper ---
  const getSyncTranslation = (key: string) => {
    const syncTrans: Record<LanguageCode, Record<string, string>> = {
      en: {
        cityDataSync: "City Data Sync",
        syncLive: "Live",
        syncOffline: "Offline (Local)",
        syncing: "Syncing...",
        refresh: "Refresh",
        retry: "Retry",
        syncSuccessMsg: "Dataset synced in real time with City of Vancouver database!",
        syncErrorMsg: "Unable to reach Vancouver Open Data. Using historical local dataset."
      },
      "zh-CN": {
        cityDataSync: "温哥华市政数据同步",
        syncLive: "实时在线",
        syncOffline: "离线 (加载本地)",
        syncing: "同步中...",
        refresh: "刷新",
        retry: "重试",
        syncSuccessMsg: "已与温哥华市政府开放数据平台实时同步！",
        syncErrorMsg: "无法连接温哥华数据平台，正在使用历史本地备份。"
      },
      "zh-TW": {
        cityDataSync: "溫哥華市政數據同步",
        syncLive: "即時連線",
        syncOffline: "離線 (載入本地)",
        syncing: "同步中...",
        refresh: "重新整理",
        retry: "重試",
        syncSuccessMsg: "已成功與溫哥華市政府開放數據平台即時同步！",
        syncErrorMsg: "無法連線溫哥華數據平台，正使用歷史本地備份。"
      },
      fr: {
        cityDataSync: "Données de la ville",
        syncLive: "En direct",
        syncOffline: "Hors ligne (Local)",
        syncing: "Mise à jour...",
        refresh: "Actualiser",
        retry: "Réessayer",
        syncSuccessMsg: "Données synchronisées en temps réel avec la ville de Vancouver !",
        syncErrorMsg: "Impossible d'accéder aux données ouvertes. Utilisation du jeu historique."
      },
      ja: {
        cityDataSync: "市データ同期",
        syncLive: "ライブ",
        syncOffline: "オフライン (ローカル)",
        syncing: "同期中...",
        refresh: "更新",
        retry: "再試行",
        syncSuccessMsg: "バンクーバー市のオープンデータ実時間同期に成功しました！",
        syncErrorMsg: "オープンデータに接続できません。ローカルの歴史的データを使用します。"
      }
    };
    return syncTrans[language]?.[key] || syncTrans["en"][key] || key;
  };

  // --- Real-time API Sync from Vancouver Open Data Portal ---
  const fetchLiveBiaData = async () => {
    setIsSyncing(true);
    setSyncStatus("idle");
    setSyncError(null);
    try {
      const url = "https://opendata.vancouver.ca/api/explore/v2.1/catalog/datasets/business-improvement-areas-bia/records?limit=100";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      const results = data.results || [];
      if (results.length === 0) {
        throw new Error("No BIA records returned from Vancouver API.");
      }

      // Merge live data with our local high-fidelity list
      const updatedList = [...vancouverBIAs];

      results.forEach((record: any) => {
        const liveMapId = record.mapid || record.mapId || "";
        const liveName = record.name || "";
        const liveGeom = record.geom?.geometry || record.geo_shape?.geometry || record.geometry;
        const livePoint = record.geo_point_2d || null;

        if (!liveMapId) return;

        // Try to match with our local high-fidelity list by mapId or Name
        let matchedIndex = updatedList.findIndex(b => b.properties.mapId === String(liveMapId));
        if (matchedIndex === -1 && liveName) {
          matchedIndex = updatedList.findIndex(b => 
            b.properties.name.toLowerCase() === liveName.toLowerCase() ||
            b.properties.name.toLowerCase().includes(liveName.toLowerCase()) ||
            liveName.toLowerCase().includes(b.properties.name.toLowerCase())
          );
        }

        if (matchedIndex !== -1) {
          // Found match! Update geometry & center coordinates, keeping high-fidelity translations intact
          updatedList[matchedIndex] = {
            ...updatedList[matchedIndex],
            geometry: liveGeom || updatedList[matchedIndex].geometry,
            properties: {
              ...updatedList[matchedIndex].properties,
              center: livePoint ? [livePoint.lat, livePoint.lon] : updatedList[matchedIndex].properties.center
            }
          };
        } else {
          // Dynamic Discovery: City employees added a NEW BIA! Build a safe dynamic BIA feature
          let defaultCategory: BIACategory = "Commercial & Business";
          const lowerName = liveName.toLowerCase();
          if (lowerName.includes("gastown") || lowerName.includes("chinatown") || lowerName.includes("historic") || lowerName.includes("heritage")) {
            defaultCategory = "Historic & Heritage";
          } else if (lowerName.includes("dining") || lowerName.includes("culinary") || lowerName.includes("culture") || lowerName.includes("drive")) {
            defaultCategory = "Culinary & Culture";
          } else if (lowerName.includes("arts") || lowerName.includes("waterfront") || lowerName.includes("yaletown")) {
            defaultCategory = "Arts & Waterfront";
          } else if (lowerName.includes("retail") || lowerName.includes("fashion") || lowerName.includes("robson")) {
            defaultCategory = "Retail & Fashion";
          } else if (lowerName.includes("bohemian") || lowerName.includes("pleasant")) {
            defaultCategory = "Bohemian & Arts";
          }

          const defaultCenter: [number, number] = livePoint 
            ? [livePoint.lat, livePoint.lon] 
            : [49.25, -123.12];

          const newBia: BIAFeature = {
            type: "Feature",
            properties: {
              mapId: String(liveMapId),
              name: liveName || `BIA #${liveMapId}`,
              center: defaultCenter,
              businessCount: 75,
              category: defaultCategory,
              description: `A new Business Improvement Area dynamically discovered and synced in real-time from the City of Vancouver open data registry (MAPID ${liveMapId}).`,
              specialties: ["Local Commerce", "Street Beautification"],
              color: "#6366F1", // Indigo
              primaryTransit: "Transit services nearby",
              established: new Date().getFullYear()
            },
            geometry: liveGeom || null
          };
          updatedList.push(newBia);
        }
      });

      setBias(updatedList);
      setSyncStatus("success");
      setBannerType("success");
      setShowSyncBanner(true);
      setTimeout(() => setShowSyncBanner(false), 5000);
    } catch (err: any) {
      console.error("Failed to fetch real-time Vancouver BIA data:", err);
      setSyncError(err.message || "Unknown Network Error");
      setSyncStatus("error");
      setBannerType("error");
      setShowSyncBanner(true);
      setTimeout(() => setShowSyncBanner(false), 5000);
    } finally {
      setIsSyncing(false);
    }
  };

  // Run on mount to guarantee real-time synchronization on startup
  useEffect(() => {
    fetchLiveBiaData();
  }, []);

  // --- Filtering & Searching Logic ---
  const filteredAndSortedBias = useMemo(() => {
    let list = [...bias];

    // Filter by Category
    if (selectedCategory !== "All") {
      list = list.filter(bia => bia.properties.category === selectedCategory);
    }

    // Filter by Search Query (Name, ID, or specialties)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        bia =>
          bia.properties.name.toLowerCase().includes(q) ||
          bia.properties.mapId.includes(q) ||
          bia.properties.specialties.some(s => s.toLowerCase().includes(q))
      );
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === "name") {
        return a.properties.name.localeCompare(b.properties.name);
      }
      if (sortBy === "nameDesc") {
        return b.properties.name.localeCompare(a.properties.name);
      }
      if (sortBy === "businesses") {
        return b.properties.businessCount - a.properties.businessCount;
      }
      if (sortBy === "established") {
        return a.properties.established - b.properties.established;
      }
      return 0;
    });

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  // --- Translations Helper ---
  const t = (key: keyof typeof TRANSLATIONS["en"]) => {
    return TRANSLATIONS[language][key] || TRANSLATIONS["en"][key];
  };

  // --- Selected BIA Metrics ---
  const selectedBia = useMemo(() => {
    return bias.find(bia => bia.properties.mapId === selectedBiaId) || null;
  }, [selectedBiaId, bias]);

  const localizedBiaTexts = useMemo(() => {
    if (!selectedBia) return { description: "", primaryTransit: "" };
    return getLocalizedBiaText(selectedBia.properties.mapId, language, selectedBia.properties);
  }, [selectedBia, language]);

  // --- Dataset Analytics Aggregations ---
  const statistics = useMemo(() => {
    const totalZones = bias.length;
    
    // Unique BIA names (since Dunbar Village is list segmented in 3 maps)
    const uniqueNames = new Set(bias.map(b => b.properties.name));
    const uniqueCount = uniqueNames.size;

    // Total businesses representation (handling Dunbar Village duplication by grouping)
    const processedNames = new Set<string>();
    let totalBusinesses = 0;
    bias.forEach(bia => {
      if (!processedNames.has(bia.properties.name)) {
        processedNames.add(bia.properties.name);
        totalBusinesses += bia.properties.businessCount;
      }
    });

    // Count categories
    const categoryCounts: Record<string, number> = {};
    bias.forEach(bia => {
      const cat = bia.properties.category;
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    return {
      totalZones,
      uniqueCount,
      totalBusinesses,
      categoryCounts
    };
  }, [bias]);

  // Reset Control settings to default
  const handleResetControls = () => {
    setSelectedBiaId(null); // Retracts layout completely on reset
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("businesses");
    setMapStyle("light");
    setShowLabels(true);
    setBorderThickness(2);
    setOpacity(0.45);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-gray-900 font-sans flex flex-col antialiased">
      
      {/* HEADER BAR */}
      <header className="bg-white border-b border-gray-150/60 sticky top-0 z-40 shadow-sm/5 p-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-md shadow-indigo-100">
                <MapIcon className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                {t("appTitle")}
              </h1>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-1 pl-9">
              {t("appSubtitle")}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 ml-0 md:ml-auto">
            <div className="bg-emerald-50/70 border border-emerald-100 py-1.5 px-3 rounded-xl flex items-center gap-2 shadow-sm/5">
              <div className="p-1 bg-emerald-500 rounded-lg text-white">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] text-emerald-800/80 font-bold uppercase tracking-wider">{t("totalBusinesses")}</div>
                <div className="text-sm font-extrabold text-emerald-950 font-mono leading-none mt-0.5">{statistics.totalBusinesses}</div>
              </div>
            </div>

            <div className="bg-indigo-50/70 border border-indigo-100 py-1.5 px-3 rounded-xl flex items-center gap-2 shadow-sm/5">
              <div className="p-1 bg-indigo-500 rounded-lg text-white">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] text-indigo-800/80 font-bold uppercase tracking-wider">{t("biaDistricts")}</div>
                <div className="text-sm font-extrabold text-indigo-950 font-mono leading-none mt-0.5">{statistics.uniqueCount} <span className="text-[10px] text-gray-400 font-normal">{t("filesCount").replace("{count}", statistics.totalZones.toString())}</span></div>
              </div>
            </div>

            {/* Real-time sync badge in header */}
            <div className={`border py-1.5 px-3 rounded-xl flex items-center gap-2.5 shadow-sm/5 transition-all duration-300 ${
              syncStatus === "success" 
                ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
                : syncStatus === "error" 
                ? "bg-red-50 border-red-100 text-red-800" 
                : "bg-amber-50 border-amber-100 text-amber-800"
            }`}>
              <div className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  syncStatus === "success" ? "bg-emerald-400" : syncStatus === "error" ? "bg-red-400" : "bg-amber-400"
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  syncStatus === "success" ? "bg-emerald-500" : syncStatus === "error" ? "bg-red-500" : "bg-amber-500"
                }`}></span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider font-extrabold leading-none opacity-80">
                  {getSyncTranslation("cityDataSync")}
                </span>
                <span className="text-[11px] font-bold font-mono leading-none mt-0.5 flex items-center gap-1.5">
                  {syncStatus === "success" ? (
                    <>
                      <span>{getSyncTranslation("syncLive")}</span>
                      <button 
                        onClick={fetchLiveBiaData} 
                        disabled={isSyncing}
                        className="hover:text-emerald-700 hover:border-emerald-300 active:scale-95 transition-all text-[9px] text-emerald-600 border border-emerald-200 bg-white hover:bg-emerald-100/10 px-1.5 py-0.5 rounded flex items-center gap-0.5 font-sans cursor-pointer h-[16px] leading-none"
                        title="Force live update from City of Vancouver open dataset"
                      >
                        <RotateCcw className={`w-2 h-2 ${isSyncing ? "animate-spin" : ""}`} />
                        <span>{getSyncTranslation("refresh")}</span>
                      </button>
                    </>
                  ) : syncStatus === "error" ? (
                    <>
                      <span>{getSyncTranslation("syncOffline")}</span>
                      <button 
                        onClick={fetchLiveBiaData} 
                        disabled={isSyncing}
                        className="hover:text-red-700 hover:border-red-300 active:scale-95 transition-all text-[9px] text-red-650 border border-red-200 bg-white hover:bg-red-100/10 px-1.5 py-0.5 rounded flex items-center gap-0.5 font-sans cursor-pointer h-[16px] leading-none"
                        title="Retry loading dataset directly from City of Vancouver database"
                      >
                        <RotateCcw className={`w-2 h-2 ${isSyncing ? "animate-spin" : ""}`} />
                        <span>{getSyncTranslation("retry")}</span>
                      </button>
                    </>
                  ) : (
                    <span>{getSyncTranslation("syncing")}</span>
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer border border-gray-200"
              title={t("infoGuide")}
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD BODY */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">

        {/* Real-time sync feedback notification banner */}
        <AnimatePresence>
          {showSyncBanner && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={`p-3.5 rounded-2xl shadow-sm border flex items-center justify-between gap-3 text-xs font-medium transition-all duration-300 ${
                bannerType === "success" 
                  ? "bg-emerald-50/80 border-emerald-200/80 text-emerald-900 shadow-sm" 
                  : "bg-red-50/80 border-red-200/80 text-red-900 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`p-1 rounded-lg ${bannerType === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
                  <CheckCircle className="w-4 h-4" />
                </span>
                <div className="flex flex-col">
                  <span>
                    {bannerType === "success" 
                      ? getSyncTranslation("syncSuccessMsg") 
                      : getSyncTranslation("syncErrorMsg")}
                  </span>
                  {bannerType === "error" && syncError && (
                    <span className="text-[10px] text-red-800/80 font-mono mt-0.5">{syncError}</span>
                  )}
                </div>
              </div>
              <button 
                onClick={() => setShowSyncBanner(false)}
                className="text-xs font-bold opacity-60 hover:opacity-100 transition-all cursor-pointer hover:bg-black/5 px-2 py-1 rounded-lg font-sans"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WORKSPACE SECTOR */}
        <div className="flex-1 relative w-full h-[550px] lg:h-[700px] min-h-[400px] overflow-hidden rounded-2xl border border-gray-150/80 shadow-md">
          
          {/* THE CORE MAP PANEL */}
          <div className="absolute inset-0 z-10 w-full h-full">
            <MapComponent
              selectedBiaId={selectedBiaId}
              onSelectBia={setSelectedBiaId}
              filteredBias={filteredAndSortedBias}
              mapStyle={mapStyle}
              showLabels={showLabels}
              borderThickness={borderThickness}
              opacity={opacity}
            />
          </div>

          {/* FLOATING HAMBURGER TOGGLE BUTTON */}
          {!isSettingsOpen && (
            <button
              id="hamburger-menu-btn"
              onClick={() => setIsSettingsOpen(true)}
              className="absolute top-4 left-4 z-20 p-2.5 bg-white/95 hover:bg-gray-50 backdrop-blur-md text-gray-800 hover:text-indigo-600 rounded-xl shadow-lg border border-gray-200/80 flex items-center gap-2 transition-all duration-200 cursor-pointer font-bold text-xs pointer-events-auto"
              title={t("openControls")}
            >
              <Menu className="w-5 h-5 text-indigo-600" />
              <span>{t("exploreMenu")}</span>
            </button>
          )}

          {/* LEFT-SIDE RETRACTABLE SETTINGS CARD (HAMBURGER MENU) */}
          <AnimatePresence>
            {isSettingsOpen && (
              <motion.div
                id="retractable-settings-card"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="absolute left-0 top-0 bottom-0 z-20 w-full sm:w-[380px] bg-white/95 backdrop-blur-md shadow-2xl border-r border-gray-200/85 flex flex-col h-full pointer-events-auto"
              >
                {/* Header Section */}
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
                      <Sliders className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                      {t("settingsConfig")}
                    </span>
                  </div>
                  
                  {/* Close / Retract button */}
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="p-1 px-2.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all cursor-pointer border border-gray-200 text-[11px] font-bold flex items-center gap-1"
                    title={t("retract")}
                  >
                    <span>{t("retract")}</span>
                    <span>✕</span>
                  </button>
                </div>

                {/* Subsections Content - Top-to-Bottom Sequence */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                  {/* 1. SEARCH FEATURE */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                      {t("searchBias")}
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder={t("searchPlaceholder")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs hover:bg-gray-50/80 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* 2. JUMP TO BLOCK */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                      {t("jumpToBoundary")}
                    </label>
                    <select
                      value={selectedBiaId || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSelectedBiaId(val || null);
                      }}
                      className="w-full py-2 px-3 bg-indigo-50/60 hover:bg-indigo-100/50 rounded-xl border border-indigo-200 text-xs font-bold text-indigo-950 outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer truncate"
                    >
                      <option value="">{t("chooseOnMap")}</option>
                      {filteredAndSortedBias.map(bia => (
                        <option key={bia.properties.mapId} value={bia.properties.mapId}>
                          {bia.properties.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 3. SORT BLOCK */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                      {t("sortSequence")}
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e: any) => setSortBy(e.target.value)}
                      className="w-full py-2 px-3 bg-gray-50 hover:bg-gray-100/60 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                    >
                      <option value="businesses">{t("sortBusinesses")}</option>
                      <option value="name">{t("sortNameAZ")}</option>
                      <option value="nameDesc">{t("sortNameZA")}</option>
                      <option value="established">{t("sortEstablished")}</option>
                    </select>
                  </div>

                  {/* 4. FILTER WITH SUB MENUS */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                      {t("filterCategory")}
                    </label>
                    <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                      {/* All Boundaries Option */}
                      <button
                        onClick={() => setSelectedCategory("All")}
                        className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-between cursor-pointer border ${
                          selectedCategory === "All"
                            ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                            : "bg-gray-50 hover:bg-gray-100/80 text-gray-600 border-gray-200"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full inline-block bg-gray-400" />
                          <span>{t("allBoundaries")}</span>
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${selectedCategory === "All" ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"}`}>
                          {bias.length}
                        </span>
                      </button>

                      {/* Map categories to submenu list as specified by user */}
                      {[
                        { label: t("catCulinary"), realVal: "Culinary & Culture" },
                        { label: t("catRetail"), realVal: "Retail & Fashion" },
                        { label: t("catHistory"), realVal: "Historic & Heritage" },
                        { label: t("catCommercial"), realVal: "Commercial & Business" },
                        { label: t("catArts"), realVal: "Arts & Waterfront" },
                        { label: t("catBohemian"), realVal: "Bohemian & Arts" }
                      ].map((item) => {
                        const count = bias.filter(b => b.properties.category === item.realVal).length;
                        const isActive = selectedCategory === item.realVal;
                        const theme = neighborhoodThemes[item.realVal as keyof typeof neighborhoodThemes];

                        return (
                          <button
                            key={item.label}
                            onClick={() => setSelectedCategory(item.realVal)}
                            className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-between cursor-pointer border ${
                              isActive
                                ? `${theme?.bg} shadow-sm`
                                : "bg-gray-50 hover:bg-gray-155/80 text-gray-600 border-gray-200"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block"
                                style={{ backgroundColor: theme?.color }}
                              />
                              <span>{item.label}</span>
                            </span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isActive ? 'bg-black/10 text-current' : 'bg-gray-200 text-gray-600'}`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 5. SETTINGS SUB CATEGORIES BLOCK */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                      {t("settingsConfig")}
                    </span>

                    {/* Fill Opacity Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-gray-700">
                        <span>{t("fillOpacity")}</span>
                        <span className="font-mono text-indigo-600">{Math.round(opacity * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="0.9"
                        step="0.05"
                        value={opacity}
                        onChange={(e) => setOpacity(parseFloat(e.target.value))}
                        className="w-full accent-indigo-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Border Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-gray-700">
                        <span>{t("borderThickness")}</span>
                        <span className="font-mono text-indigo-600">{borderThickness}px</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="6"
                        step="1"
                        value={borderThickness}
                        onChange={(e) => setBorderThickness(parseInt(e.target.value))}
                        className="w-full accent-indigo-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Labels Toggle */}
                    <div className="flex items-center justify-between py-1">
                      <span className="text-xs font-bold text-gray-750">{t("labelsVisibility")}</span>
                      <button
                        onClick={() => setShowLabels(!showLabels)}
                        className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                          showLabels ? "bg-indigo-600" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            showLabels ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Map themes (try to keep as toggle) */}
                    <div className="space-y-1.5 pb-2">
                      <span className="text-xs font-bold text-gray-750 block">{t("mapThemes")}</span>
                      <div className="grid grid-cols-3 bg-gray-100 p-1 rounded-xl border border-gray-200">
                        <button
                          onClick={() => setMapStyle("light")}
                          className={`py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                            mapStyle === "light" ? "bg-white text-gray-950 shadow-sm" : "text-gray-500 hover:text-gray-800"
                          }`}
                        >
                          {t("light")}
                        </button>
                        <button
                          onClick={() => setMapStyle("dark")}
                          className={`py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                            mapStyle === "dark" ? "bg-zinc-850 text-white shadow-sm" : "text-gray-500 hover:text-gray-800"
                          }`}
                        >
                          {t("dark")}
                        </button>
                        <button
                          onClick={() => setMapStyle("street")}
                          className={`py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                            mapStyle === "street" ? "bg-white text-gray-950 shadow-sm" : "text-gray-500 hover:text-gray-800"
                          }`}
                        >
                          {t("terrain")}
                        </button>
                      </div>
                    </div>

                    {/* 6. Language Selection with buttons */}
                    <div className="space-y-1.5 pt-4 border-t border-gray-100">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                        <Languages className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{t("language")}</span>
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        {LANGUAGE_OPTIONS.map((opt) => (
                          <button
                            key={opt.code}
                            onClick={() => setLanguage(opt.code as LanguageCode)}
                            className={`py-2 px-2 text-[10px] font-bold rounded-xl border text-center transition-all cursor-pointer truncate ${
                              language === opt.code
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {opt.display}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Left Card Footer Reset Tool */}
                <div className="p-3 bg-gray-50 border-t border-gray-100 shrink-0 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                  <span>{t("restoreDefaults")}</span>
                  <button
                    onClick={handleResetControls}
                    className="py-1 px-2.5 bg-white hover:bg-gray-50 text-[11px] font-bold rounded-lg border border-gray-200 text-gray-700 hover:text-indigo-650 transition-all cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {t("reset")}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* COMBINED PROFILE & DETAILED INSPECTOR PANEL */}
          <AnimatePresence>
            {selectedBia && localizedBiaTexts && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="absolute right-0 top-0 bottom-0 z-20 w-full sm:w-[420px] bg-white/95 backdrop-blur-md shadow-2xl border-l border-gray-200/85 flex flex-col h-full"
              >
                {/* Header Section */}
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
                  <span className="text-xs font-bold text-gray-750 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" /> {t("profileInspector")}
                  </span>
                  
                  {/* Close / Retract button */}
                  <button
                    onClick={() => setSelectedBiaId(null)}
                    className="p-1 px-2.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all cursor-pointer border border-gray-200 text-[11px] font-bold flex items-center gap-1"
                    title={t("retract")}
                  >
                    <span>{t("retract")}</span>
                    <span>✕</span>
                  </button>
                </div>

                {/* Profile Inspector Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                  {/* BIA Display Label Card */}
                  <div className="space-y-1">
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Hash className="w-3 h-3 text-gray-400" /> {t("layerMapId")}: {selectedBia.properties.mapId}
                    </div>
                    <h2 className="text-xl font-extrabold tracking-tight text-gray-900 leading-tight">
                      {selectedBia.properties.name}
                    </h2>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border mt-2 ${neighborhoodThemes[selectedBia.properties.category]?.bg}`}>
                      {getTranslatedCategoryName(selectedBia.properties.category, language)}
                    </span>
                  </div>

                  {/* Dynamic Statistics Badge */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl flex flex-col justify-between">
                      <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-emerald-500" /> {t("totalBusinesses")}
                      </span>
                      <span className="text-lg font-extrabold text-emerald-950 font-mono mt-1.5 leading-none">
                        {selectedBia.properties.businessCount} <span className="text-[10px] text-emerald-700/80 font-normal font-sans">{t("registered")}</span>
                      </span>
                    </div>

                    <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-xl flex flex-col justify-between">
                      <span className="text-[10px] text-indigo-800 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" /> {t("sortEstablished").split(" ")[0]}
                      </span>
                      <span className="text-lg font-extrabold text-indigo-950 font-mono mt-1.5 leading-none">
                        {selectedBia.properties.established} <span className="text-[10px] text-indigo-700/80 font-normal font-sans">{t("ad")} ({new Date().getFullYear() - selectedBia.properties.established} {t("yrs")})</span>
                      </span>
                    </div>
                  </div>

                  {/* Narrative Description Card */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t("profileScope")}</div>
                    <p className="text-xs text-gray-600 leading-relaxed bg-[#FAFAF9] p-3.5 rounded-xl border border-gray-150/40">
                      {localizedBiaTexts.description}
                    </p>
                  </div>

                  {/* Georeferences / GPS Specs */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t("geoSpecs")}</div>
                    <div className="space-y-1 bg-gray-50 p-3 rounded-xl border border-gray-150/40 text-[11px] leading-relaxed">
                      <div className="font-extrabold text-gray-700 uppercase tracking-wider text-[10px] border-b border-gray-150 pb-2 mb-2 flex items-center gap-1">
                        <Compass className="w-3 h-3 text-gray-400" /> {t("spatialCoords")}
                      </div>
                      <div className="flex justify-between items-center py-0.5">
                        <span className="text-gray-400 font-semibold uppercase font-mono">{t("latitude")}:</span>
                        <span className="text-gray-700 font-extrabold font-mono">{selectedBia.properties.center[0].toFixed(5)}° N</span>
                      </div>
                      <div className="flex justify-between items-center py-0.5">
                        <span className="text-gray-400 font-semibold uppercase font-mono">{t("longitude")}:</span>
                        <span className="text-gray-700 font-extrabold font-mono">{selectedBia.properties.center[1].toFixed(5)}° W</span>
                      </div>
                      <div className="flex justify-between items-center py-0.5">
                        <span className="text-gray-400 font-semibold uppercase font-mono">{t("labelsVisibility").split(" ")[0]}:</span>
                        <span className="text-indigo-600 font-extrabold font-mono">{t("interactiveZoom")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Primary Transit link */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t("accessConnection")}</div>
                    <div className="flex items-start gap-2 bg-indigo-50/40 border border-indigo-100 p-3 rounded-xl">
                      <Bus className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] text-indigo-900 font-bold uppercase tracking-wider">{t("gatewayLink")}</div>
                        <div className="text-xs text-indigo-950 font-bold mt-0.5">{localizedBiaTexts.primaryTransit}</div>
                      </div>
                    </div>
                  </div>

                  {/* BIA Specialties */}
                  <div className="space-y-2">
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t("specialties")}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedBia.properties.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="bg-indigo-50/50 border border-indigo-100 text-[11px] text-indigo-700 px-2.5 py-1 rounded-full font-bold"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Business Density Progression Size Class */}
                  <div className="space-y-2 pt-4 border-t border-gray-100 shrink-0">
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t("biaDensity")}</div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-gray-600 font-semibold">
                        <span>{t("commercialLoad")}</span>
                        <span>
                          {selectedBia.properties.businessCount > 400
                            ? t("densityVeryHigh")
                            : selectedBia.properties.businessCount > 250
                            ? t("densityMediumHigh")
                            : t("densityStandard")}
                        </span>
                      </div>
                      {/* Dynamic CSS progress bar */}
                      <div className="w-full bg-gray-150 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (selectedBia.properties.businessCount / 1100) * 100)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium block">
                        {t("indexFootnote")}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </main>

      {/* FOOTER BAR */}
      <footer className="bg-white border-t border-gray-150/60 p-4 shrink-0 shadow-inner mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
          <p>© {new Date().getFullYear()} Vancouver BIA Boundary Registry. Source data verified.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-indigo-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Fully Client-Sided Persistence
            </span>
            <a
              href="https://vancouver.ca"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-600 inline-flex items-center gap-1 transition-all"
            >
              City of Vancouver <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>

      {/* HELP GUIDE / ABOUT DIALOGUE */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-500" /> {t("helpTitle")}
              </h3>
              <button
                onClick={() => setShowHelpModal(false)}
                className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
              <p>
                {t("helpDesc")}
              </p>
              
              <div className="bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100 space-y-2">
                <h4 className="font-bold text-indigo-900">{t("helpNavigate")}</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-[11px] leading-relaxed">
                  <li>{t("helpNav1")}</li>
                  <li>{t("helpNav2")}</li>
                  <li>{t("helpNav3")}</li>
                </ul>
              </div>

              <p className="text-[11px] text-gray-400">
                {t("helpFooter")}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold leading-none shadow transition-all cursor-pointer"
              >
                {t("helpGoBack")}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
