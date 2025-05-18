import { roundToTwoDecimals } from '../utils/formatters';

// Tests pour le formatage des nombres
describe('roundToTwoDecimals', () => {
  // Test de base pour des nombres entiers
  test('arrondit correctement un nombre entier', () => {
    expect(roundToTwoDecimals(5)).toBe('5.00');
    expect(roundToTwoDecimals(0)).toBe('0.00');
    expect(roundToTwoDecimals(1000)).toBe('1000.00');
  });

  // Test pour des nombres avec une décimale
  test('arrondit correctement un nombre avec une décimale', () => {
    expect(roundToTwoDecimals(5.5)).toBe('5.50');
    expect(roundToTwoDecimals(0.1)).toBe('0.10');
    expect(roundToTwoDecimals(1000.9)).toBe('1000.90');
  });

  // Test pour des nombres avec deux décimales
  test('conserve deux décimales pour un nombre avec deux décimales', () => {
    expect(roundToTwoDecimals(5.55)).toBe('5.55');
    expect(roundToTwoDecimals(0.12)).toBe('0.12');
    expect(roundToTwoDecimals(1000.99)).toBe('1000.99');
  });

  // Test pour des nombres avec plus de deux décimales (arrondi)
  test('arrondit correctement un nombre avec plus de deux décimales', () => {
    expect(roundToTwoDecimals(5.555)).toBe('5.56');
    expect(roundToTwoDecimals(0.124)).toBe('0.12');
    expect(roundToTwoDecimals(0.125)).toBe('0.13');
    expect(roundToTwoDecimals(1000.999)).toBe('1001.00');
  });

  // Test pour des nombres négatifs
  test('gère correctement les nombres négatifs', () => {
    expect(roundToTwoDecimals(-5)).toBe('-5.00');
    expect(roundToTwoDecimals(-5.5)).toBe('-5.50');
    expect(roundToTwoDecimals(-5.55)).toBe('-5.55');
    expect(roundToTwoDecimals(-5.555)).toBe('-5.55');
  });

  // Test pour des valeurs extrêmes
  test('gère correctement les valeurs extrêmes', () => {
    expect(roundToTwoDecimals(Number.MAX_SAFE_INTEGER)).toMatch(/^\d+\.00$/);
    expect(roundToTwoDecimals(Number.MIN_SAFE_INTEGER)).toMatch(/^-\d+\.00$/);
  });
}); 