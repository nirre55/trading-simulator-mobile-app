import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "../styles/styles";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

export default function Input({ label, value, onChangeText }: Props) {
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
