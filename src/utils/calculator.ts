export function calculateIterations(
  initial: number,
  final: number,
  reductionPercent: number
): string {
  const reductionRate = reductionPercent / 100;

  if (initial <= 0 || final <= 0 || reductionRate <= 0 || final >= initial) {
    return "Erreur : Les valeurs doivent être valides et le prix final doit être inférieur au prix initial.";
  }

  const iterations = Math.log(final / initial) / Math.log(1 - reductionRate);
  const floor = Math.floor(iterations);
  const ceil = Math.ceil(iterations);

  const priceFloor = initial * Math.pow(1 - reductionRate, floor);
  const priceCeil = initial * Math.pow(1 - reductionRate, ceil);

  return (
    `Nombre d'itérations théorique : ${iterations.toFixed(2)}\n` +
    `Avec ${floor} itérations, le prix serait : ${priceFloor.toFixed(2)} $\n` +
    `Avec ${ceil} itérations, le prix serait : ${priceCeil.toFixed(2)} $\n` +
    `Il faut entre ${floor} et ${ceil} itérations pour atteindre ou dépasser ${final.toFixed(
      2
    )} $.`
  );
}
