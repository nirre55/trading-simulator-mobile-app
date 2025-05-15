import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ThemeContext } from '../../theme/ThemeContext';
import { getThemedStyles } from '../../styles/styles';

type Props = {
  type: 'min' | 'max';
  iterations: number;
  price: number;
};

const ResultCard: React.FC<Props> = ({ 
  type, 
  iterations, 
  price 
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  
  const isMin = type === 'min';
  const title = isMin ? 'Résultat min.' : 'Résultat max.';
  const icon = isMin ? 'arrow-down' : 'arrow-up';
  
  return (
    <View style={[styles.card, localStyles.halfCard]}>
      <View style={localStyles.cardHeaderCenter}>
        <FontAwesome name={icon} size={18} color={theme.colors.primary} />
        <Text style={[localStyles.cardSubtitle, { color: theme.colors.text }]}>
          {title}
        </Text>
      </View>
      <Text style={[localStyles.iterationCount, { color: theme.colors.text }]}>
        {iterations}
      </Text>
      <Text style={[localStyles.iterationLabel, { color: theme.colors.secondaryText }]}>
        itérations
      </Text>
      <Text style={[localStyles.price, { color: theme.colors.primary }]}>
        {price.toFixed(2)} $
      </Text>
    </View>
  );
};

const localStyles = StyleSheet.create({
  halfCard: {
    flex: 0.48,
    alignItems: 'center',
    paddingVertical: 12,
  },
  cardHeaderCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
  iterationCount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 5,
  },
  iterationLabel: {
    fontSize: 12,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultCard; 