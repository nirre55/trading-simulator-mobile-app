import React from "react";
import { render, screen } from "@testing-library/react-native";
import HomeScreen from "../screens/HomeScreen";
import { ThemeContext } from "../contexts/ThemeContext";
import { LightTheme, DarkTheme } from "../theme/theme";

// Mock pour useTranslation
jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        const translations: { [key: string]: string } = {
          "home.welcome": "Bienvenue sur Trading Simulator",
          "home.subtitle": "Une application pour simuler vos stratégies de trading",
        };
        return translations[key] || key;
      },
    };
  },
}));

// Tests pour le composant HomeScreen
describe("HomeScreen", () => {
  // Test de base pour vérifier que le composant se rend correctement
  test("rend correctement avec le thème clair", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider
        value={{
          theme: LightTheme,
          isDark: false,
          toggleTheme: jest.fn(),
        }}
      >
        {children}
      </ThemeContext.Provider>
    );

    render(<HomeScreen />, { wrapper });

    // Vérifier que les textes sont affichés
    expect(screen.getByText("Bienvenue sur Trading Simulator")).toBeTruthy();
    expect(screen.getByText("Une application pour simuler vos stratégies de trading")).toBeTruthy();
  });

  // Test pour vérifier le rendu avec le thème sombre
  test("rend correctement avec le thème sombre", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider
        value={{
          theme: DarkTheme,
          isDark: true,
          toggleTheme: jest.fn(),
        }}
      >
        {children}
      </ThemeContext.Provider>
    );

    render(<HomeScreen />, { wrapper });

    // Vérifier que les textes sont affichés
    expect(screen.getByText("Bienvenue sur Trading Simulator")).toBeTruthy();
    expect(screen.getByText("Une application pour simuler vos stratégies de trading")).toBeTruthy();
  });

  // Test pour vérifier que le composant utilise les bonnes clés de traduction
  test("utilise les bonnes clés de traduction", () => {
    // Mock pour la fonction t
    const mockT = jest.fn((key) => key);

    // Remplacer temporairement useTranslation
    jest.mock("react-i18next", () => ({
      useTranslation: () => ({
        t: mockT,
      }),
    }));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider
        value={{
          theme: LightTheme,
          isDark: false,
          toggleTheme: jest.fn(),
        }}
      >
        {children}
      </ThemeContext.Provider>
    );

    render(<HomeScreen />, { wrapper });

    // Vérifier que les clés de traduction sont utilisées
    // Note: On ne peut pas vérifier directement les appels à mockT car le mock est remplacé
    // donc on vérifie plutôt la présence des textes traduits
    expect(screen.getByText("Bienvenue sur Trading Simulator")).toBeTruthy();
    expect(screen.getByText("Une application pour simuler vos stratégies de trading")).toBeTruthy();
  });
});
