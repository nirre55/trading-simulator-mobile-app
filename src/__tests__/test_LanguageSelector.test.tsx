import React from "react";
import { render, screen, fireEvent, act, within } from "@testing-library/react-native";
import LanguageSelector from "../components/LanguageSelector";
import { ThemeContext } from "../contexts/ThemeContext";
import { LightTheme, DarkTheme } from "../theme/theme";
// Gardez une référence au module réel si nécessaire, mais nous allons le mocker entièrement.
// import * as i18nModule from '../translations/i18n';
import { Text } from "react-native"; // Pour le mock d'Ionicons

// Mock Ionicons pour éviter les problèmes de rendu asynchrone des polices dans les tests
jest.mock("@expo/vector-icons", () => {
  const RN = jest.requireActual("react-native");
  return {
    Ionicons: (props: any) => <RN.Text>Icon:{props.name || "icon"}</RN.Text>,
  };
});

// Variable globale pour contrôler la langue mockée dans les tests
let currentMockLanguage = "fr";

// Mock pour la fonction changeLanguage appelée par le composant
const mockSystemChangeLanguage = jest.fn();

jest.mock("../translations/i18n", () => ({
  changeLanguage: (lng: string) => {
    mockSystemChangeLanguage(lng);
    currentMockLanguage = lng;
  },
}));

// Mock pour useTranslation
const mockT = jest.fn((key) => key);

const mockI18nInstance = {
  get language() {
    return currentMockLanguage;
  },
  changeLanguage: jest.fn((lng: string) => {
    currentMockLanguage = lng;
  }),
};

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mockT,
    i18n: mockI18nInstance,
  }),
}));

// Helper pour rendre avec le contexte de thème
const renderWithProviders = (ui: React.ReactElement, isDarkTheme = false) => {
  const themeToUse = isDarkTheme ? DarkTheme : LightTheme;
  return render(
    <ThemeContext.Provider
      value={{
        theme: themeToUse,
        isDark: isDarkTheme,
        toggleTheme: jest.fn(),
      }}
    >
      {ui}
    </ThemeContext.Provider>
  );
};

describe("LanguageSelector", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    currentMockLanguage = "fr";
  });

  test("affiche la langue actuelle et permet d'ouvrir le modal avec les options", async () => {
    renderWithProviders(<LanguageSelector />);

    const button = screen.getByTestId("language-selector-button");
    expect(within(button).getByText("Français")).toBeTruthy();

    expect(screen.queryByTestId("language-option-en")).toBeNull();
    expect(screen.queryByTestId("language-option-fr")).toBeNull();

    await act(async () => {
      fireEvent.press(button);
    });

    const optionEn = await screen.findByTestId("language-option-en");
    const optionFr = await screen.findByTestId("language-option-fr");
    expect(optionEn).toBeTruthy();
    expect(optionFr).toBeTruthy();
    expect(within(optionEn).getByText("English")).toBeTruthy();
    expect(within(optionFr).getByText("Français")).toBeTruthy();
  });

  test("change la langue en cliquant sur une option dans le modal et ferme le modal", async () => {
    renderWithProviders(<LanguageSelector />);

    const initialButton = screen.getByTestId("language-selector-button");
    await act(async () => {
      fireEvent.press(initialButton);
    });

    const englishOptionInModal = await screen.findByTestId("language-option-en");

    await act(async () => {
      fireEvent.press(englishOptionInModal);
    });

    expect(mockSystemChangeLanguage).toHaveBeenCalledWith("en");

    const updatedButton = await screen.findByTestId("language-selector-button");
    expect(within(updatedButton).getByText("English")).toBeTruthy();

    expect(screen.queryByTestId("language-option-en")).toBeNull();
    expect(screen.queryByTestId("language-option-fr")).toBeNull();
  });

  test("applique le style actif à la langue sélectionnée dans le modal", async () => {
    renderWithProviders(<LanguageSelector />);

    const buttonToOpenModal = screen.getByTestId("language-selector-button");
    await act(async () => {
      fireEvent.press(buttonToOpenModal);
    });

    const frenchOptionInModal = await screen.findByTestId("language-option-fr");
    expect(frenchOptionInModal.props.children[0].props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontWeight: "bold",
          color: LightTheme.colors.primary,
        }),
      ])
    );

    const englishOptionInModal = await screen.findByTestId("language-option-en");
    const englishStyle = englishOptionInModal.props.children[0].props.style.find(
      (s: any) => s && s.fontWeight === "bold"
    );
    expect(englishStyle).toBeUndefined();

    await act(async () => {
      fireEvent.press(englishOptionInModal);
    });

    const buttonToReopenModal = await screen.findByTestId("language-selector-button");
    await act(async () => {
      fireEvent.press(buttonToReopenModal);
    });

    const activeEnglishOption = await screen.findByTestId("language-option-en");
    expect(activeEnglishOption.props.children[0].props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontWeight: "bold",
          color: LightTheme.colors.primary,
        }),
      ])
    );

    const inactiveFrenchOption = await screen.findByTestId("language-option-fr");
    const frenchStyle = inactiveFrenchOption.props.children[0].props.style.find(
      (s: any) => s && s.fontWeight === "bold"
    );
    expect(frenchStyle).toBeUndefined();
  });

  test("rend correctement avec le thème sombre et le modal fonctionne", async () => {
    currentMockLanguage = "en";
    renderWithProviders(<LanguageSelector />, true);

    const buttonDarkTheme = screen.getByTestId("language-selector-button");
    expect(within(buttonDarkTheme).getByText("English")).toBeTruthy();

    await act(async () => {
      fireEvent.press(buttonDarkTheme);
    });

    const englishModalOption = await screen.findByTestId("language-option-en");
    const frenchModalOption = await screen.findByTestId("language-option-fr");
    expect(englishModalOption).toBeTruthy();
    expect(frenchModalOption).toBeTruthy();

    expect(englishModalOption.props.children[0].props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontWeight: "bold",
          color: DarkTheme.colors.primary,
        }),
      ])
    );

    await act(async () => {
      fireEvent.press(frenchModalOption);
    });

    expect(mockSystemChangeLanguage).toHaveBeenCalledWith("fr");
    const finalButtonDarkTheme = await screen.findByTestId("language-selector-button");
    expect(within(finalButtonDarkTheme).getByText("Français")).toBeTruthy();
    expect(screen.queryByTestId("language-option-en")).toBeNull();
  });
});
