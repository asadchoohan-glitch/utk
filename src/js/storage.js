// ═══════════════════════════════════════════
//  STORAGE SYSTEM — Manage LocalStorage
// ═══════════════════════════════════════════

const HISTORY_KEY = 'typing_history';
const MAX_HISTORY = 5;

/**
 * Save a typing test result.
 * @param {Object} result - { lang, wpm, accuracy, errors, time }
 */
export function saveTestResult(result) {
  let history = getHistory();
  
  // Add timestamp
  result.date = new Date().toISOString();
  
  // Add to beginning of array
  history.unshift(result);
  
  // Keep only the last 5
  if (history.length > MAX_HISTORY) {
    history = history.slice(0, MAX_HISTORY);
  }
  
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
}

/**
 * Get all past typing test results.
 * @returns {Array} List of result objects
 */
export function getHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Get the best WPM score for a given language.
 * @param {string} lang 
 * @returns {number} Best WPM
 */
export function getBestScore(lang) {
  const history = getHistory();
  const langHistory = history.filter(item => item.lang === lang);
  if (langHistory.length === 0) return 0;
  
  return Math.max(...langHistory.map(item => item.wpm));
}
