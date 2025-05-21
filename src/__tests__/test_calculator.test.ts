import { calculateIterations } from "../utils/calculator";

// Tests pour validateInputs (fonction interne)
describe("validation des entrées", () => {
  test("retourne une erreur pour des valeurs NaN", () => {
    const result = calculateIterations(NaN, 50, 10);
    expect(result.success).toBe(false);
    expect(result.error).toBe("calculator.error.invalidValues");
  });

  test("retourne une erreur pour des valeurs négatives ou zéro", () => {
    const result1 = calculateIterations(0, 50, 10);
    const result2 = calculateIterations(100, 0, 10);
    const result3 = calculateIterations(100, 50, 0);

    expect(result1.success).toBe(false);
    expect(result2.success).toBe(false);
    expect(result3.success).toBe(false);
    expect(result1.error).toBe("calculator.error.invalidValues");
  });

  test("retourne une erreur si prix final >= prix initial", () => {
    const result1 = calculateIterations(100, 100, 10);
    const result2 = calculateIterations(100, 110, 10);

    expect(result1.success).toBe(false);
    expect(result2.success).toBe(false);
    expect(result1.error).toBe("calculator.error.invalidValues");
  });
});

// Tests pour calculateExitPriceAndProfit (via calcul complet)
describe("calcul du prix de sortie et du profit", () => {
  test("calcule le prix de sortie en pourcentage", () => {
    const result = calculateIterations(100, 50, 10, 1000, 5, true);

    expect(result.success).toBe(true);
    expect(result.iterationDetails).toBeDefined();

    if (result.iterationDetails) {
      const firstIteration = result.iterationDetails[0];
      // Prix de sortie = 100 * (1 + 5/100) = 105
      expect(firstIteration.exitPrice).toBeCloseTo(105);
    }
  });

  test("calcule le prix de sortie en valeur absolue", () => {
    const result = calculateIterations(100, 50, 10, 1000, 120, false);

    expect(result.success).toBe(true);
    expect(result.iterationDetails).toBeDefined();

    if (result.iterationDetails) {
      const firstIteration = result.iterationDetails[0];
      // Prix de sortie = 120 (valeur absolue)
      expect(firstIteration.exitPrice).toBeCloseTo(120);
    }
  });

  test("calcule le profit correctement", () => {
    const result = calculateIterations(100, 50, 10, 1000, 120, false);

    expect(result.success).toBe(true);
    expect(result.iterationDetails).toBeDefined();

    if (
      result.iterationDetails &&
      result.allocationPerTrade &&
      result.leverage
    ) {
      const firstIteration = result.iterationDetails[0];
      // Allocation par trade = 1000 / 7 = 142.86
      // Levier = 10
      // Profit = (120 - 100) * (142.86 * 10 / 100) = 20 * 14.286 = 285.72
      const expectedProfit =
        (120 - 100) * ((result.allocationPerTrade * result.leverage) / 100);
      expect(firstIteration.profit).toBeCloseTo(expectedProfit);
    }
  });

  test("gère les paramètres manquants correctement", () => {
    const result = calculateIterations(100, 50, 10);

    expect(result.success).toBe(true);
    expect(result.iterationDetails).toBeDefined();

    if (result.iterationDetails) {
      const firstIteration = result.iterationDetails[0];
      expect(firstIteration.exitPrice).toBeUndefined();
      expect(firstIteration.profit).toBeUndefined();
    }
  });
});

// Tests pour generateIterationDetails (via calcul complet)
describe("génération des détails d'itération", () => {
  test("génère le bon nombre d'itérations", () => {
    const result = calculateIterations(100, 50, 10);

    expect(result.success).toBe(true);
    expect(result.ceil).toBe(7); // Log(50/100) / Log(1-0.1) = Log(0.5) / Log(0.9) ≈ 6.58 → 7 au plafond
    expect(result.iterationDetails).toBeDefined();
    expect(result.iterationDetails?.length).toBe(7);
  });

  test("calcule les prix d'entrée et de liquidation correctement", () => {
    const result = calculateIterations(100, 50, 10);

    expect(result.success).toBe(true);
    expect(result.iterationDetails).toBeDefined();

    if (result.iterationDetails) {
      // Premier prix = 100
      expect(result.iterationDetails[0].entryPrice).toBeCloseTo(100);
      // Prix de liquidation = 100 * (1 - 0.1) = 90
      expect(result.iterationDetails[0].liquidationPrice).toBeCloseTo(90);

      // Deuxième prix = 90
      expect(result.iterationDetails[1].entryPrice).toBeCloseTo(90);
      // Prix de liquidation = 90 * (1 - 0.1) = 81
      expect(result.iterationDetails[1].liquidationPrice).toBeCloseTo(81);
    }
  });
});

// Tests pour calculateIterations (fonction principale)
describe("calcul principal des itérations", () => {
  test("calcule les valeurs correctement avec des entrées valides", () => {
    const result = calculateIterations(100, 50, 10);

    expect(result.success).toBe(true);
    expect(result.iterations).toBeCloseTo(6.58); // Log(50/100) / Log(1-0.1)
    expect(result.floor).toBe(6);
    expect(result.ceil).toBe(7);
    expect(result.priceFloor).toBeCloseTo(53.14); // 100 * (1-0.1)^6
    expect(result.priceCeil).toBeCloseTo(47.83); // 100 * (1-0.1)^7
    expect(result.targetPrice).toBe(50);
    expect(result.leverage).toBe(10); // 100 / 10
  });

  test("calcule l'allocation par trade quand le solde est fourni", () => {
    const result = calculateIterations(100, 50, 10, 1000);

    expect(result.success).toBe(true);
    expect(result.balance).toBe(1000);
    expect(result.allocationPerTrade).toBeCloseTo(142.86); // 1000 / 7
  });

  test("gère correctement un solde de zéro ou négatif", () => {
    const result1 = calculateIterations(100, 50, 10, 0);
    const result2 = calculateIterations(100, 50, 10, -100);

    expect(result1.success).toBe(true);
    expect(result2.success).toBe(true);
    expect(result1.balance).toBeUndefined();
    expect(result2.balance).toBeUndefined();
    expect(result1.allocationPerTrade).toBeUndefined();
    expect(result2.allocationPerTrade).toBeUndefined();
  });

  test("inclut tous les paramètres dans le résultat", () => {
    const result = calculateIterations(100, 50, 10, 1000, 120, false);

    expect(result.success).toBe(true);
    expect(result.iterations).toBeDefined();
    expect(result.floor).toBeDefined();
    expect(result.ceil).toBeDefined();
    expect(result.priceFloor).toBeDefined();
    expect(result.priceCeil).toBeDefined();
    expect(result.targetPrice).toBeDefined();
    expect(result.balance).toBeDefined();
    expect(result.allocationPerTrade).toBeDefined();
    expect(result.leverage).toBeDefined();
    expect(result.iterationDetails).toBeDefined();
  });
});
