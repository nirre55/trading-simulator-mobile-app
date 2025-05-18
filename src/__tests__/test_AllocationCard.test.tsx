import React from 'react';
import { render, screen } from '@testing-library/react-native';
import AllocationCard from '../components/cards/AllocationCard';
import { ThemeContext } from '../contexts/ThemeContext';
import { LightTheme, DarkTheme } from '../theme/theme';

// Mock pour le module de traduction
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      const translations: { [key: string]: string } = {
        'cards.allocation': 'Allocation',
        'cards.totalBalance': 'Solde total',
        'cards.tradesCount': 'Nombre de trades',
        'cards.amountPerTrade': 'Montant par trade',
        'cards.recommendedLeverage': 'Levier recommandé',
        'cards.leverageInfo': `Réduit le risque de ${options?.reduction}%`
      };
      return translations[key] || key;
    },
  }),
}));

// Mock pour Ionicons
jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    Ionicons: (props: any) => {
      return <View testID={`icon-${props.name}`} {...props} />;
    }
  };
});

// Mock pour la fonction roundToTwoDecimals
jest.mock('../utils/formatters', () => ({
  roundToTwoDecimals: (value: number) => Math.round(value * 100) / 100,
}));

describe('AllocationCard', () => {
  // Données de test
  const defaultProps = {
    balance: 1000,
    trades: 5,
    allocationPerTrade: 200,
    leverage: 10
  };

  // Test de base pour vérifier que le composant se rend sans erreur
  test('rend correctement avec le thème clair', () => {
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

    render(<AllocationCard {...defaultProps} />, { wrapper });

    // Vérifier les éléments principaux
    expect(screen.getByText('Allocation')).toBeTruthy();
    expect(screen.getByText('Solde total')).toBeTruthy();
    expect(screen.getByText('1000.00 $')).toBeTruthy();
    expect(screen.getByText('Nombre de trades')).toBeTruthy();
    expect(screen.getByText('5')).toBeTruthy();
    expect(screen.getByText('Montant par trade')).toBeTruthy();
    expect(screen.getByText('200.00 $')).toBeTruthy();
    expect(screen.getByText('Levier recommandé')).toBeTruthy();
    expect(screen.getByText('10x')).toBeTruthy();
    expect(screen.getByText('Réduit le risque de 10%')).toBeTruthy();
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

    render(<AllocationCard {...defaultProps} />, { wrapper });

    // Vérifier que les éléments principaux sont présents
    expect(screen.getByText('Allocation')).toBeTruthy();
    expect(screen.getByText('Solde total')).toBeTruthy();
  });

  // Test pour vérifier la présence de l'icône
  test('affiche l\'icône wallet correctement', () => {
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

    render(<AllocationCard {...defaultProps} />, { wrapper });

    // Vérifier que l'icône existe
    expect(screen.getByTestId('icon-wallet-outline')).toBeTruthy();
  });

  // Test pour vérifier le formatage des valeurs
  test('formate correctement les valeurs numériques', () => {
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

    const customProps = {
      balance: 1234.567,
      trades: 10,
      allocationPerTrade: 123.456,
      leverage: 5
    };

    render(<AllocationCard {...customProps} />, { wrapper });

    // Vérifier le formatage des valeurs numériques
    expect(screen.getByText('1234.57 $')).toBeTruthy(); // Arrondi à 2 décimales
    expect(screen.getByText('10')).toBeTruthy();
    expect(screen.getByText('123.46 $')).toBeTruthy(); // Arrondi à 2 décimales
    expect(screen.getByText('5x')).toBeTruthy();
    // Pour le texte du levier, 100/5 = 20
    expect(screen.getByText('Réduit le risque de 20%')).toBeTruthy();
  });

  // Test pour vérifier que les valeurs nulles ou zéro sont gérées correctement
  test('gère correctement les valeurs nulles ou zéro', () => {
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

    const zeroProps = {
      balance: 0,
      trades: 0,
      allocationPerTrade: 0,
      leverage: 1
    };

    render(<AllocationCard {...zeroProps} />, { wrapper });

    // Vérifier les valeurs zéro
    const zeroAmountElements = screen.getAllByText('0.00 $');
    expect(zeroAmountElements.length).toBe(2); // On attend deux éléments avec cette valeur
    expect(screen.getByText('0')).toBeTruthy();
    expect(screen.getByText('1x')).toBeTruthy();
    // Pour le texte du levier, 100/1 = 100
    expect(screen.getByText('Réduit le risque de 100%')).toBeTruthy();
  });
}); 