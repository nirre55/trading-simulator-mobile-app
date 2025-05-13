import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, Theme } from '@react-navigation/native';

export type ThemeType = Theme & {
  colors: Theme['colors'] & {
    secondaryText: string;
    buttonBackground: string;
    buttonText: string;
    inputBackground: string;
    inputBorder: string;
    shadow: string;
  };
};

export const LightTheme: ThemeType = {
  ...NavigationDefaultTheme,
  dark: false,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: '#007AFF',
    background: '#FFFFFF',
    card: '#F2F2F7',
    text: '#1C1C1E',
    border: '#C6C6C8',
    notification: '#FF3B30',
    secondaryText: '#8E8E93',
    buttonBackground: '#007AFF',
    buttonText: '#FFFFFF',
    inputBackground: '#FFFFFF',
    inputBorder: '#C6C6C8',
    shadow: 'rgba(0, 0, 0, 0.1)',
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
    secondaryText: '#8E8E93',
    buttonBackground: '#0A84FF',
    buttonText: '#FFFFFF',
    inputBackground: '#2C2C2E',
    inputBorder: '#38383A',
    shadow: 'rgba(0, 0, 0, 0.5)',
  },
}; 