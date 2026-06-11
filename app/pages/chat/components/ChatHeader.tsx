interface ChatHeaderProps {
  appName: string;
  logoUrl?: string;
}

export function ChatHeader({ appName, logoUrl }: ChatHeaderProps) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "680px",
        height: "56px",
        background: "#2D6A4F",
        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: "10px",
        zIndex: 100,
      }}
    >
      {/* Logo or leaf icon */}
      {logoUrl && logoUrl !== "FILL_LOGO_URL_HERE" ? (
        <img
          src={logoUrl}
          alt={appName}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        </div>
      )}

      <div style={{ flex: 1 }}>
        <h1
          style={{
            margin: 0,
            fontSize: "17px",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.2,
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          {appName}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: "11px",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.2,
          }}
        >
          Forage Plant Identifier
        </p>
      </div>

      {/* Status dot */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "5px" }}
        title="AI Ready"
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#74C69D",
            boxShadow: "0 0 0 2px rgba(116,198,157,0.3)",
          }}
        />
        <span
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          AI Ready
        </span>
      </div>
    </header>
  );
}
