  // --- ASCII ART FOR HIRED UNITS ---
    const ASCII_ART = {
      junior: 
` (o_
 /\\< [JR]
_\\_v____`,
      senior: 
` (o_
/|\\< [SR]
_/_\\____`,
      copilot: 
` [COPILOT]
 |==[]==|
  \\____/ `,
      chatgpt: 
`  .----.
 / AI-G  \\
| [o]  [o]|
 \\   --  /`,
      agent: 
` /======\\
| AGENT  |
| [SYS]  |
 \\======/`
    };

    // --- STATE MANAGEMENT ---
    let state = {
      loc: 0, // Lines of Code (Currency)
      locPerClick: 1,
      items: {
        junior: { id: 'junior', name: 'Junior Dev', cost: 15, pps: 0.5, count: 0 },
        senior: { id: 'senior', name: 'Senior Dev', cost: 100, pps: 4, count: 0 },
        copilot: { id: 'copilot', name: 'GitHub Copilot', cost: 1100, pps: 32, count: 0 },
        chatgpt: { id: 'chatgpt', name: 'ChatGPT Plus', cost: 12000, pps: 260, count: 0 },
        agent: { id: 'agent', name: 'Agente IA Autónomo', cost: 130000, pps: 1400, count: 0 }
      }
    };

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

    function updateDisplay() {
      locDisplay.textContent = `${Math.floor(state.loc)} LOC`;
      ppsDisplay.textContent = `Rendimiento: ${getPps().toFixed(1)} LOC/s`;
    }

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

    function processCommand(cmdText) {
      const clean = cmdText.trim().toLowerCase();
      if (!clean) return;

      printLog(`user@dev-terminal:~$ ${cmdText}`, 'log-cmd');
      const parts = clean.split(' ');
      const action = parts[0];
      const target = parts[1];

      switch (action) {
        case 'help':
          printLog('COMANDOS DISPONIBLES:');
          printLog('  <span class="log-success">shop</span>             - Muestra ítems y precios.');
          printLog('  <span class="log-success">buy &lt;id&gt;</span>         - Compra una mejora (ej. buy junior).');
          printLog('  <span class="log-success">status</span>           - Estado del sistema y métricas.');
          printLog('  <span class="log-success">save</span>             - Guarda y genera tu código de partida.');
          printLog('  <span class="log-success">load &lt;código&gt;</span>   - Carga partida desde un código.');
          printLog('  <span class="log-success">clear</span>            - Limpia la pantalla de consola.');
          break;

        case 'shop':
          printLog('--- TIENDA DE RECURSOS ---');
          for (let key in state.items) {
            const item = state.items[key];
            printLog(`[<span class="log-success">${item.id}</span>] ${item.name} | Costo: ${Math.floor(item.cost)} LOC | +${item.pps} LOC/s | Tienes: ${item.count}`);
          }
          break;

        case 'buy':
          if (!target) {
            printLog('Especifica qué deseas comprar. Ejemplo: <span class="log-success">buy junior</span>', 'log-error');
            soundError();
            break;
          }
          const item = state.items[target];
          if (!item) {
            printLog(`El ítem '${target}' no existe. Revisa la 'shop'.`, 'log-error');
            soundError();
          } else if (state.loc < item.cost) {
            printLog(`LOC insuficientes. Requieres ${Math.floor(item.cost)} LOC.`, 'log-error');
            soundError();
          } else {
            state.loc -= item.cost;
            item.count++;
            item.cost = Math.floor(item.cost * 1.15); // Escalado de costo +15%
            
            // Add Visual ASCII Worker to screen
            addWorkerToScreen(target);
            
            soundBuy();
            printLog(`Comprado: ${item.name}. Nuevo costo: ${item.cost} LOC.`, 'log-success');
            updateDisplay();
          }
          break;

        case 'status':
          printLog('--- ESTADO DE LA SESIÓN ---');
          printLog(`LOC Acumuladas: ${Math.floor(state.loc)}`);
          printLog(`Rendimiento Total: ${getPps().toFixed(1)} LOC/s`);
          printLog(`Fuerza de Clic: ${state.locPerClick} LOC`);
          break;

        case 'save':
          const jsonState = JSON.stringify(state);
          const encodedSave = btoa(jsonState); // Codificación simple Base64
          printLog('Partida guardada exitosamente.', 'log-success');
          printLog(`TU CÓDIGO DE PARTIDA: <span class="log-success">${encodedSave}</span>`);
          printLog('Copia este código para restaurar tu juego cuando quieras.');
          break;

        case 'load':
          if (!target) {
            printLog('Ingresa el código de guardado. Ejemplo: <span class="log-success">load eyJ...</span>', 'log-error');
            soundError();
            break;
          }
          try {
            const decodedJson = atob(target);
            const loadedState = JSON.parse(decodedJson);
            if (loadedState && loadedState.items) {
              state = loadedState;
              updateDisplay();
              rebuildWorkplaceScreen(); // Redraw loaded workers on screen
              printLog('¡Partida cargada con éxito!', 'log-success');
              soundBuy();
            } else {
              throw new Error();
            }
          } catch (e) {
            printLog('Código de guardado inválido o corrupto.', 'log-error');
            soundError();
          }
          break;

        case 'clear':
          consoleOutput.innerHTML = '';
          break;

        default:
          printLog(`Comando no reconocido: '${action}'. Escribe <span class="log-success">help</span>.`, 'log-error');
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