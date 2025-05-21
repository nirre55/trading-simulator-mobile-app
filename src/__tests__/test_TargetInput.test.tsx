import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import TargetInput from "../components/TargetInput";
import { ThemeContext } from "../contexts/ThemeContext";
import { LightTheme, DarkTheme } from "../theme/theme";

// Mock pour useTranslation
jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        const translations: { [key: string]: string } = {
          "calculator.targetPrice": "Prix cible",
        };
        return translations[key] || key;
      },
    };
  },
}));

// Tests pour le composant TargetInput
describe("TargetInput", () => {
  // Test de base pour vérifier que le composant se rend correctement en mode pourcentage
  test("rend correctement en mode pourcentage", () => {
    const onChangeTextMock = jest.fn();
    const onToggleMock = jest.fn();

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

    render(
      <TargetInput
        value="10"
        onChangeText={onChangeTextMock}
        isPercentage={true}
        onToggle={onToggleMock}
      />,
      { wrapper }
    );

    // Vérifier que le label est affiché avec le symbole %
    expect(screen.getByText("Prix cible (%)")).toBeTruthy();
    // Vérifier que le bouton de bascule affiche le symbole $
    expect(screen.getByText("$")).toBeTruthy();
    // Vérifier que la valeur est bien définie
    expect(screen.getByDisplayValue("10")).toBeTruthy();
  });

  // Test pour vérifier que le composant se rend correctement en mode dollar
  test("rend correctement en mode dollar", () => {
    const onChangeTextMock = jest.fn();
    const onToggleMock = jest.fn();

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

    render(
      <TargetInput
        value="20"
        onChangeText={onChangeTextMock}
        isPercentage={false}
        onToggle={onToggleMock}
      />,
      { wrapper }
    );

    // Vérifier que le label est affiché avec le symbole $
    expect(screen.getByText("Prix cible ($)")).toBeTruthy();
    // Vérifier que le bouton de bascule affiche le symbole %
    expect(screen.getByText("%")).toBeTruthy();
  });

  // Test pour vérifier que le composant appelle onChangeText lorsque le texte change
  test("appelle la fonction onChangeText quand le texte change", () => {
    const onChangeTextMock = jest.fn();
    const onToggleMock = jest.fn();

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

    render(
      <TargetInput
        value=""
        onChangeText={onChangeTextMock}
        isPercentage={true}
        onToggle={onToggleMock}
      />,
      { wrapper }
    );

    // Simuler une saisie dans le champ de texte
    fireEvent.changeText(screen.getByDisplayValue(""), "15");

    // Vérifier que onChangeText a été appelé avec la bonne valeur
    expect(onChangeTextMock).toHaveBeenCalledWith("15");
  });

  // Test pour vérifier que le composant appelle onToggle quand on appuie sur le bouton
  test("appelle la fonction onToggle quand on appuie sur le bouton", () => {
    const onChangeTextMock = jest.fn();
    const onToggleMock = jest.fn();

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

    render(
      <TargetInput
        value="10"
        onChangeText={onChangeTextMock}
        isPercentage={true}
        onToggle={onToggleMock}
      />,
      { wrapper }
    );

    // Simuler une pression sur le bouton de bascule
    fireEvent.press(screen.getByText("$"));

    // Vérifier que onToggle a été appelé
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  // Test pour vérifier que le message d'erreur s'affiche correctement
  test("affiche un message d'erreur quand isError est true", () => {
    const onChangeTextMock = jest.fn();
    const onToggleMock = jest.fn();

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

    render(
      <TargetInput
        value=""
        onChangeText={onChangeTextMock}
        isPercentage={true}
        onToggle={onToggleMock}
        isError={true}
        errorMessage="Valeur invalide"
      />,
      { wrapper }
    );

    // Vérifier que le message d'erreur est affiché
    expect(screen.getByText("Valeur invalide")).toBeTruthy();
  });

  // Test pour vérifier que le composant se rend correctement avec le thème sombre
  test("rend correctement avec le thème sombre", () => {
    const onChangeTextMock = jest.fn();
    const onToggleMock = jest.fn();

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

    render(
      <TargetInput
        value="25"
        onChangeText={onChangeTextMock}
        isPercentage={false}
        onToggle={onToggleMock}
      />,
      { wrapper }
    );

    // Vérifier que le label est affiché
    expect(screen.getByText("Prix cible ($)")).toBeTruthy();
    // Vérifier que la valeur est bien définie
    expect(screen.getByDisplayValue("25")).toBeTruthy();
  });
});
