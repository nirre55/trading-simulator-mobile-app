export type IterationDetail = {
  iteration: number;
  entryPrice: number;
  liquidationPrice: number;
  exitPrice?: number;
  profit?: number;
};

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
  iterationDetails?: IterationDetail[];
};

/**
 * Vérifie la validité des valeurs d'entrée pour le calcul d'itérations
 */
function validateInputs(initial: number, final: number, reductionPercent: number): string | null {
  if (isNaN(initial) || isNaN(final) || isNaN(reductionPercent)) {
    return "calculator.error.invalidValues";
  }
  
  if (initial <= 0 || final <= 0 || reductionPercent <= 0) {
    return "calculator.error.invalidValues";
  }
  
  if (final >= initial) {
    return "calculator.error.invalidValues";
  }
  
  return null;
}

/**
 * Calcule le prix de sortie et le profit potentiel
 */
function calculateExitPriceAndProfit(
  currentPrice: number,
  targetValue: number | undefined,
  targetIsPercentage: boolean | undefined,
  allocationPerTrade: number | undefined,
  leverage: number | undefined
): { exitPrice?: number; profit?: number } {
  if (targetValue === undefined) {
    return { exitPrice: undefined, profit: undefined };
  }
  
  let exitPrice: number | undefined;
  
  if (targetIsPercentage) {
    exitPrice = currentPrice * (1 + targetValue / 100);
  } else {
    exitPrice = targetValue;
  }
  
  let profit: number | undefined;
  if (exitPrice && allocationPerTrade && leverage) {
    profit = (exitPrice - currentPrice) * (allocationPerTrade * leverage / currentPrice);
  }
  
  return { exitPrice, profit };
}

/**
 * Calcule les détails de chaque itération
 */
function generateIterationDetails(
  initial: number, 
  reductionRate: number, 
  ceil: number,
  targetValue?: number,
  targetIsPercentage?: boolean,
  allocationPerTrade?: number,
  leverage?: number
): IterationDetail[] {
  const iterationDetails: IterationDetail[] = [];
  let currentPrice = initial;
  
  for (let i = 1; i <= ceil; i++) {
    const nextPrice = currentPrice * (1 - reductionRate);
    const { exitPrice, profit } = calculateExitPriceAndProfit(
      currentPrice,
      targetValue,
      targetIsPercentage,
      allocationPerTrade,
      leverage
    );
    
    iterationDetails.push({
      iteration: i,
      entryPrice: currentPrice,
      liquidationPrice: nextPrice,
      exitPrice,
      profit
    });
    
    currentPrice = nextPrice;
  }
  
  return iterationDetails;
}

/**
 * Calcule les itérations nécessaires pour atteindre un prix cible
 */
export function calculateIterations(
  initial: number,
  final: number,
  reductionPercent: number,
  balance?: number,
  targetValue?: number,
  targetIsPercentage?: boolean
): CalculationResult {
  // Validation des entrées
  const validationError = validateInputs(initial, final, reductionPercent);
  if (validationError) {
    return {
      success: false,
      error: validationError
    };
  }

  const reductionRate = reductionPercent / 100;
  
  // Calculs principaux
  const iterations = Math.log(final / initial) / Math.log(1 - reductionRate);
  const floor = Math.floor(iterations);
  const ceil = Math.ceil(iterations);
  const priceFloor = initial * Math.pow(1 - reductionRate, floor);
  const priceCeil = initial * Math.pow(1 - reductionRate, ceil);

  // Calcul de l'allocation par trade
  let allocationPerTrade = undefined;
  if (balance && balance > 0 && ceil > 0) {
    allocationPerTrade = balance / ceil;
  }

  // Calcul du levier recommandé
  const leverage = Math.floor(100 / reductionPercent);
  
  // Génération des détails d'itération
  const iterationDetails = generateIterationDetails(
    initial,
    reductionRate,
    ceil,
    targetValue,
    targetIsPercentage,
    allocationPerTrade,
    leverage
  );
  
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
