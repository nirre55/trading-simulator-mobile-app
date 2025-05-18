import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ResultCard from '../components/cards/ResultCard';
import { ThemeContext } from '../contexts/ThemeContext';
import { LightTheme, DarkTheme } from '../theme/theme';

// Mock pour FontAwesome
jest.mock('@expo/vector-icons', () => ({
  FontAwesome: 'FontAwesome',
}));

// Mock pour useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        const translations: { [key: string]: string } = {
          'cards.minResult': 'Minimum',
          'cards.maxResult': 'Maximum',
          'cards.iterations': 'itérations'
        };
        return translations[key] || key;
      },
    };
  },
}));

// Tests pour le composant ResultCard
describe('ResultCard', () => {
  // Test pour vérifier le type 'min'
  test('rend correctement avec le type min', () => {
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

    render(
      <ResultCard 
        type="min"
        iterations={6}
        price={50.75}
      />, 
      { wrapper }
    );
    
    // Vérifier que le titre est affiché
    expect(screen.getByText('Minimum')).toBeTruthy();
    // Vérifier que le nombre d'itérations est affiché
    expect(screen.getByText('6')).toBeTruthy();
    // Vérifier que le texte "itérations" est affiché
    expect(screen.getByText('itérations')).toBeTruthy();
    // Vérifier que le prix est affiché avec deux décimales
    expect(screen.getByText('50.75 $')).toBeTruthy();
  });

  // Test pour vérifier le type 'max'
  test('rend correctement avec le type max', () => {
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

    render(
      <ResultCard 
        type="max"
        iterations={7}
        price={45.25}
      />, 
      { wrapper }
    );
    
    // Vérifier que le titre est affiché
    expect(screen.getByText('Maximum')).toBeTruthy();
    // Vérifier que le nombre d'itérations est affiché
    expect(screen.getByText('7')).toBeTruthy();
    // Vérifier que le texte "itérations" est affiché
    expect(screen.getByText('itérations')).toBeTruthy();
    // Vérifier que le prix est affiché avec deux décimales
    expect(screen.getByText('45.25 $')).toBeTruthy();
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

    render(
      <ResultCard 
        type="min"
        iterations={8}
        price={60.50}
      />, 
      { wrapper }
    );
    
    // Vérifier que le titre est affiché
    expect(screen.getByText('Minimum')).toBeTruthy();
    // Vérifier que le nombre d'itérations est affiché
    expect(screen.getByText('8')).toBeTruthy();
    // Vérifier que le prix est affiché avec deux décimales
    expect(screen.getByText('60.50 $')).toBeTruthy();
  });

  // Test pour vérifier l'arrondi du prix
  test('arrondit correctement le prix à deux décimales', () => {
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

    render(
      <ResultCard 
        type="max"
        iterations={10}
        price={75.555}
      />, 
      { wrapper }
    );
    
    // Vérifier que le prix est arrondi à deux décimales
    expect(screen.getByText('75.56 $')).toBeTruthy();
  });

  // Test pour vérifier le comportement avec des valeurs entières
  test('affiche correctement le prix avec des valeurs entières', () => {
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

    render(
      <ResultCard 
        type="min"
        iterations={5}
        price={100}
      />, 
      { wrapper }
    );
    
    // Vérifier que le prix est affiché avec deux décimales même pour une valeur entière
    expect(screen.getByText('100.00 $')).toBeTruthy();
  });
}); 