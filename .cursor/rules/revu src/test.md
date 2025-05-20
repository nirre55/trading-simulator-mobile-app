Je vais te proposer un **workflow complet** pour la revue, la correction et la validation du code dans ton projet React Native en TypeScript, avec trois étapes impliquant deux experts virtuels (Expert X pour la revue/validation et Expert Y pour la correction). Ce workflow utilise des **prompts** pour le **Chat de Revue** et le **Chat de Développement** dans Cursor, des **scripts Python** pour automatiser les tâches, et s’intègre à ton structure existante (`src/`, `__tests__/`, `Revue/`, `Revue/Archives/`). Je vais détailler chaque étape, fournir les prompts, les scripts, et expliquer comment tout connecter, y compris une intégration CI/CD pour automatiser le processus. Enfin, je répondrai à ta demande de déplacer les fichiers `.md` validés dans `Revue/Archives/` ou de renvoyer les fichiers non validés pour correction.

---

## Workflow Complet

Le workflow se compose de trois étapes principales, orchestrées par deux experts virtuels :

1. **Expert X : Revue initiale du code**  
   - Analyse tous les fichiers `.ts` et `.tsx` dans `src/`.
   - Génère un fichier Markdown (`Revue/revue_code_[nom_du_fichier].md`) pour chaque fichier, avec une évaluation basée sur les critères **Structure**, **Clean Code**, **Tests**, **Optimisation**, et **Simplicité**, des notes de 1 à 10, et des tâches pour atteindre la perfection (10/10).

2. **Expert Y : Correction des commentaires**  
   - Prend chaque fichier de revue et le fichier de code correspondant.
   - Corrige le code selon les recommandations du fichier `.md`.
   - Met à jour le fichier `.md` en marquant les tâches comme "Résolu" ou en ajoutant de nouvelles tâches si nécessaire.
   - Crée ou met à jour les tests unitaires dans `__tests__/`.

3. **Expert X : Validation des corrections**  
   - Réanalyse le fichier corrigé pour vérifier si les tâches ont été correctement adressées.
   - Génère un nouveau fichier `.md` (`Revue/revue_code_[nom_du_fichier]_iteration[N].md`) avec les résultats.
   - Si la note globale est 10/10 (toutes les tâches résolues, aucun nouveau problème), déplace le fichier `.md` (et ses itérations) dans `Revue/Archives/`.
   - Sinon, renvoie le fichier `.md` à l’Expert Y pour une nouvelle correction.

Ce workflow est automatisé via des scripts Python pour générer les prompts et gérer les fichiers, avec une intégration CI/CD pour exécuter les étapes après chaque push. Les tests unitaires sont exécutés à chaque validation pour garantir la qualité.

---

## Détails du Workflow

### Étape 1 : Expert X - Revue initiale du code

**Objectif** : L’Expert X analyse tous les fichiers `.ts` et `.tsx` dans `src/` et produit un fichier de revue `.md` pour chaque fichier.

**Prompt pour le Chat de Revue** :
```plaintext
Tu es un expert en revue de code pour des projets React Native en TypeScript, spécialisé dans l’évaluation de la qualité du code. Ta tâche est d’analyser un fichier .ts ou .tsx dans src/ selon les critères Structure, Clean Code, Tests, Optimisation et Simplicité, en attribuant une note de 1 à 10 pour chaque critère et une note globale. Génère un fichier Markdown nommé `Revue/revue_code_[nom_du_fichier].md` avec une analyse détaillée et des tâches pour atteindre 10/10.

1. **Analyse du fichier** :
   - Analyse le fichier fourni (ex. : src/components/[nom_du_fichier].tsx).
   - Ignore les fichiers de test (ex. : __tests__/, *.test.tsx).

2. **Critères d’évaluation** :
   - **Structure** : Nom du fichier, emplacement (ex. : src/components/), conventions React Native.
   - **Clean Code** : Lisibilité, typage TypeScript, absence de duplication, conventions.
   - **Tests** : Testabilité, présence/qualité des tests dans __tests__/.
   - **Optimisation** : Performance, memoization, gestion des ressources.
   - **Simplicité** : Facilité de maintenance, réutilisabilité, absence de complexité.
   - Note globale : Moyenne des 5 critères, arrondie.

3. **Sortie** :
   - Fichier Markdown : `Revue/revue_code_[nom_du_fichier].md` :
     ```markdown
     # Revue de Code - [nom_du_fichier]

     ## Résumé
     - **Fichier analysé** : [chemin]
     - **Note globale** : [X/10]
     - **Notes par critère** :
       - Structure : [X/10]
       - Clean Code : [X/10]
       - Tests : [X/10]
       - Optimisation : [X/10]
       - Simplicité : [X/10]

     ## Analyse Détaillée
     ### Structure
     - **Évaluation** : [Description]
     - **Note** : [X/10]
     - **Problèmes** : [Liste]
     - **Recommandations** : [Solutions]
     ...

     ## Tâches pour Atteindre la Perfection
     ### Tâche 1 : [Titre]
     - **Description** : [Explication]
     - **Critère concerné** : [Critère]
     - **Recommandation** : [Solution]
     - **Statut** : À faire
     ...
     ```
   - Si parfait (10/10), indique : "Code parfait, aucune modification nécessaire."

4. **Bonnes pratiques** :
   - Respecte les conventions React Native et TypeScript.
   - Vérifie la testabilité avec Jest/@testing-library/react-native.
   - Propose des optimisations spécifiques (ex. : React.memo).

5. **Gestion des erreurs** :
   - Si le fichier est ambigu, note les hypothèses dans le rapport.

Fichier à analyser : [Coller le contenu du fichier .ts/.tsx]
Fichier analysé : [Chemin, ex. : src/components/Greeting.tsx]
```

**Script Python pour générer les prompts de revue** :
```python
import os
import glob

def generate_review_prompts(src_dir):
    """Génère des prompts pour la revue de tous les fichiers .ts/.tsx dans src/."""
    revue_dir = "Revue"
    os.makedirs(revue_dir, exist_ok=True)

    files = glob.glob(os.path.join(src_dir, "**", "*.ts"), recursive=True) + \
            glob.glob(os.path.join(src_dir, "**", "*.tsx"), recursive=True)

    if not files:
        print(f"Aucun fichier .ts ou .tsx trouvé dans {src_dir}")
        with open(os.path.join(revue_dir, "revue_code_summary.md"), 'w', encoding='utf-8') as f:
            f.write("# Résumé de la Revue de Code\n\nAucun fichier .ts ou .tsx trouvé dans src/.")
        return

    for file_path in files:
        if "__tests__" in file_path or file_path.endswith(".test.ts") or file_path.endswith(".test.tsx"):
            continue

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                file_content = f.read()
        except Exception as e:
            print(f"Erreur lors de la lecture de {file_path}: {e}")
            continue

        file_name = os.path.splitext(os.path.basename(file_path))[0]
        prompt_file = os.path.join(revue_dir, f"prompt_revue_code_{file_name}.txt")

        prompt_content = f"""Tu es un expert en revue de code pour des projets React Native en TypeScript, spécialisé dans l’évaluation de la qualité du code. Ta tâche est d’analyser un fichier .ts ou .tsx dans src/ selon les critères Structure, Clean Code, Tests, Optimisation et Simplicité, en attribuant une note de 1 à 10 pour chaque critère et une note globale. Génère un fichier Markdown nommé `Revue/revue_code_{file_name}.md` avec une analyse détaillée et des tâches pour atteindre 10/10.

1. **Analyse du fichier** :
   - Analyse le fichier fourni (ex. : src/components/{file_name}.tsx).
   - Ignore les fichiers de test (ex. : __tests__/, *.test.tsx).

2. **Critères d’évaluation** :
   - **Structure** : Nom du fichier, emplacement (ex. : src/components/), conventions React Native.
   - **Clean Code** : Lisibilité, typage TypeScript, absence de duplication, conventions.
   - **Tests** : Testabilité, présence/qualité des tests dans __tests__/.
   - **Optimisation** : Performance, memoization, gestion des ressources.
   - **Simplicité** : Facilité de maintenance, réutilisabilité, absence de complexité.
   - Note globale : Moyenne des 5 critères, arrondie.

3. **Sortie** :
   - Fichier Markdown : `Revue/revue_code_{file_name}.md` :
     ```markdown
     # Revue de Code - {file_name}

     ## Résumé
     - **Fichier analysé** : {file_path}
     - **Note globale** : [X/10]
     - **Notes par critère** :
       - Structure : [X/10]
       - Clean Code : [X/10]
       - Tests : [X/10]
       - Optimisation : [X/10]
       - Simplicité : [X/10]

     ## Analyse Détaillée
     ### Structure
     - **Évaluation** : [Description]
     - **Note** : [X/10]
     - **Problèmes** : [Liste]
     - **Recommandations** : [Solutions]
     ...

     ## Tâches pour Atteindre la Perfection
     ### Tâche 1 : [Titre]
     - **Description** : [Explication]
     - **Critère concerné** : [Critère]
     - **Recommandation** : [Solution]
     - **Statut** : À faire
     ...
     ```
   - Si parfait (10/10), indique : "Code parfait, aucune modification nécessaire."

4. **Bonnes pratiques** :
   - Respecte les conventions React Native et TypeScript.
   - Vérifie la testabilité avec Jest/@testing-library/react-native.
   - Propose des optimisations spécifiques (ex. : React.memo).

5. **Gestion des erreurs** :
   - Si le fichier est ambigu, note les hypothèses dans le rapport.

Fichier à analyser :
```typescript
{file_content}
```

Fichier analysé : {file_path}
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

**Exemple de fichier généré** (pour `src/components/Greeting.tsx`) :
```markdown
# Revue de Code - Greeting

## Résumé
- **Fichier analysé** : src/components/Greeting.tsx
- **Note globale** : 7/10
- **Notes par critère** :
  - Structure : 8/10
  - Clean Code : 6/10
  - Tests : 7/10
  - Optimisation : 7/10
  - Simplicité : 8/10

## Analyse Détaillée
### Structure
- **Évaluation** : Fichier bien nommé et dans src/components/.
- **Note** : 8/10
- **Problèmes** : Interface `Props` générique.
- **Recommandations** : Renommer en `GreetingProps`.

### Clean Code
- **Évaluation** : Code lisible, mais utilise une concaténation de chaînes.
- **Note** : 6/10
- **Problèmes** : Concaténation et variable `greeting` inutile.
- **Recommandations** : Utiliser un template literal, supprimer `greeting`.

### Tests
- **Évaluation** : Code testable, mais aucun test.
- **Note** : 7/10
- **Problèmes** : Absence de tests.
- **Recommandations** : Créer `__tests__/test_Greeting.test.tsx`.

...

## Tâches pour Atteindre la Perfection
### Tâche 1 : Renommer l’interface Props
- **Description** : Interface trop générique.
- **Critère concerné** : Structure
- **Recommandation** : Renommer en `GreetingProps`.
- **Statut** : À faire
...
```

---

### Étape 2 : Expert Y - Correction des commentaires

**Objectif** : L’Expert Y corrige le code en fonction des tâches du fichier `.md` et met à jour ce fichier en marquant les tâches comme "Résolu".

**Prompt pour le Chat de Développement** :
```plaintext
Tu es un expert en développement React Native avec TypeScript, spécialisé dans la correction de code. Ta tâche est de corriger un fichier de code en fonction d’un fichier de revue Markdown, de créer ou mettre à jour les tests unitaires, et de mettre à jour le fichier de revue en marquant les tâches comme "Résolu". Suis ces instructions :

1. **Analyse des fichiers** :
   - Analyse le fichier de code (ex. : src/components/[nom_du_fichier].tsx) et le fichier de revue (ex. : Revue/revue_code_[nom_du_fichier].md).
   - Identifie les tâches "À faire" dans "Tâches pour Atteindre la Perfection".

2. **Correction du code** :
   - Applique chaque recommandation :
     - **Structure** : Ajuste le nom, l’emplacement, ou la structure.
     - **Clean Code** : Améliore la lisibilité, utilise des types explicites.
     - **Tests** : Crée ou complète `__tests__/test_[nom_du_fichier].test.tsx` avec Jest/@testing-library/react-native.
     - **Optimisation** : Ajoute React.memo, useCallback, etc.
     - **Simplicité** : Simplifie le code pour la maintenance.
   - Respecte TypeScript et React Native.

3. **Mise à jour du fichier de revue** :
   - Marque chaque tâche corrigée comme "Résolu" avec une explication.
   - Ajoute de nouvelles tâches si des problèmes subsistent.
   - Recalcule les notes et la note globale.
   - Conserve la structure Markdown.

4. **Sortie** :
   - Fichier de code corrigé : src/components/[nom_du_fichier].tsx.
   - Fichier de test (si créé) : __tests__/test_[nom_du_fichier].test.tsx.
   - Fichier de revue mis à jour : Revue/revue_code_[nom_du_fichier].md.
   - Résumé : Nombre de tâches corrigées, tâches restantes, nouvelle note globale.

5. **Bonnes pratiques** :
   - Utilise des types explicites, évite `any`.
   - Mocke les modules natifs (ex. : AsyncStorage) dans les tests.
   - Assure la performance et la maintenabilité.

6. **Gestion des erreurs** :
   - Si une tâche est ambiguë, propose une solution et note-la.

Fichier de code à corriger : [Coller le contenu du fichier .ts/.tsx]
Fichier de revue : [Coller le contenu du fichier .md]
Fichier analysé : [Chemin, ex. : src/components/Greeting.tsx]
```

**Script Python pour générer les prompts de correction** :
```python
import os
import glob
import re

def generate_correction_prompts(revue_dir, src_dir):
    """Génère des prompts pour corriger les fichiers de code à partir des revues."""
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
        prompt_content = f"""Tu es un expert en développement React Native avec TypeScript, spécialisé dans la correction de code. Ta tâche est de corriger un fichier de code en fonction d’un fichier de revue Markdown, de créer ou mettre à jour les tests unitaires, et de mettre à jour le fichier de revue en marquant les tâches comme "Résolu". Suis ces instructions :

1. **Analyse des fichiers** :
   - Analyse le fichier de code (ex. : src/components/{file_name}.tsx) et le fichier de revue (ex. : Revue/revue_code_{file_name}.md).
   - Identifie les tâches "À faire" dans "Tâches pour Atteindre la Perfection".

2. **Correction du code** :
   - Applique chaque recommandation :
     - **Structure** : Ajuste le nom, l’emplacement, ou la structure.
     - **Clean Code** : Améliore la lisibilité, utilise des types explicites.
     - **Tests** : Crée ou complète `__tests__/test_{file_name}.test.tsx` avec Jest/@testing-library/react-native.
     - **Optimisation** : Ajoute React.memo, useCallback, etc.
     - **Simplicité** : Simplifie le code pour la maintenance.
   - Respecte TypeScript et React Native.

3. **Mise à jour du fichier de revue** :
   - Marque chaque tâche corrigée comme "Résolu" avec une explication.
   - Ajoute de nouvelles tâches si des problèmes subsistent.
   - Recalcule les notes et la note globale.
   - Conserve la structure Markdown.

4. **Sortie** :
   - Fichier de code corrigé : src/components/{file_name}.tsx.
   - Fichier de test (si créé) : __tests__/test_{file_name}.test.tsx.
   - Fichier de revue mis à jour : Revue/revue_code_{file_name}.md.
   - Résumé : Nombre de tâches corrigées, tâches restantes, nouvelle note globale.

5. **Bonnes pratiques** :
   - Utilise des types explicites, évite `any`.
   - Mocke les modules natifs (ex. : AsyncStorage) dans les tests.
   - Assure la performance et la maintenabilité.

6. **Gestion des erreurs** :
   - Si une tâche est ambiguë, propose une solution et note-la.

Fichier de code à corriger :
```typescript
{src_content}
```

Fichier de revue :
```markdown
{revue_content}
```

Fichier analysé : src/components/{file_name}.tsx
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
3. Soumets chaque fichier `Revue/prompt_correction_[nom_du_fichier].txt` au **Chat de Développement**.
4. Le chat produit :
   - Fichier corrigé : `src/components/[nom_du_fichier].tsx`.
   - Fichier de test (si créé) : `__tests__/test_[nom_du_fichier].test.tsx`.
   - Fichier `.md` mis à jour : `Revue/revue_code_[nom_du_fichier].md`.

**Exemple de fichier corrigé** (pour `Greeting.tsx`) :
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

**Exemple de fichier de test créé** :
```typescript
import { render, screen } from '@testing-library/react-native';
import Greeting from '../src/components/Greeting';

describe('Greeting Component', () => {
  it('renders correctly with valid name prop', () => {
    render(<Greeting name="Alice" />);
    expect(screen.getByTestId('greeting-text')).toHaveTextContent('Hello, Alice!');
  });

  it('throws error when name prop is empty string', () => {
    const renderWithEmptyName = () => render(<Greeting name="" />);
    expect(renderWithEmptyName).toThrow('Name is required');
  });
});
```

**Exemple de fichier `.md` mis à jour** :
```markdown
# Revue de Code - Greeting

## Résumé
- **Fichier analysé** : src/components/Greeting.tsx
- **Note globale** : 9/10
- **Notes par critère** :
  - Structure : 9/10
  - Clean Code : 9/10
  - Tests : 8/10
  - Optimisation : 9/10
  - Simplicité : 9/10

## Analyse Détaillée
### Structure
- **Évaluation** : Interface renommée en `GreetingProps`.
- **Note** : 9/10
- **Problèmes** : Aucun.
- **Recommandations** : Aucune.

### Clean Code
- **Évaluation** : Template literal utilisé, variable supprimée.
- **Note** : 9/10
- **Problèmes** : Manque un JSDoc.
- **Recommandations** : Ajouter un JSDoc.

### Tests
- **Évaluation** : Tests ajoutés, mais manque un cas limite (nom long).
- **Note** : 8/10
- **Problèmes** : Tests incomplets.
- **Recommandations** : Ajouter un test pour un nom long.

...

## Tâches pour Atteindre la Perfection
### Tâche 1 : Renommer l’interface Props
- **Description** : Interface trop générique.
- **Critère concerné** : Structure
- **Recommandation** : Renommer en `GreetingProps`.
- **Statut** : Résolu (Renommée en `GreetingProps`)

### Tâche 2 : Simplifier la concaténation de chaînes
- **Description** : Concaténation moins lisible.
- **Critère concerné** : Clean Code
- **Recommandation** : Utiliser un template literal.
- **Statut** : Résolu (Template literal utilisé)

### Tâche 3 : Ajouter des tests unitaires
- **Description** : Aucun test unitaire.
- **Critère concerné** : Tests
- **Recommandation** : Créer `__tests__/test_Greeting.test.tsx`.
- **Statut** : Résolu (Tests ajoutés, mais incomplets)

### Tâche 4 : Ajouter React.memo
- **Description** : Pas de memoization.
- **Critère concerné** : Optimisation
- **Recommandation** : Envelopper dans React.memo.
- **Statut** : Résolu (React.memo ajouté)

### Tâche 5 : Ajouter un JSDoc
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

### Tâche 6 : Ajouter un test pour un cas limite
- **Description** : Manque un test pour un nom long.
- **Critère concerné** : Tests
- **Recommandation** : Ajouter un test.
- **Statut** : À faire
```

---

### Étape 3 : Expert X - Validation des corrections

**Objectif** : L’Expert X réanalyse le fichier corrigé pour valider les corrections. Si la note est 10/10, il déplace le fichier `.md` (et ses itérations) dans `Revue/Archives/`. Sinon, il renvoie le fichier pour une nouvelle correction.

**Prompt pour le Chat de Revue** :
```plaintext
Tu es un expert en revue de code pour des projets React Native en TypeScript, spécialisé dans la validation des corrections. Ta tâche est de réanalyser un fichier corrigé pour vérifier si les recommandations d’un fichier de revue ont été appliquées, en évaluant selon les critères Structure, Clean Code, Tests, Optimisation et Simplicité. Si toutes les corrections sont validées (note globale 10/10), indique que le fichier .md peut être archivé. Sinon, génère un nouveau fichier .md pour une nouvelle correction.

1. **Analyse des fichiers** :
   - Analyse le fichier corrigé (ex. : src/components/[nom_du_fichier].tsx) et le fichier de revue (ex. : Revue/revue_code_[nom_du_fichier].md).
   - Vérifie chaque tâche ("À faire" ou "Résolu") dans "Tâches pour Atteindre la Perfection".
   - Évalue les tests dans __tests__/test_[nom_du_fichier].test.tsx, si présents.

2. **Évaluation** :
   - Réévalue selon :
     - **Structure** : Nom, emplacement, conventions.
     - **Clean Code** : Lisibilité, typage, conventions.
     - **Tests** : Qualité et couverture des tests.
     - **Optimisation** : Performance, memoization.
     - **Simplicité** : Maintenabilité, réutilisabilité.
   - Calcule la note globale (moyenne des critères).
   - Compare avec la revue précédente.

3. **Validation** :
   - Confirme si les tâches "Résolu" sont correctes.
   - Vérifie si les tâches "À faire" ont été corrigées.
   - Identifie de nouveaux problèmes.
   - Si note globale = 10/10, indique : "Validé, archiver dans Revue/Archives/."
   - Sinon, liste les tâches restantes/nouvelles.

4. **Sortie** :
   - Fichier Markdown : `Revue/revue_code_[nom_du_fichier]_iteration[N].md` :
     ```markdown
     # Validation des Corrections - [nom_du_fichier] (Itération [N])

     ## Résumé
     - **Fichier analysé** : [chemin]
     - **Note globale** : [X/10]
     - **Notes par critère** :
       - Structure : [X/10]
       - Clean Code : [X/10]
       - Tests : [X/10]
       - Optimisation : [X/10]
       - Simplicité : [X/10]
     - **Comparaison** : [Ex. : "Note passée de 7/10 à 9/10"]
     - **Statut** : [Ex. : "4/4 tâches corrigées, 2 nouvelles tâches"]

     ## Analyse Détaillée
     ### Structure
     - **Évaluation** : [Description]
     - **Note** : [X/10]
     - **Problèmes** : [Liste]
     - **Recommandations** : [Solutions]
     ...

     ## Tâches pour Atteindre la Perfection
     ### Tâche 1 : [Titre]
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

Fichier de code corrigé : [Coller le contenu du fichier .ts/.tsx]
Fichier de revue original : [Coller le contenu du fichier .md]
Fichier analysé : [Chemin, ex. : src/components/Greeting.tsx]
Itération : [N, ex. : 2]
```

**Script Python pour générer les prompts de validation et gérer l’archivage** :
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
    """Génère des prompts pour valider les corrections."""
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
        prompt_content = f"""Tu es un expert en revue de code pour des projets React Native en TypeScript, spécialisé dans la validation des corrections. Ta tâche est de réanalyser un fichier corrigé pour vérifier si les recommandations d’un fichier de revue ont été appliquées, en évaluant selon les critères Structure, Clean Code, Tests, Optimisation et Simplicité. Si toutes les corrections sont validées (note globale 10/10), indique que le fichier .md peut être archivé. Sinon, génère un nouveau fichier .md pour une nouvelle correction.

1. **Analyse des fichiers** :
   - Analyse le fichier corrigé (ex. : src/components/{file_name}.tsx) et le fichier de revue (ex. : Revue/revue_code_{file_name}.md).
   - Vérifie chaque tâche ("À faire" ou "Résolu") dans "Tâches pour Atteindre la Perfection".
   - Évalue les tests dans __tests__/test_{file_name}.test.tsx, si présents.

2. **Évaluation** :
   - Réévalue selon :
     - **Structure** : Nom, emplacement, conventions.
     - **Clean Code** : Lisibilité, typage, conventions.
     - **Tests** : Qualité et couverture des tests.
     - **Optimisation** : Performance, memoization.
     - **Simplicité** : Maintenabilité, réutilisabilité.
   - Calcule la note globale (moyenne des critères).
   - Compare avec la revue précédente.

3. **Validation** :
   - Confirme si les tâches "Résolu" sont correctes.
   - Vérifie si les tâches "À faire" ont été corrigées.
   - Identifie de nouveaux problèmes.
   - Si note globale = 10/10, indique : "Validé, archiver dans Revue/Archives/."
   - Sinon, liste les tâches restantes/nouvelles.

4. **Sortie** :
   - Fichier Markdown : `Revue/revue_code_{file_name}_iteration{iteration}.md` :
     ```markdown
     # Validation des Corrections - {file_name} (Itération {iteration})

     ## Résumé
     - **Fichier analysé** : {src_file}
     - **Note globale** : [X/10]
     - **Notes par critère** :
       - Structure : [X/10]
       - Clean Code : [X/10]
       - Tests : [X/10]
       - Optimisation : [X/10]
       - Simplicité : [X/10]
     - **Comparaison** : [Ex. : "Note passée de 7/10 à 9/10"]
     - **Statut** : [Ex. : "4/4 tâches corrigées, 2 nouvelles tâches"]

     ## Analyse Détaillée
     ### Structure
     - **Évaluation** : [Description]
     - **Note** : [X/10]
     - **Problèmes** : [Liste]
     - **Recommandations** : [Solutions]
     ...

     ## Tâches pour Atteindre la Perfection
     ### Tâche 1 : [Titre]
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

Fichier de code corrigé :
```typescript
{src_content}
```

Fichier de revue original :
```markdown
{revue_content}
```

Fichier analysé : {src_file}
Itération : {iteration}
"""

        try:
            with open(prompt_file, 'w', encoding='utf-8') as f:
                f.write(prompt_content)
            print(f"Prompt de validation généré : {prompt_file}")
        except Exception as e:
            print(f"Erreur lors de l'écriture de {prompt_file}: {e}")

        # Vérifier si le fichier de revue indique une validation complète (manuellement ou via post-traitement)
        # Note : L’archivage automatique nécessite que le fichier .md généré soit analysé pour "Validé, archiver".
        # Ici, nous supposons que l’utilisateur vérifie manuellement le .md généré.
        # Pour automatiser, ajoute un post-traitement après génération du .md (voir ci-dessous).

if __name__ == "__main__":
    revue_directory = "Revue"
    src_directory = "src"
    if not os.path.isdir(revue_directory) or not os.path.isdir(src_directory):
        print(f"Erreur : Vérifiez que {revue_directory} et {src_directory} existent.")
    else:
        generate_validation_prompts(revue_directory, src_directory)
        print("Succès : Tous les prompts de validation ont été générés dans le dossier Revue/.")
```

**Post-traitement pour l’archivage** :
Puisque l’archivage dépend du contenu du fichier `.md` généré (présence de "Validé, archiver dans Revue/Archives/"), tu peux ajouter un script Python pour analyser le fichier `.md` après sa génération et déplacer les fichiers si validés.

```python
import os
import glob
import re

def archive_validated_reviews(revue_dir):
    """Archive les fichiers .md validés (note 10/10)."""
    archive_dir = os.path.join(revue_dir, "Archives")
    os.makedirs(archive_dir, exist_ok=True)

    review_files = glob.glob(os.path.join(revue_dir, "revue_code_*.md"))
    for review_file in review_files:
        if "Archives" in review_file or "iteration" not in review_file:
            continue
        try:
            with open(review_file, 'r', encoding='utf-8') as f:
                content = f.read()
            # Vérifier si le fichier indique une validation complète
            if "Note globale : 10/10" in content or "Validé, archiver dans Revue/Archives/" in content:
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
3. Le script vérifie chaque fichier `revue_code_[nom_du_fichier]_iteration[N].md` et archive si validé.

**Exemple de fichier de validation** (pour `Greeting.tsx`, itération 2) :
```markdown
# Validation des Corrections - Greeting (Itération 2)

## Résumé
- **Fichier analysé** : src/components/Greeting.tsx
- **Note globale** : 9/10
- **Notes par critère** :
  - Structure : 9/10
  - Clean Code : 9/10
  - Tests : 8/10
  - Optimisation : 9/10
  - Simplicité : 9/10
- **Comparaison** : Note passée de 7/10 à 9/10
- **Statut** : 4/4 tâches corrigées, 2 nouvelles tâches

## Analyse Détaillée
...

## Tâches pour Atteindre la Perfection
### Tâche 5 : Ajouter un JSDoc
- **Description** : Manque de documentation.
- **Critère concerné** : Clean Code
- **Recommandation** : Ajouter un JSDoc.
- **Statut** : À faire

### Tâche 6 : Ajouter un test pour un cas limite
- **Description** : Manque un test pour un nom long.
- **Critère concerné** : Tests
- **Recommandation** : Ajouter un test.
- **Statut** : À faire
```

Dans cet exemple, comme la note n’est pas 10/10, le fichier `.md` est renvoyé à l’Expert Y (via le script de correction) pour une nouvelle itération.

**Si validé (exemple)** :
```markdown
# Validation des Corrections - Greeting (Itération 3)

## Résumé
- **Fichier analysé** : src/components/Greeting.tsx
- **Note globale** : 10/10
- **Notes par critère** :
  - Structure : 10/10
  - Clean Code : 10/10
  - Tests : 10/10
  - Optimisation : 10/10
  - Simplicité : 10/10
- **Comparaison** : Note passée de 9/10 à 10/10
- **Statut** : Toutes les corrections validées
- **Commentaire** : Validé, archiver dans Revue/Archives/.
```

Le script `archive_validated_reviews.py` détecte "Note globale : 10/10" et déplace `revue_code_Greeting.md`, `revue_code_Greeting_iteration2.md`, etc., dans `Revue/Archives/`.

---

## Intégration et Automatisation

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
   - Enregistre les fichiers corrigés et `.md` mis à jour.

3. **Validation** :
   - Exécute `python generate_validation_prompts.py`.
   - Soumets chaque `prompt_validation_*.txt` au **Chat de Revue**.
   - Exécute `python archive_validated_reviews.py` pour archiver les fichiers validés.
   - Si non validé, répète l’étape 2.

4. **Tests** :
   - Exécute `npm test` pour vérifier les tests unitaires.
   - Vérifie la couverture : `npm test -- --coverage`.

### Intégration CI/CD (GitHub Actions)
Voici un pipeline qui automatise le workflow après chaque push :

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

**Note** : Ce pipeline génère les prompts mais ne soumet pas automatiquement les prompts à Cursor (car cela nécessite une interaction avec l’API de Cursor, non disponible ici). Tu devras soumettre les prompts manuellement ou intégrer une API si disponible (vérifie https://x.ai/api).

---

## Explications Détaillées

### Rôles des experts
- **Expert X (Revue et Validation)** :
  - Utilise le **Chat de Revue** pour analyser le code initialement et valider les corrections.
  - Produit des fichiers `.md` structurés avec des notes et des tâches.
  - Décide si un fichier est validé (10/10) pour archivage ou nécessite une nouvelle correction.
- **Expert Y (Correction)** :
  - Utilise le **Chat de Développement** pour appliquer les recommandations.
  - Met à jour le code, les tests, et le fichier `.md`.
  - S’assure que les corrections respectent TypeScript et React Native.

### Gestion des itérations
- Chaque validation génère un fichier `.md` avec un numéro d’itération (ex. : `iteration2`, `iteration3`).
- Le script de validation incrémente automatiquement le numéro d’itération.
- Si la note atteint 10/10, tous les fichiers `.md` associés (initial et itérations) sont archivés.

### Archivage
- Le script `archive_validated_reviews.py` vérifie la présence de "Note globale : 10/10" ou "Validé, archiver dans Revue/Archives/".
- Les fichiers sont déplacés dans `Revue/Archives/` pour garder une trace sans encombrer `Revue/`.

### Tests unitaires
- Les tests sont créés/mis à jour par l’Expert Y et validés par l’Expert X.
- Exécute `npm test` après chaque correction pour confirmer que le code fonctionne.
- La couverture (`npm test -- --coverage`) aide à vérifier que les tests sont complets.

### Gestion des erreurs
- Si un fichier source ou `.md` est manquant, les scripts affichent des erreurs claires.
- Si une tâche est ambiguë, les experts notent des hypothèses dans le `.md`.
- Les prompts incluent des instructions pour gérer les ambiguïtés.

---

## Conseils pour l’implémentation

1. **Conventions** :
   - Assure-toi que ton projet suit une structure claire (ex. : `src/components/`, `src/hooks/`).
   - Configure ESLint pour valider le code TypeScript :
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

2. **Jest** :
   - Configure Jest pour TypeScript et React Native (voir `jest.config.js` dans les réponses précédentes).
   - Installe les dépendances :
     ```bash
     npm install --save-dev jest @testing-library/react-native @testing-library/jest-native @react-native-async-storage/async-storage ts-jest @types/jest
     ```

3. **API Cursor** :
   - Si Cursor prend en charge une API (vérifie https://x.ai/api), modifie les scripts pour soumettre les prompts automatiquement :
     ```python
     import requests
     def submit_to_cursor(prompt_content, chat_type="review"):
         api_url = "https://x.ai/api/cursor"  # Remplacer par l’URL réelle
         payload = {"prompt": prompt_content, "chat_type": chat_type}
         response = requests.post(api_url, json=payload)
         return response.json()
     ```

4. **Personnalisation** :
   - Ajuste les chemins dans les scripts si tes fichiers ne sont pas dans `src/components/` (ex. : `src/hooks/`).
   - Filtre certains fichiers dans les scripts (ex. : ignore `src/utils/` avec `if "utils" in file_path: continue`).

5. **Suivi** :
   - Garde un journal des itérations dans `Revue/Archives/` pour tracer l’historique.
   - Utilise `git` pour versionner les corrections :
     ```bash
     git add src/ __tests__/ Revue/
     git commit -m "Corrections basées sur revue de code"
     ```

---

## Exemple Complet

**Fichier initial** : `src/components/Greeting.tsx`
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

1. **Étape 1 : Revue** :
   - Script : `generate_review_prompts.py` crée `prompt_revue_code_Greeting.txt`.
   - Soumission au **Chat de Revue** → Génère `revue_code_Greeting.md` (note 7/10, 4 tâches).

2. **Étape 2 : Correction** :
   - Script : `generate_correction_prompts.py` crée `prompt_correction_Greeting.txt`.
   - Soumission au **Chat de Développement** → Produit :
     - `Greeting.tsx` corrigé (avec `GreetingProps`, template literal, `React.memo`).
     - `__tests__/test_Greeting.test.tsx`.
     - `revue_code_Greeting.md` mis à jour (note 9/10, 2 nouvelles tâches).

3. **Étape 3 : Validation** :
   - Script : `generate_validation_prompts.py` crée `prompt_validation_Greeting_iteration2.txt`.
   - Soumission au **Chat de Revue** → Génère `revue_code_Greeting_iteration2.md` (note 9/10, tâches restantes).
   - Comme la note n’est pas 10/10, renvoie à l’Expert Y (répète l’étape 2).
   - Après correction finale (JSDoc, test pour nom long), nouvelle validation donne 10/10.
   - Script : `archive_validated_reviews.py` déplace les fichiers `.md` dans `Revue/Archives/`.

---

Si tu veux des ajustements (ex. : critères spécifiques, autres dossiers, intégration API), un exemple avec un fichier particulier, ou plus de détails sur une étape, fais-moi signe ! Précise aussi si tu utilises des bibliothèques comme React Navigation ou Redux pour adapter les prompts.