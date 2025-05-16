import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getThemedStyles } from '../../styles/styles';
import { useTranslation } from 'react-i18next';
import { roundToTwoDecimals } from '../../utils/formatters';

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
  const { t } = useTranslation();
  
  return (
    <View style={[styles.card, styles.allocationCard]}>
      <View style={styles.cardHeader}>
        <Ionicons name="wallet-outline" size={22} color={theme.colors.primary} />
        <Text style={styles.cardTitle}>
          {t('cards.allocation')}
        </Text>
      </View>
      <View style={styles.dividerStyle} />
      
      <View style={styles.allocationContent}>
        <View style={styles.allocationRow}>
          <Text style={styles.allocationLabel}>
            {t('cards.totalBalance')}
          </Text>
          <Text style={styles.allocationValue}>
            {balance.toFixed(2)} $
          </Text>
        </View>
        
        <View style={styles.allocationRow}>
          <Text style={styles.allocationLabel}>
            {t('cards.tradesCount')}
          </Text>
          <Text style={styles.allocationValue}>
            {trades}
          </Text>
        </View>
        
        <View style={styles.allocationRow}>
          <Text style={styles.allocationLabel}>
            {t('cards.amountPerTrade')}
          </Text>
          <Text style={[styles.allocationValue, { color: theme.colors.primary, fontWeight: 'bold' }]}>
            {allocationPerTrade.toFixed(2)} $
          </Text>
        </View>

        <View style={[styles.dividerStyle, { marginVertical: 8 }]} />
        
        <View style={styles.allocationRow}>
          <Text style={styles.allocationLabel}>
            {t('cards.recommendedLeverage')}
          </Text>
          <Text style={[styles.allocationValue, { color: theme.colors.primary, fontWeight: 'bold' }]}>
            {leverage}x
          </Text>
        </View>
        
        <Text style={[styles.secondaryText, { fontSize: 12, marginTop: 5, fontStyle: 'italic' }]}>
          {t('cards.leverageInfo', { reduction: roundToTwoDecimals(100/leverage) })}
        </Text>
      </View>
    </View>
  );
};

export default AllocationCard; 