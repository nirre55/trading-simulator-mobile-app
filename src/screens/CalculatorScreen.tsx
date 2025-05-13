import React, { useState } from "react";
import { View, Text } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { calculateIterations } from "../utils/calculator";
import { styles } from "../styles/styles";

export default function CalculatorScreen() {
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
