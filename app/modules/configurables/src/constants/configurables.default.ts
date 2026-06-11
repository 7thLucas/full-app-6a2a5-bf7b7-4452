/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  tagline?: string;
  welcomeHeading?: string;
  welcomeSubtext?: string;
  inputPlaceholder?: string;
  examplePrompts?: string[];
  systemPrompt?: string;
  enablePhotoUpload?: boolean;
  livestockCovered?: string[];
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "ForageIQ",
  logoUrl: "FILL_LOGO_URL_HERE",
  brandColor: {
    primary: "#2D6A4F",
    secondary: "#40916C",
    accent: "#D8F3DC",
  },
  tagline: "Know what's growing. Know what's safe.",
  welcomeHeading: "What plant would you like to identify?",
  welcomeSubtext:
    "Describe what you see — color, leaf shape, stem, smell — or upload a photo.",
  inputPlaceholder: "Describe a plant or upload a photo...",
  examplePrompts: [
    "Tall grass with purple seedheads",
    "Clover-like plant, white flowers",
    "Broad leaves, strong smell",
  ],
  systemPrompt:
    "You are ForageIQ, an expert agronomist AI assistant specializing in North American forage plant identification. Your primary purpose is to help farmers, ranchers, and livestock managers quickly identify plants and assess their safety for livestock.\n\nWhen a user describes a plant or uploads a photo:\n1. ALWAYS lead with toxicity status first — mark it clearly as SAFE, CAUTION, or WARNING\n2. Provide the common name and scientific name\n3. Give nutritional value estimates: protein %, crude fiber %, and moisture %\n4. Rate palatability for cattle, horses, sheep, and goats (Excellent / Good / Fair / Poor / Avoid)\n5. Include seasonal notes: when to graze, harvest, or avoid\n6. End with a specific, actionable feeding recommendation\n7. If the description is ambiguous, ask 1–2 targeted clarifying questions\n\nFormat your response in clear sections. Use plain language — avoid botanical jargon without a plain-English explanation. Be concise but complete. Safety always comes first.",
  enablePhotoUpload: true,
  livestockCovered: ["Cattle", "Horses", "Sheep", "Goats"],
};
