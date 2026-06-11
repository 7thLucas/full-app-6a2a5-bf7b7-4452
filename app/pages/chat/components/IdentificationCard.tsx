import type { PlantIdentification, LivestockRating, ToxicityLevel } from "../types";

interface IdentificationCardProps {
  identification: PlantIdentification;
}

function getToxicityConfig(level: ToxicityLevel) {
  switch (level) {
    case "WARNING":
      return {
        bg: "#FDEDEC",
        border: "#C0392B",
        badgeBg: "#C0392B",
        badgeText: "#FFFFFF",
        icon: "⚠",
        label: "WARNING: Toxic",
        textColor: "#7B241C",
      };
    case "CAUTION":
      return {
        bg: "#FEF9E7",
        border: "#E67E22",
        badgeBg: "#E67E22",
        badgeText: "#FFFFFF",
        icon: "⚡",
        label: "CAUTION: Conditional Risk",
        textColor: "#784212",
      };
    case "SAFE":
      return {
        bg: "#EAFAF1",
        border: "#27AE60",
        badgeBg: "#27AE60",
        badgeText: "#FFFFFF",
        icon: "✓",
        label: "SAFE for Livestock",
        textColor: "#1E8449",
      };
    default:
      return {
        bg: "#F4F4F4",
        border: "#999999",
        badgeBg: "#666666",
        badgeText: "#FFFFFF",
        icon: "?",
        label: "UNKNOWN: Verify Before Feeding",
        textColor: "#555555",
      };
  }
}

function getRatingColor(rating: LivestockRating): string {
  switch (rating) {
    case "Excellent":
      return "#27AE60";
    case "Good":
      return "#52BE80";
    case "Fair":
      return "#F39C12";
    case "Poor":
      return "#E67E22";
    case "Avoid":
      return "#C0392B";
    default:
      return "#999999";
  }
}

function getRatingBg(rating: LivestockRating): string {
  switch (rating) {
    case "Excellent":
      return "#EAFAF1";
    case "Good":
      return "#F0FAF4";
    case "Fair":
      return "#FEF9E7";
    case "Poor":
      return "#FDF2E9";
    case "Avoid":
      return "#FDEDEC";
    default:
      return "#F4F4F4";
  }
}

const LIVESTOCK_ICONS: Record<string, string> = {
  cattle: "🐄",
  horses: "🐴",
  sheep: "🐑",
  goats: "🐐",
};

const LIVESTOCK_LABELS: Record<string, string> = {
  cattle: "Cattle",
  horses: "Horses",
  sheep: "Sheep",
  goats: "Goats",
};

export function IdentificationCard({ identification }: IdentificationCardProps) {
  const toxicity = getToxicityConfig(identification.toxicityLevel);

  return (
    <div
      style={{
        marginTop: "10px",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #E8F5E9",
        background: "#FAFFFE",
      }}
    >
      {/* Toxicity Status — Always First */}
      <div
        style={{
          background: toxicity.bg,
          borderLeft: `4px solid ${toxicity.border}`,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: toxicity.badgeBg,
            color: toxicity.badgeText,
            fontSize: "12px",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {toxicity.icon}
        </span>
        <div>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: toxicity.textColor,
              display: "block",
            }}
          >
            {toxicity.label}
          </span>
          {identification.toxicityNote && (
            <span
              style={{
                fontSize: "12px",
                color: toxicity.textColor,
                opacity: 0.85,
              }}
            >
              {identification.toxicityNote}
            </span>
          )}
        </div>
      </div>

      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Plant Name */}
        <div>
          <h3
            style={{
              margin: "0 0 2px",
              fontSize: "18px",
              fontWeight: 700,
              color: "#1B2E1F",
              lineHeight: 1.2,
            }}
          >
            {identification.commonName}
          </h3>
          {identification.scientificName && (
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#5A7A62",
                fontStyle: "italic",
              }}
            >
              {identification.scientificName}
            </p>
          )}
        </div>

        {/* Nutritional Profile */}
        {identification.nutritional && (
          <div>
            <p
              style={{
                margin: "0 0 6px",
                fontSize: "11px",
                fontWeight: 600,
                color: "#5A7A62",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Nutritional Profile
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {identification.nutritional.protein && (
                <div
                  style={{
                    background: "#F0F9FF",
                    border: "1px solid #BAE6FD",
                    borderRadius: "8px",
                    padding: "6px 10px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#0369A1",
                    }}
                  >
                    {identification.nutritional.protein}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#5A7A62",
                      fontWeight: 600,
                    }}
                  >
                    Protein
                  </div>
                </div>
              )}
              {identification.nutritional.fiber && (
                <div
                  style={{
                    background: "#FFF7ED",
                    border: "1px solid #FED7AA",
                    borderRadius: "8px",
                    padding: "6px 10px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#C2410C",
                    }}
                  >
                    {identification.nutritional.fiber}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#5A7A62",
                      fontWeight: 600,
                    }}
                  >
                    Fiber
                  </div>
                </div>
              )}
              {identification.nutritional.moisture && (
                <div
                  style={{
                    background: "#F0FDF4",
                    border: "1px solid #BBF7D0",
                    borderRadius: "8px",
                    padding: "6px 10px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#15803D",
                    }}
                  >
                    {identification.nutritional.moisture}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#5A7A62",
                      fontWeight: 600,
                    }}
                  >
                    Moisture
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Livestock Suitability */}
        {identification.livestock && (
          <div>
            <p
              style={{
                margin: "0 0 6px",
                fontSize: "11px",
                fontWeight: 600,
                color: "#5A7A62",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Livestock Suitability
            </p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {(
                Object.entries(identification.livestock) as [
                  string,
                  LivestockRating,
                ][]
              ).map(([animal, rating]) => (
                <div
                  key={animal}
                  style={{
                    background: getRatingBg(rating),
                    border: `1px solid ${getRatingColor(rating)}30`,
                    borderRadius: "8px",
                    padding: "5px 9px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    minWidth: "80px",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>
                    {LIVESTOCK_ICONS[animal] ?? ""}
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#5A7A62",
                        fontWeight: 600,
                      }}
                    >
                      {LIVESTOCK_LABELS[animal] ?? animal}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: getRatingColor(rating),
                      }}
                    >
                      {rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seasonal Notes */}
        {identification.seasonalNotes && (
          <div>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: "11px",
                fontWeight: 600,
                color: "#5A7A62",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Seasonal Notes
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#374151",
                lineHeight: 1.5,
              }}
            >
              {identification.seasonalNotes}
            </p>
          </div>
        )}

        {/* Feeding Recommendation */}
        {identification.feedingRecommendation && (
          <div
            style={{
              background: "#F0FBF4",
              border: "1px solid #C8E6C9",
              borderRadius: "8px",
              padding: "10px 12px",
              display: "flex",
              gap: "8px",
              alignItems: "flex-start",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2D6A4F"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, marginTop: "1px" }}
            >
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                fontWeight: 600,
                color: "#1B2E1F",
                lineHeight: 1.5,
              }}
            >
              {identification.feedingRecommendation}
            </p>
          </div>
        )}

        {/* Clarifying Questions */}
        {identification.clarifyingQuestions &&
          identification.clarifyingQuestions.length > 0 && (
            <div>
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#5A7A62",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                To narrow it down...
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {identification.clarifyingQuestions.map((q, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "13px",
                      color: "#374151",
                      lineHeight: 1.5,
                    }}
                  >
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
}
