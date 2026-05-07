// ═══════════════════════════════════════════════════════
//  TOAST UTILITY
// ═══════════════════════════════════════════════════════

let toastEl = null;
let toastTimer = null;

function ensureToast() {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    toastEl.id = 'toast';
    document.body.appendChild(toastEl);
  }
}

/**
 * Show a toast notification.
 * @param {string} msg
 * @param {number} duration - ms (default 2000)
 */
export function showToast(msg, duration = 2000) {
  ensureToast();
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), duration);
}
