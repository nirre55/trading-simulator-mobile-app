import React, { useState, useContext } from "react";
import { ScrollView, View, Text } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import TargetInput from "../components/TargetInput";
import CalculationResultCard from "../components/CalculationResult";
import { calculateIterations, CalculationResult } from "../utils/calculator";
import { getThemedStyles } from "../styles/styles";
import { ThemeContext } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

// Type pour l'état des erreurs des champs
interface FieldErrors {
  initial?: string;
  final?: string;
  reduction?: string;
  balance?: string;
  target?: string;
}

export default function CalculatorScreen() {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  const { t } = useTranslation();

  const [initial, setInitial] = useState("");
  const [balance, setBalance] = useState("");
  const [final, setFinal] = useState("");
  const [reduction, setReduction] = useState("");
  const [target, setTarget] = useState("");
  const [targetIsPercentage, setTargetIsPercentage] = useState(true);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({}); // État pour les erreurs de champ

  const handleCalculate = () => {
    const newFieldErrors: FieldErrors = {};
    let hasError = false;

    const initialVal = parseFloat(initial);
    const finalVal = parseFloat(final);
    const reductionVal = parseFloat(reduction);
    const balanceVal = balance ? parseFloat(balance) : undefined;
    const targetVal = target ? parseFloat(target) : undefined;

    if (isNaN(initialVal)) {
      newFieldErrors.initial = t("calculator.error.mustBeNumber");
      hasError = true;
    }
    if (isNaN(finalVal)) {
      newFieldErrors.final = t("calculator.error.mustBeNumber");
      hasError = true;
    }
    if (isNaN(reductionVal)) {
      newFieldErrors.reduction = t("calculator.error.mustBeNumber");
      hasError = true;
    }
    if (balance && isNaN(balanceVal as number)) {
      newFieldErrors.balance = t("calculator.error.mustBeNumber");
      hasError = true;
    }
    if (target && isNaN(targetVal as number)) {
      newFieldErrors.target = t("calculator.error.mustBeNumber");
      hasError = true;
    }

    setFieldErrors(newFieldErrors);

    if (hasError) {
      setResult({ success: false, error: t("calculator.error.invalidInput") });
      return;
    }

    setResult(null);

    const output = calculateIterations(
      initialVal,
      finalVal,
      reductionVal,
      balanceVal,
      targetVal,
      targetIsPercentage
    );

    setResult(output);
  };

  const toggleTargetType = () => {
    setTargetIsPercentage(!targetIsPercentage);
    setTarget("");
    setFieldErrors((prev) => ({ ...prev, target: undefined })); // Réinitialiser l'erreur du champ target
  };

  // Helper pour effacer l'erreur d'un champ quand l'utilisateur commence à taper
  const handleChangeText =
    (setter: (text: string) => void, fieldName: keyof FieldErrors) => (text: string) => {
      setter(text);
      if (fieldErrors[fieldName]) {
        setFieldErrors((prev) => ({ ...prev, [fieldName]: undefined }));
      }
      // Si le résultat global montrait une erreur d'input, on le cache
      if (result && !result.success && result.error === t("calculator.error.invalidInput")) {
        setResult(null);
      }
    };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.calculatorScrollContent}
      keyboardShouldPersistTaps="handled" // Pour fermer le clavier
    >
      <Input
        label={t("calculator.balance")}
        value={balance}
        onChangeText={handleChangeText(setBalance, "balance")}
        keyboardType="numeric"
        isError={!!fieldErrors.balance}
        errorMessage={fieldErrors.balance}
      />
      <Input
        label={t("calculator.initialPrice")}
        value={initial}
        onChangeText={handleChangeText(setInitial, "initial")}
        keyboardType="numeric" // Ajouté pour la cohérence
        isError={!!fieldErrors.initial}
        errorMessage={fieldErrors.initial}
      />
      <Input
        label={t("calculator.finalPrice")}
        value={final}
        onChangeText={handleChangeText(setFinal, "final")}
        keyboardType="numeric" // Ajouté pour la cohérence
        isError={!!fieldErrors.final}
        errorMessage={fieldErrors.final}
      />
      <Input
        label={t("calculator.reductionRate")}
        value={reduction}
        onChangeText={handleChangeText(setReduction, "reduction")}
        keyboardType="numeric" // Ajouté pour la cohérence
        isError={!!fieldErrors.reduction}
        errorMessage={fieldErrors.reduction}
      />

      <TargetInput
        value={target}
        onChangeText={handleChangeText(setTarget, "target")}
        isPercentage={targetIsPercentage}
        onToggle={toggleTargetType}
        // theme prop n'est plus nécessaire si TargetInput utilise ThemeContext
        isError={!!fieldErrors.target} // Ajout de la gestion d'erreur pour TargetInput
        errorMessage={fieldErrors.target}
      />

      <Button title={t("calculator.calculate")} onPress={handleCalculate} />
      {/* Afficher la carte de résultat uniquement si pas d'erreur d'input global OU si c'est un succès */}
      {result && (result.success || result.error !== t("calculator.error.invalidInput")) && (
        <CalculationResultCard result={result} />
      )}
    </ScrollView>
  );
}
