import React, { useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { getThemedStyles } from "../styles/styles";
import { useTranslation } from "react-i18next";

type TargetInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  isPercentage: boolean;
  onToggle: () => void;
  isError?: boolean;
  errorMessage?: string;
};

const TargetInput: React.FC<TargetInputProps> = ({
  value,
  onChangeText,
  isPercentage,
  onToggle,
  isError,
  errorMessage,
}) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  
  return (
    <View style={styles.targetInputContainer}>
      <View style={styles.targetInputWrapper}>
        <Text style={styles.label}>
          {t('calculator.targetPrice')} ({isPercentage ? '%' : '$'})
        </Text>
        <TextInput
          style={[isError ? styles.inputError : styles.input, { height: 40 }]}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          placeholderTextColor={theme.colors.secondaryText}
        />
        {isError && errorMessage && (
          <Text style={{ color: theme.colors.errorText, marginTop: 4, marginLeft: 8 }}>{errorMessage}</Text>
        )}
      </View>
      <TouchableOpacity 
        style={styles.targetInputToggleButton} 
        onPress={onToggle}
      >
        <Text style={styles.targetInputToggleButtonText}>
          {isPercentage ? '$' : '%'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TargetInput; 