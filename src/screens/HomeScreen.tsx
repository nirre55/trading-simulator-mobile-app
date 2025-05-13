import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getThemedStyles } from "../styles/styles";
import { ThemeContext } from "../theme/ThemeContext";

export default function HomeScreen() {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);

  return (
    <View style={styles.centeredContainer}>
      <Text style={styles.title}>Bienvenue dans l'application de calcul !</Text>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    position: "relative",
  }
});
