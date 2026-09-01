# NeuroBase — web app

## Démarrer en local (sans le chat IA)
1. npm install
2. npm run dev
3. Ouvre http://localhost:5173

## Activer le chat IA (clé jamais visible dans le navigateur)
La clé API vit uniquement sur le serveur, jamais dans le code ni dans le navigateur.

### Sur Netlify (recommandé, gratuit)
1. Déploie le site sur Netlify (glisser-déposer le dossier, ou connecte ton dépôt GitHub).
2. Dans le dashboard Netlify : Site settings → Environment variables → Add a variable
   - Key: ANTHROPIC_API_KEY
   - Value: ta clé (sk-ant-...)
3. Redéploie. Le chat appelle désormais /.netlify/functions/chat, qui utilise ta clé côté
   serveur — elle n'apparaît jamais dans l'inspecteur du navigateur du visiteur.

### En local avec la vraie clé
Il faut lancer les fonctions Netlify en plus de Vite :
1. npm install -g netlify-cli
2. netlify login (une seule fois)
3. Crée un fichier `.env` à la racine (jamais commité) avec :
   ANTHROPIC_API_KEY=ta_clé_ici
4. netlify dev
   → ça lance Vite ET la fonction serveur ensemble, avec la clé cachée.

Sans clé configurée, le chat continue de fonctionner avec des réponses de démonstration
(fallback local) — rien n'est cassé en attendant.

## Déployer
Glisse ce dossier dans https://stackblitz.com ou https://codesandbox.io pour un aperçu rapide,
ou déploie directement sur https://netlify.com (glisser-déposer, ou "Import from Git").
