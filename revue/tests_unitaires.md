# Guide des Tests Unitaires pour le Simulateur de Trading

Ce document décrit la structure recommandée pour les tests unitaires et liste les tests à implémenter pour assurer la qualité et la robustesse de l'application de simulateur de trading.

## 1. Structure du Dossier de Tests

Nous utiliserons Jest comme framework de test, qui est souvent inclus par défaut avec les projets React Native (Expo). Les tests seront placés dans un dossier `tests` à la racine du projet.

Voici la structure proposée :

```
trading-simulator-app/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── ThemeToggleButton.tsx
│   │   ├── LanguageSelector.tsx
│   │   └── CalculationResult/
│   │       ├── CalculationResult.tsx
│   │       ├── SummaryCard.tsx
│   │       ├── ResultCard.tsx
│   │       ├── AllocationCard.tsx
│   │       ├── IterationsTable.tsx
│   │       └── ErrorCard.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── CalculatorScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── AboutScreen.tsx
│   ├── navigation/
│   │   └── DrawerNavigator.tsx
│   ├── utils/
│   │   └── calculator.ts
│   ├── translations/
│   │   └── i18n.ts
│   └── ... (autres dossiers)
├── App.tsx
├── index.ts
├── package.json
└── ... (autres fichiers)
```

**Explications de la structure :**

*   `tests/__mocks__/` : Contient les mocks manuels pour les bibliothèques externes ou les modules natifs. Par exemple, `react-native-localize` peut nécessiter un mock pour simuler différentes configurations de langue.
*   `tests/components/` : Tests pour les composants UI. Chaque composant devrait avoir son propre fichier de test. Pour les composants plus complexes composés de plusieurs sous-composants (comme `CalculationResult`), un sous-dossier peut être créé.
*   `tests/screens/` : Tests pour les composants d'écran. Ces tests peuvent vérifier le rendu initial, la présence d'éléments clés et les interactions de base.
*   `tests/navigation/` : Tests pour la configuration de la navigation. On peut vérifier que les écrans sont correctement mappés aux routes et que les options de navigation sont appliquées.
*   `tests/utils/` : Tests pour les fonctions utilitaires, comme celles pour les calculs.
*   `tests/translations/` : Tests pour la configuration et l'initialisation de `i18next`.
*   `tests/setup.ts` : (Optionnel) Peut être utilisé pour la configuration globale de Jest, comme l'ajout de `matchers` personnalisés ou la configuration d'adaptateurs.

## 2. Liste des Tests Unitaires à Implémenter

Voici une liste détaillée des tests unitaires recommandés pour chaque partie de l'application.

### 2.1. Composants (`src/components/`)

#### 2.1.1. `Button.tsx` (`tests/components/Button.test.tsx`)
*   **Rendu** :
    *   Vérifier que le bouton se rend correctement avec un titre donné.
    *   Vérifier que le bouton se rend avec le style par défaut.
    *   Vérifier que le bouton se rend avec un style personnalisé si fourni.
*   **Interaction** :
    *   Vérifier que la fonction `onPress` est appelée lorsque le bouton est pressé.
    *   Vérifier que le bouton est désactivé si la prop `disabled` est `true`.

#### 2.1.2. `Input.tsx` (`tests/components/Input.test.tsx`)
*   **Rendu** :
    *   Vérifier que le champ de saisie se rend correctement avec un `placeholder`.
    *   Vérifier que la valeur initiale est affichée si fournie.
*   **Interaction** :
    *   Vérifier que la fonction `onChangeText` est appelée lorsque le texte change.
    *   Vérifier que le type de clavier (`keyboardType`) est correctement appliqué.

#### 2.1.3. `ThemeToggleButton.tsx` (`tests/components/ThemeToggleButton.test.tsx`)
*   **Contexte de Thème** :
    *   Utiliser un mock du `ThemeContext` pour simuler les états clair et sombre.
*   **Rendu** :
    *   Vérifier que l'icône correcte (soleil/lune) s'affiche en fonction du thème actif.
*   **Interaction** :
    *   Vérifier que la fonction `toggleTheme` du contexte est appelée lors du clic sur le bouton.

#### 2.1.4. `LanguageSelector.tsx` (`tests/components/LanguageSelector.test.tsx`)
*   **Contexte i18n** :
    *   Utiliser `jest.mock('react-i18next')` pour mocker `useTranslation`.
    *   Simuler différentes langues actives.
*   **Rendu** :
    *   Vérifier que les options de langue (Anglais, Français) s'affichent correctement.
    *   Vérifier que le sélecteur affiche la langue actuellement active.
*   **Interaction** :
    *   Vérifier que la fonction `i18n.changeLanguage` est appelée avec la bonne langue lorsque l'utilisateur sélectionne une nouvelle langue.

#### 2.1.5. Composants de `CalculationResult` (`tests/components/CalculationResult/`)

*   **`CalculationResult.tsx`**
    *   **Rendu conditionnel** :
        *   Vérifier que le `ErrorCard` s'affiche si une erreur est passée en props.
        *   Vérifier que `SummaryCard`, `ResultCard`, `AllocationCard`, et `IterationsTable` s'affichent si les données de calcul sont valides et qu'il n'y a pas d'erreur.
*   **`SummaryCard.tsx`**
    *   **Rendu** : Vérifier que toutes les informations récapitulatives (solde, prix initial/final, réduction) sont affichées correctement avec les bonnes traductions.
*   **`ResultCard.tsx`**
    *   **Rendu** : Vérifier que le nombre total d'itérations et le montant total alloué sont affichés correctement avec les bonnes traductions.
*   **`AllocationCard.tsx`**
    *   **Rendu** : Vérifier que le montant alloué par itération est affiché correctement avec les bonnes traductions.
*   **`IterationsTable.tsx`**
    *   **Rendu** :
        *   Vérifier que les en-têtes de tableau (`Iteration`, `Price`, `Allocated`) sont traduits et affichés.
        *   Vérifier qu'une ligne est rendue pour chaque itération dans les données fournies.
        *   Vérifier que les données de chaque itération sont correctement formatées et affichées.
*   **`ErrorCard.tsx`**
    *   **Rendu** : Vérifier que le message d'erreur (traduit si c'est une clé) est affiché correctement.

### 2.2. Écrans (`src/screens/`)

Pour chaque écran, les tests de base devraient inclure :
*   Vérifier que l'écran se rend sans erreur.
*   Vérifier la présence des titres et des éléments UI clés (boutons, champs de saisie) en utilisant leurs clés de traduction ou `testID`.

#### 2.2.1. `HomeScreen.tsx` (`tests/screens/HomeScreen.test.tsx`)
*   **Rendu** :
    *   Vérifier que le message de bienvenue et la description sont affichés et traduits.
    *   Vérifier la présence des boutons de navigation (ex: vers Calculateur, Paramètres).

#### 2.2.2. `CalculatorScreen.tsx` (`tests/screens/CalculatorScreen.test.tsx`)
*   **Rendu** :
    *   Vérifier la présence des champs de saisie (`balance`, `initialPrice`, `finalPrice`, `reductionRate`, `targetPrice`) avec leurs labels traduits.
    *   Vérifier la présence du bouton "Calculer".
*   **Interaction & Logique** :
    *   Simuler la saisie de valeurs valides et vérifier que la fonction de calcul est appelée.
    *   Simuler la saisie de valeurs invalides et vérifier l'affichage d'un message d'erreur.
    *   Vérifier que les résultats du calcul (`CalculationResult`) s'affichent correctement après un calcul réussi.
    *   Vérifier que la fonction `clearCalculation` est appelée et que les champs/résultats sont réinitialisés.

#### 2.2.3. `SettingsScreen.tsx` (`tests/screens/SettingsScreen.test.tsx`)
*   **Rendu** :
    *   Vérifier la présence des sections "Langue" et "Thème" avec leurs titres traduits.
    *   Vérifier que le `LanguageSelector` est rendu.
    *   Vérifier que le `ThemeToggleButton` est rendu.
    *   Vérifier la présence des autres options (Calculateur, À propos, Version) avec leurs textes traduits.
*   **Navigation** :
    *   Vérifier que la navigation vers les écrans "À propos" et "Calculateur" fonctionne (en simulant `navigation.navigate`).

#### 2.2.4. `AboutScreen.tsx` (`tests/screens/AboutScreen.test.tsx`)
*   **Rendu** :
    *   Vérifier que les informations de l'application (nom, version, description) sont affichées et traduites.

### 2.3. Navigation (`src/navigation/`)

#### 2.3.1. `DrawerNavigator.tsx` (`tests/navigation/DrawerNavigator.test.tsx`)
*   **Configuration** :
    *   Vérifier que tous les écrans attendus (`Home`, `Calculator`, `Settings`, `About`) sont définis dans le navigateur.
    *   Vérifier que les labels des éléments du tiroir sont correctement traduits (nécessite de mocker `useTranslation`).
    *   Vérifier que la route initiale est correctement définie.

### 2.4. Utilitaires (`src/utils/`)

#### 2.4.1. `calculator.ts` (`tests/utils/calculator.test.ts`)
*   **`calculateIterations`** :
    *   **Cas nominaux** :
        *   Tester avec des entrées valides et vérifier que le nombre d'itérations, l'allocation par itération, l'allocation totale et les détails de chaque itération sont corrects.
        *   Tester un scénario où le prix final est atteint exactement.
        *   Tester un scénario où le prix final n'est pas atteint (la dernière itération s'arrête avant).
    *   **Cas limites et erreurs** :
        *   Solde insuffisant pour la première itération.
        *   Prix final supérieur ou égal au prix initial.
        *   Taux de réduction nul ou négatif.
        *   Taux de réduction trop élevé (ex: 100% ou plus).
        *   Prix cible (`targetPrice`) atteint avant le prix final.
        *   Vérifier que le message d'erreur (`calculator.error.invalidValues`) est retourné pour les entrées invalides.
    *   **Précision** :
        *   Tester avec des nombres décimaux pour s'assurer de la précision des calculs.

### 2.5. Traductions (`src/translations/`)

#### 2.5.1. `i18n.ts` (`tests/translations/i18n.test.ts`)
*   **Initialisation** :
    *   Vérifier que `i18next` est initialisé correctement.
    *   Vérifier que les ressources (anglais, français) sont chargées.
    *   Vérifier que la langue de repli (`fallbackLng`) est définie sur 'en'.
*   **Détection de la langue** :
    *   Mocker `react-native-localize` pour simuler différentes langues système.
    *   Vérifier que `i18next` utilise la langue détectée ou la langue de repli.
*   **Changement de langue** :
    *   Vérifier que `i18n.changeLanguage()` change effectivement la langue active.
    *   Vérifier que les traductions sont mises à jour après un changement de langue.
*   **Clés de traduction** :
    *   (Optionnel mais recommandé) Avoir un test simple qui vérifie que quelques clés essentielles retournent bien une chaîne non vide pour chaque langue, pour détecter rapidement les clés manquantes.

## 3. Outils et Configuration

*   **Jest** : Framework de test.
*   **React Native Testing Library** (`@testing-library/react-native`) : Pour tester les composants React Native de manière conviviale.
*   **`jest-expo`** : Preset Jest pour les projets Expo, simplifiant la configuration.
*   **TypeScript** : Utiliser les types pour écrire des tests plus robustes.
*   **Mocks** : `jest.fn()` pour les fonctions, `jest.mock()` pour les modules.

## 4. Exécution des Tests

Ajoutez un script dans votre `package.json` pour exécuter les tests :
```json
"scripts": {
  // ... autres scripts
  "test": "jest"
}
```
Puis exécutez `yarn test` ou `npm test`.

Ce guide devrait vous fournir une base solide pour mettre en place une suite de tests unitaires complète pour votre application. N'oubliez pas d'adapter et d'étendre ces tests au fur et à mesure que votre application évolue. 