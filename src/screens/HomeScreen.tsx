import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/styles";

export default function HomeScreen() {
  return (
    <View style={styles.centeredContainer}>
      <Text style={styles.title}>Bienvenue dans l'application de calcul !</Text>
    </View>
  );
}
