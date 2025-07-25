import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Theme, themes } from "../components/ThemeSelector";

interface ThemeContextType {
  currentTheme: string;
  theme: Theme;
  setTheme: (themeKey: string, customTheme?: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string>("blue");
  const [customTheme, setCustomTheme] = useState<Theme | null>(null);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("chatapp-theme");
    const savedCustomTheme = localStorage.getItem("chatapp-custom-theme");

    if (savedTheme) {
      setCurrentTheme(savedTheme);

      if (savedTheme === "custom" && savedCustomTheme) {
        try {
          setCustomTheme(JSON.parse(savedCustomTheme));
        } catch (error) {
          console.error("Failed to parse custom theme:", error);
        }
      }
    }
  }, []);

  // Apply theme to CSS variables
  useEffect(() => {
    const theme =
      currentTheme === "custom" && customTheme
        ? customTheme
        : themes[currentTheme];

    if (theme) {
      const root = document.documentElement;
      root.style.setProperty("--bg-primary", theme.background);
      root.style.setProperty("--bg-secondary", theme.secondary);
      root.style.setProperty("--bg-tertiary", theme.tertiary);
      root.style.setProperty("--text-primary", theme.text);
      root.style.setProperty("--text-secondary", theme.textSecondary);
      root.style.setProperty("--accent-color", theme.accent);
      root.style.setProperty("--hover-color", theme.hover);
      root.style.setProperty("--border-color", theme.border);

      // Update body background
      document.body.style.background = theme.background;
      document.body.style.color = theme.text;
    }
  }, [currentTheme, customTheme]);

  const setTheme = (themeKey: string, newCustomTheme?: Theme) => {
    setCurrentTheme(themeKey);

    if (themeKey === "custom" && newCustomTheme) {
      setCustomTheme(newCustomTheme);
      localStorage.setItem(
        "chatapp-custom-theme",
        JSON.stringify(newCustomTheme)
      );
    }

    localStorage.setItem("chatapp-theme", themeKey);
  };

  const theme =
    currentTheme === "custom" && customTheme
      ? customTheme
      : themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
