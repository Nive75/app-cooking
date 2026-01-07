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

function setSlotEmpty(slotEl, titleEl, titleFallback = '—') {
  const isLunch = slotEl.id.includes('-lunch');
  const hoverClasses = isLunch
    ? 'hover:border-blue-300 hover:ring-2 hover:ring-blue-200 hover:text-blue-600'
    : 'hover:border-primary-green hover:ring-2 hover:ring-primary-green/30 hover:text-primary-green';

  slotEl.className =
    `rounded-xl border border-dashed border-gray-200 bg-white px-4 py-4 text-gray-300 transition-colors duration-150 ${hoverClasses}`;

  if (titleEl) titleEl.textContent = titleFallback === '—' ? '' : titleFallback;
}

function setSlotFilled(slotEl, titleEl, variant, titleText) {
  if (variant === 'lunch') {
    slotEl.className =
      'rounded-xl border border-orange-200 bg-orange-50 px-4 py-4 text-orange-600 transition-colors duration-150 hover:border-blue-300 hover:ring-2 hover:ring-blue-200';
    if (titleEl) titleEl.textContent = titleText;
    return;
  }

  slotEl.className =
    'rounded-xl border border-blue-200 bg-blue-50 px-4 py-4 text-blue-600 transition-colors duration-150 hover:border-primary-green hover:ring-2 hover:ring-primary-green/30';
  if (titleEl) titleEl.textContent = titleText;
}

async function loadThisWeek() {
  const root = document.querySelector('[data-this-week="1"]');
  if (!root) return;

  try {
    const res = await fetch('/api/dashboard/week', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const days = data?.days ?? [];

    for (let i = 0; i < 7; i += 1) {
      const d = days[i];

      const elLabel = document.getElementById(`week-day-label-${i}`);
      if (elLabel) {
        elLabel.className = `text-sm ${d?.isToday ? 'text-primary-green font-semibold' : 'text-gray-500'}`;
      }

      const elNum = document.getElementById(`week-day-number-${i}`);
      if (elNum) {
        elNum.textContent = d?.dayNumber != null ? String(d.dayNumber) : '—';
        elNum.className = `text-2xl font-semibold ${d?.isToday ? 'text-primary-green' : 'text-dark-blue'}`;
      }

      const elBar = document.getElementById(`week-day-bar-${i}`);
      if (elBar) {
        elBar.className = `mt-3 h-0.5 rounded ${d?.isToday ? 'bg-primary-green' : 'bg-gray-200'}`;
      }

      const lunchSlot = document.getElementById(`week-slot-${i}-lunch`);
      const lunchTitle = document.getElementById(`week-slot-${i}-lunch-title`);
      const lunchTitleText = d?.meals?.lunch?.recipeTitle;
      if (lunchSlot) {
        if (lunchTitleText) setSlotFilled(lunchSlot, lunchTitle, 'lunch', lunchTitleText);
        else setSlotEmpty(lunchSlot, lunchTitle);
      }

      const dinnerSlot = document.getElementById(`week-slot-${i}-dinner`);
      const dinnerTitle = document.getElementById(`week-slot-${i}-dinner-title`);
      const dinnerTitleText = d?.meals?.dinner?.recipeTitle;
      if (dinnerSlot) {
        if (dinnerTitleText) setSlotFilled(dinnerSlot, dinnerTitle, 'dinner', dinnerTitleText);
        else setSlotEmpty(dinnerSlot, dinnerTitle);
      }
    }
  } catch (e) {
    // keep placeholders if backend is not reachable yet
  }
}

void loadThisWeek();

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

