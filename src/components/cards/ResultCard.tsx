import React, { useContext } from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getThemedStyles } from "../../styles/styles";
import { useTranslation } from "react-i18next";

type Props = {
  type: "min" | "max";
  iterations: number;
  price: number;
};

const ResultCard: React.FC<Props> = ({ type, iterations, price }) => {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  const { t } = useTranslation();

  const isMin = type === "min";
  const title = isMin ? t("cards.minResult") : t("cards.maxResult");
  const iconName = isMin ? "arrow-down" : "arrow-up";

  return (
    <View style={[styles.card, styles.resultCardHalf]}>
      <View style={styles.resultCardHeaderCenter}>
        <FontAwesome name={iconName} size={18} color={theme.colors.primary} />
        <Text style={styles.resultCardSubtitle}>{title}</Text>
      </View>
      <Text style={styles.resultIterationCount}>{iterations}</Text>
      <Text style={styles.resultIterationLabel}>{t("cards.iterations")}</Text>
      <Text style={styles.resultPrice}>{price.toFixed(2)} $</Text>
    </View>
  );
};

export default ResultCard;
