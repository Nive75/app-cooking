// ============================================
// Module Dashboard - Point d'entrée principal
// ============================================

import { loadDashboardKpis } from './kpis.js';
import { loadThisWeek } from './this-week.js';

/**
 * Initialise le dashboard
 */
export function initDashboard() {
  loadDashboardKpis();
  loadThisWeek();
}
