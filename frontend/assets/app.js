// Import CSS avec Tailwind
import './css/app.css';

async function loadDashboardKpis() {
  const root = document.querySelector('[data-dashboard="1"]');
  if (!root) return;

  const elRecipes = document.getElementById('kpi-recipes');
  const elUpcoming = document.getElementById('kpi-upcoming');
  const elFavorites = document.getElementById('kpi-favorites');
  const elLatest = document.getElementById('kpi-latest');
  const elLatestDate = document.getElementById('kpi-latest-date');
  const elPeriod = document.getElementById('kpi-period');

  try {
    const res = await fetch('/api/dashboard/summary', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    const kpis = data && data.kpis ? data.kpis : null;
    const period = data && data.period ? data.period : null;

    const recipesVal = kpis && typeof kpis.recipes === 'number' ? kpis.recipes : 0;
    const upcomingVal = kpis && typeof kpis.upcoming === 'number' ? kpis.upcoming : 0;
    const favoritesVal = kpis && typeof kpis.favorites === 'number' ? kpis.favorites : 0;

    if (elRecipes) elRecipes.textContent = String(recipesVal);
    if (elUpcoming) elUpcoming.textContent = String(upcomingVal);
    if (elFavorites) elFavorites.textContent = String(favoritesVal);

    if (elPeriod && period && period.start && period.end) {
      elPeriod.textContent = `${period.start} → ${period.end}`;
    }

    const daysAgo = kpis ? kpis.latestDaysAgo : null;
    const latestCreatedAt = kpis ? kpis.latestCreatedAt : null;
    if (elLatest) {
      if (daysAgo == null) elLatest.textContent = '—';
      else if (daysAgo === 0) elLatest.textContent = "Aujourd'hui";
      else if (daysAgo === 1) elLatest.textContent = 'Il y a 1 jour';
      else elLatest.textContent = `Il y a ${daysAgo} jours`;
    }
    if (elLatestDate) {
      if (latestCreatedAt) elLatestDate.textContent = `Créée le ${latestCreatedAt}`;
      else elLatestDate.textContent = '';
    }
  } catch (e) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('Failed to load dashboard KPIs', e);
    }
  }
}

void loadDashboardKpis();

function setSlotEmpty(slotEl, titleEl, titleFallback = '—') {
  const isLunch = slotEl.id.includes('-lunch');
  if (isLunch) slotEl.className = 'week-slot week-slot--empty week-slot--hover-lunch';
  else slotEl.className = 'week-slot week-slot--empty week-slot--hover-dinner';

  if (!titleEl) return;
  if (titleFallback === '—') titleEl.textContent = '';
  else titleEl.textContent = titleFallback;
}

function setSlotFilled(slotEl, titleEl, variant, titleText) {
  if (variant === 'lunch') slotEl.className = 'week-slot week-slot--filled-lunch week-slot--hover-lunch';
  else slotEl.className = 'week-slot week-slot--filled-dinner week-slot--hover-dinner';

  if (titleEl) titleEl.textContent = titleText;
}

async function loadThisWeek() {
  const root = document.querySelector('[data-this-week="1"]');
  if (!root) return;

  try {
    const res = await fetch('/api/dashboard/week', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    let days = [];
    if (data && Array.isArray(data.days)) {
      days = data.days;
    }

    for (let i = 0; i < 7; i += 1) {
      const d = days[i];
      const isToday = Boolean(d && d.isToday);

      const elLabel = document.getElementById(`week-day-label-${i}`);
      if (elLabel) {
        if (isToday) elLabel.className = 'text-sm text-primary-green font-semibold';
        else elLabel.className = 'text-sm text-gray-500';
      }

      const elNum = document.getElementById(`week-day-number-${i}`);
      if (elNum) {
        if (d && d.dayNumber != null) elNum.textContent = String(d.dayNumber);
        else elNum.textContent = '—';

        if (isToday) elNum.className = 'text-2xl font-semibold text-primary-green';
        else elNum.className = 'text-2xl font-semibold text-dark-blue';
      }

      const elBar = document.getElementById(`week-day-bar-${i}`);
      if (elBar) {
        if (isToday) elBar.className = 'mt-3 h-0.5 rounded bg-primary-green';
        else elBar.className = 'mt-3 h-0.5 rounded bg-gray-200';
      }

      const lunchSlot = document.getElementById(`week-slot-${i}-lunch`);
      const lunchTitle = document.getElementById(`week-slot-${i}-lunch-title`);
      let lunchTitleText = null;
      if (
        d &&
        d.meals &&
        d.meals.lunch &&
        typeof d.meals.lunch.recipeTitle === 'string' &&
        d.meals.lunch.recipeTitle
      ) {
        lunchTitleText = d.meals.lunch.recipeTitle;
      }
      if (lunchSlot) {
        if (lunchTitleText) setSlotFilled(lunchSlot, lunchTitle, 'lunch', lunchTitleText);
        else setSlotEmpty(lunchSlot, lunchTitle);
      }

      const dinnerSlot = document.getElementById(`week-slot-${i}-dinner`);
      const dinnerTitle = document.getElementById(`week-slot-${i}-dinner-title`);
      let dinnerTitleText = null;
      if (
        d &&
        d.meals &&
        d.meals.dinner &&
        typeof d.meals.dinner.recipeTitle === 'string' &&
        d.meals.dinner.recipeTitle
      ) {
        dinnerTitleText = d.meals.dinner.recipeTitle;
      }
      if (dinnerSlot) {
        if (dinnerTitleText) setSlotFilled(dinnerSlot, dinnerTitle, 'dinner', dinnerTitleText);
        else setSlotEmpty(dinnerSlot, dinnerTitle);
      }
    }
  } catch (e) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('Failed to load this-week dashboard', e);
    }
  }
}

void loadThisWeek();

function initMobileSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const btnOpen = document.getElementById('sidebar-open');
  const btnClose = document.getElementById('sidebar-close');

  if (!sidebar || !overlay || !btnOpen || !btnClose) return;

  const open = () => {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  };

  const close = () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  btnOpen.addEventListener('click', open);
  btnClose.addEventListener('click', close);
  overlay.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

initMobileSidebar();

// ============================================
// Page Recettes - Gestion des filtres et vues
// ============================================
function initRecipesPage() {
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
  const countElement = document.getElementById('recipes-count-number');

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
      // Debounce : attendre 300ms après la dernière frappe
      searchTimeout = setTimeout(() => {
        loadRecipes();
      }, 300);
    });
  }

  // Fonction pour charger les recettes (sera remplacé par un appel API)
  function loadRecipes() {
    // Pour l'instant, on ne fait rien car il n'y a pas de données
    // Cette fonction sera appelée plus tard avec un fetch vers l'API
    console.log('Chargement des recettes:', {
      category: currentCategory,
      search: searchQuery,
      view: currentView,
    });
  }

  // Initialisation
  loadRecipes();
}

void initRecipesPage();
