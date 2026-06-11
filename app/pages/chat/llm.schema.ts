/**
 * JSON Schema for LLM structured response.
 * This schema is sent to /api/agents/llm so the LLM returns a strongly-typed object.
 */
export const forageIdentificationSchema = {
  type: "object",
  properties: {
    toxicityLevel: {
      type: "string",
      enum: ["SAFE", "CAUTION", "WARNING", "UNKNOWN"],
      description:
        "The toxicity level of the plant for livestock. SAFE = no known toxicity, CAUTION = mild/conditional risk, WARNING = significant danger, UNKNOWN = cannot determine from description.",
    },
    toxicityNote: {
      type: "string",
      description:
        "Brief explanation of the toxicity status (1-2 sentences). Required for CAUTION and WARNING levels.",
    },
    commonName: {
      type: "string",
      description:
        "The most common name for this forage plant, e.g. 'Alfalfa', 'Red Clover'. If the plant is unidentifiable, use 'Unknown Plant'.",
    },
    scientificName: {
      type: "string",
      description:
        "The scientific (Latin) name, e.g. 'Medicago sativa'. Omit if unknown.",
    },
    nutritional: {
      type: "object",
      properties: {
        protein: {
          type: "string",
          description: "Estimated crude protein percentage range, e.g. '18-22%'",
        },
        fiber: {
          type: "string",
          description: "Estimated crude fiber percentage range, e.g. '25-30%'",
        },
        moisture: {
          type: "string",
          description: "Estimated moisture percentage range, e.g. '70-80%'",
        },
      },
    },
    livestock: {
      type: "object",
      properties: {
        cattle: {
          type: "string",
          enum: ["Excellent", "Good", "Fair", "Poor", "Avoid", "Unknown"],
        },
        horses: {
          type: "string",
          enum: ["Excellent", "Good", "Fair", "Poor", "Avoid", "Unknown"],
        },
        sheep: {
          type: "string",
          enum: ["Excellent", "Good", "Fair", "Poor", "Avoid", "Unknown"],
        },
        goats: {
          type: "string",
          enum: ["Excellent", "Good", "Fair", "Poor", "Avoid", "Unknown"],
        },
      },
    },
    seasonalNotes: {
      type: "string",
      description:
        "Brief notes on when to graze, harvest, or avoid (1-3 sentences).",
    },
    feedingRecommendation: {
      type: "string",
      description:
        "A specific, actionable feeding recommendation for livestock managers (1-2 sentences). Always include this.",
    },
    clarifyingQuestions: {
      type: "array",
      items: { type: "string" },
      description:
        "1-2 targeted follow-up questions if the plant description is ambiguous. Leave empty if identification is confident.",
    },
    rawResponse: {
      type: "string",
      description:
        "The full conversational reply from the agronomist perspective. This will be displayed as the main chat text. Should be warm, practical, and safety-first in tone.",
    },
  },
  required: ["toxicityLevel", "commonName", "feedingRecommendation", "rawResponse"],
};
