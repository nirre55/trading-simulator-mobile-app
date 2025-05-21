import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { getThemedStyles } from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function AboutScreen() {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.aboutContentContainer}>
      <View style={[styles.card, styles.aboutSection]}>
        <View style={styles.aboutSectionHeader}>
          <Ionicons
            name="calculator"
            size={24}
            color={theme.colors.primary}
            style={styles.aboutSectionIcon}
          />
          <Text style={styles.aboutSectionTitle}>{t("calculator.title")}</Text>
        </View>

        <Text style={styles.aboutParagraph}>{t("about.description")}</Text>

        <Text style={styles.aboutSubtitle}>{t("about.howTo")}</Text>

        <Text style={styles.aboutParagraph}>{t("about.step1")}</Text>
        <Text style={styles.aboutParagraph}>{t("about.step2")}</Text>
        <Text style={styles.aboutParagraph}>{t("about.step3")}</Text>
        <Text style={styles.aboutParagraph}>{t("about.step4")}</Text>
        <Text style={styles.aboutParagraph}>{t("about.step5")}</Text>

        <Text style={styles.aboutSubtitle}>{t("about.formulas")}</Text>

        <Text style={styles.aboutParagraph}>
          <Text style={{ fontWeight: "bold" }}>{t("about.iterations")} </Text>
          {t("about.iterations_formula")}
        </Text>

        <Text style={styles.aboutParagraph}>
          <Text style={{ fontWeight: "bold" }}>{t("about.exitPrice")} </Text>
          {t("about.exitPrice_formula")}
        </Text>

        <Text style={styles.aboutParagraph}>
          <Text style={{ fontWeight: "bold" }}>{t("about.profit")} </Text>
          {t("about.profit_formula")}
        </Text>

        <Text style={styles.aboutSubtitle}>{t("about.lossRecovery")}</Text>

        <Text style={styles.aboutParagraph}>{t("about.lossRecovery_description")}</Text>

        <Text style={styles.aboutParagraph}>{t("about.lossRecovery_formula")}</Text>
      </View>

      <View style={[styles.card, styles.aboutSection]}>
        <View style={styles.aboutSectionHeader}>
          <Ionicons
            name="information-circle"
            size={24}
            color={theme.colors.primary}
            style={styles.aboutSectionIcon}
          />
          <Text style={[styles.aboutSectionTitle, { fontSize: 18 }]}>
            {t("about.updateHistory")}
          </Text>
        </View>

        <View style={styles.aboutUpdateItem}>
          <Text style={[styles.text, { fontWeight: "bold" }]}>{t("about.v1")}</Text>
          <Text style={styles.aboutUpdateDate}>{t("about.v1_date")}</Text>
          <Text style={styles.text}>{t("about.v1_feature1")}</Text>
          <Text style={styles.text}>{t("about.v1_feature2")}</Text>
          <Text style={styles.text}>{t("about.v1_feature3")}</Text>
          <Text style={styles.text}>{t("about.v1_feature4")}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
