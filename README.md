# Vancouver Business Improvement Areas (BIA) Boundary Explorer

An interactive, high-fidelity GIS explorer and commerce dashboard showcasing Vancouver's Business Improvement Areas (BIAs). This application connects in real-time to the official **City of Vancouver Open Data Portal (API v2.1)** to map precise spatial boundaries, aggregate commercial statistics, and highlight neighborhood transit routes.

Designed with a high-contrast aesthetic and robust multilingual functionality, the dashboard operates entirely in the browser using React, Vite, Tailwind CSS, Leaflet, and Recharts.

---

## 🤝 Human-AI Collaboration

This project is a co-authored development between the author (**Alan Li**) and **Google Gemini/AI Studio Build**. 

*   **Human Direction & Curation:** Conceived, scoped, and refined by the user (**Alan Li**)—directing the live GIS integration, selecting the Vancouver Open Data v2.1 endpoints, structuring visual layout priorities, and verifying deployment configurations.
*   **AI Implementation & Codecraft:** Programmed, optimized, and documented by **Google Gemini**—writing modular React components, binding interactive Leaflet geospatial features, and implementing local fallback registries alongside comprehensive multilingual diction engines.

---

## 🚀 Key Features

*   **Real-time Open Data Sync:** Direct v2.1 GeoJSON API synchronization from the City of Vancouver's open data catalogue. Automatically detects newly established BIA districts.
*   **Interactive Spatial Mapping:** Fluid Leaflet map rendering with category-coded custom boundaries, hover tooltips, and bounding-box auto-focusing.
*   **Intuitive Category Filters:** Filter districts dynamically across categories like culinary culture, historic heritage, retail fashion, creative arts, and commercial hubs.
*   **Selected District Insights (Bento Panel):** Detailed breakdowns featuring establishment year, estimated shop counts, unique descriptions, transit walkability, and active commerce tags.
*   **Multilingual Support:** One-click instant translation matching the interface, municipal status updates, and district profiles across **English (EN)**, **简体中文 (CN)**, **繁體中文 (TW)**, **Français (FR)**, and **日本語 (JA)**.

---

## 📂 Project Architecture

```text
├── index.html            # Main site entry point
├── package.json          # Dependency definitions and automation scripts
├── tailwind.config.ts    # Tailwind structural configurations
├── tsconfig.json         # TypeScript strict guidelines
├── src/
│   ├── main.tsx          # React application mounting
│   ├── App.tsx           # Global state, multilingual engine & dashboard core
│   ├── types.ts          # Unified GeoJSON & BIA structural types
│   ├── index.css         # Global styling and Google Fonts imports
│   ├── components/
│   │   └── MapComponent.tsx  # React-Leaflet GIS layer visualizer
│   └── data/
│       └── biaData.ts    # High-fidelity fallback presets & translation dictionaries
```

---

## 💻 Tech Stack

*   **Framework:** React 18 (TypeScript) + Vite
*   **Styling:** Tailwind CSS (Modern Slate Color Palette)
*   **GIS Engine:** Leaflet + React-Leaflet
*   **Animation:** Framer Motion (Transitions and layout entrances)
*   **Data Aggregation:** Lucide Icons & Custom SVG indicators

---

## 🛠️ Local Development Setup

To run this project on your local machine, follow these steps:

### Prerequisite
Ensure you have **Node.js** (v18 or higher) installed.

### 1. Close or download the workspace files
If you have exported your AI Studio project zip file, unzip the folder and open it inside your preferred editor (e.g. VS Code).

### 2. Install dependencies
Open your terminal in the directory and run:
```bash
npm install
```

### 3. Start the dev server
Boot the local Vite development server:
```bash
npm run dev
```
Your terminal will output the local network URL (typically `http://localhost:3000` or `http://localhost:5173`).

### 4. Build for deployment
Compile and optimize static assets into a production-ready `/dist` folder:
```bash
npm run build
```

---

## 📤 Pushing to your GitHub Repository

To host this repository on your GitHub account, execute the following commands in your local project root terminal:

### 1. Initialize a Git repository
If Git isn't already set up:
```bash
git init
```

### 2. Stage and commit files
Add all the files tracker to the initial commit:
```bash
git add .
git commit -m "feat: initialize Vancouver BIA Boundary Explorer"
```

### 3. Create a repository on GitHub
1. Go to your [GitHub Dashboard](https://github.com) and click **New Repository**.
2. Set a name (e.g., `vancouver-bia-explorer`), choose your publicity, and click **Create repository** (do *not* initialize with a README, gitignore, or license since we have them already!).

### 4. Link and upload to GitHub
Copy the remote repository URL from GitHub and paste it into your terminal, then push:
```bash
# Rename default branch to main
git branch -M main

# Add your unique GitHub repo remote address
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git

# Push the code up
git push -u origin main
```

---

## 🛡️ License

Metropolitan open data is acquired under the **City of Vancouver Open Data License v2.0**. Development code is licensed under the Apache-2.0 License policies.
