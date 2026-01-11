# API Backend - Documentation

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Recettes (`/api/recipes`)

#### GET `/api/recipes`
Récupère toutes les recettes avec filtres optionnels.

**Query Parameters:**
- `search` (string, optionnel) : Recherche dans le titre et la description
- `favorites` (boolean, optionnel) : Filtrer uniquement les favoris (`true`)
- `category` (string, optionnel) : Pour usage futur

**Exemple:**
```
GET /api/recipes?search=pasta&favorites=true
```

**Réponse:**
```json
[
  {
    "id": 1,
    "titre": "Pasta Carbonara",
    "description": "...",
    "temps_preparation": 30,
    "image_url": "...",
    "is_favorite": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
    "recipeIngredients": [
      {
        "id": 1,
        "quantite": "200g",
        "ingredient": {
          "id": 1,
          "nom": "Pâtes",
          "unite": "g"
        }
      }
    ]
  }
]
```

#### GET `/api/recipes/:id`
Récupère une recette par son ID avec ses ingrédients.

**Réponse:**
```json
{
  "id": 1,
  "titre": "Pasta Carbonara",
  "description": "...",
  "temps_preparation": 30,
  "image_url": "...",
  "is_favorite": true,
  "mealPlans": [...],
  "recipeIngredients": [
    {
      "id": 1,
      "quantite": "200g",
      "ingredient": {
        "id": 1,
        "nom": "Pâtes",
        "unite": "g"
      }
    }
  ]
}
```

#### POST `/api/recipes`
Crée une nouvelle recette.

**Body:**
```json
{
  "titre": "Pasta Carbonara",
  "description": "Une délicieuse recette de pâtes",
  "temps_preparation": 30,
  "image_url": "https://example.com/image.jpg",
  "is_favorite": false
}
```

#### PATCH `/api/recipes/:id`
Met à jour une recette.

**Body:** (tous les champs sont optionnels)
```json
{
  "titre": "Nouveau titre",
  "is_favorite": true
}
```

#### DELETE `/api/recipes/:id`
Supprime une recette.

---

### Ingrédients (`/api/ingredients`)

#### GET `/api/ingredients`
Récupère tous les ingrédients.

**Query Parameters:**
- `search` (string, optionnel) : Recherche par nom

**Exemple:**
```
GET /api/ingredients?search=tomate
```

**Réponse:**
```json
[
  {
    "id": 1,
    "nom": "Tomate",
    "unite": "g",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
    "_count": {
      "recipeIngredients": 5
    }
  }
]
```

#### GET `/api/ingredients/:id`
Récupère un ingrédient par son ID avec les recettes qui l'utilisent.

**Réponse:**
```json
{
  "id": 1,
  "nom": "Tomate",
  "unite": "g",
  "recipeIngredients": [
    {
      "id": 1,
      "quantite": "200g",
      "recipe": {
        "id": 1,
        "titre": "Pasta Carbonara",
        "image_url": "..."
      }
    }
  ]
}
```

#### POST `/api/ingredients`
Crée un nouvel ingrédient.

**Body:**
```json
{
  "nom": "Tomate",
  "unite": "g"
}
```

#### PATCH `/api/ingredients/:id`
Met à jour un ingrédient.

**Body:** (tous les champs sont optionnels)
```json
{
  "nom": "Tomate cerise",
  "unite": "pièce"
}
```

#### DELETE `/api/ingredients/:id`
Supprime un ingrédient.

---

### Planification (`/api/meal-plan`)

#### GET `/api/meal-plan`
Récupère les repas planifiés.

**Query Parameters:**
- `startDate` (string, optionnel) : Date de début (format: YYYY-MM-DD)
- `endDate` (string, optionnel) : Date de fin (format: YYYY-MM-DD)

**Exemple:**
```
GET /api/meal-plan?startDate=2024-01-22&endDate=2024-01-28
```

---

### Liste de courses (`/api/shopping-items`)

#### GET `/api/shopping-items`
Récupère tous les articles de la liste de courses.

**Query Parameters:**
- `unchecked` (boolean, optionnel) : Filtrer uniquement les non cochés (`true`)

---

### Dashboard (`/api/dashboard`)

#### GET `/api/dashboard/summary`
Récupère les statistiques du tableau de bord.

#### GET `/api/dashboard/week`
Récupère les données de la semaine en cours.

---

## Configuration CORS

L'API accepte les requêtes depuis `http://localhost:8000` (frontend Symfony) par défaut.
Vous pouvez configurer `FRONTEND_URL` dans les variables d'environnement.

## Validation

Tous les endpoints utilisent la validation automatique avec `class-validator`.
Les erreurs de validation retournent un code 400 avec les détails.
