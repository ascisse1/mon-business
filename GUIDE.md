# Mon Business — Lavage & Café 🚗☕

Application web de gestion, déployée sur **votre machine locale**. Pas d'internet obligatoire, pas d'abonnement, vos données restent chez vous.

---

## ▶️ Démarrer l'application (2 étapes)

1. **Une seule fois** : installez **Node.js** (gratuit) → https://nodejs.org → version **LTS** → Suivant / Suivant / Terminer.
2. **Chaque jour** : double-cliquez sur **`Démarrer.bat`**.
   - Une fenêtre noire s'ouvre (le serveur) → **laissez-la ouverte** pendant le travail.
   - Le navigateur s'ouvre tout seul sur l'application.

Pour arrêter : fermez la fenêtre noire.

---

## 📱 Utiliser depuis un téléphone ou une tablette (au lavage)

Le PC (serveur) et le téléphone doivent être sur le **même WiFi**.

1. Au démarrage, la fenêtre noire affiche une adresse du type :
   `Depuis un téléphone : http://192.168.1.10:3232`
2. Sur le téléphone, ouvrez le navigateur et tapez cette adresse.
3. Menu du navigateur → **« Ajouter à l'écran d'accueil »** → l'app s'installe comme une vraie application.

> Astuce : dans l'app (⚙️ Réglages → Synchronisation), collez cette même adresse dans « Adresse du serveur » et cochez **« Synchroniser automatiquement »**. Ainsi chaque vente saisie sur le téléphone remonte au PC. Si le WiFi coupe, rien n'est perdu : appuyez sur **⬆️ Synchroniser maintenant** au retour du réseau.

---

## 🧾 Enregistrer une arrivée + reçu + fidélité

1. Bouton **＋** (au centre) → **Arrivée client**.
2. (Facultatif) Entrez le **téléphone du client** → l'app affiche sa fidélité.
3. Appuyez sur les services (Voiture, Moto, Bissap…) → ils s'ajoutent au panier.
4. **Valider & générer le reçu** → le reçu s'affiche → **Imprimer** ou **Partager** (WhatsApp).

**Fidélité :** après **5 lavages payés**, le **6ᵉ est automatiquement gratuit** (modifiable dans Réglages). L'app compte tout, applique le lavage gratuit et l'écrit sur le reçu.

---

## 💾 Vos données & sauvegardes

- Tout est enregistré sur le PC dans le fichier **`data.json`**.
- Des **sauvegardes automatiques horodatées** sont créées dans le dossier **`backups/`** à chaque synchronisation.
- Export **Excel (CSV)** et fichier de sauvegarde disponibles dans ⚙️ Réglages.

---

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `Démarrer.bat` | Lance l'application (double-clic) |
| `server.js` | Le serveur web local (Node.js, aucune installation de dépendance) |
| `public/index.html` | L'application (interface) |
| `data.json` | Vos données (créé au 1ᵉʳ enregistrement) |
| `backups/` | Sauvegardes automatiques |

---

## Plus tard : passage sur internet

Quand vous voudrez y accéder **hors de votre WiFi** (depuis n'importe où) ou centraliser plusieurs boutiques, on hébergera le même serveur en ligne (VPS) avec une vraie base de données PostgreSQL — sans tout réécrire, la logique métier est déjà là.
