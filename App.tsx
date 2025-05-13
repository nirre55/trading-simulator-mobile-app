import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { ThemeContext } from "./src/theme/ThemeContext";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeContext.Provider
      value={{ isDark, toggleTheme: () => setIsDark(!isDark) }}
    >
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <DrawerNavigator />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
