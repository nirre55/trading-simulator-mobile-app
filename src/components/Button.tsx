import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { getThemedStyles } from "../styles/styles";
import { ThemeContext } from "../contexts/ThemeContext";

type Props = {
  title: string;
  onPress: () => void;
};

export default function Button({ title, onPress }: Props) {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
