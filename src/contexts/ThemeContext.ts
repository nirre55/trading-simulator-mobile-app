import { createContext } from "react";
import { ThemeType, LightTheme } from "../theme/theme"; // Modifié le chemin d'importation

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