export type CalculationResult = {
  success: boolean;
  error?: string;
  iterations?: number;
  floor?: number;
  ceil?: number;
  priceFloor?: number;
  priceCeil?: number;
  targetPrice?: number;
  balance?: number;
  allocationPerTrade?: number;
  leverage?: number;
  iterationDetails?: Array<{
    iteration: number;
    entryPrice: number;
    liquidationPrice: number;
    exitPrice?: number;
    profit?: number;
  }>;
};

export function calculateIterations(
  initial: number,
  final: number,
  reductionPercent: number,
  balance?: number,
  targetValue?: number,
  targetIsPercentage?: boolean
): CalculationResult {
  const reductionRate = reductionPercent / 100;

  if (isNaN(initial) || isNaN(final) || isNaN(reductionPercent) || 
      initial <= 0 || final <= 0 || reductionRate <= 0 || final >= initial) {
    return {
      success: false,
      error: "Erreur : Les valeurs doivent être valides et le prix final doit être inférieur au prix initial."
    };
  }

  const iterations = Math.log(final / initial) / Math.log(1 - reductionRate);
  const floor = Math.floor(iterations);
  const ceil = Math.ceil(iterations);

  const priceFloor = initial * Math.pow(1 - reductionRate, floor);
  const priceCeil = initial * Math.pow(1 - reductionRate, ceil);

  // Calculer le montant alloué par trade
  let allocationPerTrade = undefined;
  if (balance && balance > 0 && ceil > 0) {
    allocationPerTrade = balance / ceil;
  }

  // Calculer le levier
  const leverage = Math.floor(100 / reductionPercent);
  
  // Générer les détails des itérations
  const iterationDetails = [];
  let currentPrice = initial;
  
  for (let i = 1; i <= ceil; i++) {
    const nextPrice = currentPrice * (1 - reductionRate);
    
    // Calculer le prix de sortie
    let exitPrice = undefined;
    let profit = undefined;
    
    if (targetValue !== undefined) {
      if (targetIsPercentage) {
        // Si Target est en pourcentage, calculer le prix de sortie comme prix d'entrée * (1 + target/100)
        exitPrice = currentPrice * (1 + targetValue / 100);
      } else {
        // Si Target est en valeur absolue, utiliser directement cette valeur
        exitPrice = targetValue;
      }
      
      // Calculer le profit si on a le prix de sortie et le montant par trade
      if (allocationPerTrade && leverage) {
        // Profit = (Prix Sortie - Prix entrée) * (Montant Par Trade * Levier / Prix entrée)
        profit = (exitPrice - currentPrice) * (allocationPerTrade * leverage / currentPrice);
      }
    }
    
    iterationDetails.push({
      iteration: i,
      entryPrice: currentPrice,
      liquidationPrice: nextPrice,
      exitPrice,
      profit
    });
    currentPrice = nextPrice;
  }
  
  return {
    success: true,
    iterations,
    floor,
    ceil,
    priceFloor,
    priceCeil,
    targetPrice: final,
    balance: balance && balance > 0 ? balance : undefined,
    allocationPerTrade,
    leverage,
    iterationDetails
  };
}
