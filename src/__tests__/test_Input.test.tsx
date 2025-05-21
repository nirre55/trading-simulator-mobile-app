import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import Input from "../components/Input";
import { ThemeContext } from "../contexts/ThemeContext";
import { LightTheme, DarkTheme } from "../theme/theme";

// Tests pour le composant Input
describe("Input", () => {
  // Test de base pour vérifier que le composant se rend correctement
  test("rend correctement avec le label fourni", () => {
    const onChangeTextMock = jest.fn();

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

    render(<Input label="Montant" value="" onChangeText={onChangeTextMock} />, {
      wrapper,
    });

    // Vérifier que le label est affiché
    expect(screen.getByText("Montant")).toBeTruthy();
  });

  // Test pour vérifier que le composant appelle onChangeText lorsque le texte change
  test("appelle la fonction onChangeText quand le texte change", () => {
    const onChangeTextMock = jest.fn();

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

    render(<Input label="Montant" value="" onChangeText={onChangeTextMock} />, {
      wrapper,
    });

    // Simuler une saisie dans le champ de texte
    fireEvent.changeText(screen.getByTestId("input"), "100");

    // Vérifier que onChangeText a été appelé avec la bonne valeur
    expect(onChangeTextMock).toHaveBeenCalledWith("100");
  });

  // Test pour vérifier le rendu avec le thème sombre
  test("rend correctement avec le thème sombre", () => {
    const onChangeTextMock = jest.fn();

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
      <Input label="Montant" value="200" onChangeText={onChangeTextMock} />,
      { wrapper },
    );

    // Vérifier que le label est affiché
    expect(screen.getByText("Montant")).toBeTruthy();
    // Vérifier que la valeur est bien définie
    expect(screen.getByDisplayValue("200")).toBeTruthy();
  });

  // Test pour vérifier le message d'erreur
  test("affiche un message d'erreur quand isError est true", () => {
    const onChangeTextMock = jest.fn();

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
      <Input
        label="Montant"
        value=""
        onChangeText={onChangeTextMock}
        isError={true}
        errorMessage="Champ obligatoire"
      />,
      { wrapper },
    );

    // Vérifier que le message d'erreur est affiché
    expect(screen.getByText("Champ obligatoire")).toBeTruthy();
  });

  // Test pour vérifier que le message d'erreur n'est pas affiché quand isError est false
  test("ne pas afficher de message d'erreur quand isError est false", () => {
    const onChangeTextMock = jest.fn();

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
      <Input
        label="Montant"
        value=""
        onChangeText={onChangeTextMock}
        isError={false}
        errorMessage="Champ obligatoire"
      />,
      { wrapper },
    );

    // Vérifier que le message d'erreur n'est pas affiché
    expect(screen.queryByText("Champ obligatoire")).toBeNull();
  });

  // Test pour vérifier les propriétés supplémentaires de TextInput
  test("passe correctement les propriétés supplémentaires au TextInput", () => {
    const onChangeTextMock = jest.fn();

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
      <Input
        label="Montant"
        value=""
        onChangeText={onChangeTextMock}
        placeholder="Entrez un montant"
        keyboardType="numeric"
        testID="input"
      />,
      { wrapper },
    );

    // Vérifier que les propriétés supplémentaires sont bien passées
    const input = screen.getByTestId("input");
    expect(input.props.placeholder).toBe("Entrez un montant");
    expect(input.props.keyboardType).toBe("numeric");
  });
});
