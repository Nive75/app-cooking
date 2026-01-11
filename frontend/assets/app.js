// ============================================
// Point d'entrée principal de l'application
// ============================================

// Import CSS avec Tailwind
import './css/app.css';

// Import des modules
import { initDashboard } from './js/dashboard/index.js';
import { initMobileSidebar } from './js/common/sidebar.js';
import { initRecipesPage } from './js/recipes/index.js';
import { initIngredientsPage } from './js/ingredients/index.js';
import { initCalendarPage } from './js/calendar/index.js';
import { initPlanningPage } from './js/planning/index.js';

// Initialisation du dashboard
initDashboard();

// Initialisation de la sidebar mobile
initMobileSidebar();

// Initialisation des pages
initRecipesPage();
initIngredientsPage();
initCalendarPage();
initPlanningPage();
