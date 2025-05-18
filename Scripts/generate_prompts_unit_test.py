import os
import glob


def generate_prompts(directory):
    """Génère des prompts pour les tests unitaires à partir des fichiers .ts/.tsx dans un dossier."""
    # Créer le dossier Tests s'il n'existe pas
    test_dir = "Tests"
    os.makedirs(test_dir, exist_ok=True)

    # Trouver tous les fichiers .ts et .tsx
    files = glob.glob(
        os.path.join(directory, "**", "*.ts"), recursive=True
    ) + glob.glob(os.path.join(directory, "**", "*.tsx"), recursive=True)

    if not files:
        print(f"Aucun fichier .ts ou .tsx trouvé dans {directory}")
        return

    for file_path in files:
        # Ignorer les fichiers de test ou non pertinents
        if (
            "__tests__" in file_path
            or file_path.endswith(".test.ts")
            or file_path.endswith(".test.tsx")
        ):
            continue

        # Lire le contenu du fichier
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                file_content = f.read()
        except Exception as e:
            print(f"Erreur lors de la lecture de {file_path}: {e}")
            continue

        # Extraire le nom du fichier sans extension
        file_name = os.path.splitext(os.path.basename(file_path))[0]
        prompt_file = os.path.join(test_dir, f"prompt_{file_name}.txt")

        # Générer le prompt
        prompt_content = f"""Génère des tests unitaires pour le code du projet courant dans une application React Native, en utilisant Jest et @testing-library/react-native. Produis un fichier src/__tests__/test_{file_name}.test.tsx, un résumé des tests. Utilise TypeScript.

Code à tester :
```typescript
{file_content}
```
Fichiers analysés : {file_path}
TypeScript : Oui
"""

        # Enregistrer le prompt
        try:
            with open(prompt_file, "w", encoding="utf-8") as f:
                f.write(prompt_content)
            print(f"Prompt généré : {prompt_file}")
        except Exception as e:
            print(f"Erreur lors de l'écriture de {prompt_file}: {e}")


if __name__ == "__main__":
    # Dossier à analyser (ex. : src/)
    target_directory = "src"
    if not os.path.isdir(target_directory):
        print(f"Erreur : Le dossier {target_directory} n’existe pas.")
    else:
        generate_prompts(target_directory)
        print("Succès : Tous les prompts ont été générés dans le dossier Tests/.")
