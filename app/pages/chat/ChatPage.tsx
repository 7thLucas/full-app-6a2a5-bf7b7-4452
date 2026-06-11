import { useCallback, useEffect, useRef, useState } from "react";
import { invokeLLM } from "@qb/agentic";
import { useConfigurables } from "~/modules/configurables";
import type { ChatMessage, PlantIdentification } from "./types";
import { forageIdentificationSchema } from "./llm.schema";
import { ChatHeader } from "./components/ChatHeader";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { MessageBubble } from "./components/MessageBubble";
import { ChatInput } from "./components/ChatInput";

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function ChatPage() {
  const { config, loading } = useConfigurables();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const appName = loading ? "ForageIQ" : (config.appName ?? "ForageIQ");
  const systemPrompt = loading
    ? undefined
    : (config.systemPrompt ?? undefined);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const sendMessage = useCallback(
    async (text: string, imageFile?: File) => {
      if (!text.trim() && !imageFile) return;

      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        text: text.trim(),
        imageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      try {
        const files = imageFile ? [imageFile] : undefined;

        // Build message with conversation context
        const conversationContext = messages
          .slice(-6) // last 3 turns
          .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`)
          .join("\n");

        const fullMessage = conversationContext
          ? `Previous conversation:\n${conversationContext}\n\nUser's new message: ${text.trim() || "(uploaded a photo)"}`
          : text.trim() || "(The user uploaded a photo of a plant for identification)";

        const result = await invokeLLM({
          message: fullMessage,
          schema: forageIdentificationSchema,
          systemPrompt,
          files,
        });

        if (result.status === "ERROR" || !result.response) {
          throw new Error(result.error ?? "Identification failed");
        }

        const data = result.response as Record<string, unknown>;

        const identification: PlantIdentification = {
          toxicityLevel:
            (data.toxicityLevel as PlantIdentification["toxicityLevel"]) ??
            "UNKNOWN",
          toxicityNote: data.toxicityNote as string | undefined,
          commonName: (data.commonName as string) ?? "Unknown Plant",
          scientificName: data.scientificName as string | undefined,
          nutritional: data.nutritional as
            | PlantIdentification["nutritional"]
            | undefined,
          livestock: data.livestock as
            | PlantIdentification["livestock"]
            | undefined,
          seasonalNotes: data.seasonalNotes as string | undefined,
          feedingRecommendation: data.feedingRecommendation as
            | string
            | undefined,
          clarifyingQuestions: data.clarifyingQuestions as
            | string[]
            | undefined,
        };

        const rawResponse = (data.rawResponse as string) ?? identification.commonName;

        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          text: rawResponse,
          identification,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        const errorMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          text:
            "I had trouble processing that request. Please try describing the plant again, or check your connection and try once more.",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        console.error("ForageIQ LLM error:", err);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, systemPrompt],
  );

  const handleExamplePrompt = useCallback(
    (prompt: string) => {
      sendMessage(prompt);
    },
    [sendMessage],
  );

  const showWelcome = messages.length === 0 && !isTyping;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        maxWidth: "680px",
        margin: "0 auto",
        background: "#F8F9F2",
        position: "relative",
      }}
    >
      {/* Header */}
      <ChatHeader appName={appName} logoUrl={config.logoUrl} />

      {/* Messages Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          paddingTop: "72px", // header height + gap
          paddingBottom: "80px", // input area height + gap
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {showWelcome ? (
          <WelcomeScreen
            heading={
              config.welcomeHeading ?? "What plant would you like to identify?"
            }
            subtext={
              config.welcomeSubtext ??
              "Describe what you see — color, leaf shape, stem, smell — or upload a photo."
            }
            examplePrompts={
              config.examplePrompts ?? [
                "Tall grass with purple seedheads",
                "Clover-like plant, white flowers",
                "Broad leaves, strong smell",
              ]
            }
            onPromptClick={handleExamplePrompt}
          />
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isTyping && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "18px 18px 18px 4px",
                    padding: "14px 18px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      background: "#40916C",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "typingBounce 1.2s infinite",
                      animationDelay: "0s",
                    }}
                  />
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      background: "#40916C",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "typingBounce 1.2s infinite",
                      animationDelay: "0.2s",
                    }}
                  />
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      background: "#40916C",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "typingBounce 1.2s infinite",
                      animationDelay: "0.4s",
                    }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <ChatInput
        onSend={sendMessage}
        disabled={isTyping}
        placeholder={
          config.inputPlaceholder ?? "Describe a plant or upload a photo..."
        }
        enablePhotoUpload={config.enablePhotoUpload ?? true}
      />

      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
