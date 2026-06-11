export type ToxicityLevel = "SAFE" | "CAUTION" | "WARNING" | "UNKNOWN";

export type LivestockRating = "Excellent" | "Good" | "Fair" | "Poor" | "Avoid" | "Unknown";

export interface LivestockSuitability {
  cattle: LivestockRating;
  horses: LivestockRating;
  sheep: LivestockRating;
  goats: LivestockRating;
}

export interface NutritionalProfile {
  protein?: string;
  fiber?: string;
  moisture?: string;
}

export interface PlantIdentification {
  toxicityLevel: ToxicityLevel;
  toxicityNote?: string;
  commonName: string;
  scientificName?: string;
  nutritional?: NutritionalProfile;
  livestock?: LivestockSuitability;
  seasonalNotes?: string;
  feedingRecommendation?: string;
  clarifyingQuestions?: string[];
}

export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  imageUrl?: string;
  identification?: PlantIdentification;
  timestamp: number;
  isTyping?: boolean;
}
