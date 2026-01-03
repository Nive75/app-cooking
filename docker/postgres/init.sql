-- ============================================
-- Script d'initialisation de la base de données PostgreSQL
-- Application de Gestion de Recettes
-- ============================================
-- Ce script crée les tables nécessaires pour une utilisation simple à deux
-- Structure minimale avec 3 tables : recipes, meal_plan, shopping_items
-- Compatible avec pgAdmin
-- ============================================

-- ============================================
-- TABLE : recipes
-- ============================================
-- Stocke les recettes avec leurs informations de base
-- Les ingrédients et étapes sont dans le champ description (texte libre)
-- Pour une version plus structurée plus tard, on pourra ajouter des tables
-- ingredients et recipe_ingredients sans casser cette structure
-- ============================================

CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,  -- Texte libre avec ingrédients + étapes (peut être en markdown)
    temps_preparation INTEGER,  -- Temps en minutes
    image_url VARCHAR(500),     -- URL de l'image (optionnel)
    is_favorite BOOLEAN DEFAULT FALSE, -- Recette favorite ou non
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances de recherche
CREATE INDEX IF NOT EXISTS idx_recipes_titre ON recipes(titre);
CREATE INDEX IF NOT EXISTS idx_recipes_created_at ON recipes(created_at);
CREATE INDEX IF NOT EXISTS idx_recipes_is_favorite ON recipes(is_favorite);

-- Commentaires sur la table
COMMENT ON TABLE recipes IS 'Stocke les recettes avec leurs informations de base';
COMMENT ON COLUMN recipes.description IS 'Texte libre avec ingrédients + étapes (peut être en markdown)';
COMMENT ON COLUMN recipes.temps_preparation IS 'Temps en minutes';
COMMENT ON COLUMN recipes.image_url IS 'URL de l''image (optionnel)';
COMMENT ON COLUMN recipes.is_favorite IS 'Recette favorite ou non';

-- ============================================
-- TABLE : meal_plan
-- ============================================
-- Plan des repas : associe une recette à une date et un moment de la journée
-- recipe_id peut être NULL pour les cas comme "resto" ou "leftovers"
-- ============================================

CREATE TABLE IF NOT EXISTS meal_plan (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,  -- Date du repas
    moment VARCHAR(50) NOT NULL CHECK (moment IN ('petit_dejeuner', 'dejeuner', 'diner', 'collation')),
    recipe_id INTEGER,   -- NULL si pas de recette (ex: resto, leftovers)
    note TEXT,           -- Notes libres (ex: invités, leftovers, etc.)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE SET NULL
);

-- Index pour améliorer les performances de recherche par date
CREATE INDEX IF NOT EXISTS idx_meal_plan_date ON meal_plan(date);
CREATE INDEX IF NOT EXISTS idx_meal_plan_recipe_id ON meal_plan(recipe_id);
CREATE INDEX IF NOT EXISTS idx_meal_plan_date_moment ON meal_plan(date, moment);

-- Commentaires sur la table
COMMENT ON TABLE meal_plan IS 'Plan des repas : associe une recette à une date et un moment de la journée';
COMMENT ON COLUMN meal_plan.date IS 'Date du repas';
COMMENT ON COLUMN meal_plan.moment IS 'Moment de la journée : petit_dejeuner, dejeuner, diner, collation';
COMMENT ON COLUMN meal_plan.recipe_id IS 'NULL si pas de recette (ex: resto, leftovers)';
COMMENT ON COLUMN meal_plan.note IS 'Notes libres (ex: invités, leftovers, etc.)';

-- ============================================
-- TABLE : shopping_items
-- ============================================
-- Liste de courses très simple
-- Structure minimale pour cocher les courses au magasin
-- ============================================

CREATE TABLE IF NOT EXISTS shopping_items (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,      -- Nom de l'ingrédient (ex: "tomates", "pâtes")
    quantite VARCHAR(100),          -- Quantité en texte libre (ex: "3", "500 g", "1 kg")
    coche BOOLEAN DEFAULT FALSE,    -- Acheté ou non
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_shopping_items_coche ON shopping_items(coche);
CREATE INDEX IF NOT EXISTS idx_shopping_items_nom ON shopping_items(nom);

-- Commentaires sur la table
COMMENT ON TABLE shopping_items IS 'Liste de courses très simple';
COMMENT ON COLUMN shopping_items.nom IS 'Nom de l''ingrédient (ex: "tomates", "pâtes")';
COMMENT ON COLUMN shopping_items.quantite IS 'Quantité en texte libre (ex: "3", "500 g", "1 kg")';
COMMENT ON COLUMN shopping_items.coche IS 'Acheté ou non';

-- ============================================
-- TRIGGERS : Mise à jour automatique de updated_at
-- ============================================
-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Application des triggers sur chaque table
CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON recipes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meal_plan_updated_at BEFORE UPDATE ON meal_plan
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shopping_items_updated_at BEFORE UPDATE ON shopping_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DONNÉES DE TEST (optionnel - décommenter si besoin)
-- ============================================
/*
-- Exemple de recette
INSERT INTO recipes (titre, description, temps_preparation, image_url) VALUES
('Pâtes Carbonara', 
 '## Ingrédients:
- 400g de pâtes
- 200g de lardons
- 4 œufs
- 100g de parmesan
- Poivre

## Étapes:
1. Cuire les pâtes
2. Faire revenir les lardons
3. Mélanger les œufs et le parmesan
4. Ajouter les pâtes et mélanger', 
 30, 
 NULL);

-- Exemple de plan de repas
INSERT INTO meal_plan (date, moment, recipe_id, note) VALUES
(CURRENT_DATE, 'dejeuner', 1, 'Repas du midi'),
(CURRENT_DATE + INTERVAL '1 day', 'diner', 1, NULL);

-- Exemple de liste de courses
INSERT INTO shopping_items (nom, quantite, coche) VALUES
('Pâtes', '400g', FALSE),
('Lardons', '200g', FALSE),
('Œufs', '4', FALSE),
('Parmesan', '100g', FALSE);
*/

-- ============================================
-- FIN DU SCRIPT
-- ============================================

