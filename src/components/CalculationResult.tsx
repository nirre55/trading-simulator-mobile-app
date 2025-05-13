import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../theme/ThemeContext';
import { getThemedStyles } from '../styles/styles';
import { CalculationResult as CalculationResultType } from '../utils/calculator';

type Props = {
  result: CalculationResultType;
};

const CalculationResultCard: React.FC<Props> = ({ result }) => {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);

  if (!result.success) {
    return (
      <View style={[styles.card, localStyles.errorCard]}>
        <View style={localStyles.iconContainer}>
          <MaterialIcons name="error" size={24} color="red" />
        </View>
        <Text style={[styles.text, localStyles.errorText]}>{result.error}</Text>
      </View>
    );
  }

  return (
    <View style={localStyles.resultContainer}>
      <View style={[styles.card, localStyles.mainCard]}>
        <View style={localStyles.cardHeader}>
          <MaterialIcons name="calculate" size={24} color={theme.colors.primary} />
          <Text style={[styles.title, localStyles.cardTitle]}>Résultat</Text>
        </View>
        <View style={[localStyles.divider, { backgroundColor: theme.colors.border }]} />
        <Text style={styles.text}>
          Nombre d'itérations théorique : {result.iterations?.toFixed(2)}
        </Text>
        <Text style={styles.secondaryText}>
          Il faut entre {result.floor} et {result.ceil} itérations pour atteindre ou dépasser {result.targetPrice?.toFixed(2)} $.
        </Text>
      </View>
      
      <View style={localStyles.cardRow}>
        <View style={[styles.card, localStyles.halfCard]}>
          <View style={localStyles.cardHeaderCenter}>
            <FontAwesome name="arrow-down" size={18} color={theme.colors.primary} />
            <Text style={[localStyles.cardSubtitle, { color: theme.colors.text }]}>
              Résultat min.
            </Text>
          </View>
          <Text style={[localStyles.iterationCount, { color: theme.colors.text }]}>
            {result.floor}
          </Text>
          <Text style={[localStyles.iterationLabel, { color: theme.colors.secondaryText }]}>
            itérations
          </Text>
          <Text style={[localStyles.price, { color: theme.colors.primary }]}>
            {result.priceFloor?.toFixed(2)} $
          </Text>
        </View>
        
        <View style={[styles.card, localStyles.halfCard]}>
          <View style={localStyles.cardHeaderCenter}>
            <FontAwesome name="arrow-up" size={18} color={theme.colors.primary} />
            <Text style={[localStyles.cardSubtitle, { color: theme.colors.text }]}>
              Résultat max.
            </Text>
          </View>
          <Text style={[localStyles.iterationCount, { color: theme.colors.text }]}>
            {result.ceil}
          </Text>
          <Text style={[localStyles.iterationLabel, { color: theme.colors.secondaryText }]}>
            itérations
          </Text>
          <Text style={[localStyles.price, { color: theme.colors.primary }]}>
            {result.priceCeil?.toFixed(2)} $
          </Text>
        </View>
      </View>

      {result.balance && result.allocationPerTrade && (
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
                {result.balance.toFixed(2)} $
              </Text>
            </View>
            
            <View style={localStyles.allocationRow}>
              <Text style={[localStyles.allocationLabel, { color: theme.colors.secondaryText }]}>
                Nombre de trades:
              </Text>
              <Text style={[localStyles.allocationValue, { color: theme.colors.text }]}>
                {result.ceil}
              </Text>
            </View>
            
            <View style={localStyles.allocationRow}>
              <Text style={[localStyles.allocationLabel, { color: theme.colors.secondaryText }]}>
                Montant par trade:
              </Text>
              <Text style={[localStyles.allocationValue, { color: theme.colors.primary, fontWeight: 'bold' }]}>
                {result.allocationPerTrade.toFixed(2)} $
              </Text>
            </View>

            <View style={[localStyles.divider, { backgroundColor: theme.colors.border, marginVertical: 8 }]} />
            
            <View style={localStyles.allocationRow}>
              <Text style={[localStyles.allocationLabel, { color: theme.colors.secondaryText }]}>
                Levier recommandé:
              </Text>
              <Text style={[localStyles.allocationValue, { color: theme.colors.primary, fontWeight: 'bold' }]}>
                {result.leverage}x
              </Text>
            </View>
            {result.leverage && (
              <Text style={[styles.secondaryText, { fontSize: 12, marginTop: 5, fontStyle: 'italic' }]}>
                Basé sur une réduction de {100/result.leverage}% par itération
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  resultContainer: {
    marginTop: 20,
  },
  mainCard: {
    marginBottom: 15,
  },
  allocationCard: {
    marginTop: 15,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardHeaderCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    marginLeft: 8,
    fontSize: 18,
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfCard: {
    flex: 0.48,
    alignItems: 'center',
    paddingVertical: 12,
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
  }
});

export default CalculationResultCard; 