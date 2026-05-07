// ═══════════════════════════════════════════════════════
//  TEXT ACTIONS — Shared action bar functionality
// ═══════════════════════════════════════════════════════

import { showToast } from './toast.js';

/**
 * Initialize all action bar buttons for a keyboard page.
 * @param {HTMLTextAreaElement} output - The textarea element
 * @param {object} opts - { lang: 'ur'|'sd'|'ar', filename: 'urdu-text.txt' }
 */
export function initTextActions(output, opts = {}) {
  const lang = opts.lang || 'ur';
  const filename = opts.filename || 'text.txt';
  let fontSize = parseInt(getComputedStyle(output).fontSize) || 20;
  let undoStack = [''];
  let redoStack = [];
  let isUndoing = false;

  // Expose saveUndo for external use (keyboard)
  const api = {};

  api.saveUndo = function() {
    if (isUndoing) return;
    const val = output.value;
    if (undoStack.length && val === undoStack[undoStack.length - 1]) return;
    undoStack.push(val);
    redoStack = [];
  };

  // Listen for manual input changes
  output.addEventListener('input', () => {
    if (!isUndoing) api.saveUndo();
    updateStats();
  });

  // Action button handlers
  window.doSelectAll = function() { output.focus(); output.select(); };

  window.doCopy = function() {
    if (!output.value) { showToast('Nothing to copy'); return; }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(output.value)
        .then(() => showToast('✅ Copied!'))
        .catch(() => { output.select(); document.execCommand('copy'); showToast('✅ Copied!'); });
    } else {
      output.select(); document.execCommand('copy'); showToast('✅ Copied!');
    }
    output.focus();
  };

  window.doUndo = function() {
    if (undoStack.length <= 1) return;
    redoStack.push(undoStack.pop());
    isUndoing = true;
    output.value = undoStack[undoStack.length - 1] || '';
    isUndoing = false;
    output.focus();
    updateStats();
  };

  window.doRedo = function() {
    if (!redoStack.length) return;
    const val = redoStack.pop();
    undoStack.push(val);
    isUndoing = true;
    output.value = val;
    isUndoing = false;
    output.focus();
    updateStats();
  };

  window.doClearAll = function() {
    if (output.value.length > 10 && !confirm('Are you sure you want to clear all the text?')) return;
    output.value = '';
    undoStack = [''];
    redoStack = [];
    output.focus();
    updateStats();
  };

  window.doSaveText = function() {
    if (!output.value) { showToast('Nothing to save!'); return; }
    const blob = new Blob([output.value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
    showToast('📥 File saved!');
  };

  window.doFontSize = function(delta) {
    fontSize = Math.max(14, Math.min(40, fontSize + delta));
    output.style.fontSize = fontSize + 'px';
  };

  window.doPrint = function() {
    if (!output.value) { showToast('Nothing to print!'); return; }
    const printWin = window.open('', '_blank');
    printWin.document.write(`
      <html><head><title>Print</title>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap" rel="stylesheet">
      <style>body{font-family:'Noto Nastaliq Urdu','Noto Naskh Arabic',serif;font-size:20px;direction:rtl;padding:40px;line-height:2;white-space:pre-wrap;}</style>
      </head><body>${output.value.replace(/\n/g,'<br>')}</body></html>
    `);
    printWin.document.close();
    printWin.focus();
    printWin.print();
  };

  window.doSpeak = function() {
    if (!output.value) { showToast('Nothing to speak!'); return; }
    if (!('speechSynthesis' in window)) { showToast('Speech not supported in this browser'); return; }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(output.value);
    utter.lang = lang;
    utter.rate = 0.9;
    window.speechSynthesis.speak(utter);
    showToast('🔊 Speaking...');
  };

  // Social actions
  window.doEmail = function() {
    window.location.href = 'mailto:?body=' + encodeURIComponent(output.value);
    output.focus();
    return false;
  };

  window.doTweet = function() {
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(output.value), '_blank');
    output.focus();
    return false;
  };

  window.doGoogle = function() {
    window.open('https://www.google.com/search?ie=UTF-8&q=' + encodeURIComponent(output.value), '_blank');
    output.focus();
    return false;
  };

  window.doTranslate = function() {
    const tl = lang === 'en' ? 'ur' : 'en';
    window.open(`https://translate.google.com/#view=home&op=translate&sl=${lang}&tl=${tl}&text=` + encodeURIComponent(output.value), '_blank');
    output.focus();
    return false;
  };

  window.doWhatsApp = function() {
    if (!output.value) { showToast('Nothing to share!'); return false; }
    window.open('https://wa.me/?text=' + encodeURIComponent(output.value), '_blank');
    output.focus();
    return false;
  };

  // ── Word / Char counter ──
  function updateStats() {
    const statsEl = document.getElementById('text-stats');
    if (!statsEl) return;
    const text = output.value;
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    statsEl.innerHTML = `<span>Characters: ${chars}</span> <span>Words: ${words}</span>`;
  }

  // Initial stats
  updateStats();

  return api;
}
