import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getThemedStyles } from '../../styles/styles';
import { useTranslation } from 'react-i18next';
import { roundToTwoDecimals } from '../../utils/formatters';

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
  leverage?: number;
};

const IterationsTable: React.FC<Props> = ({ 
  iterationDetails,
  allocationPerTrade,
  leverage
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = getThemedStyles(theme);
  const { t } = useTranslation();
  const [isRecoveryEnabled, setIsRecoveryEnabled] = useState(false);
  const [adjustedDetails, setAdjustedDetails] = useState<IterationDetail[]>([]);
  
  useEffect(() => {
    if (isRecoveryEnabled) {
      const newDetails = iterationDetails.map(detail => {
        const newDetail = { ...detail };
        if (newDetail.profit !== undefined && allocationPerTrade && newDetail.iteration > 1) {
          const recoveryAmount = allocationPerTrade * (detail.iteration - 1);
          newDetail.profit = newDetail.profit + recoveryAmount;
          if (newDetail.exitPrice !== undefined && leverage && newDetail.entryPrice) {
            newDetail.exitPrice = ((newDetail.profit * newDetail.entryPrice) / 
              (allocationPerTrade * leverage)) + newDetail.entryPrice;
          }
        }
        return newDetail;
      });
      setAdjustedDetails(newDetails);
    } else {
      setAdjustedDetails(iterationDetails);
    }
  }, [isRecoveryEnabled, iterationDetails, allocationPerTrade, leverage]);
  
  const getDetailsToDisplay = () => {
    return isRecoveryEnabled ? adjustedDetails : iterationDetails;
  };
  
  const getProfitColor = (profit?: number) => {
    if (profit === undefined) return theme.colors.text;
    return profit > 0 ? theme.colors.profitColor : profit < 0 ? theme.colors.lossColor : theme.colors.text;
  };
  
  if (!iterationDetails || iterationDetails.length === 0) {
    return (
      <View style={[styles.card, { padding: 10, marginVertical: 10 }]}>
        <Text style={{ color: theme.colors.secondaryText, fontStyle: 'italic' }}>
          {t('cards.noIterationDetails')}
        </Text>
      </View>
    );
  }
  
  return (
    <View style={[styles.card, styles.iterationsCard]}>
      <View style={styles.iterationsCardHeaderWithSwitch}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="table" size={22} color={theme.colors.primary} />
          <Text style={styles.cardTitle}>{t('tables.iterationDetails')}</Text>
        </View>
        <View style={styles.iterationsSwitchContainer}>
          <Text style={[styles.secondaryText, { marginRight: 8, fontSize: 13 }]}>
            {t('tables.lossRecovery')}
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
      <View style={styles.dividerStyle} />
      
      {isRecoveryEnabled && allocationPerTrade && (
        <View style={styles.iterationsRecoveryInfoContainer}>
          <Text style={[styles.secondaryText, { fontStyle: 'italic', fontSize: 12 }]}>
            {t('tables.lossRecoveryInfo', { amount: roundToTwoDecimals(allocationPerTrade) })}
          </Text>
        </View>
      )}
      
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <View style={styles.iterationsTableContainer}>
          <View style={styles.iterationsTableHeader}>
            <View style={styles.iterationsTableHeaderCell}>
              <Text style={styles.iterationsTableHeaderText}>{t('tables.iteration')}</Text>
            </View>
            <View style={[styles.iterationsTableHeaderCell, styles.iterationsTableCellMiddle]}>
              <Text style={styles.iterationsTableHeaderText}>{t('tables.entryPrice')}</Text>
            </View>
            <View style={[styles.iterationsTableHeaderCell, styles.iterationsTableCellMiddle]}>
              <Text style={styles.iterationsTableHeaderText}>{t('tables.exitPrice')}</Text>
            </View>
            <View style={[styles.iterationsTableHeaderCell, styles.iterationsTableCellMiddle]}>
              <Text style={styles.iterationsTableHeaderText}>{t('tables.profit')}</Text>
            </View>
            <View style={styles.iterationsTableHeaderCell}>
              <Text style={styles.iterationsTableHeaderText}>{t('tables.liquidationPrice')}</Text>
            </View>
          </View>
          
          {getDetailsToDisplay().map((detail, index) => (
            <View 
              key={index} 
              style={[
                styles.iterationsTableRow, 
                index % 2 === 0 ? 
                  { backgroundColor: theme.dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' } : 
                  {}
              ]}
            >
              <View style={styles.iterationsTableCell}>
                <Text style={styles.iterationsTableCellText}>{detail.iteration}</Text>
              </View>
              <View style={[styles.iterationsTableCell, styles.iterationsTableCellMiddle]}>
                <Text style={styles.iterationsTableCellText}>{roundToTwoDecimals(detail.entryPrice)}</Text>
              </View>
              <View style={[styles.iterationsTableCell, styles.iterationsTableCellMiddle]}>
                <Text style={styles.iterationsTableCellText}>
                  {detail.exitPrice ? roundToTwoDecimals(detail.exitPrice) : '-'}
                </Text>
              </View>
              <View style={[styles.iterationsTableCell, styles.iterationsTableCellMiddle]}>
                <Text style={[
                  styles.iterationsTableCellText, 
                  { color: getProfitColor(detail.profit) }
                ]}>
                  {detail.profit !== undefined ? roundToTwoDecimals(detail.profit) : '-'}
                </Text>
              </View>
              <View style={styles.iterationsTableCell}>
                <Text style={styles.iterationsTableCellText}>{roundToTwoDecimals(detail.liquidationPrice)}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default IterationsTable; 