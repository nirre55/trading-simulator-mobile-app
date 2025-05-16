import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/ThemeContext';
import { changeLanguage } from '../translations/i18n';
import { getThemedStyles } from '../styles/styles';

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' }
];

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  
  const currentLanguage = i18n.language;
  
  const handleChangeLanguage = (languageCode: string) => {
    changeLanguage(languageCode);
  };
  
  return (
    <View style={styles.langSelectorContainer}>
      <View style={styles.langContainer}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.langButton,
              currentLanguage === language.code && styles.langButtonActive,
            ]}
            onPress={() => handleChangeLanguage(language.code)}
          >
            <Text
              style={[
                styles.langButtonText,
                currentLanguage === language.code && styles.langButtonActiveText,
              ]}
            >
              {language.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default LanguageSelector; 