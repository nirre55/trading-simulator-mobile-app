import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../theme/ThemeContext';
import { getThemedStyles } from '../../styles/styles';

type Props = {
  iterations: number;
  floor: number;
  ceil: number;
  targetPrice: number;
};

const SummaryCard: React.FC<Props> = ({ 
  iterations, 
  floor, 
  ceil, 
  targetPrice 
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  
  return (
    <View style={[styles.card, localStyles.mainCard]}>
      <View style={localStyles.cardHeader}>
        <MaterialIcons name="calculate" size={24} color={theme.colors.primary} />
        <Text style={[styles.title, localStyles.cardTitle]}>Résultat</Text>
      </View>
      <View style={[localStyles.divider, { backgroundColor: theme.colors.border }]} />
      <Text style={styles.text}>
        Nombre d'itérations théorique : {iterations.toFixed(2)}
      </Text>
      <Text style={styles.secondaryText}>
        Il faut entre {floor} et {ceil} itérations pour atteindre ou dépasser {targetPrice.toFixed(2)} $.
      </Text>
    </View>
  );
};

const localStyles = StyleSheet.create({
  mainCard: {
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    marginLeft: 8,
    fontSize: 18,
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
});

export default SummaryCard; 