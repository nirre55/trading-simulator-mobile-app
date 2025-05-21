import React, { useContext } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getThemedStyles } from "../../styles/styles";
import { useTranslation } from "react-i18next";

type Props = {
  iterations: number;
  floor: number;
  ceil: number;
  targetPrice: number;
};

const SummaryCard: React.FC<Props> = ({ iterations, floor, ceil, targetPrice }) => {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={[styles.card, styles.allocationCard]}>
      <View style={styles.cardHeader}>
        <MaterialIcons name="calculate" size={24} color={theme.colors.primary} />
        <Text style={styles.cardTitle}>{t("cards.result")}</Text>
      </View>
      <View style={styles.dividerStyle} />
      <Text style={styles.text}>
        {t("cards.theoreticalIterations")}: {iterations.toFixed(2)}
      </Text>
      <Text style={styles.secondaryText}>
        {t("cards.iterationRange", {
          min: floor,
          max: ceil,
          price: targetPrice.toFixed(2),
        })}
      </Text>
    </View>
  );
};

export default SummaryCard;
