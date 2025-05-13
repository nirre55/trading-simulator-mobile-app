import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeType } from "../theme/theme";

type TargetInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  isPercentage: boolean;
  onToggle: () => void;
  theme: ThemeType;
};

const TargetInput: React.FC<TargetInputProps> = ({
  value,
  onChangeText,
  isPercentage,
  onToggle,
  theme
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Target ({isPercentage ? '%' : '$'})
        </Text>
        <TextInput
          style={[styles.input, { 
            backgroundColor: theme.colors.inputBackground,
            borderColor: theme.colors.inputBorder,
            color: theme.colors.text 
          }]}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: theme.colors.primary }]} 
        onPress={onToggle}
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
          {isPercentage ? '$' : '%'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 40,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TargetInput; 