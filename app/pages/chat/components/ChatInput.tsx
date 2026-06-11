import { useCallback, useRef, useState, type KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (text: string, imageFile?: File) => void;
  disabled?: boolean;
  placeholder?: string;
  enablePhotoUpload?: boolean;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Describe a plant or upload a photo...",
  enablePhotoUpload = true,
}: ChatInputProps) {
  const [text, setText] = useState("");
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = useCallback(() => {
    if (disabled) return;
    if (!text.trim() && !pendingImage) return;

    onSend(text.trim(), pendingImage ?? undefined);
    setText("");
    setPendingImage(null);
    setImagePreview(null);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [disabled, text, pendingImage, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
      // Auto-resize textarea
      const el = e.target;
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    },
    [],
  );

  const handleImageSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate it's an image
      if (!file.type.startsWith("image/")) return;

      setPendingImage(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);

      // Reset file input so same file can be re-selected
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [],
  );

  const removePendingImage = useCallback(() => {
    setPendingImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  }, [imagePreview]);

  const canSend = (text.trim().length > 0 || pendingImage !== null) && !disabled;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "680px",
        background: "#FFFFFF",
        borderTop: "1px solid #E8F5E9",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.06)",
        padding: "10px 12px",
        paddingBottom: "max(10px, env(safe-area-inset-bottom))",
        zIndex: 100,
      }}
    >
      {/* Image Preview */}
      {imagePreview && (
        <div
          style={{
            marginBottom: "8px",
            position: "relative",
            display: "inline-block",
          }}
        >
          <img
            src={imagePreview}
            alt="Selected plant"
            style={{
              height: "64px",
              width: "64px",
              objectFit: "cover",
              borderRadius: "10px",
              border: "2px solid #C8E6C9",
            }}
          />
          <button
            onClick={removePendingImage}
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#C0392B",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
            title="Remove image"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Input Row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "8px",
        }}
      >
        {/* Photo Upload Button */}
        {enablePhotoUpload && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageSelect}
              style={{ display: "none" }}
              id="plant-photo-upload"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              title="Upload a photo"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1.5px solid #C8E6C9",
                background: pendingImage ? "#D8F3DC" : "#FFFFFF",
                cursor: disabled ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                opacity: disabled ? 0.5 : 1,
                transition: "all 0.15s ease",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={pendingImage ? "#2D6A4F" : "#5A7A62"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </button>
          </>
        )}

        {/* Text Input */}
        <div
          style={{
            flex: 1,
            border: "1.5px solid #C8E6C9",
            borderRadius: "22px",
            padding: "10px 14px",
            background: "#FAFFFE",
            display: "flex",
            alignItems: "flex-end",
            transition: "border-color 0.15s ease",
          }}
          onFocus={() => {}}
          onBlur={() => {}}
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              resize: "none",
              fontSize: "15px",
              color: "#1B2E1F",
              lineHeight: 1.5,
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              overflow: "hidden",
              minHeight: "24px",
              maxHeight: "120px",
              opacity: disabled ? 0.6 : 1,
            }}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!canSend}
          title="Send"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "none",
            background: canSend ? "#2D6A4F" : "#C8E6C9",
            cursor: canSend ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.15s ease",
            transform: canSend ? "scale(1)" : "scale(0.95)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22 11 13 2 9l20-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
