// ============================================
// Module Calendrier - Gestion du calendrier mensuel
// ============================================

import {
  MONTHS_PER_YEAR,
  DAYS_PER_WEEK,
  MONTH_NAMES,
  formatDateString,
  getFirstDayOfMonth,
  getDaysInMonth,
  isTodayDate
} from './date-utils.js';

// Constantes du calendrier
const WEEKS_PER_CALENDAR = 6;

// ============================================
// Fonctions de création d'éléments DOM
// ============================================

function createAddButton() {
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
  return addBtn;
}

function createDayElement(year, month, day, isOtherMonth, isTodayDay, onDayClick) {
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
  const dateStr = formatDateString(year, month, day);
  mealsContainer.setAttribute('data-date', dateStr);
  dayEl.appendChild(mealsContainer);

  // Ajouter le bouton + si ce n'est pas un autre mois
  if (!isOtherMonth) {
    const addBtn = createAddButton();
    dayEl.appendChild(addBtn);
  }

  // Gestion du clic sur le jour
  if (onDayClick) {
    dayEl.addEventListener('click', () => {
      if (!isOtherMonth) {
        onDayClick(year, month, day, dateStr);
      }
    });
  }

  return dayEl;
}

// ============================================
// Fonctions de rendu
// ============================================

function renderPreviousMonthDays(grid, currentYear, currentMonth, firstDay) {
  const prevMonth = currentMonth === 0 ? MONTHS_PER_YEAR - 1 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const dayEl = createDayElement(prevYear, prevMonth, day, true, false, null);
    grid.appendChild(dayEl);
  }
}

function renderCurrentMonthDays(grid, currentYear, currentMonth, daysInMonth, onDayClick) {
  for (let day = 1; day <= daysInMonth; day++) {
    const isTodayDay = isTodayDate(currentYear, currentMonth, day);
    const dayEl = createDayElement(currentYear, currentMonth, day, false, isTodayDay, onDayClick);
    grid.appendChild(dayEl);
  }
}

function renderNextMonthDays(grid, currentYear, currentMonth, totalCells) {
  const maxCells = WEEKS_PER_CALENDAR * DAYS_PER_WEEK;
  const remainingCells = maxCells - totalCells;

  for (let day = 1; day <= remainingCells; day++) {
    const nextMonth = currentMonth === MONTHS_PER_YEAR - 1 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === MONTHS_PER_YEAR - 1 ? currentYear + 1 : currentYear;
    const dayEl = createDayElement(nextYear, nextMonth, day, true, false, null);
    grid.appendChild(dayEl);
  }
}

function renderCalendarGrid(grid, currentYear, currentMonth, onDayClick) {
  // Vider la grille de manière sécurisée
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  renderPreviousMonthDays(grid, currentYear, currentMonth, firstDay);
  renderCurrentMonthDays(grid, currentYear, currentMonth, daysInMonth, onDayClick);

  const totalCells = firstDay + daysInMonth;
  renderNextMonthDays(grid, currentYear, currentMonth, totalCells);
}

function updateMonthYearTitle(monthYearEl, currentYear, currentMonth) {
  monthYearEl.textContent = `${MONTH_NAMES[currentMonth]} ${currentYear}`;
}

// ============================================
// Fonctions de gestion des repas
// ============================================

async function loadMealsForMonth(currentYear, currentMonth) {
  try {
    // TODO: Remplacer par un appel API
    // const res = await fetch(`/api/calendar/meals?year=${currentYear}&month=${currentMonth + 1}`);
    // const data = await res.json();
    // return data.meals || [];
    return [];
  } catch (e) {
    console.warn('Erreur lors du chargement des repas:', e);
    return [];
  }
}

function renderMeals(meals) {
  meals.forEach((meal) => {
    const dateStr = meal.date; // Format: YYYY-MM-DD
    const mealEl = document.querySelector(`[data-date="${dateStr}"]`);
    if (!mealEl) return;

    const mealDiv = document.createElement('div');
    mealDiv.className = `calendar-meal calendar-meal--${meal.type}`;
    const mealTypeLabel = meal.type === 'lunch' ? 'Déjeuner' : 'Dîner';
    mealDiv.textContent = `${mealTypeLabel} ${meal.recipeTitle || ''}`;
    mealEl.appendChild(mealDiv);
  });
}

// ============================================
// Fonction principale d'initialisation
// ============================================

export function initCalendarPage() {
  const grid = document.getElementById('calendar-grid');
  const monthYearEl = document.getElementById('calendar-month-year');
  const prevBtn = document.getElementById('calendar-prev-month');
  const nextBtn = document.getElementById('calendar-next-month');
  const todayBtn = document.getElementById('calendar-today');

  if (!grid || !monthYearEl) return;

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  // Gestionnaire de clic sur un jour
  function handleDayClick(year, month, day, dateStr) {
    console.log('Jour cliqué:', year, month + 1, day);
    // TODO: Navigation vers la création de repas pour ce jour
    // window.location.href = `/planning/new?date=${dateStr}`;
  }

  // Fonction pour mettre à jour le calendrier
  async function updateCalendar() {
    renderCalendarGrid(grid, currentYear, currentMonth, handleDayClick);
    updateMonthYearTitle(monthYearEl, currentYear, currentMonth);

    const meals = await loadMealsForMonth(currentYear, currentMonth);
    renderMeals(meals);
  }

  // Navigation
  prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = MONTHS_PER_YEAR - 1;
      currentYear--;
    }
    updateCalendar();
  });

  nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth >= MONTHS_PER_YEAR) {
      currentMonth = 0;
      currentYear++;
    }
    updateCalendar();
  });

  todayBtn.addEventListener('click', () => {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    updateCalendar();
  });

  // Initialisation
  updateCalendar();
}
