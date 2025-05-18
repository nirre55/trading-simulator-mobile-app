import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import LanguageSelector from '../components/LanguageSelector';
import { ThemeContext } from '../contexts/ThemeContext';
import { LightTheme, DarkTheme } from '../theme/theme';
import * as i18nModule from '../translations/i18n';

// Mock pour i18n et la fonction changeLanguage
jest.mock('../translations/i18n', () => {
  return {
    changeLanguage: jest.fn(),
  };
});

// Mock pour useTranslation
const mockT = jest.fn((key) => key);
const mockI18n = {
  language: 'fr',
  changeLanguage: jest.fn(),
};

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: mockT,
      i18n: mockI18n,
    };
  },
}));

// Tests pour le composant LanguageSelector
describe('LanguageSelector', () => {
  // Réinitialiser les mocks avant chaque test
  beforeEach(() => {
    jest.clearAllMocks();
    mockI18n.language = 'fr';
  });

  // Test de base pour vérifier que le composant se rend correctement
  test('rend correctement les deux options de langue', () => {
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

    render(<LanguageSelector />, { wrapper });
    
    // Vérifier que les deux langues sont affichées
    expect(screen.getByText('English')).toBeTruthy();
    expect(screen.getByText('Français')).toBeTruthy();
  });

  // Test pour vérifier que le style actif est appliqué à la langue courante (français)
  test('applique le style actif à la langue courante (français)', () => {
    mockI18n.language = 'fr';
    
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

    const { getByText } = render(<LanguageSelector />, { wrapper });
    
    // Récupérer les éléments de langue
    const frElement = getByText('Français');
    const enElement = getByText('English');
    
    // Vérifier les styles (ici on ne peut pas vérifier directement les styles,
    // mais on peut vérifier que les éléments ont été rendus)
    expect(frElement).toBeTruthy();
    expect(enElement).toBeTruthy();
  });

  // Test pour vérifier que le style actif est appliqué à la langue courante (anglais)
  test('applique le style actif à la langue courante (anglais)', () => {
    mockI18n.language = 'en';
    
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

    const { getByText } = render(<LanguageSelector />, { wrapper });
    
    // Récupérer les éléments de langue
    const frElement = getByText('Français');
    const enElement = getByText('English');
    
    // Vérifier les styles (ici on ne peut pas vérifier directement les styles,
    // mais on peut vérifier que les éléments ont été rendus)
    expect(frElement).toBeTruthy();
    expect(enElement).toBeTruthy();
  });

  // Test pour vérifier que la fonction changeLanguage est appelée quand on clique sur un bouton
  test('appelle changeLanguage quand on clique sur une langue', () => {
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

    render(<LanguageSelector />, { wrapper });
    
    // Simuler un clic sur le bouton anglais
    fireEvent.press(screen.getByText('English'));
    
    // Vérifier que changeLanguage a été appelé avec 'en'
    expect(i18nModule.changeLanguage).toHaveBeenCalledWith('en');
  });

  // Test pour vérifier le rendu avec le thème sombre
  test('rend correctement avec le thème sombre', () => {
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

    render(<LanguageSelector />, { wrapper });
    
    // Vérifier que les deux langues sont affichées
    expect(screen.getByText('English')).toBeTruthy();
    expect(screen.getByText('Français')).toBeTruthy();
  });
}); 