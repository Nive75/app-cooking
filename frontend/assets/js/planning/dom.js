// ============================================
// Module DOM - Création d'éléments DOM pour la planification
// ============================================

import { formatDateString, formatDayHeader } from '../utils/date-utils.js';

/**
 * Crée un slot de repas vide
 * @param {number} dayIndex - Index du jour (0-6)
 * @param {string} mealType - Type de repas ('lunch' ou 'dinner')
 * @param {Date} date - Date du repas
 * @param {Function} onSlotClick - Callback appelé lors du clic
 * @returns {HTMLElement} Élément slot vide
 */
export function createEmptyMealSlot(dayIndex, mealType, date, onSlotClick) {
  const slot = document.createElement('div');
  slot.className = 'planning-meal-slot planning-meal-slot--empty';
  slot.id = `planning-slot-${dayIndex}-${mealType}`;
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
  
  // Gestion du clic pour ajouter un repas (uniquement en mode édition)
  if (onSlotClick) {
    slot.addEventListener('click', () => {
      if (slot.closest('.planning-edit-mode')) {
        onSlotClick(slot.id, mealType, date, null);
      }
    });
  }
  
  return slot;
}

/**
 * Crée un slot de repas rempli avec une recette
 * @param {number} dayIndex - Index du jour (0-6)
 * @param {string} mealType - Type de repas ('lunch' ou 'dinner')
 * @param {Date} date - Date du repas
 * @param {Object} meal - Données du repas
 * @param {Function} onSlotClick - Callback appelé lors du clic
 * @returns {HTMLElement} Élément slot rempli
 */
export function createFilledMealSlot(dayIndex, mealType, date, meal, onSlotClick) {
  const slot = document.createElement('div');
  slot.className = 'planning-meal-slot planning-meal-slot--filled';
  slot.id = `planning-slot-${dayIndex}-${mealType}`;
  slot.dataset.dayIndex = dayIndex;
  slot.dataset.mealType = mealType;
  slot.dataset.date = formatDateString(date);
  
  const card = document.createElement('div');
  card.className = 'planning-meal-card';
  
  // Image de la recette
  const image = document.createElement('div');
  image.className = meal.recipe_image || meal.image
    ? 'planning-meal-card__image' 
    : 'planning-meal-card__image planning-meal-card__image--placeholder';
  
  if (meal.recipe_image || meal.image) {
    const img = document.createElement('img');
    img.src = meal.recipe_image || meal.image;
    img.alt = meal.recipe_title || meal.title || 'Recette';
    image.appendChild(img);
  } else {
    image.innerHTML = `
      <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    `;
  }
  card.appendChild(image);
  
  // Contenu de la carte
  const content = document.createElement('div');
  content.className = 'planning-meal-card__content';
  
  const title = document.createElement('div');
  title.className = 'planning-meal-card__title';
  title.textContent = meal.recipe_title || meal.title || 'Recette';
  content.appendChild(title);
  
  const meta = document.createElement('div');
  meta.className = 'planning-meal-card__meta';
  
  const prepTime = meal.prep_time || meal.prepTime || 0;
  if (prepTime > 0) {
    const time = document.createElement('div');
    time.className = 'planning-meal-card__time';
    time.innerHTML = `
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>${prepTime}min</span>
    `;
    meta.appendChild(time);
  }
  
  content.appendChild(meta);
  card.appendChild(content);
  slot.appendChild(card);
  
  // Gestion du clic pour modifier/supprimer (uniquement en mode édition)
  if (onSlotClick) {
    slot.addEventListener('click', () => {
      if (slot.closest('.planning-edit-mode')) {
        onSlotClick(slot.id, mealType, date, meal);
      }
    });
  }
  
  return slot;
}

/**
 * Crée une colonne de jour pour la grille hebdomadaire
 * @param {number} dayIndex - Index du jour (0-6)
 * @param {Date} date - Date du jour
 * @returns {HTMLElement} Élément colonne
 */
export function createDayColumn(dayIndex, date) {
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
