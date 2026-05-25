/**
 * Shared Type Declarations for Vancouver BIA Map
 */

export interface BIAFeature {
  type: "Feature";
  properties: {
    mapId: string;
    name: string;
    center: [number, number]; // [lat, lng]
    businessCount: number;
    category: BIACategory;
    description: string;
    specialties: string[];
    color: string;
    primaryTransit: string;
    established: number;
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

export type BIACategory =
  | "Culinary & Culture"
  | "Retail & Fashion"
  | "Historic & Heritage"
  | "Commercial & Business"
  | "Arts & Waterfront"
  | "Bohemian & Arts";

export interface BIADetails {
  description: string;
  category: BIACategory;
  tags: string[];
  color: string;
  established: number;
  businessCount: number;
  keyAvenue: string;
  highlights: string[];
  websiteUrl: string;
}
