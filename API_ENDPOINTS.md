# 📡 API Endpoints - Application de Gestion de Recettes

## Base URL
```
http://localhost:3000
```

## 🔗 Endpoints disponibles

### 📝 Recipes (Recettes)

#### `GET /recipes`
Récupère toutes les recettes
- **Réponse** : Liste de toutes les recettes triées par date de création (plus récentes en premier)

#### `GET /recipes/:id`
Récupère une recette par son ID
- **Paramètres** : `id` (number)
- **Réponse** : Détails de la recette avec ses meal plans associés
- **Erreur 404** : Si la recette n'existe pas

#### `POST /recipes`
Crée une nouvelle recette
- **Body** :
  ```json
  {
    "titre": "string (requis, max 255 caractères)",
    "description": "string (requis, texte libre avec ingrédients + étapes)",
    "temps_preparation": "number (optionnel, en minutes)",
    "image_url": "string (optionnel, max 500 caractères)"
  }
  ```
- **Réponse 201** : Recette créée

#### `PATCH /recipes/:id`
Met à jour une recette
- **Paramètres** : `id` (number)
- **Body** : Tous les champs sont optionnels
  ```json
  {
    "titre": "string (optionnel)",
    "description": "string (optionnel)",
    "temps_preparation": "number (optionnel)",
    "image_url": "string (optionnel)"
  }
  ```
- **Réponse** : Recette mise à jour
- **Erreur 404** : Si la recette n'existe pas

#### `DELETE /recipes/:id`
Supprime une recette
- **Paramètres** : `id` (number)
- **Réponse 204** : Recette supprimée
- **Erreur 404** : Si la recette n'existe pas

---

### 📅 Meal Plan (Planification des repas)

#### `GET /meal-plan`
Récupère tous les repas planifiés
- **Query params** (optionnels) :
  - `startDate` : Date de début (format ISO: YYYY-MM-DD)
  - `endDate` : Date de fin (format ISO: YYYY-MM-DD)
- **Réponse** : Liste de tous les repas planifiés avec leurs recettes associées
- **Note** : Si `startDate` et `endDate` sont fournis, retourne uniquement les repas dans cette plage

#### `GET /meal-plan/:id`
Récupère un repas planifié par son ID
- **Paramètres** : `id` (number)
- **Réponse** : Détails du repas avec sa recette associée
- **Erreur 404** : Si le repas n'existe pas

#### `POST /meal-plan`
Crée un nouveau repas planifié
- **Body** :
  ```json
  {
    "date": "string (requis, format ISO: YYYY-MM-DD)",
    "moment": "string (requis, doit être: 'petit_dejeuner', 'dejeuner', 'diner', ou 'collation')",
    "recipe_id": "number (optionnel, ID de la recette)",
    "note": "string (optionnel, notes libres)"
  }
  ```
- **Réponse 201** : Repas planifié créé avec sa recette associée

#### `PATCH /meal-plan/:id`
Met à jour un repas planifié
- **Paramètres** : `id` (number)
- **Body** : Tous les champs sont optionnels
  ```json
  {
    "date": "string (optionnel, format ISO: YYYY-MM-DD)",
    "moment": "string (optionnel)",
    "recipe_id": "number (optionnel)",
    "note": "string (optionnel)"
  }
  ```
- **Réponse** : Repas planifié mis à jour
- **Erreur 404** : Si le repas n'existe pas

#### `DELETE /meal-plan/:id`
Supprime un repas planifié
- **Paramètres** : `id` (number)
- **Réponse 204** : Repas planifié supprimé
- **Erreur 404** : Si le repas n'existe pas

---

### 🛒 Shopping Items (Liste de courses)

#### `GET /shopping-items`
Récupère tous les articles de la liste de courses
- **Query params** (optionnels) :
  - `unchecked=true` : Retourne uniquement les articles non cochés
- **Réponse** : Liste de tous les articles triés par date de création (plus récents en premier)

#### `GET /shopping-items/:id`
Récupère un article par son ID
- **Paramètres** : `id` (number)
- **Réponse** : Détails de l'article
- **Erreur 404** : Si l'article n'existe pas

#### `POST /shopping-items`
Crée un nouvel article dans la liste de courses
- **Body** :
  ```json
  {
    "nom": "string (requis, max 255 caractères)",
    "quantite": "string (optionnel, max 100 caractères, ex: '3', '500 g', '1 kg')",
    "coche": "boolean (optionnel, défaut: false)"
  }
  ```
- **Réponse 201** : Article créé

#### `PATCH /shopping-items/:id`
Met à jour un article
- **Paramètres** : `id` (number)
- **Body** : Tous les champs sont optionnels
  ```json
  {
    "nom": "string (optionnel)",
    "quantite": "string (optionnel)",
    "coche": "boolean (optionnel)"
  }
  ```
- **Réponse** : Article mis à jour
- **Erreur 404** : Si l'article n'existe pas

#### `PATCH /shopping-items/:id/toggle`
Inverse l'état de coche d'un article (coché ↔ non coché)
- **Paramètres** : `id` (number)
- **Réponse** : Article avec l'état de coche inversé
- **Erreur 404** : Si l'article n'existe pas

#### `DELETE /shopping-items/:id`
Supprime un article
- **Paramètres** : `id` (number)
- **Réponse 204** : Article supprimé
- **Erreur 404** : Si l'article n'existe pas

#### `DELETE /shopping-items/checked/all`
Supprime tous les articles cochés
- **Réponse 204** : Tous les articles cochés ont été supprimés

---

## 📋 Exemples d'utilisation

### Créer une recette
```bash
curl -X POST http://localhost:3000/recipes \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Pâtes Carbonara",
    "description": "## Ingrédients:\n- 400g de pâtes\n- 200g de lardons\n\n## Étapes:\n1. Cuire les pâtes",
    "temps_preparation": 30,
    "image_url": "https://example.com/carbonara.jpg"
  }'
```

### Planifier un repas
```bash
curl -X POST http://localhost:3000/meal-plan \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-01-15",
    "moment": "dejeuner",
    "recipe_id": 1,
    "note": "Repas du midi"
  }'
```

### Ajouter un article à la liste de courses
```bash
curl -X POST http://localhost:3000/shopping-items \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Pâtes",
    "quantite": "400g",
    "coche": false
  }'
```

### Récupérer les repas d'une période
```bash
curl "http://localhost:3000/meal-plan?startDate=2024-01-01&endDate=2024-01-31"
```

### Cocher un article de la liste
```bash
curl -X PATCH http://localhost:3000/shopping-items/1/toggle
```

---

## 🔧 Codes de statut HTTP

- **200 OK** : Requête réussie
- **201 Created** : Ressource créée avec succès
- **204 No Content** : Suppression réussie (pas de contenu retourné)
- **404 Not Found** : Ressource non trouvée
- **400 Bad Request** : Données invalides (validation échouée)

---

## 📝 Notes

- Tous les endpoints retournent du JSON
- Les dates doivent être au format ISO (YYYY-MM-DD)
- Les IDs sont des nombres entiers
- La validation est effectuée automatiquement via `class-validator`
- Les relations entre les tables sont gérées automatiquement par Prisma

