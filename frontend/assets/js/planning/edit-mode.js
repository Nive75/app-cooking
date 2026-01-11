// ============================================
// Module Edit Mode - Gestion du mode édition
// ============================================

/**
 * Active le mode édition
 * @param {HTMLElement} grid - Élément de la grille
 * @param {HTMLElement} editBtn - Bouton d'édition
 * @param {HTMLElement} editBtnText - Texte du bouton d'édition
 * @param {HTMLElement} cancelBtn - Bouton d'annulation
 */
export function enableEditMode(grid, editBtn, editBtnText, cancelBtn) {
  if (editBtnText) {
    editBtnText.textContent = 'Valider la planification';
  }
  if (editBtn) {
    const icon = editBtn.querySelector('svg');
    if (icon) {
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />';
    }
  }
  if (cancelBtn) {
    cancelBtn.classList.remove('hidden');
  }
  if (grid) {
    grid.classList.add('planning-edit-mode');
  }
}

/**
 * Désactive le mode édition
 * @param {HTMLElement} grid - Élément de la grille
 * @param {HTMLElement} editBtn - Bouton d'édition
 * @param {HTMLElement} editBtnText - Texte du bouton d'édition
 * @param {HTMLElement} cancelBtn - Bouton d'annulation
 */
export function disableEditMode(grid, editBtn, editBtnText, cancelBtn) {
  if (editBtnText) {
    editBtnText.textContent = 'Modifier la planification';
  }
  if (editBtn) {
    const icon = editBtn.querySelector('svg');
    if (icon) {
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />';
    }
  }
  if (cancelBtn) {
    cancelBtn.classList.add('hidden');
  }
  if (grid) {
    grid.classList.remove('planning-edit-mode');
  }
}
