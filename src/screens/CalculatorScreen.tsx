import React, { useState, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import CalculationResultCard from "../components/CalculationResult";
import { calculateIterations, CalculationResult } from "../utils/calculator";
import { getThemedStyles } from "../styles/styles";
import { ThemeContext } from "../theme/ThemeContext";

export default function CalculatorScreen() {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  
  const [initial, setInitial] = useState("");
  const [balance, setBalance] = useState("");
  const [final, setFinal] = useState("");
  const [reduction, setReduction] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    const output = calculateIterations(
      parseFloat(initial),
      parseFloat(final),
      parseFloat(reduction),
      balance ? parseFloat(balance) : undefined
    );
    setResult(output);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]} 
      contentContainerStyle={localStyles.scrollContent}
    >
      <Input
        label="Balance ($)"
        value={balance}
        onChangeText={setBalance}
      />
      <Input
        label="Prix initial ($)"
        value={initial}
        onChangeText={setInitial}
      />
      <Input 
        label="Prix final ($)" 
        value={final} 
        onChangeText={setFinal} 
      />
      <Input
        label="Réduction par itération (%)"
        value={reduction}
        onChangeText={setReduction}
      />
      <Button title="Calculer" onPress={handleCalculate} />
      {result && <CalculationResultCard result={result} />}
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 30,
  }
});
