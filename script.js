    // --- AUDIO SYSTEM (8-bit Web Audio API) ---
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function playBeep(freq = 440, type = 'square', duration = 0.05) {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    }

    let send_state = false;

    function soundClick() { playBeep(600, 'square', 0.04); }
    function soundBuy() { playBeep(880, 'triangle', 0.1); setTimeout(() => playBeep(1200, 'triangle', 0.15), 50); }
    function soundError() { playBeep(150, 'sawtooth', 0.15); }

    // --- DOM ELEMENTS ---
    const locDisplay = document.getElementById('loc-display');
    const ppsDisplay = document.getElementById('pps-display');
    const clickBtn = document.getElementById('click-btn');
    const cmdInput = document.getElementById('cmd-input');
    const consoleOutput = document.getElementById('console-output');
    const workersGrid = document.getElementById('workers-grid');

    // --- VISUAL RENDER LOGIC ---
    function addWorkerToScreen(type) {
      if (!ASCII_ART[type]) return;
      const workerDiv = document.createElement('div');
      workerDiv.className = 'ascii-worker';
      workerDiv.textContent = ASCII_ART[type];
      workersGrid.appendChild(workerDiv);
      
      // Auto-scroll screen down when new worker joins
      const workplaceArea = document.querySelector('.workplace-area');
      workplaceArea.scrollTop = workplaceArea.scrollHeight;
    }

    function rebuildWorkplaceScreen() {
      workersGrid.innerHTML = '';
      for (let key in state.items) {
        const count = state.items[key].count;
        for (let i = 0; i < count; i++) {
          addWorkerToScreen(key);
        }
      }
    }

    // --- GAME LOGIC ---
    function getPps() {
      let total = 0;
      for (let key in state.items) {
        total += state.items[key].count * state.items[key].pps;
      }
      return total;
    }

    function addLOC(amount) {
      state.loc += amount;
      updateDisplay();
    }

    //function updateDisplay() {
      //locDisplay.textContent = `${Math.floor(state.loc)} LOC`;
      //ppsDisplay.textContent = `Rendimiento: ${getPps().toFixed(1)} LOC/s`;
    //}

    function pushCode() {
      addLOC(state.locPerClick);
      soundClick();
    }

    // Auto Loop (Idle engine - 10 ticks per sec)
    setInterval(() => {
      const pps = getPps();
      if (pps > 0) {
        addLOC(pps / 10);
      }
    }, 100);

    // --- COMMAND SYSTEM ---
    function printLog(text, className = '') {
      const entry = document.createElement('div');
      entry.className = `log-entry ${className}`;
      entry.innerHTML = text;
      consoleOutput.appendChild(entry);
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }


    // --- FUNCIONES DE IDIOMA E INTERFAZ ---
    function getTranslation() {
      return TRANSLATIONS[currentLang] || TRANSLATIONS.es;
    }

    function updateUiLanguage() {
      const t = getTranslation();
      document.querySelector('.workplace-title').textContent = t.teamTitle;
      document.querySelector('.instructions').innerHTML = t.instructions;
      cmdInput.placeholder = t.placeholder;
      updateDisplay();
    }
    function updateDisplay() {
      const t = getTranslation();
      locDisplay.textContent = `${Math.floor(state.loc)} LOC`;
      ppsDisplay.textContent = `${t.perf}: ${getPps().toFixed(1)} LOC/s`;
    }

    
    // --- COMANDOS CON SOPORTE MULTI-IDIOMA ---
    function processCommand(cmdText) {
      const clean = cmdText.trim().toLowerCase();
      if (!clean) return;

      printLog(`user@dev-terminal:~$ ${cmdText}`, 'log-cmd');
      const parts = clean.split(' ');
      const action = parts[0];
      const target = parts[1];

      const t = getTranslation();

  switch (action) {
    case 'help':
      printLog(t.helpTitle);
      printLog(`  <span class="log-success">shop</span>             - ${t.helpShop}`);
      printLog(`  <span class="log-success">buy &lt;id&gt;</span>         - ${t.helpBuy}`);
      printLog(`  <span class="log-success">status</span>           - ${t.helpStatus}`);
      printLog(`  <span class="log-success">lang &lt;es|en|eo&gt;</span> - ${t.helpLang}`);
      printLog(`  <span class="log-success">save</span>             - ${t.helpSave}`);
      printLog(`  <span class="log-success">load &lt;código&gt;</span>   - ${t.helpLoad}`);
      printLog(`  <span class="log-success">clear</span>            - ${t.helpClear}`);
      if (state.loc >= send_requeriment) {
        soundBuy();
        printLog(`  <span class="log-success">send</span>             - ${t.helpSend}`);
      }
      break;

    case 'lang':
      if (!target) {
        printLog('Idiomas / Languages: <span class="log-success">es, en, eo</span>');
      } else if (TRANSLATIONS[target]) {
        currentLang = target;
        printLog(`${getTranslation().langSuccess} <span class="log-success">${target.toUpperCase()}</span>`);
        updateUiLanguage();
        soundBuy();
      } else {
        printLog(t.langInvalid, 'log-error');
        soundError();
      }
      break;

    case 'shop':
      printLog(t.shopTitle);
      for (let key in state.items) {
        const item = state.items[key];
        const itemName = t.items[key] || item.name;
        printLog(`[<span class="log-success">${item.id}</span>] ${itemName} | ${t.costLabel}: ${Math.floor(item.cost)} LOC | +${item.pps} LOC/s | ${t.youHave}: ${item.count}`);
      }
      break;

    case 'buy':
      if (!target) {
        printLog(t.buyPrompt, 'log-error');
        soundError();
        break;
      }
      const item = state.items[target];
      if (!item) {
        printLog(t.buyNotFound.replace('{target}', target), 'log-error');
        soundError();
      } else if (state.loc < item.cost) {
        printLog(t.buyNoLoc.replace('{cost}', Math.floor(item.cost)), 'log-error');
        soundError();
      } else {
        state.loc -= item.cost;
        item.count++;
        item.cost = Math.floor(item.cost * 1.15);
        
        addWorkerToScreen(target);
        soundBuy();
        
        const itemName = t.items[target] || item.name;
        let msg = t.bought.replace('{name}', itemName).replace('{cost}', item.cost);
        printLog(msg, 'log-success');
        updateDisplay();
      }
      break;

    case 'status':
      printLog(t.statusTitle);
      printLog(`${t.statusLoc} ${Math.floor(state.loc)}`);
      printLog(`${t.statusPerf} ${getPps().toFixed(1)} LOC/s`);
      printLog(`${t.statusPower} ${state.locPerClick} LOC`);
      break;

    case 'save':
      printLog(`<span class="log-success">${t.devFeature}</span>`);
      break;

    case 'load':
      printLog(`<span class="log-success">${t.devFeature}</span>`);
      soundError();
      break;

    case 'clear':
      consoleOutput.innerHTML = '';
      break;

    case 'send':
      if (state.loc < send_requeriment) {
        printLog(t.sendNotAvailable, 'log-error');
      } else {
        state.loc = 0;
        state.locPerClick *= 10;
        for (let key in state.items) { state.items[key].count = 0; }
        for (let key in state.items) { state.items[key].cost *= 5; }
        for (let key in state.items) { state.items[key].pps *= 5; }
        send_requeriment += 10000;
        rebuildWorkplaceScreen();
        updateDisplay();
        soundBuy();
        printLog('====================================================', 'log-success');
        printLog(t.sendSuccessHeader, 'log-success');
        printLog(t.sendSuccess1, 'log-success');
        printLog(t.sendSuccess2, 'log-success');
        printLog('====================================================', 'log-success');
      }
      break;

    case 'qwerty':
      printLog(t.activate, 'log-success');
      state.loc = state.loc + 1000000;
      updateDisplay();
      break;

    default:
      printLog(t.cmdUnknown.replace('{cmd}', action), 'log-error');
      soundError();
      break;
  }
}

    // --- EVENT LISTENERS ---
    clickBtn.addEventListener('click', pushCode);

    // Press SPACE to push code, press TAB to switch focus to input
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && document.activeElement !== cmdInput) {
        e.preventDefault();
        clickBtn.classList.add('active');
        pushCode();
      } else if (e.code === 'Tab') {
        e.preventDefault();
        cmdInput.focus();
      }
    });

    cmdInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = cmdInput.value;
        cmdInput.value = '';
        processCommand(val);
      }
    });