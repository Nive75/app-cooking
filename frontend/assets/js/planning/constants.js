// ============================================
// Constantes de planification
// ============================================

import { DAYS_PER_WEEK } from '../utils/date-utils.js';

export const MEALS_PER_DAY = 2; // Déjeuner et Dîner
export const TOTAL_MEAL_SLOTS = DAYS_PER_WEEK * MEALS_PER_DAY;
export const SEARCH_DEBOUNCE_MS = 300; // Délai d'attente pour la recherche (ms)
