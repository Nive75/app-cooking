// ============================================
// Module Dashboard KPIs - Chargement des indicateurs
// ============================================

/**
 * Charge les KPIs du dashboard
 */
export async function loadDashboardKpis() {
  const root = document.querySelector('[data-dashboard="1"]');
  if (!root) return;

  const elRecipes = document.getElementById('kpi-recipes');
  const elUpcoming = document.getElementById('kpi-upcoming');
  const elFavorites = document.getElementById('kpi-favorites');
  const elLatest = document.getElementById('kpi-latest');
  const elLatestDate = document.getElementById('kpi-latest-date');
  const elPeriod = document.getElementById('kpi-period');

  try {
    const res = await fetch('/api/dashboard/summary', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    const kpis = data && data.kpis ? data.kpis : null;
    const period = data && data.period ? data.period : null;

    const recipesVal = kpis && typeof kpis.recipes === 'number' ? kpis.recipes : 0;
    const upcomingVal = kpis && typeof kpis.upcoming === 'number' ? kpis.upcoming : 0;
    const favoritesVal = kpis && typeof kpis.favorites === 'number' ? kpis.favorites : 0;

    if (elRecipes) elRecipes.textContent = String(recipesVal);
    if (elUpcoming) elUpcoming.textContent = String(upcomingVal);
    if (elFavorites) elFavorites.textContent = String(favoritesVal);

    if (elPeriod && period && period.start && period.end) {
      elPeriod.textContent = `${period.start} → ${period.end}`;
    }

    const daysAgo = kpis ? kpis.latestDaysAgo : null;
    const latestCreatedAt = kpis ? kpis.latestCreatedAt : null;
    if (elLatest) {
      if (daysAgo == null) elLatest.textContent = '—';
      else if (daysAgo === 0) elLatest.textContent = "Aujourd'hui";
      else if (daysAgo === 1) elLatest.textContent = 'Il y a 1 jour';
      else elLatest.textContent = `Il y a ${daysAgo} jours`;
    }
    if (elLatestDate) {
      if (latestCreatedAt) elLatestDate.textContent = `Créée le ${latestCreatedAt}`;
      else elLatestDate.textContent = '';
    }
  } catch (e) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('Failed to load dashboard KPIs', e);
    }
  }
}
