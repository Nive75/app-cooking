// ============================================
// Module Recettes - Gestion de la page des recettes
// ============================================

// Constante pour le debounce de recherche
const SEARCH_DEBOUNCE_MS = 300;

/**
 * Initialise la page des recettes
 */
export function initRecipesPage() {
  const container = document.getElementById('recipes-container');
  if (!container) return;

  // État de l'application
  let currentCategory = 'all';
  let currentView = 'grid';
  let searchQuery = '';

  // Éléments DOM
  const filterButtons = document.querySelectorAll('.recipe-filter-btn');
  const viewButtons = document.querySelectorAll('.view-toggle-btn');
  const searchInput = document.getElementById('recipe-search');

  // Gestion des filtres par catégorie
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Retirer la classe active de tous les boutons
      filterButtons.forEach((b) => b.classList.remove('active-filter'));
      // Ajouter la classe active au bouton cliqué
      btn.classList.add('active-filter');
      // Mettre à jour la catégorie active
      currentCategory = btn.dataset.category || 'all';
      // Recharger les recettes (sera remplacé par un appel API)
      loadRecipes();
    });
  });

  // Gestion du changement de vue (grille/liste)
  viewButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Retirer la classe active de tous les boutons
      viewButtons.forEach((b) => b.classList.remove('active-view'));
      // Ajouter la classe active au bouton cliqué
      btn.classList.add('active-view');
      // Mettre à jour la vue active
      currentView = btn.dataset.view || 'grid';
      // Appliquer la classe à la grille
      if (currentView === 'list') {
        container.classList.add('list-view');
        document.querySelectorAll('.recipe-card').forEach((card) => {
          card.classList.add('list-view');
        });
      } else {
        container.classList.remove('list-view');
        document.querySelectorAll('.recipe-card').forEach((card) => {
          card.classList.remove('list-view');
        });
      }
    });
  });

  // Gestion de la recherche
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchQuery = e.target.value.trim();
      // Debounce : attendre après la dernière frappe
      searchTimeout = setTimeout(() => {
        loadRecipes();
      }, SEARCH_DEBOUNCE_MS);
    });
  }

  // Fonction pour charger les recettes
  function loadRecipes() {
    // TODO: Remplacer par un appel API
    // const res = await fetch(`/api/recipes?category=${currentCategory}&search=${searchQuery}`);
    // const data = await res.json();
    // renderRecipes(data.recipes || []);
    console.log('Chargement des recettes:', {
      category: currentCategory,
      search: searchQuery,
      view: currentView,
    });
  }

  // Initialisation
  loadRecipes();
}
