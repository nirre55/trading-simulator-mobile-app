import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ThemeType } from "../theme/theme";

// Types pour les styles
export type ThemedStyles = {
  container: ViewStyle;
  centeredContainer: ViewStyle;
  title: TextStyle;
  text: TextStyle;
  secondaryText: TextStyle;
  label: TextStyle;
  input: TextStyle;
  inputError: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  result: TextStyle;
  card: ViewStyle;
  inputContainer: ViewStyle;
  // Pour LanguageSelector
  langSelectorContainer?: ViewStyle;
  langContainer?: ViewStyle;
  langButton?: ViewStyle;
  langButtonActive?: ViewStyle;
  langButtonText?: TextStyle;
  langButtonActiveText?: TextStyle;
  // Pour AllocationCard
  allocationCard?: ViewStyle;
  cardHeader?: ViewStyle;
  cardTitle?: TextStyle;
  dividerStyle?: ViewStyle;
  allocationContent?: ViewStyle;
  allocationRow?: ViewStyle;
  allocationLabel?: TextStyle;
  allocationValue?: TextStyle;
  // Pour ErrorCard
  errorCard?: ViewStyle;
  errorIconContainer?: ViewStyle;
  errorTextStyle?: TextStyle;
  // Pour ResultCard
  resultCardHalf?: ViewStyle;
  resultCardHeaderCenter?: ViewStyle;
  resultCardSubtitle?: TextStyle;
  resultIterationCount?: TextStyle;
  resultIterationLabel?: TextStyle;
  resultPrice?: TextStyle;
  // Ajouts pour AboutScreen
  aboutContentContainer?: ViewStyle; // contentContainer
  aboutSection?: ViewStyle; // section
  aboutSectionHeader?: ViewStyle; // sectionHeader
  aboutSectionIcon?: ViewStyle; // sectionIcon (pourrait être TextStyle si c'est pour un Icon composant qui prend un style de texte)
  aboutSectionTitle?: TextStyle; // sectionTitle
  aboutSubtitle?: TextStyle; // subtitle
  aboutParagraph?: TextStyle; // paragraph
  aboutUpdateItem?: ViewStyle; // updateItem
  aboutUpdateDate?: TextStyle; // updateDate
  // Ajouts pour CalculatorScreen
  calculatorScrollContent?: ViewStyle;
  // Ajouts pour SettingsScreen
  settingsContentContainer?: ViewStyle; // contentContainer
  settingsSection?: ViewStyle; // section
  settingsSectionTitle?: TextStyle; // sectionTitle
  settingsOptionContainer?: ViewStyle; // optionContainer
  settingsOptionRow?: ViewStyle; // optionRow
  settingsOptionInfo?: ViewStyle; // optionInfo
  settingsOptionIcon?: ViewStyle; // optionIcon
  // Ajouts pour IterationsTable
  iterationsCard?: ViewStyle;
  iterationsCardHeaderWithSwitch?: ViewStyle;
  iterationsSwitchContainer?: ViewStyle;
  iterationsRecoveryInfoContainer?: ViewStyle;
  iterationsTableContainer?: ViewStyle;
  iterationsTableHeader?: ViewStyle;
  iterationsTableHeaderCell?: ViewStyle;
  iterationsTableHeaderText?: TextStyle;
  iterationsTableRow?: ViewStyle;
  iterationsTableCell?: ViewStyle;
  iterationsTableCellText?: TextStyle;
  iterationsTableCellMiddle?: ViewStyle;
  // Ajouts pour TargetInput
  targetInputContainer?: ViewStyle;
  targetInputWrapper?: ViewStyle;
  targetInputToggleButton?: ViewStyle;
  targetInputToggleButtonText?: TextStyle;
};

// Styles statiques indépendants du thème
const baseStyles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  centeredContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  inputContainer: { marginVertical: 10 },
  button: { padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  result: { marginTop: 20, fontSize: 16, fontWeight: "bold" as const },
  // LanguageSelector
  langSelectorContainer: { marginVertical: 16 },
  langContainer: { flexDirection: "row", flexWrap: "wrap" },
  langButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 4, marginRight: 8, marginBottom: 8 },
  langButtonText: { fontSize: 14 },
  langButtonActiveText: { fontWeight: "bold" as const },
  // AllocationCard
  allocationCard: { marginTop: 15, marginBottom: 15 },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  cardTitle: { marginLeft: 8, fontSize: 18 },
  dividerStyle: { height: 1, marginVertical: 8 },
  allocationContent: { paddingVertical: 8 },
  allocationRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
  allocationLabel: { fontSize: 15 },
  allocationValue: { fontSize: 15 },
  // ErrorCard
  errorCard: { marginTop: 20, borderLeftWidth: 4, flexDirection: "row", alignItems: "center" },
  errorIconContainer: { marginRight: 10 },
  errorTextStyle: { flex: 1 },
  // ResultCard
  resultCardHalf: { flex: 0.48, alignItems: "center", paddingVertical: 12 },
  resultCardHeaderCenter: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  resultCardSubtitle: { fontWeight: "bold" as const, fontSize: 14, marginLeft: 5 },
  resultIterationCount: { fontSize: 24, fontWeight: "bold" as const, marginBottom: 2, marginTop: 5 },
  resultIterationLabel: { fontSize: 12, marginBottom: 10 },
  resultPrice: { fontSize: 16, fontWeight: "bold" as const },
  // Nouveaux baseStyles pour AboutScreen
  aboutContentContainer: { paddingBottom: 30, paddingHorizontal: 15 },
  aboutSection: { marginVertical: 10 },
  aboutSectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  aboutSectionIcon: { marginRight: 10 },
  aboutSectionTitle: { fontSize: 20, fontWeight: "bold" as const },
  aboutSubtitle: { fontSize: 16, fontWeight: "bold" as const, marginTop: 15, marginBottom: 5 },
  aboutParagraph: { marginBottom: 10, lineHeight: 20 },
  aboutUpdateItem: { marginBottom: 15 },
  aboutUpdateDate: { fontStyle: "italic", marginBottom: 5, fontSize: 12 },
  // Nouveaux baseStyles pour CalculatorScreen
  calculatorScrollContent: { paddingBottom: 30 },
  // Nouveaux baseStyles pour SettingsScreen
  settingsContentContainer: { paddingBottom: 30 },
  settingsSection: { marginTop: 20, marginHorizontal: 15 },
  settingsSectionTitle: { fontSize: 16, fontWeight: "bold" as const, marginBottom: 10 },
  settingsOptionContainer: { paddingVertical: 8, paddingHorizontal: 5, borderBottomWidth: 0.5 },
  settingsOptionRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12, paddingHorizontal: 5, borderBottomWidth: 0.5 },
  settingsOptionInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
  settingsOptionIcon: { marginRight: 10 },
  // Nouveaux baseStyles pour IterationsTable
  iterationsCard: { marginBottom: 15 },
  iterationsCardHeaderWithSwitch: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  iterationsSwitchContainer: { flexDirection: "row", alignItems: "center" },
  iterationsRecoveryInfoContainer: { borderRadius: 6, padding: 10, marginVertical: 8 },
  iterationsTableContainer: { marginVertical: 10, width: "100%" }, // width: '100%' peut être problématique avec ScrollView horizontal
  iterationsTableHeader: { flexDirection: "row", borderBottomWidth: 1, paddingBottom: 8 },
  iterationsTableHeaderCell: { flex: 1, paddingHorizontal: 8, paddingVertical: 6, width: 120, alignItems: "center" },
  iterationsTableHeaderText: { fontWeight: "bold" as const, fontSize: 14 },
  iterationsTableRow: { flexDirection: "row" },
  iterationsTableCell: { flex: 1, paddingHorizontal: 8, paddingVertical: 10, width: 120, alignItems: "center" }, // Augmenté paddingVertical pour l'espacement
  iterationsTableCellText: { fontSize: 13 },
  iterationsTableCellMiddle: { borderLeftWidth: 1, borderRightWidth: 1 },
  // Nouveaux baseStyles pour TargetInput
  targetInputContainer: { marginVertical: 10, flexDirection: "row", alignItems: "flex-end" },
  targetInputWrapper: { flex: 1, marginRight: 10 },
  targetInputToggleButton: { width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center", elevation: 3, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1 },
  targetInputToggleButtonText: { fontWeight: "bold" as const, fontSize: 16 },
  inputError: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
});

// Fonction pour créer des styles basés sur le thème
export const getThemedStyles = (theme: ThemeType): ThemedStyles => {
  return {
    ...baseStyles,
    container: { ...baseStyles.container, backgroundColor: theme.colors.background },
    centeredContainer: { ...baseStyles.centeredContainer, backgroundColor: theme.colors.background },
    title: { fontSize: 20, fontWeight: "bold" as const, color: theme.colors.text } as TextStyle,
    text: { color: theme.colors.text } as TextStyle,
    secondaryText: { color: theme.colors.secondaryText } as TextStyle,
    label: { fontWeight: "bold" as const, marginBottom: 5, color: theme.colors.text } as TextStyle,
    input: { borderWidth: 1, borderColor: theme.colors.inputBorder, borderRadius: 5, padding: 10, backgroundColor: theme.colors.inputBackground, color: theme.colors.text } as TextStyle,
    inputError: {
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      fontSize: 16,
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.errorBorder,
      color: theme.colors.text,
    } as TextStyle,
    button: { ...baseStyles.button, backgroundColor: theme.colors.buttonBackground } as ViewStyle,
    buttonText: { color: theme.colors.buttonText, fontWeight: "bold" as const } as TextStyle,
    result: { ...baseStyles.result, color: theme.colors.primary } as TextStyle,
    card: { backgroundColor: theme.colors.card, borderRadius: 8, padding: 15, marginVertical: 8, shadowColor: theme.colors.shadow, shadowOpacity: 0.1, shadowRadius: 8, elevation: 2 } as ViewStyle,
    inputContainer: baseStyles.inputContainer as ViewStyle,
    // LanguageSelector
    langSelectorContainer: { ...baseStyles.langSelectorContainer } as ViewStyle,
    langContainer: { ...baseStyles.langContainer } as ViewStyle,
    langButton: { ...baseStyles.langButton, backgroundColor: theme.colors.langButtonBackground } as ViewStyle,
    langButtonActive: { borderWidth: 2, borderColor: theme.colors.langButtonActiveBorder } as ViewStyle,
    langButtonText: { ...baseStyles.langButtonText, color: theme.colors.text } as TextStyle,
    langButtonActiveText: { ...baseStyles.langButtonActiveText, color: theme.colors.primary } as TextStyle,
    // AllocationCard
    allocationCard: { ...baseStyles.allocationCard, backgroundColor: theme.colors.card, borderColor: theme.colors.border } as ViewStyle,
    cardHeader: { ...baseStyles.cardHeader } as ViewStyle,
    cardTitle: { ...baseStyles.cardTitle, color: theme.colors.text } as TextStyle,
    dividerStyle: { ...baseStyles.dividerStyle, backgroundColor: theme.colors.border } as ViewStyle,
    allocationContent: { ...baseStyles.allocationContent } as ViewStyle,
    allocationRow: { ...baseStyles.allocationRow } as ViewStyle,
    allocationLabel: { ...baseStyles.allocationLabel, color: theme.colors.secondaryText } as TextStyle,
    allocationValue: { ...baseStyles.allocationValue, color: theme.colors.text } as TextStyle,
    // ErrorCard
    errorCard: { ...baseStyles.errorCard, backgroundColor: theme.colors.errorCardBackground, borderLeftColor: theme.colors.errorCardBorder } as ViewStyle,
    errorIconContainer: { ...baseStyles.errorIconContainer } as ViewStyle,
    errorTextStyle: { ...baseStyles.errorTextStyle, color: theme.colors.errorText } as TextStyle,
    // ResultCard
    resultCardHalf: { ...baseStyles.resultCardHalf, backgroundColor: theme.colors.card, borderColor: theme.colors.border } as ViewStyle,
    resultCardHeaderCenter: { ...baseStyles.resultCardHeaderCenter } as ViewStyle,
    resultCardSubtitle: { ...baseStyles.resultCardSubtitle, color: theme.colors.text } as TextStyle,
    resultIterationCount: { ...baseStyles.resultIterationCount, color: theme.colors.text } as TextStyle,
    resultIterationLabel: { ...baseStyles.resultIterationLabel, color: theme.colors.secondaryText } as TextStyle,
    resultPrice: { ...baseStyles.resultPrice, color: theme.colors.primary } as TextStyle,
    // Styles pour AboutScreen (principalement thémage des couleurs de texte)
    aboutContentContainer: { ...baseStyles.aboutContentContainer } as ViewStyle,
    aboutSection: { ...baseStyles.aboutSection } as ViewStyle,
    aboutSectionHeader: { ...baseStyles.aboutSectionHeader } as ViewStyle,
    aboutSectionIcon: { ...baseStyles.aboutSectionIcon } as ViewStyle,
    aboutSectionTitle: { ...baseStyles.aboutSectionTitle, color: theme.colors.text } as TextStyle,
    aboutSubtitle: { ...baseStyles.aboutSubtitle, color: theme.colors.secondaryText } as TextStyle,
    aboutParagraph: { ...baseStyles.aboutParagraph, color: theme.colors.text } as TextStyle,
    aboutUpdateItem: { ...baseStyles.aboutUpdateItem } as ViewStyle,
    aboutUpdateDate: { ...baseStyles.aboutUpdateDate, color: theme.colors.secondaryText } as TextStyle,
    // Styles pour CalculatorScreen
    calculatorScrollContent: { ...baseStyles.calculatorScrollContent } as ViewStyle,
    // Styles pour SettingsScreen
    settingsContentContainer: { ...baseStyles.settingsContentContainer } as ViewStyle,
    settingsSection: { ...baseStyles.settingsSection } as ViewStyle,
    settingsSectionTitle: { ...baseStyles.settingsSectionTitle, color: theme.colors.text } as TextStyle,
    settingsOptionContainer: { ...baseStyles.settingsOptionContainer, borderColor: theme.colors.border } as ViewStyle,
    settingsOptionRow: { ...baseStyles.settingsOptionRow, borderColor: theme.colors.border } as ViewStyle,
    settingsOptionInfo: { ...baseStyles.settingsOptionInfo, color: theme.colors.secondaryText } as TextStyle,
    settingsOptionIcon: { ...baseStyles.settingsOptionIcon } as ViewStyle,
    // Styles pour IterationsTable
    iterationsCard: { ...baseStyles.iterationsCard, backgroundColor: theme.colors.card, borderColor: theme.colors.border } as ViewStyle,
    iterationsCardHeaderWithSwitch: { ...baseStyles.iterationsCardHeaderWithSwitch } as ViewStyle,
    iterationsSwitchContainer: { ...baseStyles.iterationsSwitchContainer } as ViewStyle,
    iterationsRecoveryInfoContainer: {
      ...baseStyles.iterationsRecoveryInfoContainer,
      backgroundColor: theme.dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
    } as ViewStyle,
    iterationsTableContainer: { ...baseStyles.iterationsTableContainer } as ViewStyle,
    iterationsTableHeader: { ...baseStyles.iterationsTableHeader, borderBottomColor: theme.colors.border } as ViewStyle,
    iterationsTableHeaderCell: { ...baseStyles.iterationsTableHeaderCell } as ViewStyle,
    iterationsTableHeaderText: { ...baseStyles.iterationsTableHeaderText, color: theme.colors.text } as TextStyle,
    iterationsTableRow: { ...baseStyles.iterationsTableRow } as ViewStyle,
    iterationsTableCell: { ...baseStyles.iterationsTableCell } as ViewStyle,
    iterationsTableCellText: { ...baseStyles.iterationsTableCellText, color: theme.colors.text } as TextStyle,
    iterationsTableCellMiddle: { ...baseStyles.iterationsTableCellMiddle } as ViewStyle,
    // Styles pour TargetInput
    targetInputContainer: { ...baseStyles.targetInputContainer } as ViewStyle,
    targetInputWrapper: { ...baseStyles.targetInputWrapper } as ViewStyle,
    targetInputToggleButton: { ...baseStyles.targetInputToggleButton, backgroundColor: theme.colors.primary, shadowColor: theme.colors.shadow } as ViewStyle,
    targetInputToggleButtonText: { ...baseStyles.targetInputToggleButtonText, color: theme.colors.buttonText } as TextStyle,
  };
};
