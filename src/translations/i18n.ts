import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// Importer directement les fichiers de traduction
import en from "./locales/en.json";
import fr from "./locales/fr.json";

// Obtenir la langue du système avec expo-localization
const getSystemLanguage = (): string => {
  try {
    // Récupérer le code de langue (les 2 premiers caractères)
    const languageCode = Localization.locale.substring(0, 2);

    // Vérifier si la langue est supportée, sinon retourner 'fr'
    return ["en", "fr"].includes(languageCode) ? languageCode : "fr";
  } catch (error) {
    console.warn("Erreur lors de la détection de la langue du système:", error);
    return "fr";
  }
};

// Dictionnaire des ressources de traduction
const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

// Configuration de i18next
i18next.use(initReactI18next).init({
  // Ressources de traduction
  resources,
  // Langue par défaut (détectée à partir du système)
  lng: getSystemLanguage(),
  // Langue de secours si la langue demandée n'est pas disponible
  fallbackLng: "fr",
  // Autorise l'utilisation de clés non trouvées
  saveMissing: true,
  // Compatibilité avec le format ICU pour les pluriels et genres
  compatibilityJSON: "v4" as const,
  // Interpolation pour insérer des variables dans les traductions
  interpolation: {
    escapeValue: false,
  },
});

// Fonction pour changer de langue
export const changeLanguage = (language: string) => {
  i18next.changeLanguage(language);
};

export default i18next;
