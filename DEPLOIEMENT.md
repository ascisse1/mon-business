# Mettre l'application en ligne (gratuit)

L'application est un **site autonome** : le fichier `deploy/index.html` contient toute l'app.
Une fois en ligne, chaque appareil garde ses propres données (dans le navigateur).
**Vos ventes/recettes ne sont PAS incluses dans le fichier publié** — elles restent privées.

---

## ✅ Méthode 1 — Netlify Drop (la plus simple, sans compte, 1 minute)

1. Allez sur **https://app.netlify.com/drop** (je l'ouvre pour vous).
2. Ouvrez le dossier **`deploy`** (je l'ouvre aussi dans l'explorateur).
3. **Glissez-déposez le dossier `deploy`** (ou le fichier `index.html`) dans la zone de la page Netlify.
4. En quelques secondes, vous obtenez une **adresse en ligne** du type
   `https://nom-au-hasard.netlify.app` → c'est votre application, accessible partout.
5. (Facultatif) Créez un compte gratuit Netlify pour **garder l'adresse** et pouvoir la remplacer plus tard.

Pour **mettre à jour** l'app plus tard : reglissez le dossier `deploy` mis à jour.

---

## Méthode 2 — tiiny.host (upload d'un seul fichier)

1. Allez sur **https://tiiny.host**.
2. Uploadez le fichier **`deploy/index.html`**.
3. Choisissez un nom → adresse `https://votre-nom.tiiny.site`.

---

## Méthode 3 — GitHub Pages (si vous avez un compte GitHub)

Le projet est déjà initialisé en git (vos données sont exclues via `.gitignore`).

```bash
# 1. Créez un dépôt vide sur github.com (ex: mon-business)
# 2. Dans ce dossier :
git remote add origin https://github.com/VOTRE-COMPTE/mon-business.git
git branch -M main
git push -u origin main
# 3. Sur GitHub : Settings → Pages → Source = branche "main" / dossier "/deploy"
#    (ou déplacez index.html à la racine et choisissez "/")
```
L'adresse sera `https://VOTRE-COMPTE.github.io/mon-business/`.

---

## ⚠️ Important

- **Changez les codes PIN par défaut** (admin 1234 …) après la première mise en ligne : l'adresse est publique.
- En ligne, la **synchronisation vers votre PC** ne fonctionne que si les deux sont sur le même réseau. Pour des **données partagées entre plusieurs appareils via internet**, il faut un vrai serveur + base de données (voir avec le développeur) — ce n'est pas gratuit de façon fiable.
- Pour un usage **local** (un seul PC / même WiFi), gardez la version `Démarrer.bat` : elle centralise les données sur votre machine.
