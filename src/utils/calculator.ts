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
};

export function calculateIterations(
  initial: number,
  final: number,
  reductionPercent: number,
  balance?: number
): CalculationResult {
  const reductionRate = reductionPercent / 100;

  if (initial <= 0 || final <= 0 || reductionRate <= 0 || final >= initial) {
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
    leverage
  };
}
