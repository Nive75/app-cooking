# 🎨 Prompt pour IA - Génération de Maquettes

## Application : Gestion de Recettes avec Calendrier

### Description générale
Application web intuitive pour gérer des recettes de cuisine et planifier les repas sur un calendrier. L'utilisateur peut créer des recettes détaillées (avec ingrédients et grammages), les modifier facilement, et les intégrer dans un calendrier pour planifier ses repas.

### Palette de couleurs
- **Vert principal** : `#A4BD01` - Boutons d'action, éléments interactifs, accents
- **Bleu clair** : `#EBF2FA` - Arrière-plans, cartes, zones secondaires
- **Bleu foncé** : `#06668C` - Navigation, titres, textes principaux
- **Blanc** : `#FFFFFF` - Arrière-plan principal
- **Gris** : `#CCCCCC` - Textes secondaires, bordures

### Écrans principaux à créer

#### 1. Dashboard
- En-tête avec navigation (Dashboard, Mes Recettes, Calendrier, Planification)
- Section "Cette semaine" : calendrier miniature avec plats planifiés
- Section "Recettes récentes" : grille de cartes (3-4 colonnes) avec image, nom, temps, personnes
- Section "Statistiques" : 4 cartes (Total recettes, Plats planifiés, Favoris, Dernière recette)
- Section "Actions rapides" : boutons "Créer une recette", "Planifier un repas", "Voir le calendrier"
- **Style** : Fond #EBF2FA, cartes blanches avec ombre légère, boutons verts #A4BD01

#### 2. Calendrier (Vue Semaine)
- En-tête : navigation mois précédent/suivant, sélection vue Semaine/Mois
- Grille : 7 colonnes (jours) × 4 lignes (repas : Petit-déj, Déjeuner, Dîner, Collation)
- Cases cliquables pour ajouter un plat
- Plats existants affichés en petites cartes avec nom et badge catégorie
- **Style** : Grille avec bordures #06668C légères, cartes de plats avec fond #EBF2FA

#### 3. Page "Mes Recettes"
- En-tête : titre, bouton "Nouvelle Recette" (vert #A4BD01), barre de recherche
- Filtres : par catégorie, favoris, temps, personnes
- Grille de recettes : cartes avec image, nom, catégorie, temps, personnes, actions (Voir, Modifier, Supprimer)
- **Style** : Cartes blanches, hover avec bordure #A4BD01

#### 4. Formulaire "Créer/Modifier Recette"
- **Colonne gauche (60%)** :
  - Nom du plat, Catégorie, Description, Image upload
  - Temps préparation/cuisson, Nombre de personnes, Difficulté, Tags
- **Colonne droite (40%)** :
  - Aperçu en temps réel, Statistiques, Boutons d'action
- **Section Ingrédients** :
  - Liste avec : Nom, Quantité, Unité (g, kg, ml, etc.), Prix (optionnel)
  - Bouton "Ajouter ingrédient" (vert #A4BD01)
- **Section Étapes** :
  - Liste numérotée avec description, durée, image (optionnel)
  - Bouton "Ajouter étape" (vert #A4BD01)
- **Style** : Inputs avec bordure #06668C, focus #A4BD01, boutons verts

#### 5. Page "Détail Recette"
- Image principale en haut (pleine largeur)
- Overlay avec nom, catégorie, temps, personnes
- Section "Ingrédients" : liste avec quantités, checkbox pour cocher
- Section "Préparation" : étapes numérotées avec cercles colorés #A4BD01
- Boutons : "Planifier ce plat" (vert), "Favori", "Modifier"
- **Style** : Image hero, sections avec fond #EBF2FA alterné

#### 6. Modal "Ajouter un plat au calendrier"
- Sélection date (date picker)
- Sélection repas (radio buttons)
- Sélection recette (liste déroulante ou recherche)
- Heure (optionnel)
- Nombre de personnes
- Boutons : "Annuler" (gris) / "Ajouter" (vert #A4BD01)
- **Style** : Modal centré, fond blanc, ombre portée, inputs avec bordures #06668C

### Principes de design
- **Simplicité** : Interface épurée, pas de surcharge
- **Hiérarchie visuelle** : Titres en #06668C, actions en #A4BD01
- **Espacements** : Marges 32-40px entre sections, padding 16-20px dans cartes
- **Composants** : Boutons arrondis (border-radius 8px), cartes avec ombre légère
- **Responsive** : Adaptable mobile/tablette/desktop

### Interactions
- Hover sur boutons : légère élévation, scale(1.02)
- Hover sur cartes : bordure #A4BD01, ombre plus prononcée
- Transitions : 200-300ms ease-in-out
- Feedback : Messages de succès (vert) et erreur (rouge)

### Priorité des écrans
1. Dashboard (haute)
2. Calendrier Vue Semaine (haute)
3. Mes Recettes - Grille (haute)
4. Formulaire Créer Recette (haute)
5. Détail Recette (moyenne)
6. Modal Ajouter plat (moyenne)

---

## 📋 Prompt court pour IA

**Créer des maquettes pour une application web de gestion de recettes avec calendrier. Interface moderne utilisant les couleurs #A4BD01 (vert pour actions), #EBF2FA (bleu clair pour arrière-plans), et #06668C (bleu foncé pour navigation/textes). Dashboard avec vue d'ensemble, calendrier interactif pour planifier repas, gestion de recettes avec ingrédients (grammages), étapes de préparation, et modification facile. Design épuré avec cartes, badges, formulaires structurés, responsive. Focus simplicité et accessibilité.**

