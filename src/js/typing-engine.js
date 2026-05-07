// ═══════════════════════════════════════════
//  TYPING ENGINE — Core Test Logic
// ═══════════════════════════════════════════

export class TypingEngine {
  constructor(config) {
    this.textDisplayEl = config.textDisplayEl;
    this.hiddenInputEl = config.hiddenInputEl;
    this.statTimeEl = config.statTimeEl;
    this.statWpmEl = config.statWpmEl;
    this.statAccEl = config.statAccEl;
    this.onFinish = config.onFinish || (() => {});

    this.targetText = '';
    this.targetChars = [];
    this.typedChars = [];
    
    this.isActive = false;
    this.isPaused = false;
    this.isFinished = false;
    this.timeLimit = 60;
    this.timeLeft = 60;
    this.timerInterval = null;
    this.isPracticeMode = false;

    this.errors = 0;
    this.totalTyped = 0;
    
    this.wpmHistory = [];
    this.missedKeys = {};

    this._bindEvents();
  }

  _bindEvents() {
    this.hiddenInputEl.addEventListener('input', (e) => this._handleInput(e));
    
    // Clicking anywhere in the display focuses the hidden input
    this.textDisplayEl.addEventListener('click', () => {
      this.hiddenInputEl.focus();
    });
  }

  startTest(text, timeInSeconds, isPracticeMode = false) {
    this.targetText = text;
    this.targetChars = text.split('');
    this.typedChars = [];
    
    this.isPracticeMode = isPracticeMode;
    this.timeLimit = timeInSeconds;
    this.timeLeft = isPracticeMode ? 0 : timeInSeconds;
    this.errors = 0;
    this.totalTyped = 0;
    this.wpmHistory = [];
    this.missedKeys = {};
    this.isActive = false;
    this.isPaused = false;
    this.isFinished = false;

    this.hiddenInputEl.value = '';
    this.hiddenInputEl.focus();

    this._renderText();
    this._updateStats();

    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  _startTimer() {
    this.isActive = true;
    this.isPaused = false;
    this.wpmHistory.push(0); // initial 0 WPM

    this.timerInterval = setInterval(() => {
      if (this.isPaused || this.isFinished) {
        return;
      }

      if (this.isPracticeMode) {
        this.timeLeft++;
      } else {
        this.timeLeft--;
      }
      
      const stats = this._calculateStats();
      this.wpmHistory.push(stats.wpm);
      
      this._updateStats();

      if (!this.isPracticeMode && this.timeLeft <= 0) {
        this.endTest();
      }
    }, 1000);
  }

  endTest() {
    if (this.isFinished) return;
    this.isActive = false;
    this.isPaused = false;
    this.isFinished = true;
    clearInterval(this.timerInterval);
    this.hiddenInputEl.blur();
    
    const stats = this._calculateStats();
    this.onFinish(stats);
  }

  _handleInput(e) {
    if (this.isFinished || this.isPaused || this.timeLeft <= 0) return;
    if (!this.isActive) this._startTimer();

    const currentVal = this.hiddenInputEl.value;
    
    // We only process valid inputs up to the length of the target
    if (currentVal.length > this.targetChars.length) {
      this.hiddenInputEl.value = currentVal.substring(0, this.targetChars.length);
      return;
    }

    this.typedChars = this.hiddenInputEl.value.split('');
    
    // Recalculate errors and track missed keys
    this.errors = 0;
    this.totalTyped = this.typedChars.length;
    
    // Check just the last typed character for heatmap tracking to avoid double counting on backspace
    if (this.typedChars.length > 0) {
      const lastIdx = this.typedChars.length - 1;
      const expectedChar = this.targetChars[lastIdx];
      const typedChar = this.typedChars[lastIdx];
      
      if (expectedChar !== typedChar && typedChar !== undefined) {
        // We missed! Record the expected char for the heatmap
        this.missedKeys[expectedChar] = (this.missedKeys[expectedChar] || 0) + 1;
      }
    }

    // Full error recalculation
    for (let i = 0; i < this.typedChars.length; i++) {
      if (this.typedChars[i] !== this.targetChars[i]) {
        this.errors++;
      }
    }

    this._renderText();
    this._updateStats();

    if (this.typedChars.length === this.targetChars.length) {
      this.endTest();
    }
  }

  pauseTest() {
    if (!this.isActive || this.isFinished) return;
    this.isPaused = true;
    this.hiddenInputEl.blur();
  }

  resumeTest() {
    if (this.isFinished || !this.isActive) return;
    this.isPaused = false;
    this.hiddenInputEl.focus();
  }

  togglePause() {
    if (!this.isActive || this.isFinished) return this.isPaused;
    if (this.isPaused) this.resumeTest();
    else this.pauseTest();
    return this.isPaused;
  }

  _renderText() {
    // Re-render HTML with correct/incorrect highlighting
    let html = '';
    
    for (let i = 0; i < this.targetChars.length; i++) {
      let char = this.targetChars[i];
      let classes = ['test-char'];
      
      if (i === this.typedChars.length) {
        classes.push('current');
      }

      if (i < this.typedChars.length) {
        if (this.typedChars[i] === char) {
          classes.push('correct');
        } else {
          classes.push('incorrect');
        }
      }

      // Handle spaces so they show up properly
      let displayChar = char === ' ' ? '&nbsp;' : char;
      
      html += `<span class="${classes.join(' ')}">${displayChar}</span>`;
    }
    
    this.textDisplayEl.innerHTML = html;
  }

  _calculateStats() {
    const timeSpent = this.isPracticeMode ? this.timeLeft : (this.timeLimit - this.timeLeft);
    const minutes = timeSpent / 60 || 1; // avoid /0 if finished instantly
    
    // WPM = (Total Characters / 5) / Time in Minutes
    // Gross WPM
    const grossWpm = (this.totalTyped / 5) / minutes;
    
    // Net WPM = Gross WPM - (Errors / Minutes)
    let netWpm = Math.max(0, Math.round(grossWpm - (this.errors / minutes)));
    
    // Accuracy
    let accuracy = 100;
    if (this.totalTyped > 0) {
      accuracy = Math.round(((this.totalTyped - this.errors) / this.totalTyped) * 100);
    }
    accuracy = Math.max(0, accuracy);

    // If test hasn't started or no time elapsed
    if (timeSpent === 0) {
      netWpm = 0;
      accuracy = 100;
    }

    return {
      wpm: netWpm,
      accuracy: accuracy,
      errors: this.errors,
      totalTyped: this.totalTyped,
      wpmHistory: this.wpmHistory,
      missedKeys: this.missedKeys
    };
  }

  getStats() {
    return this._calculateStats();
  }

  _updateStats() {
    const stats = this._calculateStats();
    
    this.statTimeEl.textContent = `${this.timeLeft}s`;
    this.statWpmEl.textContent = stats.wpm;
    this.statAccEl.textContent = `${stats.accuracy}%`;
  }
}
