// ============================================
// Module Data - Gestion des données de planification
// ============================================

import { formatDateString } from '../utils/date-utils.js';

/**
 * Charge les repas pour une semaine donnée
 * @param {Date} startDate - Date de début de la semaine (lundi)
 * @returns {Promise<Array>} Liste des repas
 */
export async function loadMealsForWeek(startDate) {
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
