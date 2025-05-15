import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CalculationResult as CalculationResultType } from '../utils/calculator';
import ErrorCard from './cards/ErrorCard';
import SummaryCard from './cards/SummaryCard';
import ResultCard from './cards/ResultCard';
import AllocationCard from './cards/AllocationCard';
import IterationsTable from './tables/IterationsTable';

type Props = {
  result: CalculationResultType;
};

const CalculationResultCard: React.FC<Props> = ({ result }) => {
  if (!result.success) {
    return <ErrorCard message={result.error || 'Une erreur est survenue.'} />;
  }

  return (
    <View style={styles.resultContainer}>
      {/* Carte de résumé */}
      {result.iterations && result.floor && result.ceil && result.targetPrice && (
        <SummaryCard 
          iterations={result.iterations} 
          floor={result.floor} 
          ceil={result.ceil} 
          targetPrice={result.targetPrice} 
        />
      )}
      
      {/* Cartes de résultat min/max */}
      <View style={styles.cardRow}>
        {result.floor !== undefined && result.priceFloor !== undefined && (
          <ResultCard 
            type="min" 
            iterations={result.floor} 
            price={result.priceFloor} 
          />
        )}
        
        {result.ceil !== undefined && result.priceCeil !== undefined && (
          <ResultCard 
            type="max" 
            iterations={result.ceil} 
            price={result.priceCeil} 
          />
        )}
      </View>
      
      {/* Carte d'allocation des fonds */}
      {result.balance && result.allocationPerTrade && result.leverage && result.ceil && (
        <AllocationCard 
          balance={result.balance} 
          trades={result.ceil} 
          allocationPerTrade={result.allocationPerTrade} 
          leverage={result.leverage}
        />
      )}
      
      {/* Tableau des itérations */}
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

export default CalculationResultCard; 