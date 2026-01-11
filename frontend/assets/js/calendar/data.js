// ============================================
// Module Data - Gestion des données du calendrier
// ============================================

/**
 * Charge les repas pour un mois donné
 * @param {number} currentYear - Année
 * @param {number} currentMonth - Mois (0-11)
 * @returns {Promise<Array>} Liste des repas
 */
export async function loadMealsForMonth(currentYear, currentMonth) {
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
