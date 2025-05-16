import React, { useContext } from "react";
import { View, Text } from "react-native";
import { getThemedStyles } from "../styles/styles";
import { ThemeContext } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={styles.centeredContainer}>
      <Text style={styles.title}>{t('home.welcome')}</Text>
      <Text style={styles.text}>{t('home.subtitle')}</Text>
    </View>
  );
}
