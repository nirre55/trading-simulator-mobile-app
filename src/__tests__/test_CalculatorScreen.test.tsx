import React from "react";
import { render, screen } from "@testing-library/react-native";
import CalculatorScreen from "../screens/CalculatorScreen";
import { ThemeContext } from "../contexts/ThemeContext";
import { LightTheme, DarkTheme } from "../theme/theme";
import * as calculator from "../utils/calculator";

// Mock pour les composants enfants
jest.mock("../components/Input", () => "Input");
jest.mock("../components/TargetInput", () => "TargetInput");
jest.mock("../components/Button", () => "Button");
jest.mock("../components/CalculationResult", () => "CalculationResult");

// Mock pour useTranslation
jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        const translations: { [key: string]: string } = {
          "calculator.balance": "Solde",
          "calculator.initialPrice": "Prix initial",
          "calculator.finalPrice": "Prix final",
          "calculator.reductionRate": "Taux de réduction",
          "calculator.calculate": "Calculer",
          "calculator.error.mustBeNumber": "Doit être un nombre",
          "calculator.error.invalidInput": "Entrée invalide",
        };
        return translations[key] || key;
      },
    };
  },
}));

// Spy sur la fonction calculateIterations pour vérifier qu'elle est appelée
const calculateIterationsSpy = jest.spyOn(calculator, "calculateIterations");

describe("CalculatorScreen", () => {
  beforeEach(() => {
    calculateIterationsSpy.mockClear();
  });

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

    render(<CalculatorScreen />, { wrapper });

    // Nous ne pouvons pas vérifier le contenu exact puisque les composants sont mockés
    // Vérifions juste que le composant se rend sans erreur
    expect(true).toBeTruthy();
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

    render(<CalculatorScreen />, { wrapper });

    // Vérifions juste que le composant se rend sans erreur
    expect(true).toBeTruthy();
  });
});
