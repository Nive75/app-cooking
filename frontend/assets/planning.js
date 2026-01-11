// ============================================
// Module Planification - Gestion de la planification hebdomadaire
// ============================================

import {
  DAYS_PER_WEEK,
  MONTH_NAMES,
  DAY_NAMES,
  formatDateString,
  formatDayHeader,
  formatWeekRange,
  getMondayOfWeek
} from './date-utils.js';

// Constantes
const MEALS_PER_DAY = 2; // Déjeuner et Dîner
const TOTAL_MEAL_SLOTS = DAYS_PER_WEEK * MEALS_PER_DAY;

// ============================================
// Fonctions de création d'éléments DOM
// ============================================

function createEmptyMealSlot(dayIndex, mealType, date) {
  const slot = document.createElement('div');
  slot.className = 'planning-meal-slot planning-meal-slot--empty';
  slot.dataset.dayIndex = dayIndex;
  slot.dataset.mealType = mealType;
  slot.dataset.date = formatDateString(date);
  
  const addIcon = document.createElement('div');
  addIcon.className = 'planning-meal-slot__add';
  addIcon.innerHTML = `
    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
  `;
  
  slot.appendChild(addIcon);
  
  // Gestion du clic pour ajouter un repas
  slot.addEventListener('click', () => {
    console.log('Ajouter un repas:', mealType, formatDateString(date));
    // TODO: Ouvrir modal de sélection de recette
  });
  
  return slot;
}

function createFilledMealSlot(dayIndex, mealType, date, meal) {
  const slot = document.createElement('div');
  slot.className = 'planning-meal-slot planning-meal-slot--filled';
  slot.dataset.dayIndex = dayIndex;
  slot.dataset.mealType = mealType;
  slot.dataset.date = formatDateString(date);
  
  const card = document.createElement('div');
  card.className = 'planning-meal-card';
  
  // Image de la recette
  const image = document.createElement('div');
  image.className = 'planning-meal-card__image';
  if (meal.image) {
    const img = document.createElement('img');
    img.src = meal.image;
    img.alt = meal.title;
    image.appendChild(img);
  } else {
    image.className += ' planning-meal-card__image--placeholder';
  }
  card.appendChild(image);
  
  // Contenu de la carte
  const content = document.createElement('div');
  content.className = 'planning-meal-card__content';
  
  const title = document.createElement('div');
  title.className = 'planning-meal-card__title';
  title.textContent = meal.title || 'Recette';
  content.appendChild(title);
  
  const meta = document.createElement('div');
  meta.className = 'planning-meal-card__meta';
  
  const time = document.createElement('div');
  time.className = 'planning-meal-card__time';
  time.innerHTML = `
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>${meal.prepTime || 0} min</span>
  `;
  meta.appendChild(time);
  
  content.appendChild(meta);
  card.appendChild(content);
  slot.appendChild(card);
  
  // Gestion du clic pour modifier/supprimer
  slot.addEventListener('click', () => {
    console.log('Modifier repas:', mealType, formatDateString(date), meal);
    // TODO: Ouvrir modal de modification
  });
  
  return slot;
}

function createDayColumn(dayIndex, date) {
  const column = document.createElement('div');
  column.className = 'planning-day-column';
  
  // En-tête du jour
  const header = document.createElement('div');
  header.className = 'planning-day-header';
  header.textContent = formatDayHeader(date);
  column.appendChild(header);
  
  // Slot Déjeuner
  const lunchSlot = document.createElement('div');
  lunchSlot.className = 'planning-meal-type';
  
  const lunchLabel = document.createElement('div');
  lunchLabel.className = 'planning-meal-type__label';
  lunchLabel.textContent = 'Déjeuner';
  lunchSlot.appendChild(lunchLabel);
  
  const lunchContainer = document.createElement('div');
  lunchContainer.id = `planning-slot-${dayIndex}-lunch`;
  lunchSlot.appendChild(lunchContainer);
  column.appendChild(lunchSlot);
  
  // Slot Dîner
  const dinnerSlot = document.createElement('div');
  dinnerSlot.className = 'planning-meal-type';
  
  const dinnerLabel = document.createElement('div');
  dinnerLabel.className = 'planning-meal-type__label';
  dinnerLabel.textContent = 'Dîner';
  dinnerSlot.appendChild(dinnerLabel);
  
  const dinnerContainer = document.createElement('div');
  dinnerContainer.id = `planning-slot-${dayIndex}-dinner`;
  dinnerSlot.appendChild(dinnerContainer);
  column.appendChild(dinnerSlot);
  
  return column;
}

// ============================================
// Fonctions de rendu
// ============================================

function renderWeekGrid(grid, startDate, meals) {
  // Vider la grille
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  
  // Créer les colonnes pour chaque jour
  for (let i = 0; i < DAYS_PER_WEEK; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    const column = createDayColumn(i, date);
    grid.appendChild(column);
    
    // Remplir les slots
    const lunchContainer = document.getElementById(`planning-slot-${i}-lunch`);
    const dinnerContainer = document.getElementById(`planning-slot-${i}-dinner`);
    
    const dateStr = formatDateString(date);
    const lunchMeal = meals.find(m => m.date === dateStr && m.type === 'lunch');
    const dinnerMeal = meals.find(m => m.date === dateStr && m.type === 'dinner');
    
    if (lunchMeal) {
      lunchContainer.appendChild(createFilledMealSlot(i, 'lunch', date, lunchMeal));
    } else {
      lunchContainer.appendChild(createEmptyMealSlot(i, 'lunch', date));
    }
    
    if (dinnerMeal) {
      dinnerContainer.appendChild(createFilledMealSlot(i, 'dinner', date, dinnerMeal));
    } else {
      dinnerContainer.appendChild(createEmptyMealSlot(i, 'dinner', date));
    }
  }
}

function updateWeekSelector(selector, startDate) {
  selector.textContent = `Semaine du ${formatWeekRange(startDate)}`;
}

function updateStatistics(meals) {
  const totalMeals = meals.length;
  const totalTime = meals.reduce((sum, meal) => sum + (meal.prepTime || 0), 0);
  const hours = Math.floor(totalTime / 60);
  const minutes = totalTime % 60;
  
  const totalMealsEl = document.getElementById('planning-total-meals');
  const totalTimeEl = document.getElementById('planning-total-time');
  const countEl = document.getElementById('planning-count-number');
  
  if (totalMealsEl) {
    totalMealsEl.textContent = `${totalMeals}/${TOTAL_MEAL_SLOTS}`;
  }
  
  if (totalTimeEl) {
    if (hours > 0) {
      totalTimeEl.textContent = `~${hours}h${String(minutes).padStart(2, '0')}`;
    } else {
      totalTimeEl.textContent = `~${minutes}min`;
    }
  }
  
  if (countEl) {
    countEl.textContent = totalMeals;
  }
}

// ============================================
// Fonctions de gestion des données
// ============================================

async function loadMealsForWeek(startDate) {
  try {
    // TODO: Remplacer par un appel API
    // const endDate = new Date(startDate);
    // endDate.setDate(endDate.getDate() + 6);
    // const res = await fetch(`/api/planning/meals?start=${formatDateString(startDate)}&end=${formatDateString(endDate)}`);
    // const data = await res.json();
    // return data.meals || [];
    return [];
  } catch (e) {
    console.warn('Erreur lors du chargement des repas:', e);
    return [];
  }
}

// ============================================
// Fonction principale d'initialisation
// ============================================

export function initPlanningPage() {
  const grid = document.getElementById('planning-week-grid');
  const weekSelector = document.getElementById('planning-week-selector');
  const weekText = document.getElementById('planning-week-text');
  const prevWeekBtn = document.getElementById('planning-prev-week');
  const nextWeekBtn = document.getElementById('planning-next-week');
  const validateBtn = document.getElementById('planning-validate-btn');
  
  if (!grid || !weekSelector) return;
  
  let currentDate = new Date();
  let startDate = getMondayOfWeek(currentDate);
  
  // Fonction pour mettre à jour la semaine
  async function updateWeek() {
    updateWeekSelector(weekText, startDate);
    const meals = await loadMealsForWeek(startDate);
    renderWeekGrid(grid, startDate, meals);
    updateStatistics(meals);
  }
  
  // Navigation semaine précédente
  if (prevWeekBtn) {
    prevWeekBtn.addEventListener('click', () => {
      startDate = new Date(startDate);
      startDate.setDate(startDate.getDate() - 7);
      updateWeek();
    });
  }
  
  // Navigation semaine suivante
  if (nextWeekBtn) {
    nextWeekBtn.addEventListener('click', () => {
      startDate = new Date(startDate);
      startDate.setDate(startDate.getDate() + 7);
      updateWeek();
    });
  }
  
  // Sélecteur de semaine
  weekSelector.addEventListener('click', () => {
    // TODO: Ouvrir un calendrier pour sélectionner une semaine
    console.log('Sélectionner une semaine');
  });
  
  // Bouton Valider
  if (validateBtn) {
    validateBtn.addEventListener('click', () => {
      console.log('Valider la planification');
      // TODO: Envoyer les données au backend
    });
  }
  
  // Initialisation
  updateWeek();
}
