## Workflow Mis à Jour

Le workflow reste structuré en trois étapes avec deux experts virtuels (Expert X pour la revue/validation, Expert Y pour la correction), mais l’Expert X analyse désormais à la fois le fichier source (ex. : `src/components/Greeting.tsx`) et son fichier de test associé (ex. : `src/__tests__/test_Greeting.test.tsx`) lors de la revue initiale et de la validation. Voici les modifications principales :

1. **Expert X : Revue initiale du code et des tests**
   - Analyse le fichier source (`.ts` ou `.tsx`) dans `src/`.
   - Si un fichier de test existe dans `src/__tests__/` (ex. : `test_[nom_du_fichier].test.tsx`), l’analyse également.
   - Génère un fichier Markdown (`Revue/revue_code_[nom_du_fichier].md`) avec :
     - Une section pour le fichier source (évaluation selon **Structure**, **Clean Code**, **Tests**, **Optimisation**, **Simplicité**).
     - Une section pour le fichier de test (évaluation selon **Structure**, **Clean Code**, **Couverture**, **Clarté**, **Robustesse**).
     - Des tâches pour améliorer le fichier source et le fichier de test.
   - Si aucun fichier de test n’existe, recommande d’en créer un dans la section **Tests** du fichier source.

2. **Expert Y : Correction des commentaires**
   - Corrige le fichier source et le fichier de test (ou en crée un si nécessaire) selon les tâches du fichier `.md`.
   - Met à jour le fichier `.md` en marquant les tâches comme "Résolu" ou en ajoutant de nouvelles tâches.
   - Les corrections incluent les recommandations pour les tests (ex. : ajouter des cas limites, améliorer les mocks).

3. **Expert X : Validation des corrections**
   - Réanalyse le fichier source et le fichier de test corrigés.
   - Génère un nouveau fichier `.md` (`Revue/revue_code_[nom_du_fichier]_iteration[N].md`) avec les résultats pour les deux fichiers.
   - Si la note globale est 10/10 (source et tests parfaits), déplace tous les fichiers `.md` associés dans `Revue/Archives/`.
   - Sinon, renvoie le fichier `.md` à l’Expert Y pour une nouvelle correction.

---

## Détails du Workflow

### Étape 1 : Expert X - Revue initiale du code et des tests

**Objectif** : L’Expert X analyse le fichier source et son fichier de test associé (s’il existe), puis produit un fichier de revue combiné dans `Revue/`.

**Prompt pour le Chat de Revue** :
```plaintext
Tu es un expert en revue de code pour des projets React Native en TypeScript, spécialisé dans l’évaluation de la qualité du code et des tests unitaires. Ta tâche est d’analyser un fichier .ts ou .tsx dans src/ et son fichier de test associé dans src/__tests__/ (s’il existe), selon des critères spécifiques. Génère un fichier Markdown nommé `Revue/revue_code_[nom_du_fichier].md` avec une analyse détaillée des deux fichiers et des tâches pour atteindre la perfection (note globale 10/10).

1. **Analyse des fichiers** :
   - **Fichier source** : Analyse le fichier fourni (ex. : src/components/[nom_du_fichier].tsx).
   - **Fichier de test** : Si un fichier src/__tests__/test_[nom_du_fichier].test.tsx existe, analyse-le. Sinon, note l’absence de tests dans la section Tests du fichier source.
   - Ignore les fichiers qui ne sont pas des sources ou tests principaux (ex. : *.spec.tsx).

2. **Critères d’évaluation** :
   - **Fichier source** :
     - **Structure** : Nom du fichier, emplacement (ex. : src/components/), conventions React Native.
     - **Clean Code** : Lisibilité, typage TypeScript, absence de duplication, conventions.
     - **Tests** : Testabilité du code, présence/qualité des tests dans src/__tests__/.
     - **Optimisation** : Performance, memoization, gestion des ressources.
     - **Simplicité** : Facilité de maintenance, réutilisabilité, absence de complexité.
     - Note globale source : Moyenne des 5 critères, arrondie.
   - **Fichier de test** (si présent) :
     - **Structure** : Nom du fichier, emplacement (ex. : src/__tests__/), organisation des tests.
     - **Clean Code** : Lisibilité, conventions Jest/@testing-library/react-native.
     - **Couverture** : Couverture des cas (normaux, limites, erreurs), mocks appropriés.
     - **Clarté** : Descriptions claires des tests (ex. : `it` descriptifs).
     - **Robustesse** : Tests fiables, pas de dépendances fragiles.
     - Note globale tests : Moyenne des 5 critères, arrondie.
   - **Note globale combinée** : Moyenne des notes globales du fichier source et du fichier de test (ou seulement source si pas de tests), arrondie.

3. **Sortie** :
   - Fichier Markdown : `Revue/revue_code_[nom_du_fichier].md` :
     ```markdown
     # Revue de Code - [nom_du_fichier]

     ## Résumé
     - **Fichier source analysé** : [chemin, ex. : src/components/Greeting.tsx]
     - **Fichier de test analysé** : [chemin, ex. : src/__tests__/test_Greeting.test.tsx ou "Aucun"]
     - **Note globale combinée** : [X/10]
     - **Note globale source** : [X/10]
     - **Notes par critère (source)** :
       - Structure : [X/10]
       - Clean Code : [X/10]
       - Tests : [X/10]
       - Optimisation : [X/10]
       - Simplicité : [X/10]
     - **Note globale tests** : [X/10 ou "N/A"]
     - **Notes par critère (tests)** :
       - Structure : [X/10]
       - Clean Code : [X/10]
       - Couverture : [X/10]
       - Clarté : [X/10]
       - Robustesse : [X/10]

     ## Analyse Détaillée
     ### Fichier Source
     #### Structure
     - **Évaluation** : [Description]
     - **Note** : [X/10]
     - **Problèmes** : [Liste]
     - **Recommandations** : [Solutions]
     ...
     ### Fichier de Test
     #### Structure
     - **Évaluation** : [Description]
     - **Note** : [X/10]
     - **Problèmes** : [Liste]
     - **Recommandations** : [Solutions]
     ...

     ## Tâches pour Atteindre la Perfection
     ### Tâche 1 : [Titre]
     - **Fichier concerné** : [Source ou Test]
     - **Description** : [Explication]
     - **Critère concerné** : [Critère]
     - **Recommandation** : [Solution]
     - **Statut** : À faire
     ...
     ```
   - Si aucun test n’existe, recommande la création dans la section Tests du fichier source.
   - Si parfait (10/10 pour source et tests), indique : "Code et tests parfaits, aucune modification nécessaire."

4. **Bonnes pratiques** :
   - Respecte les conventions React Native et TypeScript pour le source.
   - Vérifie les tests avec Jest/@testing-library/react-native, mocks pour modules natifs (ex. : AsyncStorage).
   - Propose des optimisations spécifiques (ex. : React.memo, cas limites dans les tests).

5. **Gestion des erreurs** :
   - Si le fichier de test est absent, note-le explicitement.
   - Si un fichier est ambigu, documente les hypothèses.

Fichier source à analyser : [Coller le contenu du fichier .ts/.tsx]
Fichier de test à analyser : [Coller le contenu du fichier .test.tsx ou "Aucun"]
Fichier source analysé : [Chemin, ex. : src/components/Greeting.tsx]
Fichier de test analysé : [Chemin, ex. : src/__tests__/test_Greeting.test.tsx ou "Aucun"]
```

**Script Python pour générer les prompts de revue** :
Ce script analyse tous les fichiers `.ts` et `.tsx` dans `src/`, recherche les fichiers de test associés dans `src/__tests__/`, et génère des prompts pour le **Chat de Revue**.

```python
import os
import glob

def generate_review_prompts(src_dir):
    """Génère des prompts pour la revue des fichiers .ts/.tsx et leurs tests associés."""
    revue_dir = "Revue"
    os.makedirs(revue_dir, exist_ok=True)

    # Trouver tous les fichiers .ts/.tsx dans src/, exclure les tests
    files = glob.glob(os.path.join(src_dir, "**", "*.ts"), recursive=True) + \
            glob.glob(os.path.join(src_dir, "**", "*.tsx"), recursive=True)
    files = [f for f in files if "__tests__" not in f and not f.endswith(".test.ts") and not f.endswith(".test.tsx")]

    if not files:
        print(f"Aucun fichier .ts ou .tsx trouvé dans {src_dir}")
        with open(os.path.join(revue_dir, "revue_code_summary.md"), 'w', encoding='utf-8') as f:
            f.write("# Résumé de la Revue de Code\n\nAucun fichier .ts ou .tsx trouvé dans src/.")
        return

    for file_path in files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                src_content = f.read()
        except Exception as e:
            print(f"Erreur lors de la lecture de {file_path}: {e}")
            continue

        file_name = os.path.splitext(os.path.basename(file_path))[0]
        test_file = os.path.join(src_dir, "__tests__", f"test_{file_name}.test.tsx")
        test_content = "Aucun"
        test_file_path = "Aucun"

        # Vérifier si le fichier de test existe
        if os.path.exists(test_file):
            try:
                with open(test_file, 'r', encoding='utf-8') as f:
                    test_content = f.read()
                test_file_path = test_file
            except Exception as e:
                print(f"Erreur lors de la lecture de {test_file}: {e}")
                test_content = "Aucun"
                test_file_path = "Aucun"

        prompt_file = os.path.join(revue_dir, f"prompt_revue_code_{file_name}.txt")
        prompt_content = f"""Tu es un expert en revue de code pour des projets React Native en TypeScript, spécialisé dans l’évaluation de la qualité du code et des tests unitaires. Ta tâche est d’analyser un fichier .ts ou .tsx dans src/ et son fichier de test associé dans src/__tests__/ (s’il existe), selon des critères spécifiques. Génère un fichier Markdown nommé `Revue/revue_code_{file_name}.md` avec une analyse détaillée des deux fichiers et des tâches pour atteindre la perfection (note globale 10/10).

1. **Analyse des fichiers** :
   - **Fichier source** : Analyse le fichier fourni (ex. : src/components/{file_name}.tsx).
   - **Fichier de test** : Si un fichier src/__tests__/test_{file_name}.test.tsx existe, analyse-le. Sinon, note l’absence de tests dans la section Tests du fichier source.
   - Ignore les fichiers qui ne sont pas des sources ou tests principaux (ex. : *.spec.tsx).

2. **Critères d’évaluation** :
   - **Fichier source** :
     - **Structure** : Nom du fichier, emplacement (ex. : src/components/), conventions React Native.
     - **Clean Code** : Lisibilité, typage TypeScript, absence de duplication, conventions.
     - **Tests** : Testabilité du code, présence/qualité des tests dans src/__tests__/.
     - **Optimisation** : Performance, memoization, gestion des ressources.
     - **Simplicité** : Facilité de maintenance, réutilisabilité, absence de complexité.
     - Note globale source : Moyenne des 5 critères, arrondie.
   - **Fichier de test** (si présent) :
     - **Structure** : Nom du fichier, emplacement (ex. : src/__tests__/), organisation des tests.
     - **Clean Code** : Lisibilité, conventions Jest/@testing-library/react-native.
     - **Couverture** : Couverture des cas (normaux, limites, erreurs), mocks appropriés.
     - **Clarté** : Descriptions claires des tests (ex. : `it` descriptifs).
     - **Robustesse** : Tests fiables, pas de dépendances fragiles.
     - Note globale tests : Moyenne des 5 critères, arrondie.
   - **Note globale combinée** : Moyenne des notes globales du fichier source et du fichier de test (ou seulement source si pas de tests), arrondie.

3. **Sortie** :
   - Fichier Markdown : `Revue/revue_code_{file_name}.md` :
     ```markdown
     # Revue de Code - {file_name}

     ## Résumé
     - **Fichier source analysé** : {file_path}
     - **Fichier de test analysé** : {test_file_path}
     - **Note globale combinée** : [X/10]
     - **Note globale source** : [X/10]
     - **Notes par critère (source)** :
       - Structure : [X/10]
       - Clean Code : [X/10]
       - Tests : [X/10]
       - Optimisation : [X/10]
       - Simplicité : [X/10]
     - **Note globale tests** : [X/10 ou "N/A"]
     - **Notes par critère (tests)** :
       - Structure : [X/10]
       - Clean Code : [X/10]
       - Couverture : [X/10]
       - Clarté : [X/10]
       - Robustesse : [X/10]

     ## Analyse Détaillée
     ### Fichier Source
     #### Structure
     - **Évaluation** : [Description]
     - **Note** : [X/10]
     - **Problèmes** : [Liste]
     - **Recommandations** : [Solutions]
     ...
     ### Fichier de Test
     #### Structure
     - **Évaluation** : [Description]
     - **Note** : [X/10]
     - **Problèmes** : [Liste]
     - **Recommandations** : [Solutions]
     ...

     ## Tâches pour Atteindre la Perfection
     ### Tâche 1 : [Titre]
     - **Fichier concerné** : [Source ou Test]
     - **Description** : [Explication]
     - **Critère concerné** : [Critère]
     - **Recommandation** : [Solution]
     - **Statut** : À faire
     ...
     ```
   - Si aucun test n’existe, recommande la création dans la section Tests du fichier source.
   - If perfect (10/10 for source and tests), indicate: "Code and tests perfect, no further changes needed."

4. **Bonnes pratiques** :
   - Respecte les conventions React Native et TypeScript pour le source.
   - Vérifie les tests avec Jest/@testing-library/react-native, mocks pour modules natifs (ex. : AsyncStorage).
   - Propose des optimisations spécifiques (ex. : React.memo, cas limites dans les tests).

5. **Gestion des erreurs** :
   - Si le fichier de test est absent, note-le explicitement.
   - Si un fichier est ambigu, documente les hypothèses.

Fichier source à analyser :
```typescript
{src_content}
```

Fichier de test à analyser :
```typescript
{test_content}
```

Fichier source analysé : {file_path}
Fichier de test analysé : {test_file_path}
"""

        try:
            with open(prompt_file, 'w', encoding='utf-8') as f:
                f.write(prompt_content)
            print(f"Prompt généré : {prompt_file}")
        except Exception as e:
            print(f"Erreur lors de l'écriture de {prompt_file}: {e}")

if __name__ == "__main__":
    src_directory = "src"
    if not os.path.isdir(src_directory):
        print(f"Erreur : Le dossier {src_directory} n’existe pas.")
    else:
        generate_review_prompts(src_directory)
        print("Succès : Tous les prompts de revue ont été générés dans le dossier Revue/.")
```

**Exécution** :
1. Enregistre le script comme `generate_review_prompts.py`.
2. Exécute : `python generate_review_prompts.py`.
3. Soumets chaque fichier `Revue/prompt_revue_code_[nom_du_fichier].txt` au **Chat de Revue**.
4. Le chat génère `Revue/revue_code_[nom_du_fichier].md`.

**Exemple de fichier généré** (pour `src/components/Greeting.tsx` et `src/__tests__/test_Greeting.test.tsx`) :
```markdown
# Revue de Code - Greeting

## Résumé
- **Fichier source analysé** : src/components/Greeting.tsx
- **Fichier de test analysé** : src/__tests__/test_Greeting.test.tsx
- **Note globale combinée** : 7/10
- **Note globale source** : 7/10
- **Notes par critère (source)** :
  - Structure : 8/10
  - Clean Code : 6/10
  - Tests : 7/10
  - Optimisation : 7/10
  - Simplicité : 8/10
- **Note globale tests** : 7/10
- **Notes par critère (tests)** :
  - Structure : 8/10
  - Clean Code : 8/10
  - Couverture : 6/10
  - Clarté : 7/10
  - Robustesse : 7/10

## Analyse Détaillée
### Fichier Source
#### Structure
- **Évaluation** : Fichier bien nommé et dans src/components/.
- **Note** : 8/10
- **Problèmes** : Interface `Props` générique.
- **Recommandations** : Renommer en `GreetingProps`.

#### Clean Code
- **Évaluation** : Code lisible, mais utilise une concaténation de chaînes.
- **Note** : 6/10
- **Problèmes** : Concaténation et variable `greeting` inutile.
- **Recommandations** : Utiliser un template literal, supprimer `greeting`.

#### Tests
- **Évaluation** : Code testable, tests présents mais incomplets.
- **Note** : 7/10
- **Problèmes** : Tests ne couvrent pas tous les cas.
- **Recommandations** : Ajouter un test pour un nom long.

#### Optimisation
- **Évaluation** : Composant léger, mais pas de memoization.
- **Note** : 7/10
- **Problèmes** : Absence de React.memo.
- **Recommandations** : Ajouter React.memo.

#### Simplicité
- **Évaluation** : Simple, mais variable `greeting` redondante.
- **Note** : 8/10
- **Problèmes** : Variable inutile.
- **Recommandations** : Supprimer la variable.

### Fichier de Test
#### Structure
- **Évaluation** : Fichier bien nommé et dans src/__tests__/.
- **Note** : 8/10
- **Problèmes** : Aucun.
- **Recommandations** : Aucune.

#### Clean Code
- **Évaluation** : Tests lisibles, mais manque un JSDoc.
- **Note** : 8/10
- **Problèmes** : Absence de JSDoc.
- **Recommandations** : Ajouter un JSDoc pour `describe`.

#### Couverture
- **Évaluation** : Couvre les cas de base, mais manque un cas limite.
- **Note** : 6/10
- **Problèmes** : Pas de test pour un nom long.
- **Recommandations** : Ajouter un test pour un nom long.

#### Clarté
- **Évaluation** : Descriptions correctes, mais pourraient être plus précises.
- **Note** : 7/10
- **Problèmes** : Descriptions génériques.
- **Recommandations** : Utiliser des descriptions plus spécifiques.

#### Robustesse
- **Évaluation** : Tests fiables, mais dépendent de testIDs.
- **Note** : 7/10
- **Problèmes** : Dépendance aux testIDs.
- **Recommandations** : Ajouter des tests sans testIDs (ex. : texte brut).

## Tâches pour Atteindre la Perfection
### Tâche 1 : Renommer l’interface Props
- **Fichier concerné** : Source
- **Description** : Interface trop générique.
- **Critère concerné** : Structure
- **Recommandation** : Renommer en `GreetingProps`.
- **Statut** : À faire

### Tâche 2 : Simplifier la concaténation de chaînes
- **Fichier concerné** : Source
- **Description** : Concaténation moins lisible.
- **Critère concerné** : Clean Code
- **Recommandation** : Utiliser un template literal.
- **Statut** : À faire

### Tâche 3 : Ajouter un test pour un cas limite
- **Fichier concerné** : Test
- **Description** : Manque un test pour un nom long.
- **Critère concerné** : Couverture
- **Recommandation** : Ajouter :
  ```typescript
  it('renders correctly with long name', () => {
    render(<Greeting name={'A'.repeat(100)} />);
    expect(screen.getByTestId('greeting-text')).toHaveTextContent('Hello, ' + 'A'.repeat(100) + '!');
  });
  ```
- **Statut** : À faire

### Tâche 4 : Ajouter React.memo
- **Fichier concerné** : Source
- **Description** : Pas de memoization.
- **Critère concerné** : Optimisation
- **Recommandation** : Envelopper dans React.memo.
- **Statut** : À faire

### Tâche 5 : Ajouter un JSDoc pour les tests
- **Fichier concerné** : Test
- **Description** : Manque de documentation.
- **Critère concerné** : Clean Code
- **Recommandation** : Ajouter un JSDoc pour `describe`.
- **Statut** : À faire
```

---

### Étape 2 : Expert Y - Correction des commentaires

**Objectif** : L’Expert Y corrige le fichier source et le fichier de test selon les tâches du fichier `.md`, puis met à jour le `.md`.

**Prompt pour le Chat de Développement** (mis à jour pour inclure les tests) :
```plaintext
Tu es un expert en développement React Native avec TypeScript, spécialisé dans la correction de code et de tests unitaires. Ta tâche est de corriger un fichier de code et son fichier de test associé (ou d’en créer un si absent) en fonction d’un fichier de revue Markdown, puis de mettre à jour le fichier de revue en marquant les tâches comme "Résolu". Suis ces instructions :

1. **Analyse des fichiers** :
   - Analyse le fichier source (ex. : src/components/[nom_du_fichier].tsx), le fichier de test (ex. : src/__tests__/test_[nom_du_fichier].test.tsx ou "Aucun"), et le fichier de revue (ex. : Revue/revue_code_[nom_du_fichier].md).
   - Identifie les tâches "À faire" dans "Tâches pour Atteindre la Perfection", en distinguant les tâches pour le fichier source et le fichier de test.

2. **Correction des fichiers** :
   - **Fichier source** :
     - **Structure** : Ajuste le nom, l’emplacement, ou la structure.
     - **Clean Code** : Améliore la lisibilité, utilise des types explicites.
     - **Tests** : Assure la testabilité, corrige selon les recommandations.
     - **Optimisation** : Ajoute React.memo, useCallback, etc.
     - **Simplicité** : Simplifie le code.
   - **Fichier de test** (ou création si absent) :
     - **Structure** : Assure un nom/emplacement correct.
     - **Clean Code** : Améliore la lisibilité, ajoute des JSDoc.
     - **Couverture** : Ajoute des cas (normaux, limites, erreurs).
     - **Clarté** : Utilise des descriptions claires.
     - **Robustesse** : Ajoute des mocks, réduit les dépendances fragiles.
     - Si absent, crée `src/__tests__/test_[nom_du_fichier].test.tsx` avec Jest/@testing-library/react-native.
   - Respecte TypeScript et React Native.

3. **Mise à jour du fichier de revue** :
   - Marque chaque tâche corrigée comme "Résolu" avec une explication.
   - Ajoute de nouvelles tâches si des problèmes subsistent.
   - Recalcule les notes (source et tests) et la note globale combinée.
   - Conserve la structure Markdown.

4. **Sortie** :
   - Fichier source corrigé : src/components/[nom_du_fichier].tsx.
   - Fichier de test corrigé/créé : src/__tests__/test_[nom_du_fichier].test.tsx.
   - Fichier de revue mis à jour : Revue/revue_code_[nom_du_fichier].md.
   - Résumé : Nombre de tâches corrigées, tâches restantes, nouvelle note globale.

5. **Bonnes pratiques** :
   - Utilise des types explicites, évite `any`.
   - Mocke les modules natifs (ex. : AsyncStorage) dans les tests.
   - Assure la performance et la maintenabilité.

6. **Gestion des erreurs** :
   - Si une tâche est ambiguë, propose une solution et note-la.

Fichier source à corriger : [Coller le contenu du fichier .ts/.tsx]
Fichier de test à corriger : [Coller le contenu du fichier .test.tsx ou "Aucun"]
Fichier de revue : [Coller le contenu du fichier .md]
Fichier source analysé : [Chemin, ex. : src/components/Greeting.tsx]
Fichier de test analysé : [Chemin, ex. : src/__tests__/test_Greeting.test.tsx ou "Aucun"]
```

**Script Python pour générer les prompts de correction** :
Ce script est adapté pour inclure le fichier de test dans le prompt.

```python
import os
import glob
import re

def generate_correction_prompts(revue_dir, src_dir):
    """Génère des prompts pour corriger les fichiers de code et leurs tests associés."""
    os.makedirs(revue_dir, exist_ok=True)

    revue_files = glob.glob(os.path.join(revue_dir, "revue_code_*.md"))
    revue_files = [f for f in revue_files if not re.search(r'iteration\d+', f)]

    if not revue_files:
        print(f"Aucun fichier de revue trouvé dans {revue_dir}")
        return

    for revue_file in revue_files:
        match = re.search(r'revue_code_(.+)\.md$', os.path.basename(revue_file))
        if not match:
            print(f"Fichier ignoré : {revue_file} (nom non conforme)")
            continue
        file_name = match.group(1)

        src_file = os.path.join(src_dir, "components", f"{file_name}.tsx")
        if not os.path.exists(src_file):
            src_file = os.path.join(src_dir, f"{file_name}.tsx")
        if not os.path.exists(src_file):
            print(f"Fichier source {file_name}.tsx introuvable pour {revue_file}")
            continue

        test_file = os.path.join(src_dir, "__tests__", f"test_{file_name}.test.tsx")
        test_content = "Aucun"
        test_file_path = "Aucun"
        if os.path.exists(test_file):
            try:
                with open(test_file, 'r', encoding='utf-8') as f:
                    test_content = f.read()
                test_file_path = test_file
            except Exception as e:
                print(f"Erreur lors de la lecture de {test_file}: {e}")

        try:
            with open(src_file, 'r', encoding='utf-8') as f:
                src_content = f.read()
        except Exception as e:
            print(f"Erreur lors de la lecture de {src_file}: {e}")
            continue

        try:
            with open(revue_file, 'r', encoding='utf-8') as f:
                revue_content = f.read()
        except Exception as e:
            print(f"Erreur lors de la lecture de {revue_file}: {e}")
            continue

        prompt_file = os.path.join(revue_dir, f"prompt_correction_{file_name}.txt")
        prompt_content = f"""Tu es un expert en développement React Native avec TypeScript, spécialisé dans la correction de code et de tests unitaires. Ta tâche est de corriger un fichier de code et son fichier de test associé (ou d’en créer un si absent) en fonction d’un fichier de revue Markdown, puis de mettre à jour le fichier de revue en marquant les tâches comme "Résolu". Suis ces instructions :

1. **Analyse des fichiers** :
   - Analyse le fichier source (ex. : src/components/{file_name}.tsx), le fichier de test (ex. : src/__tests__/test_{file_name}.test.tsx ou "Aucun"), et le fichier de revue (ex. : Revue/revue_code_{file_name}.md).
   - Identifie les tâches "À faire" dans "Tâches pour Atteindre la Perfection", en distinguant les tâches pour le fichier source et le fichier de test.

2. **Correction des fichiers** :
   - **Fichier source** :
     - **Structure** : Ajuste le nom, l’emplacement, ou la structure.
     - **Clean Code** : Améliore la lisibilité, utilise des types explicites.
     - **Tests** : Assure la testabilité, corrige selon les recommandations.
     - **Optimisation** : Ajoute React.memo, useCallback, etc.
     - **Simplicité** : Simplifie le code.
   - **Fichier de test** (ou création si absent) :
     - **Structure** : Assure un nom/emplacement correct.
     - **Clean Code** : Améliore la lisibilité, ajoute des JSDoc.
     - **Couverture** : Ajoute des cas (normaux, limites, erreurs).
     - **Clarté** : Utilise des descriptions claires.
     - **Robustesse** : Ajoute des mocks, réduit les dépendances fragiles.
     - Si absent, crée `src/__tests__/test_{file_name}.test.tsx` avec Jest/@testing-library/react-native.
   - Respecte TypeScript et React Native.

3. **Mise à jour du fichier de revue** :
   - Marque chaque tâche corrigée comme "Résolu" avec une explication.
   - Ajoute de nouvelles tâches si des problèmes subsistent.
   - Recalcule les notes (source et tests) et la note globale combinée.
   - Conserve la structure Markdown.

4. **Sortie** :
   - Fichier source corrigé : src/components/{file_name}.tsx.
   - Fichier de test corrigé/créé : src/__tests__/test_{file_name}.test.tsx.
   - Fichier de revue mis à jour : Revue/revue_code_{file_name}.md.
   - Résumé : Nombre de tâches corrigées, tâches restantes, nouvelle note globale.

5. **Bonnes pratiques** :
   - Utilise des types explicites, évite `any`.
   - Mocke les modules natifs (ex. : AsyncStorage) dans les tests.
   - Assure la performance et la maintenabilité.

6. **Gestion des erreurs** :
   - Si une tâche est ambiguë, propose une solution et note-la.

Fichier source à corriger :
```typescript
{src_content}
```

Fichier de test à corriger :
```typescript
{test_content}
```

Fichier de revue :
```markdown
{revue_content}
```

Fichier source analysé : {src_file}
Fichier de test analysé : {test_file_path}
"""

        try:
            with open(prompt_file, 'w', encoding='utf-8') as f:
                f.write(prompt_content)
            print(f"Prompt de correction généré : {prompt_file}")
        except Exception as e:
            print(f"Erreur lors de l'écriture de {prompt_file}: {e}")

if __name__ == "__main__":
    revue_directory = "Revue"
    src_directory = "src"
    if not os.path.isdir(revue_directory) or not os.path.isdir(src_directory):
        print(f"Erreur : Vérifiez que {revue_directory} et {src_directory} existent.")
    else:
        generate_correction_prompts(revue_directory, src_directory)
        print("Succès : Tous les prompts de correction ont été générés dans le dossier Revue/.")
```

**Exécution** :
1. Enregistre le script comme `generate_correction_prompts.py`.
2. Exécute : `python generate_correction_prompts.py`.
3. Soumets chaque `Revue/prompt_correction_[nom_du_fichier].txt` au **Chat de Développement**.
4. Le chat produit :
   - Fichier source corrigé : `src/components/[nom_du_fichier].tsx`.
   - Fichier de test corrigé/créé : `src/__tests__/test_[nom_du_fichier].test.tsx`.
   - Fichier `.md` mis à jour : `Revue/revue_code_[nom_du_fichier].md`.

**Exemple de fichiers corrigés** :
- **Fichier source corrigé** : `src/components/Greeting.tsx`
  ```typescript
  import React from 'react';
  import { View, Text } from 'react-native';

  interface GreetingProps {
    name: string;
  }

  const Greeting: React.FC<GreetingProps> = ({ name }) => {
    if (!name) throw new Error('Name is required');
    return (
      <View testID="greeting-container">
        <Text testID="greeting-text">Hello, {name}!</Text>
      </View>
    );
  };

  export default React.memo(Greeting);
  ```

- **Fichier de test corrigé** : `src/__tests__/test_Greeting.test.tsx`
  ```typescript
  /**
   * Tests for the Greeting component.
   */
  import { render, screen } from '@testing-library/react-native';
  import Greeting from '../components/Greeting';

  describe('Greeting Component', () => {
    it('renders greeting with valid name', () => {
      render(<Greeting name="Alice" />);
      expect(screen.getByText('Hello, Alice!')).toBeTruthy();
    });

    it('throws error when name is empty', () => {
      const renderWithEmptyName = () => render(<Greeting name="" />);
      expect(renderWithEmptyName).toThrow('Name is required');
    });

    it('renders correctly with long name', () => {
      const longName = 'A'.repeat(100);
      render(<Greeting name={longName} />);
      expect(screen.getByText(`Hello, ${longName}!`)).toBeTruthy();
    });
  });
  ```

- **Fichier `.md` mis à jour** :
  ```markdown
  # Revue de Code - Greeting

  ## Résumé
  - **Fichier source analysé** : src/components/Greeting.tsx
  - **Fichier de test analysé** : src/__tests__/test_Greeting.test.tsx
  - **Note globale combinée** : 9/10
  - **Note globale source** : 9/10
  - **Notes par critère (source)** :
    - Structure : 9/10
    - Clean Code : 9/10
    - Tests : 9/10
    - Optimisation : 9/10
    - Simplicité : 9/10
  - **Note globale tests** : 9/10
  - **Notes par critère (tests)** :
    - Structure : 9/10
    - Clean Code : 9/10
    - Couverture : 9/10
    - Clarté : 9/10
    - Robustesse : 8/10

  ## Analyse Détaillée
  ### Fichier Source
  #### Structure
  - **Évaluation** : Interface renommée en `GreetingProps`.
  - **Note** : 9/10
  - **Problèmes** : Aucun.
  - **Recommandations** : Aucune.

  #### Clean Code
  - **Évaluation** : Template literal utilisé, variable supprimée.
  - **Note** : 9/10
  - **Problèmes** : Manque un JSDoc.
  - **Recommandations** : Ajouter un JSDoc.

  ...

  ### Fichier de Test
  #### Structure
  - **Évaluation** : Fichier bien nommé et organisé.
  - **Note** : 9/10
  - **Problèmes** : Aucun.
  - **Recommandations** : Aucune.

  #### Robustesse
  - **Évaluation** : Tests fiables, mais dépendance aux testIDs.
  - **Note** : 8/10
  - **Problèmes** : Dépendance aux testIDs.
  - **Recommandations** : Ajouter des tests sans testIDs.

  ## Tâches pour Atteindre la Perfection
  ### Tâche 1 : Renommer l’interface Props
  - **Fichier concerné** : Source
  - **Description** : Interface trop générique.
  - **Critère concerné** : Structure
  - **Recommandation** : Renommer en `GreetingProps`.
  - **Statut** : Résolu (Renommée en `GreetingProps`)

  ### Tâche 2 : Simplifier la concaténation de chaînes
  - **Fichier concerné** : Source
  - **Description** : Concaténation moins lisible.
  - **Critère concerné** : Clean Code
  - **Recommandation** : Utiliser un template literal.
  - **Statut** : Résolu (Template literal utilisé)

  ### Tâche 3 : Ajouter un test pour un cas limite
  - **Fichier concerné** : Test
  - **Description** : Manque un test pour un nom long.
  - **Critère concerné** : Couverture
  - **Recommandation** : Ajouter un test.
  - **Statut** : Résolu (Test ajouté)

  ### Tâche 4 : Ajouter React.memo
  - **Fichier concerné** : Source
  - **Description** : Pas de memoization.
  - **Critère concerné** : Optimisation
  - **Recommandation** : Envelopper dans React.memo.
  - **Statut** : Résolu (React.memo ajouté)

  ### Tâche 5 : Ajouter un JSDoc pour les tests
  - **Fichier concerné** : Test
  - **Description** : Manque de documentation.
  - **Critère concerné** : Clean Code
  - **Recommandation** : Ajouter un JSDoc pour `describe`.
  - **Statut** : Résolu (JSDoc ajouté)

  ### Tâche 6 : Ajouter un JSDoc pour le source
  - **Fichier concerné** : Source
  - **Description** : Manque de documentation.
  - **Critère concerné** : Clean Code
  - **Recommandation** : Ajouter un JSDoc :
    ```typescript
    /**
     * A component that displays a greeting message.
     * @param name - The name to display in the greeting.
     */
    ```
  - **Statut** : À faire

  ### Tâche 7 : Réduire la dépendance aux testIDs
  - **Fichier concerné** : Test
  - **Description** : Dépendance excessive aux testIDs.
  - **Critère concerné** : Robustesse
  - **Recommandation** : Ajouter des tests basés sur le texte brut.
  - **Statut** : À faire
  ```

---

### Étape 3 : Expert X - Validation des corrections

**Objectif** : L’Expert X réanalyse le fichier source et le fichier de test corrigés, génère un fichier `.md` d’itération, et décide si le fichier est validé (archivage) ou renvoyé pour correction.

**Prompt pour le Chat de Revue** (mis à jour pour inclure les tests) :
```plaintext
Tu es un expert en revue de code pour des projets React Native en TypeScript, spécialisé dans la validation des corrections pour le code et les tests unitaires. Ta tâche est de réanalyser un fichier source corrigé et son fichier de test associé pour vérifier si les recommandations d’un fichier de revue ont été appliquées, en évaluant selon des critères spécifiques. Si la note globale combinée est 10/10, indique que le fichier .md peut être archivé. Sinon, génère un nouveau fichier .md pour une nouvelle correction.

1. **Analyse des fichiers** :
   - Analyse le fichier source corrigé (ex. : src/components/[nom_du_fichier].tsx), le fichier de test (ex. : src/__tests__/test_[nom_du_fichier].test.tsx), et le fichier de revue (ex. : Revue/revue_code_[nom_du_fichier].md).
   - Vérifie chaque tâche ("À faire" ou "Résolu") dans "Tâches pour Atteindre la Perfection" pour le source et le test.

2. **Évaluation** :
   - **Fichier source** :
     - **Structure** : Nom, emplacement, conventions.
     - **Clean Code** : Lisibilité, typage, conventions.
     - **Tests** : Testabilité, qualité des tests associés.
     - **Optimisation** : Performance, memoization.
     - **Simplicité** : Maintenabilité, réutilisabilité.
     - Note globale source : Moyenne des critères.
   - **Fichier de test** :
     - **Structure** : Nom, emplacement, organisation.
     - **Clean Code** : Lisibilité, conventions Jest.
     - **Couverture** : Cas couverts, mocks.
     - **Clarté** : Descriptions claires.
     - **Robustesse** : Fiabilité des tests.
     - Note globale tests : Moyenne des critères.
   - **Note globale combinée** : Moyenne des notes source et tests.
   - Compare avec la revue précédente.

3. **Validation** :
   - Confirme si les tâches "Résolu" sont correctes.
   - Vérifie si les tâches "À faire" ont été corrigées.
   - Identifie de nouveaux problèmes.
   - Si note globale combinée = 10/10, indique : "Validé, archiver dans Revue/Archives/."
   - Sinon, liste les tâches restantes/nouvelles.

4. **Sortie** :
   - Fichier Markdown : `Revue/revue_code_[nom_du_fichier]_iteration[N].md` :
     ```markdown
     # Validation des Corrections - [nom_du_fichier] (Itération [N])

     ## Résumé
     - **Fichier source analysé** : [chemin]
     - **Fichier de test analysé** : [chemin]
     - **Note globale combinée** : [X/10]
     - **Note globale source** : [X/10]
     - **Notes par critère (source)** :
       - Structure : [X/10]
       - Clean Code : [X/10]
       - Tests : [X/10]
       - Optimisation : [X/10]
       - Simplicité : [X/10]
     - **Note globale tests** : [X/10]
     - **Notes par critère (tests)** :
       - Structure : [X/10]
       - Clean Code : [X/10]
       - Couverture : [X/10]
       - Clarté : [X/10]
       - Robustesse : [X/10]
     - **Comparaison** : [Ex. : "Note passée de 7/10 à 9/10"]
     - **Statut** : [Ex. : "5/7 tâches corrigées, 2 restantes"]

     ## Analyse Détaillée
     ### Fichier Source
     #### Structure
     - **Évaluation** : [Description]
     - **Note** : [X/10]
     - **Problèmes** : [Liste]
     - **Recommandations** : [Solutions]
     ...
     ### Fichier de Test
     #### Structure
     - **Évaluation** : [Description]
     - **Note** : [X/10]
     - **Problèmes** : [Liste]
     - **Recommandations** : [Solutions]
     ...

     ## Tâches pour Atteindre la Perfection
     ### Tâche 1 : [Titre]
     - **Fichier concerné** : [Source ou Test]
     - **Description** : [Explication]
     - **Critère concerné** : [Critère]
     - **Recommandation** : [Solution]
     - **Statut** : [Résolu/À faire/En attente] ([Détails])
     ...
     ```
   - Si validé (10/10) : "Validé, archiver dans Revue/Archives/."
   - Sinon, renvoyer pour correction.

5. **Bonnes pratiques** :
   - Respecte TypeScript et React Native.
   - Vérifie les tests avec Jest/@testing-library/react-native.
   - Assure qu’aucun nouveau problème n’est introduit.

6. **Gestion des erreurs** :
   - Documente les corrections incorrectes ou ambiguïtés.

Fichier source corrigé : [Coller le contenu du fichier .ts/.tsx]
Fichier de test corrigé : [Coller le contenu du fichier .test.tsx]
Fichier de revue original : [Coller le contenu du fichier .md]
Fichier source analysé : [Chemin, ex. : src/components/Greeting.tsx]
Fichier de test analysé : [Chemin, ex. : src/__tests__/test_Greeting.test.tsx]
Itération : [N, ex. : 2]
```

**Script Python pour générer les prompts de validation** :
Ce script est adapté pour inclure le fichier de test et gérer l’archivage.

```python
import os
import glob
import re
import shutil

def get_next_iteration(revue_dir, file_name):
    """Retourne le numéro de la prochaine itération."""
    existing_reviews = glob.glob(os.path.join(revue_dir, f"revue_code_{file_name}_iteration*.md"))
    iterations = [int(re.search(r'iteration(\d+)', f).group(1)) for f in existing_reviews if re.search(r'iteration(\d+)', f)]
    return max(iterations) + 1 if iterations else 2

def archive_reviews(revue_dir, file_name):
    """Déplace les fichiers de revue dans Revue/Archives/."""
    archive_dir = os.path.join(revue_dir, "Archives")
    os.makedirs(archive_dir, exist_ok=True)
    review_files = glob.glob(os.path.join(revue_dir, f"revue_code_{file_name}*.md"))
    for review_file in review_files:
        if "Archives" not in review_file:
            shutil.move(review_file, os.path.join(archive_dir, os.path.basename(review_file)))
            print(f"Archivé : {review_file} -> {archive_dir}")

def generate_validation_prompts(revue_dir, src_dir):
    """Génère des prompts pour valider les corrections des fichiers source et tests."""
    os.makedirs(revue_dir, exist_ok=True)

    revue_files = glob.glob(os.path.join(revue_dir, "revue_code_*.md"))
    revue_files = [f for f in revue_files if not re.search(r'iteration\d+', f)]

    if not revue_files:
        print(f"Aucun fichier de revue initial trouvé dans {revue_dir}")
        return

    for revue_file in revue_files:
        match = re.search(r'revue_code_(.+)\.md$', os.path.basename(revue_file))
        if not match:
            print(f"Fichier ignoré : {revue_file} (nom non conforme)")
            continue
        file_name = match.group(1)

        src_file = os.path.join(src_dir, "components", f"{file_name}.tsx")
        if not os.path.exists(src_file):
            src_file = os.path.join(src_dir, f"{file_name}.tsx")
        if not os.path.exists(src_file):
            print(f"Fichier source {file_name}.tsx introuvable pour {revue_file}")
            continue

        test_file = os.path.join(src_dir, "__tests__", f"test_{file_name}.test.tsx")
        test_content = "Aucun"
        test_file_path = "Aucun"
        if os.path.exists(test_file):
            try:
                with open(test_file, 'r', encoding='utf-8') as f:
                    test_content = f.read()
                test_file_path = test_file
            except Exception as e:
                print(f"Erreur lors de la lecture de {test_file}: {e}")

        try:
            with open(src_file, 'r', encoding='utf-8') as f:
                src_content = f.read()
        except Exception as e:
            print(f"Erreur lors de la lecture de {src_file}: {e}")
            continue

        try:
            with open(revue_file, 'r', encoding='utf-8') as f:
                revue_content = f.read()
        except Exception as e:
            print(f"Erreur lors de la lecture de {revue_file}: {e}")
            continue

        iteration = get_next_iteration(revue_dir, file_name)
        prompt_file = os.path.join(revue_dir, f"prompt_validation_{file_name}_iteration{iteration}.txt")
        prompt_content = f"""Tu es un expert en revue de code pour des projets React Native en TypeScript, spécialisé dans la validation des corrections pour le code et les tests unitaires. Ta tâche est de réanalyser un fichier source corrigé et son fichier de test associé pour vérifier si les recommandations d’un fichier de revue ont été appliquées, en évaluant selon des critères spécifiques. Si la note globale combinée est 10/10, indique que le fichier .md peut être archivé. Sinon, génère un nouveau fichier .md pour une nouvelle correction.

1. **Analyse des fichiers** :
   - Analyse le fichier source corrigé (ex. : src/components/{file_name}.tsx), le fichier de test (ex. : src/__tests__/test_{file_name}.test.tsx), et le fichier de revue (ex. : Revue/revue_code_{file_name}.md).
   - Vérifie chaque tâche ("À faire" ou "Résolu") dans "Tâches pour Atteindre la Perfection" pour le source et le test.

2. **Évaluation** :
   - **Fichier source** :
     - **Structure** : Nom, emplacement, conventions.
     - **Clean Code** : Lisibilité, typage, conventions.
     - **Tests** : Testabilité, qualité des tests associés.
     - **Optimisation** : Performance, memoization.
     - **Simplicité** : Maintenabilité, réutilisabilité.
     - Note globale source : Moyenne des critères.
   - **Fichier de test** :
     - **Structure** : Nom, emplacement, organisation.
     - **Clean Code** : Lisibilité, conventions Jest.
     - **Couverture** : Cas couverts, mocks.
     - **Clarté** : Descriptions claires.
     - **Robustesse** : Fiabilité des tests.
     - Note globale tests : Moyenne des critères.
   - **Note globale combinée** : Moyenne des notes source et tests.
   - Compare avec la revue précédente.

3. **Validation** :
   - Confirme si les tâches "Résolu" sont correctes.
   - Vérifie si les tâches "À faire" ont été corrigées.
   - Identifie de nouveaux problèmes.
   - Si note globale combinée = 10/10, indique : "Validé, archiver dans Revue/Archives/."
   - Sinon, liste les tâches restantes/nouvelles.

4. **Sortie** :
   - Fichier Markdown : `Revue/revue_code_{file_name}_iteration{iteration}.md` :
     ```markdown
     # Validation des Corrections - {file_name} (Itération {iteration})

     ## Résumé
     - **Fichier source analysé** : {src_file}
     - **Fichier de test analysé** : {test_file_path}
     - **Note globale combinée** : [X/10]
     - **Note globale source** : [X/10]
     - **Notes par critère (source)** :
       - Structure : [X/10]
       - Clean Code : [X/10]
       - Tests : [X/10]
       - Optimisation : [X/10]
       - Simplicité : [X/10]
     - **Note globale tests** : [X/10]
     - **Notes par critère (tests)** :
       - Structure : [X/10]
       - Clean Code : [X/10]
       - Couverture : [X/10]
       - Clarté : [X/10]
       - Robustesse : [X/10]
     - **Comparaison** : [Ex. : "Note passée de 7/10 à 9/10"]
     - **Statut** : [Ex. : "5/7 tâches corrigées, 2 restantes"]

     ## Analyse Détaillée
     ### Fichier Source
     #### Structure
     - **Évaluation** : [Description]
     - **Note** : [X/10]
     - **Problèmes** : [Liste]
     - **Recommandations** : [Solutions]
     ...
     ### Fichier de Test
     #### Structure
     - **Évaluation** : [Description]
     - **Note** : [X/10]
     - **Problèmes** : [Liste]
     - **Recommandations** : [Solutions]
     ...

     ## Tâches pour Atteindre la Perfection
     ### Tâche 1 : [Titre]
     - **Fichier concerné** : [Source ou Test]
     - **Description** : [Explication]
     - **Critère concerné** : [Critère]
     - **Recommandation** : [Solution]
     - **Statut** : [Résolu/À faire/En attente] ([Détails])
     ...
     ```
   - Si validé (10/10) : "Validé, archiver dans Revue/Archives/."
   - Sinon, renvoyer pour correction.

5. **Bonnes pratiques** :
   - Respecte TypeScript et React Native.
   - Vérifie les tests avec Jest/@testing-library/react-native.
   - Assure qu’aucun nouveau problème n’est introduit.

6. **Gestion des erreurs** :
   - Documente les corrections incorrectes ou ambiguïtés.

Fichier source corrigé :
```typescript
{src_content}
```

Fichier de test corrigé :
```typescript
{test_content}
```

Fichier de revue original :
```markdown
{revue_content}
```

Fichier source analysé : {src_file}
Fichier de test analysé : {test_file_path}
Itération : {iteration}
"""

        try:
            with open(prompt_file, 'w', encoding='utf-8') as f:
                f.write(prompt_content)
            print(f"Prompt de validation généré : {prompt_file}")
        except Exception as e:
            print(f"Erreur lors de l'écriture de {prompt_file}: {e}")

if __name__ == "__main__":
    revue_directory = "Revue"
    src_directory = "src"
    if not os.path.isdir(revue_directory) or not os.path.isdir(src_directory):
        print(f"Erreur : Vérifiez que {revue_directory} et {src_directory} existent.")
    else:
        generate_validation_prompts(revue_directory, src_directory)
        print("Succès : Tous les prompts de validation ont été générés dans le dossier Revue/.")
```

**Script Python pour l’archivage** :
Le script d’archivage reste le même, vérifiant la note globale combinée de 10/10 pour archiver les fichiers `.md`.

```python
import os
import glob
import re
import shutil

def archive_validated_reviews(revue_dir):
    """Archive les fichiers .md validés (note combinée 10/10)."""
    archive_dir = os.path.join(revue_dir, "Archives")
    os.makedirs(archive_dir, exist_ok=True)

    review_files = glob.glob(os.path.join(revue_dir, "revue_code_*.md"))
    for review_file in review_files:
        if "Archives" in review_file or "iteration" not in review_file:
            continue
        try:
            with open(review_file, 'r', encoding='utf-8') as f:
                content = f.read()
            if "Note globale combinée : 10/10" in content or "Validé, archiver dans Revue/Archives/" in content:
                match = re.search(r'revue_code_(.+)_iteration\d+\.md$', os.path.basename(review_file))
                if match:
                    file_name = match.group(1)
                    archive_reviews(revue_dir, file_name)
        except Exception as e:
            print(f"Erreur lors de l’analyse de {review_file}: {e}")

def archive_reviews(revue_dir, file_name):
    """Déplace tous les fichiers de revue associés dans Revue/Archives/."""
    archive_dir = os.path.join(revue_dir, "Archives")
    review_files = glob.glob(os.path.join(revue_dir, f"revue_code_{file_name}*.md"))
    for review_file in review_files:
        if "Archives" not in review_file:
            shutil.move(review_file, os.path.join(archive_dir, os.path.basename(review_file)))
            print(f"Archivé : {review_file} -> {archive_dir}")

if __name__ == "__main__":
    revue_directory = "Revue"
    if not os.path.isdir(revue_directory):
        print(f"Erreur : Le dossier {revue_directory} n’existe pas.")
    else:
        archive_validated_reviews(revue_directory)
        print("Succès : Vérification et archivage des revues validées terminés.")
```

**Exécution** :
1. Enregistre le script comme `archive_validated_reviews.py`.
2. Après avoir généré et soumis les prompts de validation, exécute : `python archive_validated_reviews.py`.
3. Le script archive les fichiers `.md` validés dans `Revue/Archives/`.

**Exemple de fichier de validation** (itération 2, non validé) :
```markdown
# Validation des Corrections - Greeting (Itération 2)

## Résumé
- **Fichier source analysé** : src/components/Greeting.tsx
- **Fichier de test analysé** : src/__tests__/test_Greeting.test.tsx
- **Note globale combinée** : 9/10
- **Note globale source** : 9/10
- **Notes par critère (source)** :
  - Structure : 9/10
  - Clean Code : 9/10
  - Tests : 9/10
  - Optimisation : 9/10
  - Simplicité : 9/10
- **Note globale tests** : 9/10
- **Notes par critère (tests)** :
  - Structure : 9/10
  - Clean Code : 9/10
  - Couverture : 9/10
  - Clarté : 9/10
  - Robustesse : 8/10
- **Comparaison** : Note passée de 7/10 à 9/10
- **Statut** : 5/7 tâches corrigées, 2 restantes

## Analyse Détaillée
...

## Tâches pour Atteindre la Perfection
### Tâche 6 : Ajouter un JSDoc pour le source
- **Fichier concerné** : Source
- **Description** : Manque de documentation.
- **Critère concerné** : Clean Code
- **Recommandation** : Ajouter un JSDoc.
- **Statut** : À faire

### Tâche 7 : Réduire la dépendance aux testIDs
- **Fichier concerné** : Test
- **Description** : Dépendance excessive aux testIDs.
- **Critère concerné** : Robustesse
- **Recommandation** : Ajouter des tests basés sur le texte brut.
- **Statut** : À faire
```

**Exemple de fichier validé** (itération 3) :
```markdown
# Validation des Corrections - Greeting (Itération 3)

## Résumé
- **Fichier source analysé** : src/components/Greeting.tsx
- **Fichier de test analysé** : src/__tests__/test_Greeting.test.tsx
- **Note globale combinée** : 10/10
- **Note globale source** : 10/10
- **Notes par critère (source)** :
  - Structure : 10/10
  - Clean Code : 10/10
  - Tests : 10/10
  - Optimisation : 10/10
  - Simplicité : 10/10
- **Note globale tests** : 10/10
- **Notes par critère (tests)** :
  - Structure : 10/10
  - Clean Code : 10/10
  - Couverture : 10/10
  - Clarté : 10/10
  - Robustesse : 10/10
- **Comparaison** : Note passée de 9/10 à 10/10
- **Statut** : Toutes les corrections validées
- **Commentaire** : Validé, archiver dans Revue/Archives/.
```

---

## Intégration dans le Workflow Complet

### Structure du projet
```
project/
├── src/
│   ├── components/
│   │   └── Greeting.tsx
│   └── __tests__/
│       └── test_Greeting.test.tsx
├── Revue/
│   ├── Archives/
│   ├── revue_code_Greeting.md
│   ├── revue_code_Greeting_iteration2.md
│   ├── prompt_revue_code_Greeting.txt
│   ├── prompt_correction_Greeting.txt
│   └── prompt_validation_Greeting_iteration2.txt
├── generate_review_prompts.py
├── generate_correction_prompts.py
├── generate_validation_prompts.py
├── archive_validated_reviews.py
├── jest.config.js
└── package.json
```

### Exécution manuelle
1. **Revue initiale** :
   - Exécute `python generate_review_prompts.py`.
   - Soumets chaque `prompt_revue_code_*.txt` au **Chat de Revue**.
   - Enregistre les fichiers `.md` dans `Revue/`.

2. **Correction** :
   - Exécute `python generate_correction_prompts.py`.
   - Soumets chaque `prompt_correction_*.txt` au **Chat de Développement**.
   - Enregistre les fichiers corrigés (source et test) et `.md` mis à jour.

3. **Validation** :
   - Exécute `python generate_validation_prompts.py`.
   - Soumets chaque `prompt_validation_*.txt` au **Chat de Revue**.
   - Exécute `python archive_validated_reviews.py` pour archiver les fichiers validés.
   - Si non validé, répète l’étape 2 avec le dernier `.md` (ex. : `revue_code_Greeting_iteration2.md`).

4. **Tests** :
   - Exécute `npm test` pour vérifier les tests unitaires.
   - Vérifie la couverture : `npm test -- --coverage`.

### Intégration CI/CD (GitHub Actions)
```yaml
name: Code Review and Correction Workflow
on: [push]
jobs:
  review-and-correct:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.x'
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
      - run: pip install glob2
      - run: npm install

      # Étape 1 : Générer les prompts de revue
      - name: Generate Review Prompts
        run: python generate_review_prompts.py
      - name: Upload Review Prompts
        uses: actions/upload-artifact@v3
        with:
          name: review-prompts
          path: Revue/prompt_revue_code_*.txt

      # Étape 2 : Générer les prompts de correction
      - name: Generate Correction Prompts
        run: python generate_correction_prompts.py
      - name: Upload Correction Prompts
        uses: actions/upload-artifact@v3
        with:
          name: correction-prompts
          path: Revue/prompt_correction_*.txt

      # Étape 3 : Générer les prompts de validation
      - name: Generate Validation Prompts
        run: python generate_validation_prompts.py
      - name: Upload Validation Prompts
        uses: actions/upload-artifact@v3
        with:
          name: validation-prompts
          path: Revue/prompt_validation_*.txt

      # Exécuter les tests unitaires
      - name: Run Tests
        run: npm test

      # Archiver les revues validées
      - name: Archive Validated Reviews
        run: python archive_validated_reviews.py
      - name: Upload Archived Reviews
        uses: actions/upload-artifact@v3
        with:
          name: archived-reviews
          path: Revue/Archives/
```

**Note** : Les prompts doivent être soumis manuellement à Cursor sauf si une API est disponible (vérifie https://x.ai/api).

---

## Explications Détaillées

### Revue des tests
- **Critères spécifiques** : Les tests sont évalués sur **Structure**, **Clean Code**, **Couverture**, **Clarté**, et **Robustesse** pour garantir des tests complets et fiables.
- **Tâches claires** : Chaque tâche dans le `.md` indique si elle concerne le fichier source ou le fichier de test avec le champ **Fichier concerné**.
- **Absence de tests** : Si aucun test n’existe, une tâche est ajoutée dans la section **Tests** du fichier source pour en créer un.

### Note globale combinée
- La note globale combinée est la moyenne des notes globales du fichier source et du fichier de test (ou seulement source si pas de tests).
- Une note de 10/10 nécessite que le fichier source et le fichier de test soient parfaits (10/10 chacun).

### Archivage
- L’archivage est déclenché uniquement si la note globale combinée est 10/10, garantissant que le code et les tests sont parfaits.
- Tous les fichiers `.md` associés (initial et itérations) sont déplacés dans `Revue/Archives/`.

### Gestion des itérations
- Chaque validation génère un fichier `.md` avec un numéro d’itération incrémenté (ex. : `iteration2`).
- Si des tâches persistent, le dernier `.md` (ex. : `revue_code_Greeting_iteration2.md`) est utilisé pour la prochaine correction.

### Tests unitaires
- Les tests corrigés sont exécutés après chaque correction (`npm test`).
- La couverture (`npm test -- --coverage`) valide que les cas limites sont couverts.

### Gestion des erreurs
- Les scripts gèrent les cas où les fichiers source ou test sont absents.
- Les prompts incluent des instructions pour documenter les ambiguïtés.

---

## Exemple Complet

**Fichiers initiaux** :
- **Source** : `src/components/Greeting.tsx`
  ```typescript
  import React from 'react';
  import { View, Text } from 'react-native';

  interface Props {
    name: string;
  }

  const Greeting = ({ name }: Props) => {
    if (!name) throw new Error('Name is required');
    let greeting = 'Hello, ' + name + '!';
    return (
      <View testID="greeting-container">
        <Text testID="greeting-text">{greeting}</Text>
      </View>
    );
  };

  export default Greeting;
  ```

- **Test** : `src/__tests__/test_Greeting.test.tsx`
  ```typescript
  import { render, screen } from '@testing-library/react-native';
  import Greeting from '../components/Greeting';

  describe('Greeting Component', () => {
    it('renders correctly with valid name prop', () => {
      render(<Greeting name="Alice" />);
      expect(screen.getByTestId('greeting-text')).toHaveTextContent('Hello, Alice!');
    });
  });
  ```

1. **Étape 1 : Revue initiale** :
   - Script : `generate_review_prompts.py` crée `prompt_revue_code_Greeting.txt`.
   - Soumission au **Chat de Revue** → Génère `revue_code_Greeting.md` (note combinée 7/10, tâches pour source et test).

2. **Étape 2 : Correction** :
   - Script : `generate_correction_prompts.py` crée `prompt_correction_Greeting.txt`.
   - Soumission au **Chat de Développement** → Produit :
     - `Greeting.tsx` corrigé (avec `GreetingProps`, template literal, `React.memo`, JSDoc).
     - `test_Greeting.test.tsx` corrigé (test pour nom long, JSDoc).
     - `revue_code_Greeting.md` mis à jour (note 9/10, tâches restantes).

3. **Étape 3 : Validation** :
   - Script : `generate_validation_prompts.py` crée `prompt_validation_Greeting_iteration2.txt`.
   - Soumission au **Chat de Revue** → Génère `revue_code_Greeting_iteration2.md` (note 9/10, tâches restantes).
   - Répète l’étape 2 pour corriger les tâches restantes (ex. : JSDoc source, robustesse test).
   - Validation finale (itération 3) donne 10/10 → Script `archive_validated_reviews.py` archive les `.md` dans `Revue/Archives/`.

---

## Conseils pour l’Implémentation

1. **Configuration Jest** :
   - Assure-toi que `jest.config.js` est configuré pour TypeScript et React Native :
     ```javascript
     module.exports = {
       preset: 'react-native',
       setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
       transform: {
         '^.+\\.(ts|tsx)$': 'ts-jest',
       },
       testPathIgnorePatterns: ['/node_modules/', '/__tests__/mocks/'],
       moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
     };
     ```

2. **Linter** :
   - Utilise ESLint pour valider le code et les tests :
     ```bash
     npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-native @typescript-eslint/parser @typescript-eslint/eslint-plugin
     ```
     Crée `.eslintrc.js` :
     ```javascript
     module.exports = {
       parser: '@typescript-eslint/parser',
       plugins: ['react', 'react-native', '@typescript-eslint'],
       extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
       rules: {
         'react/prop-types': 'off',
       },
     };
     ```

3. **API Cursor** :
   - Si une API est disponible (vérifie https://x.ai/api), intègre-la pour soumettre les prompts automatiquement.

4. **Personnalisation** :
   - Ajuste les chemins dans les scripts si tes tests ne sont pas dans `src/__tests__/`.
   - Filtre les fichiers spécifiques (ex. : ignore `src/utils/`) dans les scripts.

5. **Suivi** :
   - Versionne les corrections avec Git :
     ```bash
     git add src/ Revue/
     git commit -m "Corrections basées sur revue de code"
     ```

---
