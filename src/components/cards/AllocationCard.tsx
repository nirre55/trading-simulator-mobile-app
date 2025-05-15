import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../theme/ThemeContext';
import { getThemedStyles } from '../../styles/styles';

type Props = {
  balance: number;
  trades: number;
  allocationPerTrade: number;
  leverage: number;
};

const AllocationCard: React.FC<Props> = ({ 
  balance, 
  trades, 
  allocationPerTrade, 
  leverage 
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  
  // Fonction pour arrondir à 2 décimales
  const roundToTwoDecimals = (num: number): string => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
  return (
    <View style={[styles.card, localStyles.allocationCard]}>
      <View style={localStyles.cardHeader}>
        <Ionicons name="wallet-outline" size={22} color={theme.colors.primary} />
        <Text style={[localStyles.cardTitle, { color: theme.colors.text }]}>
          Allocation des fonds
        </Text>
      </View>
      <View style={[localStyles.divider, { backgroundColor: theme.colors.border }]} />
      
      <View style={localStyles.allocationContent}>
        <View style={localStyles.allocationRow}>
          <Text style={[localStyles.allocationLabel, { color: theme.colors.secondaryText }]}>
            Balance totale:
          </Text>
          <Text style={[localStyles.allocationValue, { color: theme.colors.text }]}>
            {balance.toFixed(2)} $
          </Text>
        </View>
        
        <View style={localStyles.allocationRow}>
          <Text style={[localStyles.allocationLabel, { color: theme.colors.secondaryText }]}>
            Nombre de trades:
          </Text>
          <Text style={[localStyles.allocationValue, { color: theme.colors.text }]}>
            {trades}
          </Text>
        </View>
        
        <View style={localStyles.allocationRow}>
          <Text style={[localStyles.allocationLabel, { color: theme.colors.secondaryText }]}>
            Montant par trade:
          </Text>
          <Text style={[localStyles.allocationValue, { color: theme.colors.primary, fontWeight: 'bold' }]}>
            {allocationPerTrade.toFixed(2)} $
          </Text>
        </View>

        <View style={[localStyles.divider, { backgroundColor: theme.colors.border, marginVertical: 8 }]} />
        
        <View style={localStyles.allocationRow}>
          <Text style={[localStyles.allocationLabel, { color: theme.colors.secondaryText }]}>
            Levier recommandé:
          </Text>
          <Text style={[localStyles.allocationValue, { color: theme.colors.primary, fontWeight: 'bold' }]}>
            {leverage}x
          </Text>
        </View>
        
        <Text style={[styles.secondaryText, { fontSize: 12, marginTop: 5, fontStyle: 'italic' }]}>
          Basé sur une réduction de {roundToTwoDecimals(100/leverage)}% par itération
        </Text>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  allocationCard: {
    marginTop: 15,
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
  allocationContent: {
    paddingVertical: 8,
  },
  allocationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  allocationLabel: {
    fontSize: 15,
  },
  allocationValue: {
    fontSize: 15,
  },
});

export default AllocationCard; 