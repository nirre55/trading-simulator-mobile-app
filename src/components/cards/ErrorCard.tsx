import React, { useContext } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getThemedStyles } from "../../styles/styles";
import { useTranslation } from "react-i18next";

type Props = {
  message: string;
};

const ErrorCard: React.FC<Props> = ({ message }) => {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={[styles.card, styles.errorCard]}>
      <View style={styles.errorIconContainer}>
        <MaterialIcons name="error" size={24} color={theme.colors.errorIcon} />
      </View>
      <Text style={styles.errorTextStyle}>{message}</Text>
    </View>
  );
};

export default ErrorCard;
