import "react-native-gesture-handler";
import React, { useState, useMemo, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { ThemeContext } from "./src/contexts/ThemeContext";
import { StatusBar } from "react-native";
import { LightTheme, DarkTheme } from "./src/theme/theme";
import "./src/translations/i18n";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  const themeContext = useMemo(() => {
    return {
      theme: isDark ? DarkTheme : LightTheme,
      isDark,
      toggleTheme: () => setIsDark(!isDark),
    };
  }, [isDark]);

  return (
    <ThemeContext.Provider value={themeContext}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={themeContext.theme.colors.background}
      />
      <NavigationContainer theme={isDark ? DarkTheme : LightTheme}>
        <DrawerNavigator />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
