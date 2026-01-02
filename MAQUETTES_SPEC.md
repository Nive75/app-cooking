# 📐 Spécifications pour Maquettes - Application de Gestion de Recettes

## 🎯 Vue d'ensemble de l'application

Application web intuitive de gestion de recettes et de planification de repas avec calendrier intégré. L'application permet de créer, modifier et planifier des plats avec leurs recettes détaillées (ingrédients avec grammages), et de les intégrer dans un calendrier pour une planification hebdomadaire ou mensuelle.

---

## 🎨 Palette de couleurs

### Couleurs principales
- **Vert principal** : `#A4BD01` - Couleur d'accent, boutons d'action, éléments interactifs
- **Bleu clair** : `#EBF2FA` - Arrière-plan, zones de contenu secondaires, cartes
- **Bleu foncé** : `#06668C` - Textes principaux, titres, navigation, éléments de structure

### Utilisation des couleurs
- **#A4BD01** : Boutons "Ajouter", "Valider", "Sauvegarder", indicateurs de succès, badges actifs
- **#EBF2FA** : Arrière-plan du dashboard, cartes de recettes, zones de formulaire
- **#06668C** : Navigation principale, titres de sections, texte de contenu principal, liens

### Couleurs complémentaires suggérées
- **Blanc** : `#FFFFFF` - Arrière-plan principal, texte sur fonds colorés
- **Gris clair** : `#F5F5F5` - Bordures, séparateurs
- **Gris moyen** : `#CCCCCC` - Textes secondaires, états désactivés
- **Rouge/Orange** : `#E74C3C` ou `#FF6B6B` - Actions de suppression, alertes

---

## 🏠 Dashboard (Page d'accueil)

### Objectif
Vue d'ensemble de l'application avec accès rapide aux fonctionnalités principales et aperçu de la semaine.

### Éléments à inclure

#### 1. En-tête / Navigation
- **Logo** de l'application (coin supérieur gauche)
- **Menu de navigation** horizontal avec :
  - Dashboard (actif)
  - Mes Recettes
  - Calendrier
  - Planification
- **Bouton "Nouvelle Recette"** (vert #A4BD01) en haut à droite
- **Icône utilisateur** / Profil (coin supérieur droit)

#### 2. Section "Cette semaine"
- **Calendrier miniature** (vue semaine) avec :
  - Jours de la semaine (Lun, Mar, Mer, Jeu, Ven, Sam, Dim)
  - Plats planifiés affichés sous chaque jour
  - Badge avec nombre de plats par jour
  - Clic sur un jour → redirection vers le calendrier détaillé
- **Couleur de fond** : #EBF2FA
- **Bordures** : #06668C (légère)

#### 3. Section "Recettes récentes"
- **Grille de cartes** (3-4 colonnes selon la largeur)
- Chaque carte affiche :
  - Image de la recette (ou placeholder)
  - Nom du plat
  - Temps de préparation
  - Nombre de personnes
  - Badge de catégorie (Entrée, Plat, Dessert, etc.)
  - Bouton "Voir" et "Modifier"
- **Couleur des cartes** : Blanc avec ombre légère
- **Hover** : Légère élévation, bordure #A4BD01

#### 4. Section "Statistiques rapides"
- **Cartes statistiques** (4 cartes côte à côte) :
  - Total de recettes
  - Plats planifiés cette semaine
  - Recettes favorites
  - Dernière recette ajoutée
- **Icônes** colorées (#A4BD01)
- **Couleur de fond** : #EBF2FA avec bordure #06668C

#### 5. Section "Actions rapides"
- **Boutons d'action** :
  - "Créer une recette" (grand, vert #A4BD01)
  - "Planifier un repas" (moyen, bleu #06668C)
  - "Voir le calendrier" (moyen, bleu #06668C)

---

## 📅 Calendrier

### Objectif
Vue calendrier pour planifier les repas sur plusieurs semaines/mois.

### Éléments à inclure

#### 1. En-tête du calendrier
- **Navigation** :
  - Bouton "← Mois précédent"
  - Mois et année affichés (ex: "Janvier 2024")
  - Bouton "Mois suivant →"
  - Bouton "Aujourd'hui" (retour au mois actuel)
- **Vue** : Boutons pour basculer entre Vue Semaine / Vue Mois
- **Filtres** : Par catégorie de plat, par recette favorite

#### 2. Grille calendrier
- **Vue Semaine** :
  - Colonnes pour chaque jour (Lun-Dim)
  - Lignes pour chaque repas (Petit-déjeuner, Déjeuner, Dîner, Collation)
  - Cases cliquables pour ajouter un plat
  - Plats existants affichés en cartes avec :
    - Nom du plat
    - Heure (si définie)
    - Badge de catégorie
    - Bouton "Modifier" / "Supprimer"
- **Vue Mois** :
  - Grille classique (7 colonnes × ~5 lignes)
  - Jours avec plats planifiés affichés avec badge coloré
  - Clic sur un jour → modal ou page détaillée

#### 3. Panneau latéral (optionnel)
- **Liste des recettes** disponibles
- **Glisser-déposer** pour ajouter au calendrier
- **Recherche** de recettes
- **Filtres** par catégorie

#### 4. Modal "Ajouter un plat au calendrier"
- **Sélection de la date** (calendrier date picker)
- **Sélection du repas** (Petit-déjeuner, Déjeuner, Dîner, Collation)
- **Sélection de la recette** (liste déroulante ou recherche)
- **Heure** (optionnel)
- **Nombre de personnes** (pré-rempli depuis la recette, modifiable)
- **Boutons** : "Annuler" (gris) / "Ajouter" (vert #A4BD01)

---

## 🍳 Gestion des Recettes

### Page "Mes Recettes"

#### 1. En-tête
- **Titre** : "Mes Recettes"
- **Bouton "Nouvelle Recette"** (vert #A4BD01, en haut à droite)
- **Barre de recherche** (recherche par nom, ingrédient, catégorie)
- **Filtres** :
  - Par catégorie (Toutes, Entrées, Plats, Desserts, etc.)
  - Par favoris
  - Par temps de préparation
  - Par nombre de personnes

#### 2. Liste / Grille de recettes
- **Toggle** : Vue Liste / Vue Grille
- **Vue Grille** :
  - Cartes avec image, nom, temps, personnes
  - Actions : Voir, Modifier, Dupliquer, Supprimer
- **Vue Liste** :
  - Tableau avec colonnes : Nom, Catégorie, Temps, Personnes, Actions
  - Triable par colonne

---

### Page "Créer / Modifier une Recette"

#### 1. Formulaire en deux colonnes

**Colonne gauche (60% de largeur)** :
- **Informations générales** :
  - Nom du plat (champ texte, obligatoire)
  - Catégorie (sélection : Entrée, Plat principal, Dessert, Collation, Boisson)
  - Description (zone de texte)
  - Image (upload avec aperçu)
  - Temps de préparation (en minutes)
  - Temps de cuisson (en minutes)
  - Nombre de personnes (nombre)
  - Niveau de difficulté (Facile, Moyen, Difficile)
  - Tags / Mots-clés (chips multiples)

**Colonne droite (40% de largeur)** :
- **Aperçu en temps réel** de la recette
- **Statistiques** :
  - Calories (si calculées)
  - Coût estimé (si renseigné)
- **Actions** :
  - Bouton "Sauvegarder" (vert #A4BD01)
  - Bouton "Sauvegarder et planifier" (vert #A4BD01, variante)
  - Bouton "Annuler" (gris)

#### 2. Section "Ingrédients"
- **Liste d'ingrédients** avec :
  - Nom de l'ingrédient (autocomplétion suggérée)
  - Quantité (nombre décimal)
  - Unité (g, kg, ml, L, pièce, cuillère à soupe, etc.)
  - Optionnel : Prix unitaire (pour calcul du coût)
- **Bouton "Ajouter un ingrédient"** (vert #A4BD01)
- **Actions** : Modifier, Supprimer pour chaque ingrédient
- **Total** : Affichage du coût total des ingrédients (si prix renseignés)

#### 3. Section "Étapes de préparation"
- **Liste numérotée** des étapes
- Chaque étape :
  - Zone de texte pour la description
  - Durée (optionnel)
  - Image (optionnel)
  - Bouton "Supprimer"
- **Bouton "Ajouter une étape"** (vert #A4BD01)
- **Réorganisation** : Glisser-déposer pour réordonner les étapes

#### 4. Section "Notes et variantes"
- **Zone de texte** pour notes personnelles
- **Section "Variantes"** :
  - Liste de variantes possibles (ex: "Sans gluten", "Végétarien")
  - Modifications d'ingrédients pour chaque variante

---

### Page "Détail d'une Recette"

#### 1. En-tête avec image
- **Image principale** (pleine largeur, hauteur ~300px)
- **Overlay** avec :
  - Nom du plat (grand, blanc)
  - Catégorie (badge)
  - Temps total (icône + texte)
  - Nombre de personnes (icône + texte)
  - Bouton "Modifier" (coin supérieur droit)

#### 2. Informations principales
- **Métadonnées** :
  - Temps de préparation
  - Temps de cuisson
  - Niveau de difficulté
  - Calories (si disponibles)
- **Actions rapides** :
  - Bouton "Planifier ce plat" (vert #A4BD01)
  - Bouton "Marquer comme favori" (icône cœur)
  - Bouton "Partager" (icône partage)

#### 3. Section "Ingrédients"
- **Liste** avec :
  - Quantité + Unité + Nom de l'ingrédient
  - Checkbox pour cocher lors de la préparation
  - Optionnel : Image de l'ingrédient
- **Bouton "Générer liste de courses"** (bleu #06668C)

#### 4. Section "Préparation"
- **Étapes numérotées** avec :
  - Numéro d'étape (cercle coloré #A4BD01)
  - Description
  - Image (si disponible)
  - Durée (si renseignée)
- **Checkbox** pour marquer chaque étape comme terminée

#### 5. Section "Notes"
- Notes personnelles (si renseignées)
- Variantes (si définies)

---

## 📋 Planification

### Page "Planification"

#### 1. Vue d'ensemble
- **Calendrier** (vue semaine ou mois)
- **Liste de courses générée** automatiquement basée sur les plats planifiés
- **Statistiques** :
  - Budget estimé de la semaine
  - Nombre total de repas planifiés
  - Répartition par catégorie

#### 2. Liste de courses
- **Groupée par catégorie** (Fruits & Légumes, Viandes, Produits laitiers, etc.)
- Chaque ingrédient affiche :
  - Nom
  - Quantité totale nécessaire
  - Unité
  - Plats concernés (badges)
  - Checkbox pour cocher lors des courses
- **Bouton "Exporter"** (PDF, texte, ou partage)

---

## 🎨 Principes de design

### Typographie
- **Titres principaux** : Police bold, taille 24-32px, couleur #06668C
- **Sous-titres** : Police semi-bold, taille 18-20px, couleur #06668C
- **Texte de contenu** : Police regular, taille 14-16px, couleur #06668C
- **Textes secondaires** : Police regular, taille 12-14px, couleur gris moyen

### Espacements
- **Marges entre sections** : 32-40px
- **Padding dans les cartes** : 16-20px
- **Espacement entre éléments** : 8-16px

### Composants réutilisables

#### Boutons
- **Primaire** : Fond #A4BD01, texte blanc, padding 12px 24px, border-radius 8px
- **Secondaire** : Fond transparent, bordure #06668C, texte #06668C, padding 12px 24px
- **Danger** : Fond rouge, texte blanc
- **Hover** : Légère élévation (box-shadow), transformation scale(1.02)

#### Cartes
- **Fond** : Blanc ou #EBF2FA
- **Bordure** : 1px solid #06668C (légère, opacité 20%)
- **Border-radius** : 12px
- **Ombre** : Légère (box-shadow: 0 2px 8px rgba(0,0,0,0.1))
- **Hover** : Ombre plus prononcée, bordure #A4BD01

#### Inputs / Formulaires
- **Bordure** : 1px solid #06668C (opacité 30%)
- **Focus** : Bordure #A4BD01, ombre légère
- **Border-radius** : 8px
- **Padding** : 12px 16px

#### Badges
- **Fond** : #EBF2FA
- **Texte** : #06668C
- **Border-radius** : 20px
- **Padding** : 6px 12px
- **Variante active** : Fond #A4BD01, texte blanc

---

## 📱 Responsive Design

### Breakpoints
- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

### Adaptations mobiles
- **Navigation** : Menu hamburger
- **Calendrier** : Vue jour par jour avec navigation
- **Grille de recettes** : 1 colonne sur mobile, 2 sur tablette, 3-4 sur desktop
- **Formulaire** : Colonnes empilées verticalement

---

## 🔄 Interactions et animations

### Transitions
- **Durée** : 200-300ms
- **Easing** : ease-in-out
- **Éléments animés** :
  - Hover sur boutons et cartes
  - Ouverture/fermeture de modals
  - Changement de vue (liste/grille)
  - Ajout/suppression d'éléments

### Feedback utilisateur
- **Succès** : Message vert (#A4BD01) avec icône check
- **Erreur** : Message rouge avec icône alert
- **Chargement** : Spinner avec couleur #A4BD01
- **Confirmation** : Modal de confirmation pour actions destructives

---

## 🎯 Parcours utilisateur principaux

### 1. Créer une nouvelle recette
Dashboard → Bouton "Nouvelle Recette" → Formulaire → Remplir informations → Ajouter ingrédients → Ajouter étapes → Sauvegarder → Retour Dashboard

### 2. Planifier un plat
Dashboard → Calendrier → Clic sur un jour/repas → Modal "Ajouter un plat" → Sélectionner recette → Valider → Affichage dans le calendrier

### 3. Modifier une recette
Dashboard → Mes Recettes → Clic sur une recette → Bouton "Modifier" → Formulaire pré-rempli → Modifications → Sauvegarder

### 4. Consulter une recette
Dashboard → Mes Recettes → Clic sur une recette → Page détail → Voir ingrédients et étapes → Optionnel : Planifier ou Modifier

---

## 📝 Notes pour l'IA génératrice de maquettes

### Priorités de design
1. **Simplicité** : Interface épurée, pas de surcharge visuelle
2. **Clarté** : Hiérarchie visuelle claire, informations importantes mises en avant
3. **Accessibilité** : Contraste suffisant, tailles de texte lisibles, zones cliquables suffisantes
4. **Cohérence** : Utilisation cohérente des couleurs, espacements, et composants

### Éléments à mettre en avant
- **Calendrier** : Élément central de l'application
- **Actions rapides** : Boutons d'action bien visibles (couleur verte #A4BD01)
- **Navigation** : Toujours accessible, claire

### Éléments à éviter
- Surcharge d'informations sur une même page
- Couleurs trop nombreuses (respecter la palette)
- Textes trop petits
- Actions cachées ou difficiles à trouver

---

## 🚀 Écrans à créer (priorité)

1. **Dashboard** (priorité haute)
2. **Calendrier - Vue Semaine** (priorité haute)
3. **Page "Mes Recettes" - Vue Grille** (priorité haute)
4. **Formulaire "Créer une Recette"** (priorité haute)
5. **Page "Détail d'une Recette"** (priorité moyenne)
6. **Modal "Ajouter un plat au calendrier"** (priorité moyenne)
7. **Page "Planification" avec liste de courses** (priorité basse)

---

## 📌 Résumé pour prompt IA

**Application web de gestion de recettes avec calendrier de planification. Interface moderne et intuitive avec palette de couleurs : vert #A4BD01 pour les actions, bleu clair #EBF2FA pour les arrière-plans, bleu foncé #06668C pour les textes et navigation. Dashboard avec vue d'ensemble, calendrier interactif pour planifier les repas, gestion complète des recettes avec ingrédients (quantités en grammes), étapes de préparation, et modification facile. Design épuré, responsive, avec cartes, badges, et formulaires bien structurés. Focus sur la simplicité et l'accessibilité.**

