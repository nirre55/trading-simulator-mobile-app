import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../theme/ThemeContext';
import { getThemedStyles } from '../../styles/styles';

type IterationDetail = {
  iteration: number;
  entryPrice: number;
  exitPrice?: number;
  liquidationPrice: number;
  profit?: number;
};

type Props = {
  iterationDetails: IterationDetail[];
  allocationPerTrade?: number;
};

const IterationsTable: React.FC<Props> = ({ 
  iterationDetails,
  allocationPerTrade
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  const [isRecoveryEnabled, setIsRecoveryEnabled] = useState(false);
  
  // Fonction pour arrondir à 2 décimales
  const roundToTwoDecimals = (num: number): string => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
  // Fonction pour calculer le profit avec ou sans récupération des pertes
  const calculateProfit = (detail: IterationDetail) => {
    if (!detail.profit) return '-';
    
    let profit = detail.profit;
    
    // Si la récupération des pertes est activée, on ajoute le montant par trade * (numéro d'itération - 1)
    if (isRecoveryEnabled && allocationPerTrade && detail.iteration > 1) {
      profit += allocationPerTrade * (detail.iteration - 1);
    }
    
    return roundToTwoDecimals(profit);
  };

  // Fonction pour déterminer la couleur du profit
  const getProfitColor = (detail: IterationDetail) => {
    if (!detail.profit) return theme.colors.text;
    
    let profit = detail.profit;
    
    // Calculer le profit avec récupération si nécessaire
    if (isRecoveryEnabled && allocationPerTrade && detail.iteration > 1) {
      profit += allocationPerTrade * (detail.iteration - 1);
    }
    
    return profit > 0 ? 'green' : profit < 0 ? 'red' : theme.colors.text;
  };
  
  if (!iterationDetails || iterationDetails.length === 0) {
    return (
      <View style={[styles.card, { padding: 10, marginVertical: 10 }]}>
        <Text style={{ color: theme.colors.secondaryText, fontStyle: 'italic' }}>
          Aucun détail d'itération disponible.
        </Text>
      </View>
    );
  }
  
  return (
    <View style={[styles.card, localStyles.iterationsCard]}>
      <View style={localStyles.cardHeaderWithSwitch}>
        <View style={localStyles.cardHeader}>
          <MaterialCommunityIcons name="table" size={22} color={theme.colors.primary} />
          <Text style={[localStyles.cardTitle, { color: theme.colors.text }]}>
            Détails des Itérations
          </Text>
        </View>
        <View style={localStyles.switchContainer}>
          <Text style={[styles.secondaryText, { marginRight: 8, fontSize: 13 }]}>
            Récupération des pertes
          </Text>
          <Switch
            value={isRecoveryEnabled}
            onValueChange={setIsRecoveryEnabled}
            trackColor={{ false: theme.dark ? '#444' : '#d3d3d3', true: theme.colors.primary }}
            thumbColor={isRecoveryEnabled ? '#fff' : '#f4f3f4'}
            ios_backgroundColor={theme.dark ? '#444' : '#d3d3d3'}
          />
        </View>
      </View>
      <View style={[localStyles.divider, { backgroundColor: theme.colors.border }]} />
      
      {isRecoveryEnabled && allocationPerTrade && (
        <View style={[
          localStyles.recoveryInfoContainer, 
          { backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }
        ]}>
          <Text style={[styles.secondaryText, { fontStyle: 'italic', fontSize: 12 }]}>
            Avec récupération des pertes, le profit à chaque itération inclut le montant{' '}
            <Text style={{ fontWeight: 'bold' }}>{roundToTwoDecimals(allocationPerTrade)}$</Text>{' '}
            multiplié par (numéro d'itération - 1).
          </Text>
        </View>
      )}
      
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <View style={localStyles.tableContainer}>
          {/* En-tête du tableau */}
          <View style={localStyles.tableHeader}>
            <View style={localStyles.tableHeaderCell}>
              <Text style={[localStyles.tableHeaderText, { color: theme.colors.text }]}>Itération</Text>
            </View>
            <View style={[localStyles.tableHeaderCell, localStyles.tableCellMiddle]}>
              <Text style={[localStyles.tableHeaderText, { color: theme.colors.text }]}>Prix d'entrée ($)</Text>
            </View>
            <View style={[localStyles.tableHeaderCell, localStyles.tableCellMiddle]}>
              <Text style={[localStyles.tableHeaderText, { color: theme.colors.text }]}>Prix de sortie ($)</Text>
            </View>
            <View style={[localStyles.tableHeaderCell, localStyles.tableCellMiddle]}>
              <Text style={[localStyles.tableHeaderText, { color: theme.colors.text }]}>Profit ($)</Text>
            </View>
            <View style={localStyles.tableHeaderCell}>
              <Text style={[localStyles.tableHeaderText, { color: theme.colors.text }]}>Prix de liquidation ($)</Text>
            </View>
          </View>
          
          {/* Lignes du tableau */}
          {iterationDetails.map((detail, index) => (
            <View 
              key={index} 
              style={[
                localStyles.tableRow, 
                index % 2 === 0 ? 
                  { backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' } : 
                  {}
              ]}
            >
              <View style={localStyles.tableCell}>
                <Text style={[localStyles.tableCellText, { color: theme.colors.text }]}>
                  {detail.iteration}
                </Text>
              </View>
              <View style={[localStyles.tableCell, localStyles.tableCellMiddle]}>
                <Text style={[localStyles.tableCellText, { color: theme.colors.text }]}>
                  {roundToTwoDecimals(detail.entryPrice)}
                </Text>
              </View>
              <View style={[localStyles.tableCell, localStyles.tableCellMiddle]}>
                <Text style={[localStyles.tableCellText, { color: theme.colors.text }]}>
                  {detail.exitPrice ? roundToTwoDecimals(detail.exitPrice) : '-'}
                </Text>
              </View>
              <View style={[localStyles.tableCell, localStyles.tableCellMiddle]}>
                <Text style={[
                  localStyles.tableCellText, 
                  { color: getProfitColor(detail) }
                ]}>
                  {calculateProfit(detail)}
                </Text>
              </View>
              <View style={localStyles.tableCell}>
                <Text style={[localStyles.tableCellText, { color: theme.colors.text }]}>
                  {roundToTwoDecimals(detail.liquidationPrice)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  iterationsCard: {
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
  tableContainer: {
    marginVertical: 10,
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
  },
  tableHeaderCell: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    width: 120,
    alignItems: 'center',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
    width: 120,
    alignItems: 'center',
  },
  tableCellMiddle: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftColor: '#e0e0e0',
    borderRightColor: '#e0e0e0',
  },
  tableCellText: {
    fontSize: 14,
    textAlign: 'center',
  },
  cardHeaderWithSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  recoveryInfoContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
    borderRadius: 4,
  },
});

export default IterationsTable; 