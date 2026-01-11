// ============================================
// Module Dashboard This Week - Affichage de la semaine actuelle
// ============================================

import { DAYS_PER_WEEK } from '../utils/date-utils.js';

/**
 * Définit un slot vide
 */
function setSlotEmpty(slotEl, titleEl, titleFallback = '—') {
  const isLunch = slotEl.id.includes('-lunch');
  if (isLunch) slotEl.className = 'week-slot week-slot--empty week-slot--hover-lunch';
  else slotEl.className = 'week-slot week-slot--empty week-slot--hover-dinner';

  if (!titleEl) return;
  if (titleFallback === '—') titleEl.textContent = '';
  else titleEl.textContent = titleFallback;
}

/**
 * Définit un slot rempli
 */
function setSlotFilled(slotEl, titleEl, variant, titleText) {
  if (variant === 'lunch') slotEl.className = 'week-slot week-slot--filled-lunch week-slot--hover-lunch';
  else slotEl.className = 'week-slot week-slot--filled-dinner week-slot--hover-dinner';

  if (titleEl) titleEl.textContent = titleText;
}

/**
 * Charge les données de la semaine actuelle pour le dashboard
 */
export async function loadThisWeek() {
  const root = document.querySelector('[data-this-week="1"]');
  if (!root) return;

  try {
    const res = await fetch('/api/dashboard/week', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const weekDays = [];
    if (data && Array.isArray(data.days)) {
      weekDays.push(...data.days);
    }

    for (let i = 0; i < DAYS_PER_WEEK; i += 1) {
      const d = weekDays[i];
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
