// ============================================
// Module DOM - Création d'éléments DOM pour le calendrier
// ============================================

import { formatDateString } from '../utils/date-utils.js';

/**
 * Crée un bouton d'ajout pour un jour du calendrier
 * @returns {HTMLElement} Bouton d'ajout
 */
export function createAddButton() {
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

/**
 * Crée un élément de jour pour le calendrier
 * @param {number} year - Année
 * @param {number} month - Mois (0-11)
 * @param {number} day - Jour
 * @param {boolean} isOtherMonth - Si le jour appartient à un autre mois
 * @param {boolean} isTodayDay - Si le jour est aujourd'hui
 * @param {Function} onDayClick - Callback appelé lors du clic
 * @returns {HTMLElement} Élément de jour
 */
export function createDayElement(year, month, day, isOtherMonth, isTodayDay, onDayClick) {
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
