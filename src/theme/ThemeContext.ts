import { createContext } from "react";
import { ThemeType, LightTheme } from "./theme";

type ThemeContextType = {
  theme: ThemeType;
  isDark: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  isDark: false,
  toggleTheme: () => {},
});
