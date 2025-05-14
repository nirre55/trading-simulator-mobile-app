import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from "react-native";
import { ThemeContext } from "../theme/ThemeContext";
import { getThemedStyles } from "../styles/styles";
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]} 
      contentContainerStyle={localStyles.contentContainer}
    >
      <View style={localStyles.section}>
        <Text style={[localStyles.sectionTitle, { color: theme.colors.text }]}>
          Apparence
        </Text>
        <View style={[localStyles.optionRow, { borderColor: theme.colors.border }]}>
          <View style={localStyles.optionInfo}>
            <Ionicons 
              name={isDark ? "moon" : "sunny"} 
              size={22} 
              color={theme.colors.primary} 
              style={localStyles.optionIcon} 
            />
            <Text style={[styles.text, { flex: 1 }]}>{isDark ? "Mode Sombre" : "Mode Clair"}</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.dark ? '#444' : '#d3d3d3', true: theme.colors.primary }}
            thumbColor={isDark ? '#fff' : '#f4f3f4'}
            ios_backgroundColor={theme.dark ? '#444' : '#d3d3d3'}
          />
        </View>
      </View>

      <View style={localStyles.section}>
        <Text style={[localStyles.sectionTitle, { color: theme.colors.text }]}>
          Calculateur
        </Text>
        <TouchableOpacity 
          style={[localStyles.optionRow, { borderColor: theme.colors.border }]}
        >
          <View style={localStyles.optionInfo}>
            <Ionicons 
              name="calculator" 
              size={22} 
              color={theme.colors.primary} 
              style={localStyles.optionIcon} 
            />
            <Text style={[styles.text, { flex: 1 }]}>Paramètres par défaut</Text>
          </View>
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={theme.colors.secondaryText} 
          />
        </TouchableOpacity>
      </View>

      <View style={localStyles.section}>
        <Text style={[localStyles.sectionTitle, { color: theme.colors.text }]}>
          À propos
        </Text>
        <View style={[localStyles.optionRow, { borderColor: theme.colors.border }]}>
          <View style={localStyles.optionInfo}>
            <Ionicons 
              name="information-circle" 
              size={22} 
              color={theme.colors.primary} 
              style={localStyles.optionIcon} 
            />
            <Text style={[styles.text, { flex: 1 }]}>Version</Text>
          </View>
          <Text style={[styles.secondaryText]}>1.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 30,
  },
  section: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 0.5,
  },
  optionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    marginRight: 10,
  }
}); 