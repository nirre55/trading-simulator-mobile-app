import React, { useContext } from "react";
import { View, Text, TextInput } from "react-native";
import { getThemedStyles } from "../styles/styles";
import { ThemeContext } from "../theme/ThemeContext";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

export default function Input({ label, value, onChangeText }: Props) {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
    </View>
  );
}
