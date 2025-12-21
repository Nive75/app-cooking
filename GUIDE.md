# Guide de Démarrage et Configuration

## 📋 Prérequis

- Docker Desktop installé et démarré
- Node.js et npm (pour développement local optionnel)
- Composer (pour développement local optionnel)

## 🚀 Installation

### 1. Configuration des fichiers .env

Créez les fichiers `.env` à partir des exemples :

```powershell
Copy-Item docker-compose.env.example .env
Copy-Item env.backend.example .env.backend
Copy-Item env.frontend.example .env.frontend
```

### 2. Modifier les valeurs

Ouvrez `.env` et modifiez :
- **Mots de passe MySQL** : Changez `MYSQL_ROOT_PASSWORD` et `MYSQL_PASSWORD`
- **APP_SECRET** : Générez un secret pour Symfony :
  ```powershell
  php -r "echo bin2hex(random_bytes(32));"
  ```
  Puis remplacez `your_secret_key_here_change_me` dans `.env` et `.env.frontend`

### 3. Construire et démarrer Docker

```powershell
# Construire les images
docker-compose build

# Démarrer les services
docker-compose up -d

# Vérifier les logs
docker-compose logs -f
```

## ✅ Vérifications

### Services Docker

```powershell
# Vérifier le statut
docker-compose ps

# Tous les services doivent être "Up"
```

### Accès aux applications

- **Frontend Symfony** : http://localhost:8000
- **Backend Nest.js** : http://localhost:3000
- **MySQL** : localhost:3307

### Logs

```powershell
# Tous les services
docker-compose logs -f

# Service spécifique
docker-compose logs backend
docker-compose logs frontend
docker-compose logs nginx
docker-compose logs mysql
```

## 🔧 Configuration

### Backend Nest.js

Le backend utilise Prisma ORM. Le schéma est dans `backend/prisma/schema.prisma`.

**Commandes Prisma** :
```powershell
# Générer le client Prisma
docker-compose exec backend npx prisma generate

# Créer une migration
docker-compose exec backend npx prisma migrate dev --name nom_migration

# Appliquer les migrations
docker-compose exec backend npx prisma migrate deploy
```

### Frontend Symfony

**Commandes Symfony** :
```powershell
# Console Symfony
docker-compose exec frontend php bin/console

# Créer un contrôleur
docker-compose exec frontend php bin/console make:controller

# Vider le cache
docker-compose exec frontend php bin/console cache:clear
```

## 🐛 Dépannage

### Les conteneurs ne démarrent pas

1. Vérifiez les logs : `docker-compose logs`
2. Vérifiez que les ports ne sont pas déjà utilisés
3. Vérifiez que Docker Desktop est démarré
4. Reconstruisez les images : `docker-compose build --no-cache`

### Erreur de connexion à la base de données

1. Vérifiez que MySQL est démarré : `docker-compose ps mysql`
2. Vérifiez les variables `DATABASE_URL` dans les fichiers `.env`
3. Attendez que MySQL soit "healthy" (healthcheck dans docker-compose)

### Erreur de build

1. Vérifiez que les Dockerfiles sont corrects
2. Vérifiez que les chemins dans `docker-compose.yml` sont corrects
3. Reconstruisez : `docker-compose build --no-cache`

### Port déjà utilisé

Si un port est déjà utilisé, modifiez-le dans `.env` :
- `BACKEND_PORT=3000` → `BACKEND_PORT=3001`
- `FRONTEND_PORT=8000` → `FRONTEND_PORT=8001`
- `MYSQL_PORT=3307` → `MYSQL_PORT=3308`

## 📊 Commandes Avancées

### Accéder aux conteneurs

```powershell
# Shell du backend
docker-compose exec backend sh

# Shell du frontend
docker-compose exec frontend sh

# MySQL
docker-compose exec mysql bash
mysql -u root -p
```

### Arrêter et nettoyer

```powershell
# Arrêter les services
docker-compose down

# Arrêter et supprimer les volumes (⚠️ supprime les données)
docker-compose down -v

# Reconstruire un service spécifique
docker-compose build backend
docker-compose up -d backend
```

### Développement

Les volumes sont montés pour le hot-reload :
- Modifications dans `backend/` → rechargement automatique Nest.js
- Modifications dans `frontend/` → rechargement automatique Symfony

## 🔐 Sécurité

- Les fichiers `.env` sont ignorés par Git
- Changez les mots de passe par défaut
- Ne commitez jamais les fichiers `.env`
- Utilisez des secrets forts pour `APP_SECRET`

## 📚 Prochaines Étapes

1. Créer le schéma Prisma avec vos modèles
2. Créer les endpoints API dans Nest.js
3. Créer les contrôleurs et vues dans Symfony
4. Connecter le frontend au backend via API REST

