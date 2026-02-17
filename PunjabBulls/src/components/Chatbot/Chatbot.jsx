import React, { useState } from "react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
  onClick={() => setOpen(!open)}
  className={`pb-chat-trigger ${open ? "active" : ""}`}
>
  <span className="material-symbols-outlined pb-chat-icon">
    support_agent
  </span>
  <span className="pb-chat-text">Talk to Us</span>
</button>


      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "350px",
            height: "500px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <iframe
            src="https://copilotstudio.microsoft.com/environments/Default-727e4592-c258-41a4-8c60-073ef0a7f040/bots/copilots_header_e1d2b/webchat?__version__=2"
            title="Chatbot"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>
      )}
    </>
  );
};

export default Chatbot;
