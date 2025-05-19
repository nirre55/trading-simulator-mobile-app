import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/ThemeContext';
import { changeLanguage } from '../translations/i18n';
import { getThemedStyles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' }
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const themedStyles = getThemedStyles(theme);
  const [modalVisible, setModalVisible] = useState(false);
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  const handleChangeLanguage = (languageCode: string) => {
    changeLanguage(languageCode);
    setModalVisible(false);
  };
  
  return (
    <View>
      <TouchableOpacity 
        testID="language-selector-button"
        style={[themedStyles.settingsOptionRow, localStyles.selectorButton]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[themedStyles.text, { flex: 1 }]}>{currentLanguage.name}</Text>
        <Ionicons name="chevron-down" size={20} color={theme.colors.text} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable style={localStyles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={[localStyles.modalView, { backgroundColor: theme.colors.card }]}>
            {modalVisible && languages.map((language) => (
              <TouchableOpacity
                testID={`language-option-${language.code}`}
                key={language.code}
                style={localStyles.modalOption}
                onPress={() => handleChangeLanguage(language.code)}
              >
                <Text style={[
                  localStyles.modalOptionText, 
                  { color: theme.colors.text },
                  i18n.language === language.code && { color: theme.colors.primary, fontWeight: 'bold' }
                ]}>
                  {language.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const localStyles = StyleSheet.create({
  selectorButton: {
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    borderRadius: 10,
    padding: 20,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%'
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: 'center',
  }
});

export default LanguageSelector; 