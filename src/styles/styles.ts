import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ThemeType } from "../theme/theme";

// Types pour les styles
type ThemedStyles = {
  container: ViewStyle;
  centeredContainer: ViewStyle;
  title: TextStyle;
  text: TextStyle;
  secondaryText: TextStyle;
  label: TextStyle;
  input: ViewStyle & { color: string };
  button: ViewStyle;
  buttonText: TextStyle;
  result: TextStyle;
  card: ViewStyle;
  inputContainer: ViewStyle;
};

// Styles statiques indépendants du thème
const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginVertical: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});

// Fonction pour créer des styles basés sur le thème
export const getThemedStyles = (theme: ThemeType): ThemedStyles => {
  return {
    ...baseStyles as any,
    container: {
      ...baseStyles.container,
      backgroundColor: theme.colors.background,
    },
    centeredContainer: {
      ...baseStyles.centeredContainer,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold" as const,
      color: theme.colors.text,
    },
    text: {
      color: theme.colors.text,
    },
    secondaryText: {
      color: theme.colors.secondaryText,
    },
    label: {
      fontWeight: "bold" as const,
      marginBottom: 5,
      color: theme.colors.text,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.inputBorder,
      borderRadius: 5,
      padding: 10,
      backgroundColor: theme.colors.inputBackground,
      color: theme.colors.text,
    },
    button: {
      ...baseStyles.button,
      backgroundColor: theme.colors.buttonBackground,
    },
    buttonText: {
      color: theme.colors.buttonText,
      fontWeight: "bold" as const,
    },
    result: {
      ...baseStyles.result as any,
      color: theme.colors.primary,
    },
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      padding: 15,
      marginVertical: 8,
      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },
    inputContainer: baseStyles.inputContainer,
  };
};

// Pour la compatibilité avec le code existant
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
});
