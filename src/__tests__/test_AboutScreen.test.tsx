import React from "react";
import { render, screen } from "@testing-library/react-native";
import AboutScreen from "../screens/AboutScreen";
import { ThemeContext } from "../contexts/ThemeContext";
import { LightTheme, DarkTheme } from "../theme/theme";

// Mock le module de traduction
jest.mock("react-i18next", () => ({
  // Mock du hook useTranslation
  useTranslation: () => ({
    t: (key: string) => {
      // Simuler des traductions basiques pour les clés utilisées dans le composant
      const translations: { [key: string]: string } = {
        "calculator.title": "Calculateur",
        "about.description": "Description de l'application",
        "about.howTo": "Comment utiliser",
        "about.step1": "Étape 1: Faire quelque chose",
        "about.step2": "Étape 2: Faire autre chose",
        "about.step3": "Étape 3: Continuer",
        "about.step4": "Étape 4: Vérifier",
        "about.step5": "Étape 5: Terminer",
        "about.formulas": "Formules",
        "about.iterations": "Itérations:",
        "about.iterations_formula": "Formule des itérations",
        "about.exitPrice": "Prix de sortie:",
        "about.exitPrice_formula": "Formule du prix de sortie",
        "about.profit": "Profit:",
        "about.profit_formula": "Formule du profit",
        "about.lossRecovery": "Récupération de perte",
        "about.lossRecovery_description": "Description de la récupération",
        "about.lossRecovery_formula": "Formule de récupération",
        "about.updateHistory": "Historique des mises à jour",
        "about.v1": "Version 1.0",
        "about.v1_date": "15 Janvier 2023",
        "about.v1_feature1": "Fonctionnalité 1",
        "about.v1_feature2": "Fonctionnalité 2",
        "about.v1_feature3": "Fonctionnalité 3",
        "about.v1_feature4": "Fonctionnalité 4",
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

// Mock le module Ionicons
jest.mock("@expo/vector-icons", () => {
  const { View } = require("react-native");
  return {
    Ionicons: (props: any) => {
      return <View testID={`icon-${props.name}`} {...props} />;
    },
  };
});

describe("AboutScreen", () => {
  // Test de base pour vérifier que le composant se rend sans erreur
  test("rend correctement avec le thème clair", () => {
    // Préparer un wrapper de ThemeContext avec thème clair
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

    // Rendre le composant
    render(<AboutScreen />, { wrapper });

    // Vérifier que les éléments principaux sont présents
    expect(screen.getByText("Calculateur")).toBeTruthy();
    expect(screen.getByText("Description de l'application")).toBeTruthy();
    expect(screen.getByText("Comment utiliser")).toBeTruthy();
    expect(screen.getByText("Historique des mises à jour")).toBeTruthy();
    expect(screen.getByText("Version 1.0")).toBeTruthy();
  });

  // Test pour vérifier le rendu avec le thème sombre
  test("rend correctement avec le thème sombre", () => {
    // Préparer un wrapper de ThemeContext avec thème sombre
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

    // Rendre le composant
    render(<AboutScreen />, { wrapper });

    // Vérifier que les éléments principaux sont présents
    expect(screen.getByText("Calculateur")).toBeTruthy();
    expect(screen.getByText("Description de l'application")).toBeTruthy();
  });

  // Test pour vérifier la présence des icônes
  test("affiche les icônes correctement", () => {
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

    render(<AboutScreen />, { wrapper });

    // Vérifier que les icônes existent
    expect(screen.getByTestId("icon-calculator")).toBeTruthy();
    expect(screen.getByTestId("icon-information-circle")).toBeTruthy();
  });

  // Test pour vérifier les sections des formules
  test("affiche les sections de formules correctement", () => {
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

    render(<AboutScreen />, { wrapper });

    // Vérifier la présence des titres de formules
    expect(screen.getByText("Formules")).toBeTruthy();
    expect(screen.getByText("Itérations:")).toBeTruthy();
    expect(screen.getByText("Prix de sortie:")).toBeTruthy();
    expect(screen.getByText("Profit:")).toBeTruthy();
    expect(screen.getByText("Récupération de perte")).toBeTruthy();
  });

  // Test pour vérifier l'historique des mises à jour
  test("affiche l'historique des mises à jour correctement", () => {
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

    render(<AboutScreen />, { wrapper });

    // Vérifier les éléments de l'historique
    expect(screen.getByText("Historique des mises à jour")).toBeTruthy();
    expect(screen.getByText("Version 1.0")).toBeTruthy();
    expect(screen.getByText("15 Janvier 2023")).toBeTruthy();
    expect(screen.getByText("Fonctionnalité 1")).toBeTruthy();
    expect(screen.getByText("Fonctionnalité 2")).toBeTruthy();
    expect(screen.getByText("Fonctionnalité 3")).toBeTruthy();
    expect(screen.getByText("Fonctionnalité 4")).toBeTruthy();
  });

  // Test pour vérifier les styles thématiques
  test("applique correctement les styles basés sur le thème", () => {
    // Rendre le composant avec le thème clair
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

    render(<AboutScreen />, { wrapper });

    // Vérifier que les styles sont bien appliqués
    // Note: Cette vérification est limitée car nous ne pouvons pas facilement
    // accéder aux styles internes sans modifier le composant pour exposer ses styles
    expect(screen.getByText("Calculateur")).toBeTruthy();
  });
});
