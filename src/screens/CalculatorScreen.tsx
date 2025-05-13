import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { calculateIterations } from "../utils/calculator";
import { getThemedStyles } from "../styles/styles";
import { ThemeContext } from "../theme/ThemeContext";

export default function CalculatorScreen() {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  
  const [initial, setInitial] = useState("");
  const [final, setFinal] = useState("");
  const [reduction, setReduction] = useState("");
  const [result, setResult] = useState("");

  const handleCalculate = () => {
    const output = calculateIterations(
      parseFloat(initial),
      parseFloat(final),
      parseFloat(reduction)
    );
    setResult(output);
  };

  return (
    <View style={styles.container}>
      <Input
        label="Prix initial ($)"
        value={initial}
        onChangeText={setInitial}
      />
      <Input label="Prix final ($)" value={final} onChangeText={setFinal} />
      <Input
        label="Réduction par itération (%)"
        value={reduction}
        onChangeText={setReduction}
      />
      <Button title="Calculer" onPress={handleCalculate} />
      {result ? <Text style={styles.result}>{result}</Text> : null}
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    position: "relative",
  },
  contentContainer: {
    paddingTop: 10,
  }
});
