import React, { useContext } from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { getThemedStyles } from "../styles/styles";
import { ThemeContext } from "../contexts/ThemeContext";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  isError?: boolean;
  errorMessage?: string;
} & TextInputProps;

export default function Input({
  label,
  value,
  onChangeText,
  isError,
  errorMessage,
  ...props
}: Props) {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={isError ? styles.inputError : styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.secondaryText}
        testID="input"
        {...props}
      />
      {isError && errorMessage && (
        <Text style={{ color: theme.colors.errorText, marginTop: 4 }}>{errorMessage}</Text>
      )}
    </View>
  );
}
