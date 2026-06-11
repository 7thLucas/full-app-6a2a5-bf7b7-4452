import type { ChatMessage } from "../types";
import { IdentificationCard } from "./IdentificationCard";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "4px",
        }}
      >
        {/* Image preview if attached */}
        {message.imageUrl && (
          <img
            src={message.imageUrl}
            alt="Uploaded plant"
            style={{
              maxWidth: "220px",
              borderRadius: "12px",
              border: "2px solid #C8E6C9",
              objectFit: "cover",
              maxHeight: "200px",
            }}
          />
        )}
        {message.text && (
          <div
            style={{
              background: "#D8F3DC",
              borderRadius: "18px 18px 4px 18px",
              padding: "10px 14px",
              maxWidth: "78%",
              fontSize: "15px",
              color: "#1B2E1F",
              lineHeight: 1.5,
              wordBreak: "break-word",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            {message.text}
          </div>
        )}
        <span
          style={{
            fontSize: "11px",
            color: "#5A7A62",
            paddingRight: "4px",
          }}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    );
  }

  // Assistant message
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "4px",
        maxWidth: "88%",
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "18px 18px 18px 4px",
          padding: "12px 16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          fontSize: "15px",
          color: "#1B2E1F",
          lineHeight: 1.6,
          wordBreak: "break-word",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          width: "100%",
        }}
      >
        {/* Main text */}
        {message.text && (
          <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{message.text}</p>
        )}

        {/* Identification card */}
        {message.identification && (
          <IdentificationCard identification={message.identification} />
        )}
      </div>
      <span
        style={{
          fontSize: "11px",
          color: "#5A7A62",
          paddingLeft: "4px",
        }}
      >
        ForageIQ · {formatTime(message.timestamp)}
      </span>
    </div>
  );
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
