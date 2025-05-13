import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../theme/ThemeContext";

export default function ThemeToggleButton() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity style={styles.button} onPress={toggleTheme}>
      <Text style={styles.text}>
        {isDark ? "🌞" : "🌙"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    zIndex: 1000,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
