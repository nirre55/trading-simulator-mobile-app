import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../theme/ThemeContext';
import { getThemedStyles } from '../../styles/styles';

type Props = {
  message: string;
};

const ErrorCard: React.FC<Props> = ({ message }) => {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  
  return (
    <View style={[styles.card, localStyles.errorCard]}>
      <View style={localStyles.iconContainer}>
        <MaterialIcons name="error" size={24} color="red" />
      </View>
      <Text style={[styles.text, localStyles.errorText]}>{message}</Text>
    </View>
  );
};

const localStyles = StyleSheet.create({
  errorCard: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    flex: 1,
  },
});

export default ErrorCard; 