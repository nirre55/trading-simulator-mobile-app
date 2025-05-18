import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Button from '../components/Button';
import { ThemeContext } from '../contexts/ThemeContext';
import { LightTheme, DarkTheme } from '../theme/theme';

// Tests pour le composant Button
describe('Button', () => {
  // Test de base pour vérifier que le composant se rend correctement
  test('rend correctement avec le titre fourni', () => {
    const onPressMock = jest.fn();
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider
        value={{
          theme: LightTheme,
          isDark: false,
          toggleTheme: jest.fn()
        }}
      >
        {children}
      </ThemeContext.Provider>
    );

    render(<Button title="Tester" onPress={onPressMock} />, { wrapper });
    
    // Vérifier que le texte du bouton est affiché
    expect(screen.getByText('Tester')).toBeTruthy();
  });

  // Test pour vérifier que le bouton appelle onPress quand il est pressé
  test('appelle la fonction onPress quand il est pressé', () => {
    const onPressMock = jest.fn();
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider
        value={{
          theme: LightTheme,
          isDark: false,
          toggleTheme: jest.fn()
        }}
      >
        {children}
      </ThemeContext.Provider>
    );

    render(<Button title="Cliquez-moi" onPress={onPressMock} />, { wrapper });
    
    // Simuler un clic sur le bouton
    fireEvent.press(screen.getByText('Cliquez-moi'));
    
    // Vérifier que onPress a été appelé
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  // Test pour vérifier le rendu avec le thème sombre
  test('rend correctement avec le thème sombre', () => {
    const onPressMock = jest.fn();
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider
        value={{
          theme: DarkTheme,
          isDark: true,
          toggleTheme: jest.fn()
        }}
      >
        {children}
      </ThemeContext.Provider>
    );

    render(<Button title="Mode sombre" onPress={onPressMock} />, { wrapper });
    
    // Vérifier que le texte du bouton est affiché
    expect(screen.getByText('Mode sombre')).toBeTruthy();
  });

  // Test pour vérifier les multiples pressions sur le bouton
  test('gère correctement les pressions multiples', () => {
    const onPressMock = jest.fn();
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider
        value={{
          theme: LightTheme,
          isDark: false,
          toggleTheme: jest.fn()
        }}
      >
        {children}
      </ThemeContext.Provider>
    );

    render(<Button title="Multi-press" onPress={onPressMock} />, { wrapper });
    
    // Simuler plusieurs clics sur le bouton
    const button = screen.getByText('Multi-press');
    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);
    
    // Vérifier que onPress a été appelé exactement 3 fois
    expect(onPressMock).toHaveBeenCalledTimes(3);
  });

  // Test pour vérifier le comportement avec un long titre
  test('rend correctement avec un titre long', () => {
    const onPressMock = jest.fn();
    const longTitle = 'Ceci est un très long titre pour tester comment le bouton gère les titres longs dans l\'interface utilisateur';
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider
        value={{
          theme: LightTheme,
          isDark: false,
          toggleTheme: jest.fn()
        }}
      >
        {children}
      </ThemeContext.Provider>
    );

    render(<Button title={longTitle} onPress={onPressMock} />, { wrapper });
    
    // Vérifier que le texte long est correctement affiché
    expect(screen.getByText(longTitle)).toBeTruthy();
  });
}); 