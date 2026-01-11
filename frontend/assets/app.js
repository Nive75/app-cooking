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

// ============================================
// Page Calendrier - Gestion du calendrier mensuel
// ============================================
function initCalendarPage() {
  const grid = document.getElementById('calendar-grid');
  const monthYearEl = document.getElementById('calendar-month-year');
  const prevBtn = document.getElementById('calendar-prev-month');
  const nextBtn = document.getElementById('calendar-next-month');
  const todayBtn = document.getElementById('calendar-today');

  if (!grid || !monthYearEl) return;

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  // Noms des mois en français
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // Noms des jours de la semaine
  const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  // Fonction pour obtenir le premier jour du mois (0 = Dimanche, 1 = Lundi, etc.)
  function getFirstDayOfMonth(year, month) {
    const date = new Date(year, month, 1);
    // Convertir en Lundi = 0 (au lieu de Dimanche = 0)
    return (date.getDay() + 6) % 7;
  }

  // Fonction pour obtenir le nombre de jours dans un mois
  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  // Fonction pour vérifier si une date est aujourd'hui
  function isToday(year, month, day) {
    const today = new Date();
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  }

  // Fonction pour générer la grille du calendrier
  function renderCalendar() {
    // Vider la grille de manière sécurisée
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }

    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const today = new Date();
    const isCurrentMonth = currentYear === today.getFullYear() && currentMonth === today.getMonth();

    // Ajouter les jours du mois précédent pour compléter la première semaine
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const dayEl = createDayElement(prevYear, prevMonth, day, true);
      grid.appendChild(dayEl);
    }

    // Ajouter les jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const isTodayDay = isToday(currentYear, currentMonth, day);
      const dayEl = createDayElement(currentYear, currentMonth, day, false, isTodayDay);
      grid.appendChild(dayEl);
    }

    // Ajouter les jours du mois suivant pour compléter la dernière semaine
    const totalCells = firstDay + daysInMonth;
    const remainingCells = 42 - totalCells; // 6 semaines * 7 jours
    for (let day = 1; day <= remainingCells; day++) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dayEl = createDayElement(nextYear, nextMonth, day, true);
      grid.appendChild(dayEl);
    }

    // Mettre à jour le titre du mois
    monthYearEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
  }

  // Fonction pour créer un élément de jour (sécurisée contre XSS)
  function createDayElement(year, month, day, isOtherMonth, isTodayDay = false) {
    const dayEl = document.createElement('div');
    dayEl.className = `calendar-day ${isOtherMonth ? 'other-month' : ''} ${isTodayDay ? 'today' : ''}`;
    
    // Créer le numéro du jour
    const dayNumber = document.createElement('div');
    dayNumber.className = 'calendar-day__number';
    dayNumber.textContent = String(day);
    dayEl.appendChild(dayNumber);
    
    // Créer le conteneur des repas
    const mealsContainer = document.createElement('div');
    mealsContainer.className = 'calendar-day__meals';
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    mealsContainer.setAttribute('data-date', dateStr);
    dayEl.appendChild(mealsContainer);
    
    // Ajouter le bouton + si ce n'est pas un autre mois
    if (!isOtherMonth) {
      const addBtn = document.createElement('div');
      addBtn.className = 'calendar-day__add';
      
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'w-6 h-6');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('viewBox', '0 0 24 24');
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('d', 'M12 4v16m8-8H4');
      
      svg.appendChild(path);
      addBtn.appendChild(svg);
      dayEl.appendChild(addBtn);
    }

    // Gestion du clic sur le jour
    dayEl.addEventListener('click', () => {
      if (!isOtherMonth) {
        console.log('Jour cliqué:', year, month + 1, day);
        // Navigation vers la création de repas pour ce jour
        // window.location.href = `/planning/new?date=${dateStr}`;
      }
    });

    return dayEl;
  }

  // Fonction pour charger les repas d'un mois
  async function loadMealsForMonth() {
    try {
      // Cette fonction sera remplacée par un appel API
      // const res = await fetch(`/api/calendar/meals?year=${currentYear}&month=${currentMonth + 1}`);
      // const data = await res.json();
      // renderMeals(data.meals);
      
      // Pour l'instant, on ne charge rien
      renderMeals([]);
    } catch (e) {
      console.warn('Erreur lors du chargement des repas:', e);
      renderMeals([]);
    }
  }

  // Fonction pour afficher les repas dans le calendrier
  function renderMeals(meals) {
    meals.forEach((meal) => {
      const dateStr = meal.date; // Format: YYYY-MM-DD
      const mealEl = document.querySelector(`[data-date="${dateStr}"]`);
      if (!mealEl) return;

      const mealDiv = document.createElement('div');
      mealDiv.className = `calendar-meal calendar-meal--${meal.type}`;
      mealDiv.textContent = `${meal.type === 'lunch' ? 'Déjeuner' : 'Dîner'} ${meal.recipeTitle || ''}`;
      mealEl.appendChild(mealDiv);
    });
  }

  // Navigation
  prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
    loadMealsForMonth();
  });

  nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
    loadMealsForMonth();
  });

  todayBtn.addEventListener('click', () => {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    renderCalendar();
    loadMealsForMonth();
  });

  // Initialisation
  renderCalendar();
  loadMealsForMonth();
}

void initCalendarPage();
