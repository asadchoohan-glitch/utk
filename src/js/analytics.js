// ═══════════════════════════════════════════
//  ANALYTICS SYSTEM — Graphs & Heatmaps
// ═══════════════════════════════════════════

/**
 * Generate a lightweight SVG line graph.
 * @param {Array<number>} dataPoints - Array of WPM values over time
 * @param {HTMLElement} containerEl - Container to inject SVG into
 */
export function drawWpmGraph(dataPoints, containerEl) {
  if (!dataPoints || dataPoints.length === 0) return;

  const width = 600;
  const height = 150;
  const maxWpm = Math.max(50, ...dataPoints) + 10; // give some headroom
  
  const stepX = width / Math.max(1, (dataPoints.length - 1));
  
  let pathD = "";
  
  dataPoints.forEach((wpm, i) => {
    const x = i * stepX;
    // Invert Y because SVG origin (0,0) is top-left
    const y = height - (wpm / maxWpm) * height;
    
    if (i === 0) {
      pathD += `M ${x} ${y} `;
    } else {
      pathD += `L ${x} ${y} `;
    }
  });

  const svg = `
    <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; border: 1px solid #eee; border-radius: 4px; background: #fafafa;">
      <path d="${pathD}" fill="none" stroke="#057cb5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="5" y="15" font-size="12" fill="#888" font-family="sans-serif">WPM</text>
    </svg>
  `;
  
  containerEl.innerHTML = svg;
}

/**
 * Overlay a heatmap on the keyboard for missed keys.
 * @param {Object} missedKeyCounts - Map of key character to miss count (e.g., { 'a': 3, 'b': 1 })
 */
export function drawHeatmap(missedKeyCounts) {
  // Clear any existing heatmap classes
  document.querySelectorAll('.key').forEach(el => {
    el.style.backgroundColor = '';
  });

  if (!missedKeyCounts || Object.keys(missedKeyCounts).length === 0) return;

  const maxMisses = Math.max(...Object.values(missedKeyCounts));

  document.querySelectorAll('.key-natural').forEach(el => {
    const char = el.textContent.trim();
    if (missedKeyCounts[char]) {
      const misses = missedKeyCounts[char];
      // Calculate intensity (0.1 to 0.6 opacity)
      const intensity = 0.1 + (0.5 * (misses / maxMisses));
      const keyBtn = el.closest('.key');
      if (keyBtn) {
        keyBtn.style.backgroundColor = `rgba(231, 76, 60, ${intensity})`; // Red overlay
      }
    }
  });
}
