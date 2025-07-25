import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ThemeSelector.css";

export interface Theme {
  name: string;
  background: string;
  secondary: string;
  tertiary: string;
  text: string;
  textSecondary: string;
  accent: string;
  hover: string;
  border: string;
}

export const themes: { [key: string]: Theme } = {
  blue: {
    name: "Ocean Blue (Current)",
    background: "#113F67",
    secondary: "#34699A",
    tertiary: "#58A0C8",
    text: "#ffffff",
    textSecondary: "#c5c5d2",
    accent: "#58A0C8",
    hover: "#34699A",
    border: "#34699A",
  },
  blackWhite: {
    name: "Black & White (Classic Dark)",
    background: "#000000",
    secondary: "#1F2937",
    tertiary: "#374151",
    text: "#FFFFFF",
    textSecondary: "#D1D5DB",
    accent: "#FACC15",
    hover: "#1F2937",
    border: "#374151",
  },
  lightGray: {
    name: "Light Gray & White (Minimalist Light)",
    background: "#F9FAFB",
    secondary: "#FFFFFF",
    tertiary: "#E5E7EB",
    text: "#111827",
    textSecondary: "#6B7280",
    accent: "#6366F1",
    hover: "#E5E7EB",
    border: "#D1D5DB",
  },
  midnightBlue: {
    name: "Midnight Blue (Calm Dark)",
    background: "#0F172A",
    secondary: "#1E293B",
    tertiary: "#334155",
    text: "#F1F5F9",
    textSecondary: "#CBD5E1",
    accent: "#3B82F6",
    hover: "#1E293B",
    border: "#334155",
  },
  softPeach: {
    name: "Soft Peach (Warm Light)",
    background: "#FFF7F0",
    secondary: "#FFFFFF",
    tertiary: "#FFE3DC",
    text: "#3A3A3A",
    textSecondary: "#6B7280",
    accent: "#FF6B6B",
    hover: "#FFE3DC",
    border: "#FECACA",
  },
  forestGreen: {
    name: "Forest Green (Nature Inspired)",
    background: "#F0FDF4",
    secondary: "#FFFFFF",
    tertiary: "#D1FAE5",
    text: "#064E3B",
    textSecondary: "#047857",
    accent: "#10B981",
    hover: "#D1FAE5",
    border: "#A7F3D0",
  },
};

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (themeKey: string, customTheme?: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [customTheme, setCustomTheme] = useState<Theme>({
    name: "Custom Theme",
    background: "#113F67",
    secondary: "#34699A",
    tertiary: "#58A0C8",
    text: "#ffffff",
    textSecondary: "#c5c5d2",
    accent: "#58A0C8",
    hover: "#34699A",
    border: "#34699A",
  });

  const handleThemeSelect = (themeKey: string) => {
    onThemeChange(themeKey);
    setIsOpen(false);
  };

  const handleCustomThemeChange = (property: keyof Theme, value: string) => {
    setCustomTheme((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const applyCustomTheme = () => {
    onThemeChange("custom", customTheme);
    setShowCustomizer(false);
    setIsOpen(false);
  };

  return (
    <div className="theme-selector">
      <motion.button
        className="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Change Theme"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path d="M12 18C8.69 18 6 15.31 6 12S8.69 6 12 6 18 8.69 18 12 15.31 18 12 18M20 8.69V4H15.31L12 0.69 8.69 4H4V8.69L0.69 12 4 15.31V20H8.69L12 23.31 15.31 20H20V15.31L23.31 12 20 8.69Z" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="theme-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="theme-dropdown-header">
              <h3>Choose Theme</h3>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>

            <div className="theme-options">
              {Object.entries(themes).map(([key, theme], index) => (
                <motion.button
                  key={key}
                  className={`theme-option ${
                    currentTheme === key ? "active" : ""
                  }`}
                  onClick={() => handleThemeSelect(key)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="theme-preview">
                    <div
                      className="color-swatch primary"
                      style={{ backgroundColor: theme.background }}
                    />
                    <div
                      className="color-swatch secondary"
                      style={{ backgroundColor: theme.secondary }}
                    />
                    <div
                      className="color-swatch accent"
                      style={{ backgroundColor: theme.accent }}
                    />
                  </div>
                  <span className="theme-name">{theme.name}</span>
                </motion.button>
              ))}

              <motion.button
                className="theme-option custom-option"
                onClick={() => setShowCustomizer(true)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Object.keys(themes).length * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="theme-preview">
                  <div className="color-swatch gradient" />
                  <div className="color-swatch gradient" />
                  <div className="color-swatch gradient" />
                </div>
                <span className="theme-name">Custom Theme</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCustomizer && (
          <motion.div
            className="custom-theme-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h3>Customize Theme</h3>
                <button
                  className="close-btn"
                  onClick={() => setShowCustomizer(false)}
                >
                  ×
                </button>
              </div>

              <div className="color-inputs">
                <div className="input-group">
                  <label>Background Color</label>
                  <div className="color-input-wrapper">
                    <input
                      type="color"
                      value={customTheme.background}
                      onChange={(e) =>
                        handleCustomThemeChange("background", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={customTheme.background}
                      onChange={(e) =>
                        handleCustomThemeChange("background", e.target.value)
                      }
                      placeholder="#113F67"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Secondary Color</label>
                  <div className="color-input-wrapper">
                    <input
                      type="color"
                      value={customTheme.secondary}
                      onChange={(e) =>
                        handleCustomThemeChange("secondary", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={customTheme.secondary}
                      onChange={(e) =>
                        handleCustomThemeChange("secondary", e.target.value)
                      }
                      placeholder="#34699A"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Accent Color</label>
                  <div className="color-input-wrapper">
                    <input
                      type="color"
                      value={customTheme.accent}
                      onChange={(e) =>
                        handleCustomThemeChange("accent", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={customTheme.accent}
                      onChange={(e) =>
                        handleCustomThemeChange("accent", e.target.value)
                      }
                      placeholder="#58A0C8"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Text Color</label>
                  <div className="color-input-wrapper">
                    <input
                      type="color"
                      value={customTheme.text}
                      onChange={(e) =>
                        handleCustomThemeChange("text", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={customTheme.text}
                      onChange={(e) =>
                        handleCustomThemeChange("text", e.target.value)
                      }
                      placeholder="#ffffff"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Hover Color</label>
                  <div className="color-input-wrapper">
                    <input
                      type="color"
                      value={customTheme.hover}
                      onChange={(e) =>
                        handleCustomThemeChange("hover", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={customTheme.hover}
                      onChange={(e) =>
                        handleCustomThemeChange("hover", e.target.value)
                      }
                      placeholder="#34699A"
                    />
                  </div>
                </div>
              </div>

              <div className="theme-preview-large">
                <div
                  className="preview-card"
                  style={{
                    backgroundColor: customTheme.background,
                    color: customTheme.text,
                    border: `1px solid ${customTheme.border}`,
                  }}
                >
                  <div
                    className="preview-header"
                    style={{ backgroundColor: customTheme.secondary }}
                  >
                    Preview
                  </div>
                  <div className="preview-content">
                    <p>This is how your theme will look</p>
                    <button
                      className="preview-button"
                      style={{
                        backgroundColor: customTheme.accent,
                        color: customTheme.text,
                      }}
                    >
                      Button
                    </button>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowCustomizer(false)}
                >
                  Cancel
                </button>
                <button className="apply-btn" onClick={applyCustomTheme}>
                  Apply Theme
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
