// ═══════════════════════════════════════════════════════
//  KEYBOARD CORE ENGINE — Shared by all keyboard pages
// ═══════════════════════════════════════════════════════

import { showToast } from './toast.js';

// Physical key code → branah index (shared for all layouts)
const CODE_TO_IDX = {
  'Backquote':0,  'Digit1':1,   'Digit2':2,   'Digit3':3,
  'Digit4':4,     'Digit5':5,   'Digit6':6,   'Digit7':7,
  'Digit8':8,     'Digit9':9,   'Digit0':10,  'Minus':11,
  'Equal':12,
  'KeyQ':13, 'KeyW':14, 'KeyE':15, 'KeyR':16, 'KeyT':17,
  'KeyY':18, 'KeyU':19, 'KeyI':20, 'KeyO':21, 'KeyP':22,
  'BracketLeft':23, 'BracketRight':24, 'Backslash':25,
  'KeyA':26, 'KeyS':27, 'KeyD':28, 'KeyF':29, 'KeyG':30,
  'KeyH':31, 'KeyJ':32, 'KeyK':33, 'KeyL':34,
  'Semicolon':35, 'Quote':36,
  'IntlBackslash':47,
  'KeyZ':37, 'KeyX':38, 'KeyC':39, 'KeyV':40, 'KeyB':41,
  'KeyN':42, 'KeyM':43,
  'Comma':44, 'Period':45, 'Slash':46
};

// Standard 5-row layout (same structure for all keyboards)
const ROWS = [
  // Row 0 – number row
  [
    {idx:0},{idx:1},{idx:2},{idx:3},{idx:4},{idx:5},
    {idx:6},{idx:7},{idx:8},{idx:9},{idx:10},{idx:11},{idx:12},
    {special:true, label:'Backspace', code:'Backspace', width:2}
  ],
  // Row 1 – QWERTY
  [
    {special:true, label:'Tab', code:'Tab', width:1.5},
    {idx:13},{idx:14},{idx:15},{idx:16},{idx:17},{idx:18},{idx:19},{idx:20},{idx:21},{idx:22},
    {idx:23},{idx:24},
    {idx:25, width:1.5}
  ],
  // Row 2 – ASDF
  [
    {special:true, label:'Caps Lock', code:'CapsLock', width:1.8},
    {idx:26},{idx:27},{idx:28},{idx:29},{idx:30},{idx:31},{idx:32},{idx:33},{idx:34},
    {idx:35},{idx:36},
    {special:true, label:'Enter', code:'Enter', width:2.2}
  ],
  // Row 3 – ZXCV
  [
    {special:true, label:'Shift', code:'ShiftLeft', width:2.5, isShift:true},
    {idx:47},
    {idx:37},{idx:38},{idx:39},{idx:40},{idx:41},{idx:42},{idx:43},
    {idx:44},{idx:45},{idx:46},
    {special:true, label:'Shift', code:'ShiftRight', width:2.5, isShift:true}
  ],
  // Row 4 – bottom
  [
    {special:true, label:'Ctrl',  code:'ControlLeft',  width:1.3},
    {special:true, label:'Emoji', code:'Emoji',        width:1.3},
    {special:true, label:'Alt',   code:'AltLeft',      width:1.3},
    {special:true, label:'Space', code:'Space',        width:7},
    {special:true, label:'AltGr', code:'AltRight',     width:1.3},
    {special:true, label:'Esc',   code:'Escape',       width:1.3},
    {special:true, label:'Ctrl',  code:'ControlRight', width:1.3}
  ]
];

/**
 * Initialize the keyboard engine.
 * @param {object} config
 * @param {HTMLTextAreaElement} config.output - textarea element
 * @param {HTMLElement} config.keyboardEl - .keyboard-wrap element
 * @param {Array} config.keySets - Array of { name, label, keys } for radio switcher
 * @param {string} config.langLabel - Language name for toast messages
 * @param {string} config.fontClass - CSS class for Arabic font ('font-arabic' or '')
 * @param {boolean} config.hasCaps - Whether caps lock affects character (phonetic keyboards)
 * @param {function} config.saveUndo - Function to save undo state
 */
export function initKeyboard(config) {
  const {
    output,
    keyboardEl,
    keySets,
    langLabel = 'Keyboard',
    fontClass = '',
    saveUndo = () => {},
  } = config;

  let currentSetIdx = 0;
  let KEYS = keySets[0].keys;
  let isShift = false;
  let isCaps = false;
  let isActive = true; // keyboard mode active (vs QWERTY passthrough)

  // ── Get character based on shift/caps state ──
  function getChar(k, shiftState, capsState) {
    if (k.caps) {
      const useShift = shiftState !== capsState; // XOR
      return useShift ? k.s : k.n;
    }
    return shiftState ? k.s : k.n;
  }

  // ── Insert character into textarea ──
  function insertChar(ch) {
    const s = output.selectionStart, e = output.selectionEnd;
    output.value = output.value.slice(0, s) + ch + output.value.slice(e);
    output.selectionStart = output.selectionEnd = s + ch.length;
    output.focus();
    saveUndo();
    // Dispatch input event for stats update
    output.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // ── Backspace ──
  function doBackspace() {
    const s = output.selectionStart, e = output.selectionEnd;
    if (s !== e) {
      output.value = output.value.slice(0, s) + output.value.slice(e);
      output.selectionStart = output.selectionEnd = s;
    } else if (s > 0) {
      const code = output.value.charCodeAt(s - 1);
      const delLen = (code >= 0xDC00 && code <= 0xDFFF) ? 2 : 1;
      output.value = output.value.slice(0, s - delLen) + output.value.slice(e);
      output.selectionStart = output.selectionEnd = s - delLen;
    }
    output.focus();
    saveUndo();
    output.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // ── Build keyboard DOM ──
  function buildKeyboard() {
    keyboardEl.innerHTML = '';

    ROWS.forEach(row => {
      const rowEl = document.createElement('div');
      rowEl.className = 'kb-row';

      row.forEach(entry => {
        const btn = document.createElement('button');
        btn.className = 'key' + (entry.special ? ' special' : '');
        if (entry.width) btn.dataset.width = entry.width;

        if (entry.special) {
          btn.dataset.code = entry.code;
          if (entry.code === 'Escape') btn.title = 'Toggle keyboard input mode';
          if (!isActive && entry.code === 'Escape') btn.classList.add('esc-active');
          if (isCaps && entry.code === 'CapsLock') btn.classList.add('caps-active');
          if (isShift && (entry.code === 'ShiftLeft' || entry.code === 'ShiftRight')) {
            btn.classList.add('shift-active');
          }
          const lbl = document.createElement('span');
          lbl.className = 'key-special-label';
          lbl.textContent = entry.label;
          btn.appendChild(lbl);
        } else {
          const k = KEYS[entry.idx];
          if (!k) return; // safety
          btn.dataset.idx = entry.idx;

          // Latin ref (small top-left)
          if (k.latin) {
            const latinEl = document.createElement('span');
            latinEl.className = 'key-latin';
            latinEl.textContent = k.latin;
            btn.appendChild(latinEl);
          }

          // Shift char preview (small top-right)
          const shiftVisible = k.s && k.s.trim() !== '' && k.s !== '\u200D' && k.s !== '\u200C';
          if (shiftVisible) {
            const shEl = document.createElement('span');
            shEl.className = 'key-shift-char' + (fontClass ? ' ' + fontClass : '');
            shEl.textContent = k.s;
            btn.appendChild(shEl);
          }

          // Main natural char (large center)
          const natEl = document.createElement('span');
          natEl.className = 'key-natural' + (fontClass ? ' ' + fontClass : '');
          natEl.dataset.keyIdx = entry.idx;
          const displayChar = getChar(k, isShift, isCaps);
          natEl.textContent = (displayChar && displayChar.trim() !== '') ? displayChar : k.n;
          natEl.style.color = isShift ? 'var(--key-char-shift)' : 'var(--key-char-normal)';
          btn.appendChild(natEl);
        }

        btn.addEventListener('mousedown', e => { e.preventDefault(); handleEntry(entry, btn); });
        btn.addEventListener('touchstart', e => { e.preventDefault(); handleEntry(entry, btn); }, { passive: false });
        rowEl.appendChild(btn);
      });

      keyboardEl.appendChild(rowEl);
    });
  }

  // ── Animate key press ──
  function animPress(btn) {
    if (!btn) return;
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 150);
  }

  // ── Handle click/touch on key ──
  function handleEntry(entry, btn) {
    animPress(btn);
    if (entry.special) {
      handleSpecial(entry.code);
      return;
    }
    if (entry.idx !== undefined) {
      const k = KEYS[entry.idx];
      if (!k) return;
      const ch = getChar(k, isShift, isCaps);
      if (ch) insertChar(ch);
      if (isShift) {
        isShift = false;
        refreshLabels();
        updateShiftVisual();
      }
    }
  }

  // ── Special keys ──
  function handleSpecial(code) {
    switch (code) {
      case 'Escape':
        isActive = !isActive;
        updateEscVisual();
        showToast(isActive ? `🔡 ${langLabel} Mode ON` : '⌨️ QWERTY Mode ON');
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        isShift = !isShift;
        refreshLabels();
        updateShiftVisual();
        break;
      case 'CapsLock':
        isCaps = !isCaps;
        refreshLabels();
        updateCapsVisual();
        break;
      case 'Backspace': doBackspace(); break;
      case 'Tab':       insertChar('\t'); break;
      case 'Enter':     insertChar('\n'); break;
      case 'Space':     insertChar(' ');  break;
    }
  }

  // ── Refresh key labels on shift/caps change ──
  function refreshLabels() {
    keyboardEl.querySelectorAll('.key-natural[data-key-idx]').forEach(el => {
      const idx = parseInt(el.dataset.keyIdx, 10);
      const k = KEYS[idx];
      if (!k) return;
      const ch = getChar(k, isShift, isCaps);
      if (isShift) {
        if (ch && ch.trim() !== '' && ch !== '\u200D' && ch !== '\u200C') {
          el.textContent = ch;
          el.style.color = 'var(--key-char-shift)';
        } else {
          el.textContent = k.n;
          el.style.color = 'var(--key-char-normal)';
        }
      } else {
        el.textContent = ch || k.n;
        el.style.color = 'var(--key-char-normal)';
      }
    });
  }

  // ── Visual state updates ──
  function updateShiftVisual() {
    keyboardEl.querySelectorAll('[data-code="ShiftLeft"], [data-code="ShiftRight"]').forEach(el => {
      el.classList.toggle('shift-active', isShift);
    });
  }

  function updateCapsVisual() {
    keyboardEl.querySelectorAll('[data-code="CapsLock"]').forEach(el => {
      el.classList.toggle('caps-active', isCaps);
    });
  }

  function updateEscVisual() {
    keyboardEl.querySelectorAll('[data-code="Escape"]').forEach(el => {
      el.classList.toggle('esc-active', !isActive);
    });
  }

  // ── Physical keyboard support ──
  document.addEventListener('keydown', function(e) {
    if (document.activeElement !== output) output.focus();
    if (e.ctrlKey || e.metaKey) return;

    if (e.code === 'Escape') {
      e.preventDefault();
      isActive = !isActive;
      updateEscVisual();
      showToast(isActive ? `🔡 ${langLabel} Mode ON` : '⌨️ QWERTY Mode ON');
      return;
    }

    if (!isActive) return;

    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      if (!isShift) { isShift = true; refreshLabels(); updateShiftVisual(); }
      return;
    }
    if (e.code === 'CapsLock') {
      isCaps = !isCaps; refreshLabels(); updateCapsVisual(); return;
    }
    if (e.code === 'Backspace') {
      e.preventDefault(); doBackspace();
      animPress(keyboardEl.querySelector('[data-code="Backspace"]'));
      return;
    }
    if (e.code === 'Enter') {
      e.preventDefault(); insertChar('\n');
      animPress(keyboardEl.querySelector('[data-code="Enter"]'));
      return;
    }
    if (e.code === 'Tab') { e.preventDefault(); insertChar('\t'); return; }
    if (e.code === 'Space') {
      e.preventDefault(); insertChar(' ');
      animPress(keyboardEl.querySelector('[data-code="Space"]'));
      return;
    }
    if (['ControlLeft','ControlRight','AltLeft','AltRight'].includes(e.code)) return;

    const idx = CODE_TO_IDX[e.code];
    if (idx !== undefined) {
      e.preventDefault();
      const k = KEYS[idx];
      if (!k) return;
      const ch = getChar(k, isShift, isCaps);
      if (ch) insertChar(ch);
      animPress(keyboardEl.querySelector(`.key[data-idx="${idx}"]`));
      if (isShift) { isShift = false; refreshLabels(); updateShiftVisual(); }
    }
  });

  document.addEventListener('keyup', function(e) {
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      if (isShift) { isShift = false; refreshLabels(); updateShiftVisual(); }
    }
  });

  // ── Switch keyboard layout (for multi-layout pages) ──
  function switchLayout(index) {
    currentSetIdx = index;
    KEYS = keySets[index].keys;
    isShift = false;
    updateShiftVisual();
    buildKeyboard();
    output.focus();
    showToast(`🔤 ${keySets[index].label}`);
  }

  // ── Initial build ──
  buildKeyboard();
  output.focus();

  return { switchLayout, buildKeyboard };
}
