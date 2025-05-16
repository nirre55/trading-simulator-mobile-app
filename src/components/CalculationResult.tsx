import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { CalculationResult as CalculationResultType } from '../utils/calculator';
import ErrorCard from './cards/ErrorCard';
import SummaryCard from './cards/SummaryCard';
import ResultCard from './cards/ResultCard';
import AllocationCard from './cards/AllocationCard';
import IterationsTable from './tables/IterationsTable';
import { useTranslation } from 'react-i18next';

type Props = {
  result: CalculationResultType;
};

// Composant pour afficher les cartes de résultat min/max
const ResultCards = memo(({ floor, ceil, priceFloor, priceCeil }: {
  floor: number;
  ceil: number;
  priceFloor: number;
  priceCeil: number;
}) => (
  <View style={styles.cardRow}>
    <ResultCard 
      type="min" 
      iterations={floor} 
      price={priceFloor} 
    />
    <ResultCard 
      type="max" 
      iterations={ceil} 
      price={priceCeil} 
    />
  </View>
));

const CalculationResultCard: React.FC<Props> = ({ result }) => {
  const { t } = useTranslation();
  
  // Extraction des données et calculs nécessaires
  const errorMessage = useMemo(() => {
    if (!result.success && result.error) {
      return result.error?.startsWith('calculator.') || result.error?.startsWith('results.') 
        ? t(result.error) 
        : result.error || t('results.error');
    }
    return '';
  }, [result.success, result.error, t]);
  
  // Rendu pour l'erreur
  if (!result.success) {
    return <ErrorCard message={errorMessage} />;
  }

  // Vérification des valeurs requises pour l'affichage des composants
  const showSummary = Boolean(result.iterations && result.floor && result.ceil && result.targetPrice);
  const showResultCards = Boolean(result.floor !== undefined && result.priceFloor !== undefined && 
                               result.ceil !== undefined && result.priceCeil !== undefined);
  const showAllocation = Boolean(result.balance && result.allocationPerTrade && result.leverage && result.ceil);

  return (
    <View style={styles.resultContainer}>
      {showSummary && (
        <SummaryCard 
          iterations={result.iterations!} 
          floor={result.floor!} 
          ceil={result.ceil!} 
          targetPrice={result.targetPrice!} 
        />
      )}
      
      {showResultCards && (
        <ResultCards 
          floor={result.floor!} 
          ceil={result.ceil!} 
          priceFloor={result.priceFloor!} 
          priceCeil={result.priceCeil!} 
        />
      )}
      
      {showAllocation && (
        <AllocationCard 
          balance={result.balance!} 
          trades={result.ceil!} 
          allocationPerTrade={result.allocationPerTrade!} 
          leverage={result.leverage!}
        />
      )}
      
      {result.iterationDetails && (
        <IterationsTable 
          iterationDetails={result.iterationDetails} 
          allocationPerTrade={result.allocationPerTrade}
          leverage={result.leverage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    marginTop: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default memo(CalculationResultCard); 