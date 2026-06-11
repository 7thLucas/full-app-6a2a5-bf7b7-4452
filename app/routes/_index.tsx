import { useConfigurables } from "~/modules/configurables";
import { ChatPage } from "~/pages/chat/ChatPage";

export default function IndexPage() {
  const { loading } = useConfigurables();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#F8F9F2",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div className="typing-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  }

  return <ChatPage />;
}
