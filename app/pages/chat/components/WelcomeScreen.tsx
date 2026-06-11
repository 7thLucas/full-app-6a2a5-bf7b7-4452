interface WelcomeScreenProps {
  heading: string;
  subtext: string;
  examplePrompts: string[];
  onPromptClick: (prompt: string) => void;
}

export function WelcomeScreen({
  heading,
  subtext,
  examplePrompts,
  onPromptClick,
}: WelcomeScreenProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        gap: "24px",
        padding: "40px 16px 24px",
        textAlign: "center",
        minHeight: "calc(100dvh - 160px)",
      }}
    >
      {/* Plant Icon */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #40916C 0%, #2D6A4F 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(45,106,79,0.3)",
        }}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      </div>

      {/* Heading & Subtext */}
      <div style={{ maxWidth: "340px" }}>
        <h2
          style={{
            margin: "0 0 10px",
            fontSize: "22px",
            fontWeight: 700,
            color: "#1B2E1F",
            lineHeight: 1.3,
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: "15px",
            color: "#5A7A62",
            lineHeight: 1.6,
          }}
        >
          {subtext}
        </p>
      </div>

      {/* Example Prompt Chips */}
      {examplePrompts.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
            maxWidth: "380px",
          }}
        >
          <p
            style={{
              margin: "0 0 4px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#5A7A62",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Try an example
          </p>
          {examplePrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => onPromptClick(prompt)}
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #C8E6C9",
                borderRadius: "12px",
                padding: "11px 16px",
                fontSize: "14px",
                color: "#2D6A4F",
                cursor: "pointer",
                textAlign: "left",
                lineHeight: 1.4,
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                fontWeight: 500,
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                minHeight: "44px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#F0FBF4";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#40916C";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#FFFFFF";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#C8E6C9";
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#40916C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Safety note */}
      <p
        style={{
          margin: 0,
          fontSize: "12px",
          color: "#5A7A62",
          textAlign: "center",
          maxWidth: "300px",
          lineHeight: 1.5,
        }}
      >
        Toxicity warnings always appear first. Safety is our top priority.
      </p>
    </div>
  );
}
