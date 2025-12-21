# Application de Gestion de Plats

Application de gestion de plats sur calendrier avec planification des repas, gestion des ingrédients et modification des recettes.

## 🛠️ Stack Technique

- **Frontend** : Symfony 7.4 (PHP-FPM + Nginx)
- **Backend** : Nest.js (Node.js 20 + Prisma ORM)
- **Base de données** : MySQL 8.0
- **Containerisation** : Docker

## 📁 Structure du Projet

```
app-cooking/
├── frontend/          # Application Symfony (Interface utilisateur)
│   ├── src/          # Code source PHP
│   ├── config/       # Configuration Symfony
│   └── public/       # Point d'entrée web
├── backend/          # Application Nest.js (API REST)
│   ├── src/          # Code source TypeScript
│   └── prisma/       # Schéma Prisma et migrations
├── docker/           # Configuration Docker
│   ├── frontend/     # Dockerfile Symfony + nginx.conf
│   └── backend/      # Dockerfile Nest.js
└── docker-compose.yml # Orchestration des services
```

## 🚀 Démarrage Rapide

Voir [GUIDE.md](GUIDE.md) pour les instructions détaillées.

### Configuration initiale

1. **Créer les fichiers .env** :
   ```powershell
   Copy-Item docker-compose.env.example .env
   Copy-Item env.backend.example .env.backend
   Copy-Item env.frontend.example .env.frontend
   ```

2. **Modifier les valeurs dans `.env`** :
   - Mots de passe MySQL
   - `APP_SECRET` pour Symfony (générer avec : `php -r "echo bin2hex(random_bytes(32));"`)

3. **Démarrer Docker** :
   ```powershell
   docker-compose build
   docker-compose up -d
   ```

## 🔌 Ports

- **3000** : API Nest.js (backend)
- **8000** : Interface Symfony (frontend)
- **3307** : MySQL (externe, 3306 interne)
- **8080** : phpMyAdmin (interface de gestion MySQL)

## 📚 Documentation

- **GUIDE.md** : Guide complet de démarrage et configuration
- **docker-compose.yml** : Configuration des services Docker
- **docker/** : Dockerfiles et configurations

## 🏗️ Architecture

```
┌─────────────┐
│   Nginx     │ :80 → :8000 (externe)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  PHP-FPM    │ :9000 (Symfony - Frontend)
└──────┬──────┘
       │ API calls
       ▼
┌─────────────┐
│   Nest.js   │ :3000 (Backend API)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   MySQL     │ :3306 → :3307 (externe)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ phpMyAdmin  │ :80 → :8080 (externe)
└─────────────┘
```

## 📝 Conventions

- **Fichiers** : kebab-case
- **Classes** : PascalCase
- **Variables** : camelCase
- **Constantes** : UPPER_SNAKE_CASE

## 🔧 Commandes Utiles

```powershell
# Démarrer les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down

# Reconstruire les images
docker-compose build

# Accéder au shell d'un conteneur
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec mysql bash

# phpMyAdmin
# Accédez à http://localhost:8080
# Utilisateur : cooking_user (ou root)
# Mot de passe : celui défini dans .env (MYSQL_PASSWORD ou MYSQL_ROOT_PASSWORD)

# Migrations Prisma
docker-compose exec backend npx prisma migrate dev
docker-compose exec backend npx prisma generate

# Symfony console
docker-compose exec frontend php bin/console
```

## 📖 Fichiers .env

Les fichiers `.env.example` servent de templates :
- `docker-compose.env.example` : Variables principales pour docker-compose
- `env.backend.example` : Configuration Nest.js + Prisma
- `env.frontend.example` : Configuration Symfony

Copiez-les et modifiez les valeurs selon vos besoins.
