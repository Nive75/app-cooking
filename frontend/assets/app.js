// Import CSS avec Tailwind
import './css/app.css';

async function loadDashboardKpis() {
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

    if (elRecipes) elRecipes.textContent = String(data?.kpis?.recipes ?? 0);
    if (elUpcoming) elUpcoming.textContent = String(data?.kpis?.upcoming ?? 0);
    if (elFavorites) elFavorites.textContent = String(data?.kpis?.favorites ?? 0);

    if (elPeriod) {
      const p = data?.period;
      if (p?.start && p?.end) elPeriod.textContent = `${p.start} → ${p.end}`;
    }

    const daysAgo = data?.kpis?.latestDaysAgo;
    const latestCreatedAt = data?.kpis?.latestCreatedAt;
    if (elLatest) {
      if (daysAgo == null) elLatest.textContent = '—';
      else if (daysAgo === 0) elLatest.textContent = "Aujourd'hui";
      else if (daysAgo === 1) elLatest.textContent = 'Il y a 1 jour';
      else elLatest.textContent = `Il y a ${daysAgo} jours`;
    }
    if (elLatestDate) {
      elLatestDate.textContent = latestCreatedAt ? `Créée le ${latestCreatedAt}` : '';
    }
  } catch (e) {
    // Keep placeholders if backend is not reachable yet
    // console.warn('Failed to load dashboard KPIs', e);
  }
}

void loadDashboardKpis();

function initMobileSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const btnOpen = document.getElementById('sidebar-open');
  const btnClose = document.getElementById('sidebar-close');

  if (!sidebar || !overlay || !btnOpen || !btnClose) return;

  const open = () => {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  };

  const close = () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  btnOpen.addEventListener('click', open);
  btnClose.addEventListener('click', close);
  overlay.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

initMobileSidebar();

