import os
import subprocess

# Vérifier si c'est un dépôt Git
try:
    subprocess.check_call(['git', 'rev-parse', '--is-inside-work-tree'])
except subprocess.CalledProcessError:
    print("Erreur : Ce répertoire n'est pas un dépôt Git.")
    exit(1)

# Créer le dossier Commits
commit_dir = "Commits"
os.makedirs(commit_dir, exist_ok=True)

# Récupérer l'ID du dernier commit
last_commit = subprocess.check_output(['git', 'log', '-1', '--pretty=%H']).decode().strip()
if not last_commit:
    print("Erreur : Aucun commit trouvé.")
    exit(1)

# Générer le fichier diff
output_file = f"{commit_dir}/commit_{last_commit}.diff"
with open(output_file, 'w') as f:
    subprocess.check_call(['git', 'show', last_commit], stdout=f)

# Vérifier
if os.path.exists(output_file):
    print(f"Succès : Le diff du commit {last_commit} a été enregistré dans {output_file}.")
else:
    print("Erreur : Échec de l'enregistrement du diff.")
    exit(1)