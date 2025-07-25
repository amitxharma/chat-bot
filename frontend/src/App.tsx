import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import ThemeSelector from "./components/ThemeSelector";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

const AppContent: React.FC = () => {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [, setChatSessions] = useState<any[]>([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const { currentTheme, setTheme } = useTheme();

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    setCurrentChatId(newChatId);
    // Clear current messages for new chat
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    // Load messages for selected chat
  };

  const handleDeleteChat = (chatId: string) => {
    setChatSessions((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleSidebarHoverChange = (isHovered: boolean) => {
    setIsSidebarHovered(isHovered);
  };

  return (
    <div className="app">
      {isMobileSidebarOpen && (
        <div className="mobile-overlay" onClick={closeMobileSidebar} />
      )}
      <Sidebar
        currentChatId={currentChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
        onHoverChange={handleSidebarHoverChange}
      />
      <div
        className={`main-content ${
          isSidebarHovered || isMobileSidebarOpen ? "sidebar-expanded" : ""
        }`}
      >
        <div className="chat-header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={toggleMobileSidebar}>
              <span className="hamburger-icon">☰</span>
            </button>
            <h1>amitx.chat</h1>
          </div>
          <div className="model-info">
            <ThemeSelector
              currentTheme={currentTheme}
              onThemeChange={setTheme}
            />
          </div>
        </div>
        <Chat key={currentChatId} chatId={currentChatId} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
