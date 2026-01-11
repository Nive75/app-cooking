// ============================================
// Module Recipe Modal - Modal de sélection de recette
// ============================================

import { SEARCH_DEBOUNCE_MS } from './constants.js';
import { createFilledMealSlot } from './dom.js';

/**
 * Initialise la modal de sélection de recette
 * @param {Function} onRecipeSelect - Callback appelé lors de la sélection d'une recette
 * @returns {Object} Objet avec la fonction open
 */
export function initRecipeModal(onRecipeSelect) {
  const recipeModal = document.getElementById('planning-recipe-modal');
  const recipeModalOverlay = document.getElementById('planning-recipe-modal-overlay');
  const recipeModalClose = document.getElementById('planning-recipe-modal-close');
  const recipeModalList = document.getElementById('planning-recipe-modal-list');
  const recipeModalSearch = document.getElementById('planning-recipe-modal-search');
  const recipeFilterButtons = document.querySelectorAll('.planning-recipe-filter-btn');
  
  if (!recipeModal || !recipeModalList) {
    return { open: () => {} };
  }
  
  let currentSelectedSlot = null;
  let currentSelectedMealType = null;
  let currentSelectedDate = null;
  let currentRecipeCategory = 'all';
  let currentRecipeSearch = '';
  
  /**
   * Charge les recettes depuis l'API
   */
  async function loadRecipes() {
    // Afficher un état de chargement
    recipeModalList.innerHTML = `
      <div class="text-center py-12 text-gray-500">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <p class="text-lg font-semibold">Chargement des recettes...</p>
      </div>
    `;
    
    try {
      // Construire l'URL avec les filtres
      const params = new URLSearchParams();
      if (currentRecipeSearch) params.append('search', currentRecipeSearch);
      if (currentRecipeCategory !== 'all') params.append('category', currentRecipeCategory);
      
      const url = `/api/recipes${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url, {
        headers: { Accept: 'application/json' }
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const recipes = await response.json();
      
      if (!recipes || recipes.length === 0) {
        recipeModalList.innerHTML = `
          <div class="text-center py-12 text-gray-500">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-lg font-semibold">Aucune recette trouvée</p>
            <p class="text-sm mt-2">Essayez de modifier vos critères de recherche</p>
          </div>
        `;
        return;
      }
      
      // Afficher les recettes
      renderRecipes(recipes);
    } catch (error) {
      console.error('Erreur lors du chargement des recettes:', error);
      recipeModalList.innerHTML = `
        <div class="text-center py-12 text-red-500">
          <p class="text-lg font-semibold">Erreur lors du chargement</p>
          <p class="text-sm mt-2">Veuillez réessayer plus tard</p>
        </div>
      `;
    }
  }
  
  /**
   * Affiche les recettes dans la modal
   */
  function renderRecipes(recipes) {
    // Vider la liste
    while (recipeModalList.firstChild) {
      recipeModalList.removeChild(recipeModalList.firstChild);
    }
    
    // Créer une grille de recettes
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
    
    recipes.forEach(recipe => {
      const card = createRecipeCard(recipe);
      grid.appendChild(card);
    });
    
    recipeModalList.appendChild(grid);
  }
  
  /**
   * Crée une carte de recette
   */
  function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card cursor-pointer';
    
    const imageUrl = recipe.image_url || '';
    const title = recipe.titre || 'Sans titre';
    const prepTime = recipe.temps_preparation || 0;
    const isFavorite = recipe.is_favorite || false;
    
    card.innerHTML = `
      <div class="recipe-card__image ${imageUrl ? '' : 'bg-gray-200 flex items-center justify-center'}">
        ${imageUrl 
          ? `<img src="${imageUrl}" alt="${title}" class="w-full h-32 object-cover">`
          : `<svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>`
        }
      </div>
      <div class="recipe-card__content p-3">
        <div class="flex items-start justify-between mb-2">
          <h4 class="recipe-card__title text-sm font-semibold text-dark-blue line-clamp-2">${title}</h4>
          ${isFavorite 
            ? `<svg class="w-5 h-5 text-primary-green flex-shrink-0 ml-2" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
               </svg>`
            : ''
          }
        </div>
        <div class="recipe-card__meta flex items-center gap-2 text-xs text-gray-600">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ${prepTime}min
          </span>
        </div>
      </div>
    `;
    
    // Gestion du clic sur la carte
    card.addEventListener('click', () => {
      if (onRecipeSelect) {
        onRecipeSelect(recipe, currentSelectedSlot, currentSelectedMealType, currentSelectedDate);
      }
      close();
    });
    
    return card;
  }
  
  /**
   * Ouvre la modal
   */
  function open(slotId, mealType, date, currentMeal) {
    currentSelectedSlot = slotId;
    currentSelectedMealType = mealType;
    currentSelectedDate = date;
    
    // Réinitialiser les filtres
    currentRecipeCategory = 'all';
    currentRecipeSearch = '';
    if (recipeModalSearch) recipeModalSearch.value = '';
    
    // Réinitialiser les boutons de filtre
    recipeFilterButtons.forEach(btn => {
      if (btn.dataset.category === 'all') {
        btn.classList.add('active-filter');
      } else {
        btn.classList.remove('active-filter');
      }
    });
    
    // Charger les recettes
    loadRecipes();
    
    // Afficher la modal
    recipeModal.classList.remove('hidden');
  }
  
  /**
   * Ferme la modal
   */
  function close() {
    recipeModal.classList.add('hidden');
    currentSelectedSlot = null;
    currentSelectedMealType = null;
    currentSelectedDate = null;
  }
  
  // Gestion des filtres de catégorie
  recipeFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      recipeFilterButtons.forEach(b => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');
      currentRecipeCategory = btn.dataset.category || 'all';
      loadRecipes();
    });
  });
  
  // Gestion de la recherche
  if (recipeModalSearch) {
    let searchTimeout;
    recipeModalSearch.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      currentRecipeSearch = e.target.value.trim();
      searchTimeout = setTimeout(() => {
        loadRecipes();
      }, SEARCH_DEBOUNCE_MS);
    });
  }
  
  // Fermer la modal
  if (recipeModalOverlay) {
    recipeModalOverlay.addEventListener('click', close);
  }
  
  if (recipeModalClose) {
    recipeModalClose.addEventListener('click', close);
  }
  
  return { open };
}
