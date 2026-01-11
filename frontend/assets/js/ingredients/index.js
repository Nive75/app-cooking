// ============================================
// Module Ingrédients - Gestion de la page des ingrédients
// ============================================

// Constante pour le debounce de recherche
const SEARCH_DEBOUNCE_MS = 300;

/**
 * Initialise la page des ingrédients
 */
export function initIngredientsPage() {
  const container = document.getElementById('ingredients-container');
  if (!container) return;

  // État de l'application
  let currentFilter = 'all';
  let currentView = 'grid';
  let searchQuery = '';

  // Éléments DOM
  const filterButtons = document.querySelectorAll('.ingredient-filter-btn');
  const viewButtons = document.querySelectorAll('.view-toggle-btn');
  const searchInput = document.getElementById('ingredient-search');
  const countElement = document.getElementById('ingredients-count-number');

  // Gestion des filtres
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Retirer la classe active de tous les boutons
      filterButtons.forEach((b) => b.classList.remove('active-filter'));
      // Ajouter la classe active au bouton cliqué
      btn.classList.add('active-filter');
      // Mettre à jour le filtre actif
      currentFilter = btn.dataset.filter || 'all';
      // Recharger les ingrédients
      loadIngredients();
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
        document.querySelectorAll('.ingredient-card').forEach((card) => {
          card.classList.add('list-view');
        });
      } else {
        container.classList.remove('list-view');
        document.querySelectorAll('.ingredient-card').forEach((card) => {
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
        loadIngredients();
      }, SEARCH_DEBOUNCE_MS);
    });
  }

  /**
   * Charge les ingrédients depuis l'API
   */
  async function loadIngredients() {
    try {
      // Construire l'URL avec les filtres
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);

      // Ajouter les filtres nutritionnels selon le filtre sélectionné
      if (currentFilter !== 'all') {
        const filterMapping = {
          lactose: 'sans_lactose',
          gluten: 'sans_gluten',
          proteines: 'riche_proteines',
          fibres: 'riche_fibres',
          vitamines: 'riche_vitamines',
        };

        const filterParam = filterMapping[currentFilter];
        if (filterParam) {
          params.append(filterParam, 'true');
        }
      }

      const url = `/api/ingredients${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url, {
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const ingredients = await response.json();

      // Mettre à jour le compteur
      if (countElement) {
        countElement.textContent = ingredients.length || 0;
      }

      // Afficher les ingrédients
      renderIngredients(ingredients || []);
    } catch (error) {
      console.error('Erreur lors du chargement des ingrédients:', error);
      renderIngredients([]);
      if (countElement) {
        countElement.textContent = '0';
      }
    }
  }

  /**
   * Affiche les ingrédients dans le conteneur
   */
  function renderIngredients(ingredients) {
    // Vider le conteneur
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    if (ingredients.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'col-span-full text-center py-12 text-gray-500';
      
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'w-16 h-16 mx-auto mb-4 text-gray-300');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('viewBox', '0 0 24 24');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('d', 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10');
      svg.appendChild(path);
      
      const title = document.createElement('p');
      title.className = 'text-lg font-semibold';
      title.textContent = 'Aucun ingrédient trouvé';
      
      const subtitle = document.createElement('p');
      subtitle.className = 'text-sm mt-2';
      subtitle.textContent = 'Essayez de modifier vos critères de recherche';
      
      emptyState.appendChild(svg);
      emptyState.appendChild(title);
      emptyState.appendChild(subtitle);
      container.appendChild(emptyState);
      return;
    }

    // Créer une grille d'ingrédients
    ingredients.forEach(ingredient => {
      const card = createIngredientCard(ingredient);
      container.appendChild(card);
    });
  }

  /**
   * Crée une carte d'ingrédient
   */
  function createIngredientCard(ingredient) {
    const card = document.createElement('div');
    card.className = 'ingredient-card recipe-card';
    card.dataset.ingredientId = ingredient.id;

    const nom = ingredient.nom || 'Sans nom';
    const unite = ingredient.unite || '';

    const content = document.createElement('div');
    content.className = 'ingredient-card__content p-4';

    const header = document.createElement('div');
    header.className = 'flex items-start justify-between mb-2';

    const title = document.createElement('h3');
    title.className = 'ingredient-card__title recipe-card__title';
    title.textContent = nom;
    header.appendChild(title);
    content.appendChild(header);

    if (unite) {
      const uniteP = document.createElement('p');
      uniteP.className = 'text-sm text-gray-600 mb-2';
      uniteP.textContent = `Unité: ${unite}`;
      content.appendChild(uniteP);
    }

    const meta = document.createElement('div');
    meta.className = 'ingredient-card__meta recipe-card__meta flex items-center gap-2 text-xs text-gray-600';

    const metaSpan = document.createElement('span');
    metaSpan.className = 'flex items-center gap-1';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'w-4 h-4');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('viewBox', '0 0 24 24');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('d', 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z');
    svg.appendChild(path);

    const text = document.createTextNode('Ingrédient');
    metaSpan.appendChild(svg);
    metaSpan.appendChild(text);
    meta.appendChild(metaSpan);
    content.appendChild(meta);

    card.appendChild(content);

    // Gestion du clic pour éditer
    card.addEventListener('click', () => {
      window.location.href = `/ingredients/${ingredient.id}/edit`;
    });

    return card;
  }

  // Initialisation
  loadIngredients();
}
