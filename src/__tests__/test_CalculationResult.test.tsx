import React from 'react';
import { render } from '@testing-library/react-native';
import CalculationResult from '../components/CalculationResult';
import { ThemeContext } from '../contexts/ThemeContext';
import { LightTheme } from '../theme/theme';

// Mocks simples pour les composants
jest.mock('../components/cards/ErrorCard', () => 'ErrorCard');
jest.mock('../components/cards/SummaryCard', () => 'SummaryCard');
jest.mock('../components/cards/ResultCard', () => 'ResultCard');
jest.mock('../components/cards/AllocationCard', () => 'AllocationCard');
jest.mock('../components/tables/IterationsTable', () => 'IterationsTable');

// Mock simple pour le module de traduction
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('CalculationResult', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(
      <ThemeContext.Provider
        value={{
          theme: LightTheme,
          isDark: false,
          toggleTheme: jest.fn()
        }}
      >
        {ui}
      </ThemeContext.Provider>
    );
  };

  // Tests pour les différents types d'erreur
  test('ne plante pas avec erreur préfixée calculator.', () => {
    const errorResult = {
      success: false,
      error: 'calculator.error.invalidInput'
    };

    expect(() => renderWithTheme(<CalculationResult result={errorResult} />)).not.toThrow();
  });

  test('ne plante pas avec erreur préfixée results.', () => {
    const errorResult = {
      success: false,
      error: 'results.custom_error'
    };

    expect(() => renderWithTheme(<CalculationResult result={errorResult} />)).not.toThrow();
  });

  test('ne plante pas avec erreur sans préfixe reconnu', () => {
    const errorResult = {
      success: false,
      error: 'Erreur inconnue sans préfixe'
    };

    expect(() => renderWithTheme(<CalculationResult result={errorResult} />)).not.toThrow();
  });

  test('ne plante pas avec erreur undefined', () => {
    const errorResult = {
      success: false,
      error: undefined
    };

    expect(() => renderWithTheme(<CalculationResult result={errorResult} />)).not.toThrow();
  });

  // Cas de base où le rendu ne plante pas
  test('ne plante pas avec données minimales', () => {
    const emptyResult = {
      success: true
    };

    expect(() => renderWithTheme(<CalculationResult result={emptyResult} />)).not.toThrow();
  });

  // Cas avec toutes les données
  test('ne plante pas avec données complètes', () => {
    const completeData = {
      success: true,
      iterations: 10,
      floor: 5,
      ceil: 15,
      targetPrice: 100,
      priceFloor: 90,
      priceCeil: 110,
      balance: 1000,
      allocationPerTrade: 66.67,
      leverage: 10,
      iterationDetails: [
        { iteration: 1, price: 95, profit: -5, entryPrice: 100, liquidationPrice: 80 },
        { iteration: 2, price: 100, profit: 0, entryPrice: 100, liquidationPrice: 80 }
      ]
    };

    expect(() => renderWithTheme(<CalculationResult result={completeData} />)).not.toThrow();
  });
}); 