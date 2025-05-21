import React, { useContext } from "react";
import { View, Text, ScrollView, Switch, TouchableOpacity } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { getThemedStyles } from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
import Constants from "expo-constants";

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  const { t } = useTranslation();

  const appVersion = Constants.expoConfig?.version || "N/A";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.settingsContentContainer}>
      <View style={styles.settingsSection}>
        <Text style={styles.settingsSectionTitle}>{t("settings.language")}</Text>
        <View style={styles.settingsOptionContainer}>
          <LanguageSelector />
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsSectionTitle}>{t("settings.theme")}</Text>
        <View style={styles.settingsOptionRow}>
          <View style={styles.settingsOptionInfo}>
            <Ionicons
              name={isDark ? "moon" : "sunny"}
              size={22}
              color={theme.colors.primary}
              style={styles.settingsOptionIcon}
            />
            <Text style={[styles.text, { flex: 1 }]}>{t("settings.darkMode")}</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{
              false: theme.dark ? "#444" : "#d3d3d3",
              true: theme.colors.primary,
            }}
            thumbColor={isDark ? "#fff" : "#f4f3f4"}
            ios_backgroundColor={theme.dark ? "#444" : "#d3d3d3"}
          />
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsSectionTitle}>{t("navigation.about")}</Text>
        <View style={styles.settingsOptionRow}>
          <View style={styles.settingsOptionInfo}>
            <Ionicons
              name="information-circle"
              size={22}
              color={theme.colors.primary}
              style={styles.settingsOptionIcon}
            />
            <Text style={[styles.text, { flex: 1 }]}>{t("settings.version")}</Text>
          </View>
          <Text style={[styles.secondaryText]}>{appVersion}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
