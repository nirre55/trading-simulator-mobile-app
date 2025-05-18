import React from 'react';
import { render, screen } from '@testing-library/react-native';
import SummaryCard from '../components/cards/SummaryCard';
import { ThemeContext } from '../contexts/ThemeContext';
import { LightTheme, DarkTheme } from '../theme/theme';

// Mock pour MaterialIcons
jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'MaterialIcons',
}));

// Mock pour useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string, options?: any) => {
        const translations: { [key: string]: string } = {
          'cards.result': 'Résultat',
          'cards.theoreticalIterations': 'Itérations théoriques'
        };
        
        if (key === 'cards.iterationRange' && options) {
          return `Intervalle: ${options.min} - ${options.max} pour atteindre ${options.price}`;
        }
        
        return translations[key] || key;
      },
    };
  },
}));

// Tests pour le composant SummaryCard
describe('SummaryCard', () => {
  // Test de base pour vérifier que le composant se rend correctement
  test('rend correctement avec les valeurs fournies', () => {
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
      <SummaryCard 
        iterations={10.5}
        floor={10}
        ceil={11}
        targetPrice={100.42}
      />, 
      { wrapper }
    );
    
    // Vérifier que le titre est affiché
    expect(screen.getByText('Résultat')).toBeTruthy();
    // Vérifier que les itérations sont affichées
    expect(screen.getByText('Itérations théoriques: 10.50')).toBeTruthy();
    // Vérifier que l'intervalle est affiché
    expect(screen.getByText('Intervalle: 10 - 11 pour atteindre 100.42')).toBeTruthy();
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
      <SummaryCard 
        iterations={15.75}
        floor={15}
        ceil={16}
        targetPrice={200.55}
      />, 
      { wrapper }
    );
    
    // Vérifier que le titre est affiché
    expect(screen.getByText('Résultat')).toBeTruthy();
    // Vérifier que les itérations sont affichées
    expect(screen.getByText('Itérations théoriques: 15.75')).toBeTruthy();
    // Vérifier que l'intervalle est affiché
    expect(screen.getByText('Intervalle: 15 - 16 pour atteindre 200.55')).toBeTruthy();
  });

  // Test pour vérifier le formattage des décimales
  test('formate correctement les nombres décimaux', () => {
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
      <SummaryCard 
        iterations={5.1}
        floor={5}
        ceil={6}
        targetPrice={50}
      />, 
      { wrapper }
    );
    
    // Vérifier que les itérations sont formatées avec 2 décimales
    expect(screen.getByText('Itérations théoriques: 5.10')).toBeTruthy();
    // Vérifier que le prix cible est formaté avec 2 décimales
    expect(screen.getByText('Intervalle: 5 - 6 pour atteindre 50.00')).toBeTruthy();
  });

  // Test pour vérifier le comportement avec des valeurs limites
  test('gère correctement les valeurs limites', () => {
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
      <SummaryCard 
        iterations={0}
        floor={0}
        ceil={0}
        targetPrice={0}
      />, 
      { wrapper }
    );
    
    // Vérifier que les valeurs zéro sont correctement affichées
    expect(screen.getByText('Itérations théoriques: 0.00')).toBeTruthy();
    expect(screen.getByText('Intervalle: 0 - 0 pour atteindre 0.00')).toBeTruthy();
  });

  // Test pour vérifier le comportement avec des valeurs très grandes
  test('gère correctement les grandes valeurs', () => {
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
      <SummaryCard 
        iterations={1000000.123}
        floor={1000000}
        ceil={1000001}
        targetPrice={9999999.99}
      />, 
      { wrapper }
    );
    
    // Vérifier que les grandes valeurs sont correctement affichées
    expect(screen.getByText('Itérations théoriques: 1000000.12')).toBeTruthy();
    expect(screen.getByText('Intervalle: 1000000 - 1000001 pour atteindre 9999999.99')).toBeTruthy();
  });
}); 