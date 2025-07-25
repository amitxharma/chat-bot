import React from "react";
import { motion } from "framer-motion";
import "./WelcomePlaceholder.css";

const WelcomePlaceholder: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="welcome-placeholder"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="welcome-icon" variants={itemVariants}>
        <motion.div
          className="chat-icon"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          💬
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <motion.h1
          className="welcome-title"
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          Welcome to amitx.chat
        </motion.h1>
      </motion.div>

      <motion.p className="welcome-subtitle" variants={itemVariants}>
        Start a conversation to begin your AI-powered chat experience
      </motion.p>

      <motion.div className="welcome-features" variants={itemVariants}>
        <motion.div
          className="feature-item"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="feature-icon">⚡</span>
          <span>Fast responses</span>
        </motion.div>
        <motion.div
          className="feature-item"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="feature-icon">🧠</span>
          <span>Smart AI</span>
        </motion.div>
        <motion.div
          className="feature-item"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="feature-icon">🔒</span>
          <span>Secure</span>
        </motion.div>
      </motion.div>

      {/* <motion.div
        className="welcome-prompt"
        variants={itemVariants}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Type your message below to get started...
      </motion.div> */}
    </motion.div>
  );
};

export default WelcomePlaceholder;
