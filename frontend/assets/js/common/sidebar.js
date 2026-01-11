// ============================================
// Module Sidebar - Gestion de la sidebar mobile
// ============================================

/**
 * Initialise la sidebar mobile
 */
export function initMobileSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const btnOpen = document.getElementById('sidebar-open');
  const btnClose = document.getElementById('sidebar-close');

  if (!sidebar || !overlay || !btnOpen || !btnClose) return;

  const handleOpen = () => {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  };

  const handleClose = () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  btnOpen.addEventListener('click', handleOpen);
  btnClose.addEventListener('click', handleClose);
  overlay.addEventListener('click', handleClose);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') handleClose();
  });
}
