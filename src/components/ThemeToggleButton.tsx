import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../theme/ThemeContext";

export default function ThemeToggleButton() {
  const { isDark, toggleTheme, theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor: theme.colors.buttonBackground }
      ]} 
      onPress={toggleTheme}
    >
      <Text style={[styles.text, { color: theme.colors.buttonText }]}>
        {isDark ? "🌞" : "🌙"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 20,
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
