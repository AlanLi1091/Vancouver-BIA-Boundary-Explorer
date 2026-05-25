import { BIAFeature } from "../types";

// Vancouver BIA Spatial Dataset with high-fidelity simplified boundaries (accuracy to ~1m)
export const vancouverBIAs: BIAFeature[] = [
  {
    type: "Feature",
    properties: {
      mapId: "1004003",
      name: "Collingwood BIA",
      center: [49.23444, -123.03299],
      businessCount: 220,
      category: "Culinary & Culture",
      description: "A vibrant multi-cultural business district along Kingsway, celebrated for its diverse selection of Asian and international specialty dining, family-run retail stores, and community-centered activities.",
      specialties: ["Multi-cultural Dining", "Family Services", "Specialty Retail"],
      color: "#10B981", // Emerald
      primaryTransit: "Joyce-Collingwood SkyTrain Station",
      established: 2001
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.03596, 49.23477], [-123.03649, 49.23503], [-123.03833, 49.23578],
        [-123.03983, 49.23634], [-123.04001, 49.23615], [-123.04033, 49.23628],
        [-123.04048, 49.23612], [-123.04085, 49.23628], [-123.04040, 49.23674],
        [-123.04131, 49.23710], [-123.04273, 49.23558], [-123.04115, 49.23532],
        [-123.04085, 49.23519], [-123.04126, 49.23474], [-123.04023, 49.23434],
        [-123.03954, 49.23565], [-123.03910, 49.23553], [-123.03867, 49.23537],
        [-123.03786, 49.23507], [-123.03817, 49.23474], [-123.03726, 49.23438],
        [-123.03740, 49.23425], [-123.03623, 49.23379], [-123.03714, 49.23296],
        [-123.03656, 49.23269], [-123.03575, 49.23349], [-123.03522, 49.23328],
        [-123.03572, 49.23279], [-123.03478, 49.23240], [-123.03353, 49.23239],
        [-123.03416, 49.23176], [-123.03224, 49.23099], [-123.03062, 49.23129],
        [-123.02784, 49.23081], [-123.02784, 49.23111], [-123.02695, 49.23111],
        [-123.02509, 49.23175], [-123.02356, 49.23188], [-123.02357, 49.23293],
        [-123.02482, 49.23268], [-123.02590, 49.23262], [-123.02748, 49.23253],
        [-123.02927, 49.23245], [-123.03076, 49.23239], [-123.03139, 49.23255],
        [-123.03276, 49.23309], [-123.03408, 49.23378], [-123.03452, 49.23408],
        [-123.03495, 49.23423], [-123.03306, 49.23624], [-123.03243, 49.23651],
        [-123.03183, 49.23653], [-123.03141, 49.23696], [-123.03112, 49.23820],
        [-123.02957, 49.23984], [-123.03066, 49.24028], [-123.03240, 49.23849],
        [-123.03369, 49.23789], [-123.03467, 49.23688], [-123.03596, 49.23477]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004004",
      name: "Mount Pleasant BIA",
      center: [49.26063, -123.09889],
      businessCount: 395,
      category: "Bohemian & Arts",
      description: "One of Vancouver's trendiest urban villages. A vibrant hub of independent breweries, vintage shops, design studios, third-wave coffee roasters, and community murals surrounding Main Street.",
      specialties: ["Craft Breweries", "Vintage Fashion", "Tech Startups", "Urban Murals"],
      color: "#EC4899", // Pink
      primaryTransit: "Main Street-Science World SkyTrain",
      established: 1989
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.08688, 49.26295], [-123.08872, 49.26297], [-123.09105, 49.26299],
        [-123.09298, 49.26300], [-123.09296, 49.26391], [-123.09295, 49.26481],
        [-123.09489, 49.26483], [-123.09583, 49.26438], [-123.09695, 49.26453],
        [-123.09688, 49.26634], [-123.09873, 49.26737], [-123.09994, 49.26806],
        [-123.10017, 49.26821], [-123.10070, 49.26917], [-123.10152, 49.26868],
        [-123.10156, 49.26778], [-123.10157, 49.26688], [-123.10163, 49.26597],
        [-123.10167, 49.26507], [-123.10289, 49.26464], [-123.10293, 49.26373],
        [-123.10486, 49.26377], [-123.10945, 49.26345], [-123.11095, 49.26343],
        [-123.11097, 49.26267], [-123.10947, 49.26264], [-123.10545, 49.26254],
        [-123.10298, 49.26253], [-123.10164, 49.26248], [-123.10169, 49.26145],
        [-123.10148, 49.26145], [-123.10150, 49.26111], [-123.10184, 49.26068],
        [-123.10190, 49.26022], [-123.10308, 49.26024], [-123.10316, 49.25843],
        [-123.10177, 49.25840], [-123.10179, 49.25795], [-123.10198, 49.25707],
        [-123.10200, 49.25627], [-123.10198, 49.25569], [-123.10209, 49.25462],
        [-123.10148, 49.25371], [-123.10158, 49.25025], [-123.10175, 49.24723],
        [-123.10062, 49.24447], [-123.10046, 49.24877], [-123.10031, 49.24935],
        [-123.10033, 49.25027], [-123.10031, 49.25207], [-123.10036, 49.25298],
        [-123.10016, 49.25388], [-123.09933, 49.25387], [-123.09924, 49.25477],
        [-123.10075, 49.25479], [-123.10066, 49.25657], [-123.10058, 49.25795],
        [-123.10049, 49.25929], [-123.10041, 49.26067], [-123.09829, 49.26064],
        [-123.09767, 49.26006], [-123.09591, 49.25939], [-123.09498, 49.25885],
        [-123.09311, 49.25778], [-123.09093, 49.25722], [-123.08921, 49.25747],
        [-123.09112, 49.25883], [-123.09305, 49.25884], [-123.09422, 49.25895],
        [-123.09497, 49.25931], [-123.09564, 49.25977], [-123.09618, 49.26068],
        [-123.09610, 49.26151], [-123.09493, 49.26202], [-123.09106, 49.26199],
        [-123.08718, 49.26196], [-123.08648, 49.26196], [-123.08688, 49.26295]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004009",
      name: "Victoria Drive BIA",
      center: [49.23019, -123.06564],
      businessCount: 185,
      category: "Culinary & Culture",
      description: "An incredibly energetic, multicultural shopping street. Noted for its intensive collection of Chinese and Vietnamese grocers, bakeries, traditional medicine shops, and local culinary establishments.",
      specialties: ["Import Groceries", "Authentic Asian Dining", "Bilingual Services"],
      color: "#8B5CF6", // Purple
      primaryTransit: "Bus route 20 along Victoria Drive",
      established: 1999
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.06528, 49.24152], [-123.06592, 49.24153], [-123.06596, 49.24007],
        [-123.06613, 49.23630], [-123.06544, 49.23630], [-123.06546, 49.23564],
        [-123.06612, 49.23564], [-123.06616, 49.23449], [-123.06619, 49.23404],
        [-123.06696, 49.23405], [-123.06701, 49.23261], [-123.06665, 49.23261],
        [-123.06634, 49.22762], [-123.06640, 49.22561], [-123.06633, 49.22519],
        [-123.06651, 49.22181], [-123.06655, 49.22031], [-123.06652, 49.21898],
        [-123.06591, 49.21898], [-123.06588, 49.21988], [-123.06521, 49.21987],
        [-123.06520, 49.22019], [-123.06513, 49.22126], [-123.06498, 49.22717],
        [-123.06498, 49.22765], [-123.06493, 49.22946], [-123.06484, 49.23122],
        [-123.06486, 49.23286], [-123.06478, 49.23441], [-123.06549, 49.23442],
        [-123.06548, 49.23492], [-123.06477, 49.23492], [-123.06477, 49.23593],
        [-123.06473, 49.23693], [-123.06473, 49.23745], [-123.06474, 49.23813],
        [-123.06468, 49.23895], [-123.06469, 49.24068], [-123.06531, 49.24068],
        [-123.06528, 49.24152]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004010",
      name: "Fraser St. BIA",
      center: [49.22871, -123.09066],
      businessCount: 154,
      category: "Culinary & Culture",
      description: "A fast-emerging multi-cultural commercial district spanning South Fraser Street. Celebrated for its unique fusion of long-standing family establishments, specialty bakeries, and stylish new coffee shops.",
      specialties: ["Artisanal Bakeries", "Multicultural Shops", "Local Services"],
      color: "#F59E0B", // Amber
      primaryTransit: "Bus route 8 along Fraser Street",
      established: 2012
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.08987, 49.23288], [-123.09056, 49.23289], [-123.09120, 49.23290],
        [-123.09131, 49.22919], [-123.09139, 49.22738], [-123.09135, 49.22729],
        [-123.09137, 49.22652], [-123.09144, 49.22600], [-123.09146, 49.22548],
        [-123.09140, 49.22510], [-123.09140, 49.22452], [-123.09080, 49.22451],
        [-123.09012, 49.22452], [-123.09010, 49.22537], [-123.09002, 49.22736],
        [-123.08987, 49.23288]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004011",
      name: "Kerrisdale BIA",
      center: [49.23459, -123.15698],
      businessCount: 231,
      category: "Retail & Fashion",
      description: "A gorgeous, tree-lined classic commercial village in western Vancouver. Highly regarded for its charming boutique retail shops, high-tea cafes, historical architecture, and premium personal services.",
      specialties: ["Classic Boutiques", "Afternoon Tea Cafes", "Charming Florists", "Traditional Bakeries"],
      color: "#059669", // Dark Emerald
      primaryTransit: "Bus route 41 along 41st Ave",
      established: 1991
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.15707, 49.23507], [-123.15706, 49.23528], [-123.15773, 49.23529],
        [-123.15774, 49.23508], [-123.15963, 49.23511], [-123.16118, 49.23511],
        [-123.16259, 49.23516], [-123.16276, 49.23421], [-123.15924, 49.23416],
        [-123.15840, 49.23413], [-123.15628, 49.23410], [-123.15630, 49.23362],
        [-123.15321, 49.23357], [-123.15319, 49.23405], [-123.15207, 49.23404],
        [-123.15203, 49.23497], [-123.15555, 49.23502], [-123.15549, 49.23644],
        [-123.15618, 49.23645], [-123.15615, 49.23601], [-123.15617, 49.23556],
        [-123.15622, 49.23506], [-123.15707, 49.23507]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004013",
      name: "Kitsilano Fourth Ave. BIA",
      center: [49.26814, -123.15075],
      businessCount: 260,
      category: "Retail & Fashion",
      description: "Vancouver's premiere activewear, outdoor life, and health lifestyle commercial corridor. Located steps from Kitsilano Beach, it hosts legendary athletic brands, home design centers, and fashionable eateries.",
      specialties: ["Athletic Wear", "Premium Design Stores", "Organic Restaurants", "Health & Wellness"],
      color: "#2563EB", // Blue
      primaryTransit: "Bus route 4 and 84 Express along 4th Ave",
      established: 2001
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.15986, 49.26868], [-123.15989, 49.26783], [-123.14087, 49.26752],
        [-123.14084, 49.26838], [-123.15749, 49.26865], [-123.15747, 49.26909],
        [-123.15929, 49.26912], [-123.15930, 49.26867], [-123.15986, 49.26868]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004015",
      name: "South Granville BIA",
      center: [49.26263, -123.13863],
      businessCount: 215,
      category: "Retail & Fashion",
      description: "A prestigious fashion and arts district extending along Granville Street. Features an upscale combination of premium galleries, furniture salons, designer fashion boutiques, and renowned theater establishments.",
      specialties: ["Art Galleries", "Luxury Furniture", "Designer Boutiques", "Fine Dining"],
      color: "#4F46E5", // Indigo
      primaryTransit: "Granville Street bus routes & future SkyTrain line",
      established: 1999
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.13844, 49.26669], [-123.13916, 49.26670], [-123.13927, 49.26361],
        [-123.14102, 49.26364], [-123.14106, 49.26267], [-123.13931, 49.26264],
        [-123.13951, 49.25707], [-123.13880, 49.25705], [-123.13877, 49.25799],
        [-123.13806, 49.25798], [-123.13778, 49.26534], [-123.13706, 49.26532],
        [-123.13703, 49.26616], [-123.13600, 49.26615], [-123.13598, 49.26674],
        [-123.13844, 49.26678], [-123.13844, 49.26669]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004017",
      name: "West End BIA",
      center: [49.28608, -123.13491],
      businessCount: 350,
      category: "Arts & Waterfront",
      description: "A gorgeous, beachside district featuring three distinctive zones along Davie, Denman, and Robson. Noted for its high diversity, friendly community pride, beautiful patios, and close proximity to English Bay and Stanley Park.",
      specialties: ["Beachside Patios", "LGBTQ+ Hub", "Ramen Hotspots", "Multicultural Delis"],
      color: "#DB2777", // Deep Pinkes
      primaryTransit: "Bus route 5 and 6",
      established: 1997
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.13548, 49.28244], [-123.13222, 49.28035], [-123.13275, 49.28000],
        [-123.13251, 49.27984], [-123.13198, 49.28019], [-123.13045, 49.27920],
        [-123.13098, 49.27885], [-123.13025, 49.27838], [-123.12865, 49.27943],
        [-123.13440, 49.28315], [-123.14098, 49.28741], [-123.13939, 49.28847],
        [-123.13873, 49.28805], [-123.13820, 49.28840], [-123.13759, 49.28870],
        [-123.13833, 49.28917], [-123.13726, 49.28988], [-123.13756, 49.29007],
        [-123.13650, 49.29077], [-123.13615, 49.29055], [-123.13562, 49.29090],
        [-123.12908, 49.28667], [-123.12802, 49.28737], [-123.13452, 49.29158],
        [-123.13325, 49.29228], [-123.13404, 49.29279], [-123.13593, 49.29180],
        [-123.13785, 49.29026], [-123.13840, 49.28992], [-123.13892, 49.28956],
        [-123.13955, 49.28927], [-123.14051, 49.28850], [-123.14124, 49.28828],
        [-123.14162, 49.28776], [-123.14238, 49.28688], [-123.14249, 49.28630],
        [-123.14185, 49.28658], [-123.13548, 49.28244]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004019",
      name: "Robson St. BIA",
      center: [49.28542, -123.12589],
      businessCount: 190,
      category: "Retail & Fashion",
      description: "Vancouver’s premier luxury fashion and culinary high street. Attracts global visitors with its flagship designer boutiques, beauty bars, famous ramen establishments, and vibrant street lifestyle.",
      specialties: ["Luxury Fashion", "Global Brands", "Cosmetics Flagships", "Ramen Dining"],
      color: "#EA580C", // Orange-Red
      primaryTransit: "Burrard SkyTrain Station (walkable)",
      established: 1991
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.12333, 49.28295], [-123.12251, 49.28349], [-123.12305, 49.28384],
        [-123.12281, 49.28400], [-123.12645, 49.28636], [-123.12592, 49.28671],
        [-123.12749, 49.28773], [-123.12802, 49.28737], [-123.12908, 49.28667],
        [-123.12397, 49.28336], [-123.12333, 49.28295]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004021",
      name: "Chinatown BIA",
      center: [49.27958, -123.10095],
      businessCount: 145,
      category: "Historic & Heritage",
      description: "One of North America's largest historic Chinatowns. Immersed in rich Chinese-Canadian history, featuring cultural museums, herbal dispensaries, world-class dim sum, and the serene Dr. Sun Yat-Sen Classical Chinese Garden.",
      specialties: ["Heritage Museums", "Chinese Herbology", "Dim Sum Parlors", "Classical Gardens"],
      color: "#DC2626", // Red
      primaryTransit: "Stadium-Chinatown SkyTrain Station",
      established: 2000
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.09721, 49.27944], [-123.09740, 49.28080], [-123.09804, 49.28081],
        [-123.09802, 49.28130], [-123.09965, 49.28134], [-123.09967, 49.28091],
        [-123.10042, 49.28092], [-123.10437, 49.28093], [-123.10435, 49.28147],
        [-123.10488, 49.28157], [-123.10540, 49.28118], [-123.10523, 49.28115],
        [-123.10543, 49.28100], [-123.10577, 49.28075], [-123.10561, 49.28072],
        [-123.10588, 49.28010], [-123.10614, 49.27947], [-123.10499, 49.27928],
        [-123.10444, 49.27925], [-123.10248, 49.27921], [-123.10222, 49.27927],
        [-123.10213, 49.27907], [-123.10212, 49.27771], [-123.10056, 49.27769],
        [-123.09696, 49.27762], [-123.09702, 49.27807], [-123.09763, 49.27809],
        [-123.09762, 49.27854], [-123.09708, 49.27853], [-123.09715, 49.27898],
        [-123.09759, 49.27899], [-123.09757, 49.27944], [-123.09721, 49.27944]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004024",
      name: "Dunbar Village BIA",
      center: [49.25675, -123.18510],
      businessCount: 162,
      category: "Retail & Fashion",
      description: "A tranquil residential village located in western Vancouver, Dunbar Village is a welcoming collection of neighborhood bakeries, grocers, local bookstores, and quality primary medical clinics.",
      specialties: ["Local Bookstores", "Artisan Bakeries", "Health Services"],
      color: "#0D9488", // Teal
      primaryTransit: "Bus route 7 & 32 Express along Dunbar St",
      established: 2008
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.18574, 49.25736], [-123.18575, 49.25558], [-123.18449, 49.25558],
        [-123.18448, 49.25734], [-123.18444, 49.25734], [-123.18443, 49.25792],
        [-123.18567, 49.25794], [-123.18567, 49.25736], [-123.18574, 49.25736]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004025",
      name: "West Broadway BIA",
      center: [49.26417, -123.17178],
      businessCount: 220,
      category: "Commercial & Business",
      description: "A highly dynamic commercial corridor and commuter route. Fills with premium organic food stores, banks, local cafes, fitness studios, and essential medical services bordering the Broadway corridor.",
      specialties: ["Fitness Studios", "Gourmet Groceries", "Financial Services", "Medical Hubs"],
      color: "#0284C7", // Cyan-Blue
      primaryTransit: "Broadway Express bus lines (99 B-Line)",
      established: 2011
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.17120, 49.26457], [-123.17396, 49.26462], [-123.17576, 49.26465],
        [-123.17628, 49.26465], [-123.17714, 49.26466], [-123.17983, 49.26470],
        [-123.18183, 49.26473], [-123.18186, 49.26387], [-123.17966, 49.26383],
        [-123.17449, 49.26375], [-123.17012, 49.26368], [-123.16819, 49.26365],
        [-123.16469, 49.26359], [-123.16242, 49.26347], [-123.16240, 49.26398],
        [-123.16239, 49.26446], [-123.16465, 49.26449], [-123.16650, 49.26448],
        [-123.16648, 49.26494], [-123.16843, 49.26496], [-123.16833, 49.26453],
        [-123.17106, 49.26458], [-123.17120, 49.26457]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004007",
      name: "Strathcona Area BIA",
      center: [49.28153, -123.08650],
      businessCount: 310,
      category: "Historic & Heritage",
      description: "A diverse industrial-meets-creative business district located in East Vancouver. Heavily enriched with heritage brick warehouses, craft roasteries, contemporary design services, and custom manufacturing shops.",
      specialties: ["Industrial Chic", "Coffee Roasteries", "Custom Manufactory", "Artist Collectives"],
      color: "#D97706", // Heavy Amber
      primaryTransit: "Core East Hastings bus routes",
      established: 2000
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.09748, 49.28449], [-123.09789, 49.28430], [-123.09786, 49.28406],
        [-123.09761, 49.28225], [-123.09754, 49.28179], [-123.09747, 49.28129],
        [-123.09740, 49.28080], [-123.09541, 49.28076], [-123.09346, 49.28072],
        [-123.09151, 49.28068], [-123.08956, 49.28064], [-123.08718, 49.28060],
        [-123.08481, 49.28056], [-123.08404, 49.28055], [-123.08403, 49.28091],
        [-123.08242, 49.28102], [-123.08243, 49.28072], [-123.08259, 49.28016],
        [-123.08294, 49.27966], [-123.08308, 49.27944], [-123.08316, 49.27924],
        [-123.08321, 49.27898], [-123.08328, 49.27737], [-123.08258, 49.27736],
        [-123.08260, 49.27683], [-123.08137, 49.27682], [-123.07860, 49.27677],
        [-123.07669, 49.27675], [-123.07669, 49.27716], [-123.07641, 49.27722],
        [-123.07641, 49.27764], [-123.07657, 49.27764], [-123.07655, 49.27809],
        [-123.07666, 49.27809], [-123.07664, 49.27846], [-123.07663, 49.27898],
        [-123.07662, 49.27937], [-123.07588, 49.27944], [-123.07587, 49.27990],
        [-123.07580, 49.27992], [-123.07579, 49.28035], [-123.07659, 49.28036],
        [-123.07658, 49.28080], [-123.07677, 49.28083], [-123.07676, 49.28118],
        [-123.07617, 49.28131], [-123.07616, 49.28178], [-123.07655, 49.28181],
        [-123.07675, 49.28182], [-123.07674, 49.28218], [-123.07654, 49.28226],
        [-123.07634, 49.28226], [-123.07633, 49.28253], [-123.07653, 49.28254],
        [-123.07652, 49.28272], [-123.07672, 49.28272], [-123.07671, 49.28309],
        [-123.07704, 49.28345], [-123.07808, 49.28331], [-123.07855, 49.28325],
        [-123.08138, 49.28290], [-123.08248, 49.28278], [-123.08378, 49.28281],
        [-123.08419, 49.28286], [-123.08457, 49.28297], [-123.08518, 49.28301],
        [-123.08588, 49.28325], [-123.08651, 49.28332], [-123.08706, 49.28341],
        [-123.08825, 49.28388], [-123.08926, 49.28418], [-123.08940, 49.28391],
        [-123.09136, 49.28394], [-123.09276, 49.28397], [-123.09273, 49.28466],
        [-123.09265, 49.28511], [-123.09307, 49.28519], [-123.09381, 49.28531],
        [-123.09444, 49.28535], [-123.09507, 49.28532], [-123.09543, 49.28532],
        [-123.09589, 49.28524], [-123.09729, 49.28493], [-123.09748, 49.28449]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004016",
      name: "Cambie Village BIA",
      center: [49.25828, -123.11504],
      businessCount: 205,
      category: "Culinary & Culture",
      description: "A gorgeous street-level village lining the central Cambie Street corridor. Famously characterized by its heritage trees, acclaimed neighborhood bistros, custom medical services, and outstanding transit connection.",
      specialties: ["Heritage Foliage", "Acclaimed Bistros", "Boutique Services"],
      color: "#F59E0B", // Amber
      primaryTransit: "King Edward or Broadway-City Hall Canada Line Station",
      established: 2006
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.11543, 49.26577], [-123.11546, 49.26456], [-123.11546, 49.26414],
        [-123.11649, 49.26416], [-123.11651, 49.26372], [-123.11657, 49.26325],
        [-123.11548, 49.26323], [-123.11550, 49.26272], [-123.11592, 49.26273],
        [-123.11593, 49.26227], [-123.11492, 49.26225], [-123.11494, 49.26133],
        [-123.11529, 49.26134], [-123.11757, 49.26128], [-123.11761, 49.26043],
        [-123.11600, 49.26041], [-123.11602, 49.25993], [-123.11556, 49.25992],
        [-123.11561, 49.25874], [-123.11624, 49.25875], [-123.11629, 49.25735],
        [-123.11633, 49.25730], [-123.11641, 49.25694], [-123.11598, 49.25693],
        [-123.11605, 49.25512], [-123.11599, 49.25503], [-123.11610, 49.25160],
        [-123.11617, 49.25151], [-123.11621, 49.25001], [-123.11606, 49.25001],
        [-123.11611, 49.24900], [-123.11470, 49.24898], [-123.11455, 49.25294],
        [-123.11453, 49.25345], [-123.11440, 49.25634], [-123.11438, 49.25689],
        [-123.11429, 49.25734], [-123.11450, 49.25734], [-123.11439, 49.26038],
        [-123.11301, 49.26036], [-123.11294, 49.26222], [-123.11452, 49.26225],
        [-123.11451, 49.26271], [-123.11430, 49.26270], [-123.11428, 49.26321],
        [-123.11449, 49.26321], [-123.11448, 49.26349], [-123.11386, 49.26348],
        [-123.11384, 49.26394], [-123.11287, 49.26392], [-123.11281, 49.26527],
        [-123.11340, 49.26528], [-123.11339, 49.26574], [-123.11543, 49.26577]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004018",
      name: "Gastown BIA",
      center: [49.28351, -123.10646],
      businessCount: 180,
      category: "Historic & Heritage",
      description: "Vancouver's most celebrated historic district. Famous for its original cobblestone pathways, vintage gas-lamp posts, the landmark Gastown Steam Clock, independent fashion boutiques, design agencies, and high-energy culinary lounges.",
      specialties: ["Heritage Landmarks", "Steam Clock", "Architecture Tours", "Cocktail Bars"],
      color: "#92400E", // Brown Amber
      primaryTransit: "Waterfront Transit Station (SkyTrain, SeaBus, WCE)",
      established: 1989
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.10275, 49.28386], [-123.10316, 49.28386], [-123.10337, 49.28387],
        [-123.10348, 49.28383], [-123.10425, 49.28385], [-123.10424, 49.28396],
        [-123.10606, 49.28430], [-123.10619, 49.28434], [-123.10848, 49.28476],
        [-123.10875, 49.28474], [-123.10939, 49.28490], [-123.11078, 49.28515],
        [-123.11111, 49.28478], [-123.11095, 49.28468], [-123.11140, 49.28437],
        [-123.10933, 49.28303], [-123.10938, 49.28291], [-123.10898, 49.28283],
        [-123.10879, 49.28330], [-123.10679, 49.28293], [-123.10699, 49.28247],
        [-123.10432, 49.28198], [-123.10433, 49.28192], [-123.10331, 49.28190],
        [-123.10330, 49.28235], [-123.10222, 49.28233], [-123.10220, 49.28279],
        [-123.10215, 49.28377], [-123.10220, 49.28386], [-123.10243, 49.28388],
        [-123.10275, 49.28386]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004020",
      name: "Downtown Vancouver BIA",
      center: [49.28345, -123.11990],
      businessCount: 1100,
      category: "Commercial & Business",
      description: "The economic, shopping, and entertainment crown of Vancouver. Encompasses major skyscraper corporate towers, Pacific Centre Mall, the Granville Street theater row, and core municipal assets.",
      specialties: ["Financial Headquarters", "Mega Shopping Hubs", "Theater District", "Fine Dining"],
      color: "#3B82F6", // Sky Blue
      primaryTransit: "Granville, City Centre & Waterfront Stations",
      established: 1990
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.12749, 49.28773], [-123.12592, 49.28671], [-123.12645, 49.28636],
        [-123.12281, 49.28400], [-123.12227, 49.28365], [-123.12251, 49.28349],
        [-123.12333, 49.28295], [-123.12397, 49.28336], [-123.12450, 49.28301],
        [-123.12513, 49.28297], [-123.12538, 49.28282], [-123.12586, 49.28250],
        [-123.12619, 49.28202], [-123.12580, 49.28176], [-123.12687, 49.28106],
        [-123.12746, 49.28144], [-123.12799, 49.28109], [-123.12706, 49.28049],
        [-123.12865, 49.27943], [-123.13025, 49.27838], [-123.13237, 49.27697],
        [-123.13135, 49.27631], [-123.13086, 49.27599], [-123.12991, 49.27536],
        [-123.12843, 49.27437], [-123.12796, 49.27405], [-123.12706, 49.27346],
        [-123.12550, 49.27449], [-123.12375, 49.27557], [-123.12216, 49.27662],
        [-123.12067, 49.27761], [-123.11897, 49.27873], [-123.11752, 49.27778],
        [-123.11592, 49.27884], [-123.11251, 49.28110], [-123.11142, 49.28182],
        [-123.11337, 49.28307], [-123.11140, 49.28437], [-123.11095, 49.28468],
        [-123.11078, 49.28515], [-123.10734, 49.28898], [-123.11253, 49.29029],
        [-123.12124, 49.29121], [-123.12193, 49.29055], [-123.12223, 49.29043],
        [-123.12236, 49.29029], [-123.12313, 49.29046], [-123.12749, 49.28773]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004023",
      name: "Dunbar Village BIA", // Second Section of Dunbar Village
      center: [49.24731, -123.18524],
      businessCount: 162,
      category: "Retail & Fashion",
      description: "The Southern sector of Dunbar Village; highly accessible and welcoming to residents of Southlands, featured for premium groceries, garden centers, and boutique bakeries.",
      specialties: ["Garden Centers", "Neighborhood Cafes", "Family Grocers"],
      color: "#0D9488", // Teal
      primaryTransit: "Bus route 7 & 32 Express",
      established: 2008
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.18592, 49.24902], [-123.18593, 49.24807], [-123.18573, 49.24807],
        [-123.18573, 49.24759], [-123.18597, 49.24759], [-123.18598, 49.24665],
        [-123.18594, 49.24665], [-123.18595, 49.24618], [-123.18587, 49.24618],
        [-123.18588, 49.24523], [-123.18455, 49.24522], [-123.18454, 49.24608],
        [-123.18458, 49.24617], [-123.18456, 49.24806], [-123.18464, 49.24806],
        [-123.18463, 49.24949], [-123.18580, 49.24949], [-123.18581, 49.24902],
        [-123.18592, 49.24902]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004022",
      name: "Dunbar Village BIA", // Third Section of Dunbar Village along mid Dunbar St
      center: [49.23504, -123.18439],
      businessCount: 162,
      category: "Retail & Fashion",
      description: "The Mid-sector of Dunbar Village; highly accessible neighborhood village centered on health clinics, dental clinics, specialty bakeries, and local cafes.",
      specialties: ["Dental & Health Clinics", "Local bakeries", "Florists"],
      color: "#0D9488", // Teal
      primaryTransit: "Bus route 7",
      established: 2008
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.18606, 49.23644], [-123.18610, 49.23427], [-123.18535, 49.23426],
        [-123.18535, 49.23429], [-123.18203, 49.23428], [-123.18202, 49.23529],
        [-123.18473, 49.23530], [-123.18477, 49.23533], [-123.18533, 49.23533],
        [-123.18532, 49.23570], [-123.18491, 49.23570], [-123.18489, 49.23644],
        [-123.18606, 49.23644]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004026",
      name: "Hastings Crossing BIA",
      center: [49.28217, -123.10541],
      businessCount: 195,
      category: "Historic & Heritage",
      description: "An incredibly historic corridor located in Vancouver's Downtown Eastside. Focuses on social enterprise, community-oriented support services, urban art initiatives, and dynamic heritage preservation.",
      specialties: ["Social Enterprises", "Community Hubs", "Art Collectives", "Heritage Restoration"],
      color: "#84CC16", // Lime Green
      primaryTransit: "Main Street bus routes",
      established: 2001
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.10028, 49.28411], [-123.10032, 49.28320], [-123.10038, 49.28275],
        [-123.10220, 49.28279], [-123.10222, 49.28233], [-123.10223, 49.28188],
        [-123.10331, 49.28190], [-123.10433, 49.28192], [-123.10432, 49.28198],
        [-123.10699, 49.28247], [-123.10679, 49.28293], [-123.10879, 49.28330],
        [-123.10898, 49.28283], [-123.10938, 49.28291], [-123.10933, 49.28303],
        [-123.11140, 49.28437], [-123.11337, 49.28307], [-123.11142, 49.28182],
        [-123.11251, 49.28110], [-123.11154, 49.28047], [-123.11088, 49.28090],
        [-123.11045, 49.28119], [-123.10948, 49.28056], [-123.10881, 49.28100],
        [-123.10846, 49.28077], [-123.10851, 49.28072], [-123.10831, 49.28062],
        [-123.10761, 49.28059], [-123.10761, 49.28090], [-123.10757, 49.28108],
        [-123.10577, 49.28075], [-123.10543, 49.28100], [-123.10523, 49.28115],
        [-123.10540, 49.28118], [-123.10488, 49.28157], [-123.10435, 49.28147],
        [-123.10437, 49.28093], [-123.10042, 49.28085], [-123.10042, 49.28092],
        [-123.09967, 49.28091], [-123.09965, 49.28134], [-123.09802, 49.28130],
        [-123.09747, 49.28129], [-123.09754, 49.28179], [-123.09761, 49.28225],
        [-123.09786, 49.28406], [-123.09953, 49.28409], [-123.10028, 49.28411]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004005",
      name: "Commercial Dr. BIA",
      center: [49.26746, -123.06960],
      businessCount: 420,
      category: "Bohemian & Arts",
      description: "Known affectionately as 'The Drive,' this legendary bohemian district has rich Italian heritage. Home to outstanding espresso bars, wood-fired pizzerias, theater events, artisan grocers, and community activists.",
      specialties: ["Espresso Lounges", "Authentic Pizzerias", "Indie Theaters", "Organic Grocers", "Artisanal Bakeries"],
      color: "#EC4899", // Magenta-Pink
      primaryTransit: "Commercial-Broadway SkyTrain Station",
      established: 1993
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.07049, 49.27667], [-123.07005, 49.27665], [-123.07005, 49.27623],
        [-123.07009, 49.27621], [-123.07011, 49.27537], [-123.07014, 49.27530],
        [-123.07015, 49.27485], [-123.07019, 49.27476], [-123.07021, 49.27395],
        [-123.07076, 49.27389], [-123.07149, 49.27396], [-123.07148, 49.27351],
        [-123.07149, 49.27305], [-123.07023, 49.27304], [-123.07023, 49.27259],
        [-123.07025, 49.27214], [-123.07020, 49.27205], [-123.07021, 49.27151],
        [-123.07012, 49.27142], [-123.07013, 49.27096], [-123.07026, 49.27051],
        [-123.07027, 49.27006], [-123.07155, 49.27007], [-123.07156, 49.26962],
        [-123.07032, 49.26961], [-123.07032, 49.26918], [-123.07021, 49.26915],
        [-123.07022, 49.26870], [-123.07033, 49.26870], [-123.07034, 49.26828],
        [-123.07020, 49.26825], [-123.07021, 49.26789], [-123.07024, 49.26780],
        [-123.07025, 49.26735], [-123.07026, 49.26716], [-123.07026, 49.26698],
        [-123.07027, 49.26680], [-123.07027, 49.26646], [-123.07024, 49.26644],
        [-123.07024, 49.26616], [-123.07025, 49.26598], [-123.07026, 49.26553],
        [-123.07027, 49.26508], [-123.07035, 49.26508], [-123.07036, 49.26439],
        [-123.07037, 49.26395], [-123.06974, 49.26372], [-123.06975, 49.26293],
        [-123.07075, 49.26328], [-123.07078, 49.26319], [-123.07079, 49.26285],
        [-123.07087, 49.26282], [-123.07088, 49.26246], [-123.07088, 49.26233],
        [-123.07098, 49.26233], [-123.07098, 49.26219], [-123.07099, 49.26186],
        [-123.07045, 49.26183], [-123.07046, 49.26138], [-123.07037, 49.26137],
        [-123.07038, 49.26094], [-123.07035, 49.26092], [-123.07035, 49.26071],
        [-123.07035, 49.26047], [-123.07039, 49.26047], [-123.07040, 49.26004],
        [-123.07040, 49.25968], [-123.07040, 49.25957], [-123.07061, 49.25957],
        [-123.07062, 49.25946], [-123.07062, 49.25914], [-123.07045, 49.25911],
        [-123.07046, 49.25866], [-123.06983, 49.25866], [-123.06918, 49.25865],
        [-123.06918, 49.25910], [-123.06917, 49.25956], [-123.06901, 49.25955],
        [-123.06901, 49.26001], [-123.06914, 49.26001], [-123.06913, 49.26037],
        [-123.06913, 49.26046], [-123.06924, 49.26046], [-123.06924, 49.26055],
        [-123.06924, 49.26088], [-123.06896, 49.26091], [-123.06777, 49.26090],
        [-123.06776, 49.26126], [-123.06713, 49.26135], [-123.06712, 49.26193],
        [-123.06866, 49.26269], [-123.06872, 49.26277], [-123.06872, 49.26296],
        [-123.06822, 49.26282], [-123.06803, 49.26305], [-123.06856, 49.26326],
        [-123.06908, 49.26347], [-123.06908, 49.26372], [-123.06918, 49.26372],
        [-123.06917, 49.26408], [-123.06906, 49.26417], [-123.06906, 49.26462],
        [-123.06908, 49.26507], [-123.06913, 49.26507], [-123.06913, 49.26544],
        [-123.06912, 49.26596], [-123.06914, 49.26596], [-123.06913, 49.26643],
        [-123.06912, 49.26709], [-123.06909, 49.26715], [-123.06909, 49.26742],
        [-123.06908, 49.26769], [-123.06901, 49.26778], [-123.06900, 49.26824],
        [-123.06899, 49.26869], [-123.06898, 49.26914], [-123.06897, 49.26959],
        [-123.06909, 49.26960], [-123.06909, 49.26996], [-123.06906, 49.26996],
        [-123.06905, 49.27041], [-123.06904, 49.27086], [-123.06870, 49.27086],
        [-123.06870, 49.27119], [-123.06889, 49.27129], [-123.06888, 49.27213],
        [-123.06893, 49.27213], [-123.06891, 49.27258], [-123.06891, 49.27303],
        [-123.06891, 49.27348], [-123.06904, 49.27348], [-123.06904, 49.27394],
        [-123.06890, 49.27394], [-123.06889, 49.27439], [-123.06889, 49.27484],
        [-123.06888, 49.27530], [-123.06887, 49.27575], [-123.06886, 49.27620],
        [-123.06885, 49.27664], [-123.06906, 49.27664], [-123.06905, 49.27707],
        [-123.06959, 49.27710], [-123.07048, 49.27712], [-123.07080, 49.27712],
        [-123.07081, 49.27676], [-123.07049, 49.27667]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004006",
      name: "Hastings - North BIA",
      center: [49.28212, -123.06191],
      businessCount: 220,
      category: "Commercial & Business",
      description: "An active business and trade BIA located in northern Vancouver along East Hastings Street. Features a highly operational mix of import-export retail, family service centers, and professional service offices.",
      specialties: ["Import Retailers", "Enterprise Offices", "Logistical Support", "Plumbing Supplies"],
      color: "#3F3F46", // Gray
      primaryTransit: "Bus routes 95 B-Line & 14",
      established: 2001
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.07032, 49.28435], [-123.07241, 49.28407], [-123.07255, 49.28402],
        [-123.07401, 49.28383], [-123.07408, 49.28385], [-123.07690, 49.28347],
        [-123.07704, 49.28345], [-123.07705, 49.28307], [-123.07671, 49.28309],
        [-123.07672, 49.28272], [-123.07652, 49.28272], [-123.07633, 49.28235],
        [-123.07654, 49.28217], [-123.07655, 49.28184], [-123.07616, 49.28181],
        [-123.07597, 49.28144], [-123.07617, 49.28131], [-123.07676, 49.28132],
        [-123.07677, 49.28083], [-123.07456, 49.28079], [-123.07409, 49.28079],
        [-123.07265, 49.28031], [-123.07041, 49.28029], [-123.07040, 49.28074],
        [-123.06828, 49.28071], [-123.06558, 49.28068], [-123.06559, 49.28027],
        [-123.06560, 49.27968], [-123.06561, 49.27914], [-123.06513, 49.27914],
        [-123.06512, 49.27959], [-123.06526, 49.27968], [-123.06525, 49.27977],
        [-123.06524, 49.28027], [-123.06365, 49.28026], [-123.06365, 49.28076],
        [-123.06171, 49.28075], [-123.05977, 49.28074], [-123.05784, 49.28072],
        [-123.05656, 49.28070], [-123.05656, 49.28022], [-123.05557, 49.28022],
        [-123.05557, 49.28069], [-123.05458, 49.28072], [-123.05196, 49.28072],
        [-123.04933, 49.28071], [-123.04670, 49.28071], [-123.04408, 49.28071],
        [-123.04408, 49.28112], [-123.04408, 49.28207], [-123.04484, 49.28207],
        [-123.04484, 49.28161], [-123.04670, 49.28161], [-123.04933, 49.28162],
        [-123.05196, 49.28162], [-123.05458, 49.28162], [-123.05655, 49.28163],
        [-123.05783, 49.28163], [-123.05976, 49.28164], [-123.06112, 49.28164],
        [-123.06156, 49.28163], [-123.06169, 49.28165], [-123.06329, 49.28166],
        [-123.06327, 49.28211], [-123.06362, 49.28211], [-123.06361, 49.28257],
        [-123.06361, 49.28302], [-123.06360, 49.28347], [-123.06359, 49.28392],
        [-123.06358, 49.28438], [-123.06164, 49.28437], [-123.06164, 49.28482],
        [-123.06163, 49.28527], [-123.06217, 49.28527], [-123.06254, 49.28550],
        [-123.06268, 49.28558], [-123.06254, 49.28568], [-123.06280, 49.28585],
        [-123.06408, 49.28526], [-123.06431, 49.28519], [-123.06457, 49.28513],
        [-123.06478, 49.28509], [-123.06537, 49.28501], [-123.06564, 49.28498],
        [-123.06683, 49.28482], [-123.06787, 49.28468], [-123.06907, 49.28452],
        [-123.06973, 49.28443], [-123.07032, 49.28435]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004008",
      name: "Yaletown BIA",
      center: [49.27546, -123.12019],
      businessCount: 290,
      category: "Arts & Waterfront",
      description: "Vancouver’s premier warehouse district converted into a trendy tech-hub and dining avenue. Fills with upscale red-brick restaurant patios, high-end cocktail bars, premium salons, and boutique tech offices.",
      specialties: ["Red-brick Patios", "Premium Dining", "Tech Hub", "Aesthetic Salons"],
      color: "#EC4899", // Vivid Pink
      primaryTransit: "Yaletown-Roundhouse Canada Line Station",
      established: 1999
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.12706, 49.27346], [-123.12685, 49.27335], [-123.12664, 49.27326],
        [-123.12642, 49.27319], [-123.12619, 49.27313], [-123.12595, 49.27309],
        [-123.12571, 49.27306], [-123.12546, 49.27305], [-123.12522, 49.27306],
        [-123.12497, 49.27309], [-123.12473, 49.27313], [-123.12467, 49.27315],
        [-123.12369, 49.27344], [-123.12140, 49.27196], [-123.11981, 49.27301],
        [-123.11956, 49.27318], [-123.11934, 49.27329], [-123.11898, 49.27341],
        [-123.11868, 49.27347], [-123.11871, 49.27355], [-123.11872, 49.27358],
        [-123.11875, 49.27364], [-123.11910, 49.27435], [-123.11928, 49.27452],
        [-123.11919, 49.27452], [-123.11898, 49.27453], [-123.11868, 49.27452],
        [-123.11838, 49.27449], [-123.11803, 49.27444], [-123.11767, 49.27444],
        [-123.11707, 49.27444], [-123.11688, 49.27446], [-123.11671, 49.27449],
        [-123.11656, 49.27454], [-123.11638, 49.27461], [-123.11618, 49.27471],
        [-123.11716, 49.27547], [-123.11558, 49.27653], [-123.11446, 49.27727],
        [-123.11398, 49.27758], [-123.11495, 49.27821], [-123.11545, 49.27852],
        [-123.11592, 49.27884], [-123.11752, 49.27778], [-123.11897, 49.27873],
        [-123.12056, 49.27767], [-123.12067, 49.27761], [-123.12216, 49.27662],
        [-123.12375, 49.27557], [-123.12535, 49.27451], [-123.12550, 49.27449],
        [-123.12706, 49.27346]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004012",
      name: "Marpole BIA",
      center: [49.21033, -123.14060],
      businessCount: 165,
      category: "Commercial & Business",
      description: "Located at the southern gateway of Vancouver. A bustling community-oriented commercial strip along Granville Street featuring grocery markets, dental services, neighborhood diners, and convenient local retail.",
      specialties: ["Gateways", "Grocery Stores", "Dental clinics", "Diners"],
      color: "#4B5563", // Slate Gray
      primaryTransit: "Bus route 10 to Downtown / Marine Drive Station",
      established: 2000
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.13964, 49.21416], [-123.14033, 49.21416], [-123.14035, 49.21363],
        [-123.14099, 49.21364], [-123.14107, 49.21138], [-123.14103, 49.21129],
        [-123.14104, 49.21096], [-123.14108, 49.21088], [-123.14112, 49.21010],
        [-123.14205, 49.21011], [-123.14211, 49.20856], [-123.14117, 49.20854],
        [-123.14122, 49.20708], [-123.14057, 49.20707], [-123.13991, 49.20706],
        [-123.13986, 49.20844], [-123.13987, 49.20861], [-123.13976, 49.21078],
        [-123.13980, 49.21087], [-123.13964, 49.21416]
      ]]
    }
  },
  {
    type: "Feature",
    properties: {
      mapId: "1004014",
      name: "Point Grey Village BIA",
      center: [49.26389, -123.20799],
      businessCount: 125,
      category: "Retail & Fashion",
      description: "A gorgeous, walkable seaside neighborhood village along West 10th Avenue near the University of British Columbia (UBC). Enriched with florists, high-quality bakeries, and lovely independent cafes.",
      specialties: ["UBC Gateway", "Walkable Cafes", "Independent Florists", "Traditional Bakeries"],
      color: "#0F766E", // Teal Dark
      primaryTransit: "Bus route 99 B-Line & 9 Express",
      established: 2004
    },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-123.20907, 49.26471], [-123.21211, 49.26476], [-123.21216, 49.26341],
        [-123.20304, 49.26326], [-123.20301, 49.26419], [-123.20908, 49.26428],
        [-123.20907, 49.26471]
      ]]
    }
  }
];

// Aggregations and metrics for Vancouver BIAs
export const BIA_CATEGORIES = [
  "Culinary & Culture",
  "Retail & Fashion",
  "Historic & Heritage",
  "Commercial & Business",
  "Arts & Waterfront",
  "Bohemian & Arts"
] as const;

export const neighborhoodThemes = {
  "Culinary & Culture": { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", color: "#10B981" },
  "Retail & Fashion": { bg: "bg-indigo-50 text-indigo-700 border-indigo-200", color: "#4F46E5" },
  "Historic & Heritage": { bg: "bg-amber-50 text-amber-700 border-amber-200", color: "#F59E0B" },
  "Commercial & Business": { bg: "bg-sky-50 text-sky-700 border-sky-200", color: "#3B82F6" },
  "Arts & Waterfront": { bg: "bg-pink-50 text-pink-700 border-pink-200", color: "#EC4899" },
  "Bohemian & Arts": { bg: "bg-purple-50 text-purple-700 border-purple-200", color: "#8B5CF6" }
};
