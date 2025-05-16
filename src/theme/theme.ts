import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, Theme } from '@react-navigation/native';

export type ThemeType = Theme & {
  colors: Theme['colors'] & {
    secondaryText: string;
    buttonBackground: string;
    buttonText: string;
    inputBackground: string;
    inputBorder: string;
    shadow: string;
    langButtonBackground: string;
    langButtonActiveBorder: string;
    errorText: string;
    errorIcon: string;
    errorCardBackground: string;
    errorCardBorder: string;
    profitColor: string;
    lossColor: string;
    errorBorder: string;
  };
};

export const LightTheme: ThemeType = {
  ...NavigationDefaultTheme,
  dark: false,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: '#007AFF',
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#000000',
    border: '#DDDDDD',
    notification: '#FF3B30',
    secondaryText: '#555555',
    buttonBackground: '#007AFF',
    buttonText: '#FFFFFF',
    inputBackground: '#FFFFFF',
    inputBorder: '#CCCCCC',
    shadow: '#000000',
    langButtonBackground: '#f0f0f0',
    langButtonActiveBorder: '#3498db',
    errorText: '#D32F2F',
    errorIcon: '#D32F2F',
    errorCardBackground: 'rgba(211, 47, 47, 0.1)',
    errorCardBorder: '#D32F2F',
    profitColor: '#2E7D32',
    lossColor: '#C62828',
    errorBorder: '#DC3545',
  },
};

export const DarkTheme: ThemeType = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: '#0A84FF',
    background: '#1C1C1E',
    card: '#2C2C2E',
    text: '#FFFFFF',
    border: '#38383A',
    notification: '#FF453A',
    secondaryText: '#AAAAAA',
    buttonBackground: '#0A84FF',
    buttonText: '#FFFFFF',
    inputBackground: '#333333',
    inputBorder: '#555555',
    shadow: '#000000',
    langButtonBackground: '#333333',
    langButtonActiveBorder: '#3498db',
    errorText: '#EF5350',
    errorIcon: '#EF5350',
    errorCardBackground: 'rgba(239, 83, 80, 0.15)',
    errorCardBorder: '#EF5350',
    profitColor: '#66BB6A',
    lossColor: '#E57373',
    errorBorder: '#CF6679',
  },
}; 