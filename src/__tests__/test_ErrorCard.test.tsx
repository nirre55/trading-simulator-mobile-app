import React from "react";
import { render, screen } from "@testing-library/react-native";
import ErrorCard from "../components/cards/ErrorCard";
import { ThemeContext } from "../contexts/ThemeContext";
import { LightTheme, DarkTheme } from "../theme/theme";

// Mock pour MaterialIcons
jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: "MaterialIcons",
}));

// Mock pour useTranslation
jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (key: string) => key,
    };
  },
}));

// Tests pour le composant ErrorCard
describe("ErrorCard", () => {
  // Test de base pour vérifier que le composant se rend correctement
  test("rend correctement avec un message d'erreur", () => {
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

    render(<ErrorCard message="Une erreur est survenue" />, { wrapper });

    // Vérifier que le message d'erreur est affiché
    expect(screen.getByText("Une erreur est survenue")).toBeTruthy();
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

    render(<ErrorCard message="Une erreur est survenue" />, { wrapper });

    // Vérifier que le message d'erreur est affiché
    expect(screen.getByText("Une erreur est survenue")).toBeTruthy();
  });

  // Test pour vérifier le comportement avec un message vide
  test("rend correctement avec un message vide", () => {
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

    render(<ErrorCard message="" />, { wrapper });

    // Vérifier qu'un élément vide est affiché (pas de texte)
    expect(screen.queryByText(/./)).toBeNull();
  });

  // Test pour vérifier le comportement avec un message long
  test("rend correctement avec un message long", () => {
    const longMessage =
      "Ceci est un message d'erreur très long qui devrait être affiché correctement dans le composant ErrorCard. Il est important de tester le comportement du composant avec des messages de différentes longueurs pour s'assurer qu'il s'adapte correctement à tous les cas d'utilisation.";

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

    render(<ErrorCard message={longMessage} />, { wrapper });

    // Vérifier que le message long est affiché
    expect(screen.getByText(longMessage)).toBeTruthy();
  });

  // Test pour vérifier le comportement avec un message qui contient des caractères spéciaux
  test("rend correctement avec des caractères spéciaux", () => {
    const specialMessage = "!@#$%^&*()_+{}|:\"<>?~`-=[]\\;',./";

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

    render(<ErrorCard message={specialMessage} />, { wrapper });

    // Vérifier que le message avec caractères spéciaux est affiché
    expect(screen.getByText(specialMessage)).toBeTruthy();
  });
});
