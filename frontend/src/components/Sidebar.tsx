import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Sidebar.css";

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

interface SidebarProps {
  currentChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  onHoverChange?: (isHovered: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  isMobileOpen = false,
  onMobileClose,
  onHoverChange,
}) => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchChatSessions = async () => {
      try {
        const API_URL =
          process.env.REACT_APP_API_URL || "http://localhost:3005/api/chat";
        const response = await fetch(`${API_URL}/sessions`);
        if (response.ok) {
          const sessions = await response.json();
          const formattedSessions = sessions.map((session: any) => ({
            id: session.id,
            title: session.title || "New Chat",
            timestamp: new Date(session.timestamp),
            preview: session.preview || "",
          }));
          setChatSessions(formattedSessions);
        }
      } catch (error) {
        console.error("Failed to fetch chat sessions:", error);
        // Keep empty array on error
      }
    };

    fetchChatSessions();
  }, []);

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleChatSelect = (chatId: string) => {
    onSelectChat(chatId);
    // Close mobile sidebar when selecting a chat
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const handleNewChat = () => {
    onNewChat();
    // Close mobile sidebar when creating new chat
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const sidebarVariants = {
    expanded: { width: 260 },
    collapsed: { width: 80 },
  };

  const shouldExpand = isHovered || isMobileOpen;

  const contentVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -10 },
  };

  return (
    <motion.div
      className={`sidebar ${isMobileOpen ? "mobile-open" : ""} ${
        shouldExpand ? "expanded" : "collapsed"
      }`}
      variants={sidebarVariants}
      animate={shouldExpand ? "expanded" : "collapsed"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverChange?.(true);
      }}
      onMouseLeave={() => {
        // Add a small delay before collapsing to prevent flickering
        setTimeout(() => {
          setIsHovered(false);
          onHoverChange?.(false);
        }, 100);
      }}
    >
      <div className="sidebar-header">
        <motion.button
          className="new-chat-btn"
          onClick={handleNewChat}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="plus-icon"
            animate={{ rotate: isCollapsed ? 0 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
            </svg>
          </motion.div>
          <AnimatePresence>
            {shouldExpand && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                New chat
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* <AnimatePresence>
          {shouldExpand && (
            <motion.button
              className="pin-btn"
              onClick={() => setIsCollapsed(!isCollapsed)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              title={isCollapsed ? "Pin sidebar open" : "Auto-collapse sidebar"}
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 0 : 45 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-.42.301-.653.301-.232 0-.458-.106-.653-.301a.926.926 0 0 1 0-1.306l3.182-3.182L1.172 8.172a.5.5 0 0 1 0-.707c.688-.688 1.673-.766 2.375-.72a5.927 5.927 0 0 1 1.013.16l3.134-3.134c-.021-.125-.039-.283-.039-.46 0-.431.108-1.023.589-1.503a.5.5 0 0 1 .353-.146z" />
                </svg>
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence> */}
      </div>

      <AnimatePresence>
        {shouldExpand && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div className="sidebar-section" variants={itemVariants}>
              <h3>Recent</h3>
            </motion.div>

            <motion.div className="chat-list" variants={itemVariants}>
              <AnimatePresence>
                {chatSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    className={`chat-item ${
                      currentChatId === session.id ? "active" : ""
                    }`}
                    onClick={() => handleChatSelect(session.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    layout
                  >
                    <div className="chat-item-content">
                      <div className="chat-title">{session.title}</div>
                      <div className="chat-preview">{session.preview}</div>
                      <div className="chat-timestamp">
                        {formatTimestamp(session.timestamp)}
                      </div>
                    </div>
                    <motion.button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(session.id);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ×
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.div className="sidebar-footer" variants={itemVariants}>
              <div className="user-info">
                <div className="user-avatar">👤</div>
                <div className="user-name">User</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Sidebar;
