const TRANSLATIONS = {
  es: {
    // Interfaz gráfica (HTML)
    perf: "Rendimiento",
    teamTitle: "--- EQUIPO & SERVIDORES ---",
    instructions: "[ESPACIO] o clic en la PC para programar.<br>[TAB] para enfocar consola de comandos.",
    placeholder: "Escribe un comando...",
    
    // Mensajes de bienvenida y log
    welcomeHeader: "Code-Clicker v1.0 [Retro Terminal]",
    welcomeHelp: 'Escribe <span class="log-success">help</span> para ver la lista de comandos disponibles.',
    
    // Comando help
    helpTitle: "COMANDOS DISPONIBLES:",
    helpShop: "Muestra ítems y precios.",
    helpBuy: "Compra una mejora (ej. buy junior).",
    helpStatus: "Estado del sistema y métricas.",
    helpSave: "Guarda y genera tu código de partida.",
    helpLoad: "Carga partida desde un código.",
    helpClear: "Limpia la pantalla de consola.",
    helpLang: "Cambia el idioma (es, en, eo).",
    helpSend: "desplegar el proyecto (reduce tus loc pero aumenta tu recoleccion).",

    // Comando shop & buy
    shopTitle: "--- TIENDA DE RECURSOS ---",
    buyPrompt: 'Especifica qué deseas comprar. Ejemplo: <span class="log-success">buy junior</span>',
    buyNotFound: "El ítem '{target}' no existe. Revisa la 'shop'.",
    buyNoLoc: "LOC insuficientes. Requieres {cost} LOC.",
    bought: "Comprado: {name}. Nuevo costo: {cost} LOC.",
    costLabel: "Costo",
    youHave: "Tienes",

    // Nombres traducibles de items (opcional)
    items: {
      junior: "Junior Dev",
      senior: "Senior Dev",
      copilot: "GitHub Copilot",
      chatgpt: "ChatGPT Plus",
      agent: "Agente IA Autónomo",
      claude: "Claude Code"
    },

    // Comando status
    statusTitle: "--- ESTADO DE LA SESIÓN ---",
    statusLoc: "LOC Acumuladas:",
    statusPerf: "Rendimiento Total:",
    statusPower: "Fuerza de Clic:",

    // Modos en desarrollo
    devFeature: "esta funcion actualmente se encuentra en desarrollo",

    // Comando send
    sendNotAvailable: "Comando aun no disponible: 'send'. Escribe <span class='log-success'>help</span>.",
    sendSuccessHeader: ">>> ¡PROYECTO DESPLEGADO A PRODUCCIÓN CON ÉXITO! <<<",
    sendSuccess1: "has completado el envio, tus loc seran reiniciados.",
    sendSuccess2: "los objetos han subido de precio, pero tu eficiencia tambien subio.",

    // Errores e Idioma
    cmdUnknown: "Comando no reconocido: '{cmd}'You have completed the submission; your LOCs will be reset.. Escribe <span class='log-success'>help</span>.",
    langSuccess: "Idioma cambiado a:",
    langInvalid: "Idioma no válido. Usa: <span class='log-success'>es, en, eo</span>",

    //cheats
    activate: "<span class='log-success'>truco activado</span>",
  },

  en: {
    // GUI
    perf: "Performance",
    teamTitle: "--- TEAM & SERVERS ---",
    instructions: "[SPACE] or click PC to code.<br>[TAB] to focus command console.",
    placeholder: "Type a command...",

    // Welcome logs
    welcomeHeader: "Code-Clicker v1.0 [Retro Terminal]",
    welcomeHelp: 'Type <span class="log-success">help</span> to view available commands.',

    // Help
    helpTitle: "AVAILABLE COMMANDS:",
    helpShop: "Show items and prices.",
    helpBuy: "Buy an upgrade (ex. buy junior).",
    helpStatus: "System status and metrics.",
    helpSave: "Save and generate your game code.",
    helpLoad: "Load game from a code.",
    helpClear: "Clear terminal screen.",
    helpLang: "Change language (es, en, eo).",
    helpSend: "deploy project (resets loc but boosts yield).",

    // Shop & buy
    shopTitle: "--- RESOURCE SHOP ---",
    buyPrompt: 'Specify what you want to buy. Example: <span class="log-success">buy junior</span>',
    buyNotFound: "Item '{target}' does not exist. Check 'shop'.",
    buyNoLoc: "Not enough LOC. Requires {cost} LOC.",
    bought: "Purchased: {name}. New cost: {cost} LOC.",
    costLabel: "Cost",
    youHave: "You have",

    items: {
      junior: "Junior Dev",
      senior: "Senior Dev",
      copilot: "GitHub Copilot",
      chatgpt: "ChatGPT Plus",
      agent: "Autonomous AI Agent",
      claude: "Claude Code"
    },

    // Status
    statusTitle: "--- SESSION STATUS ---",
    statusLoc: "Accumulated LOC:",
    statusPerf: "Total Performance:",
    statusPower: "Click Power:",

    // Under development
    devFeature: "this feature is currently under development",

    // Send
    sendNotAvailable: "Command not yet available: 'send'. Type <span class='log-success'>help</span>.",
    sendSuccessHeader: ">>> PROJECT SUCCESSFULLY DEPLOYED TO PRODUCTION! <<<",
    sendSuccess1: "You have completed the submission; your LOCs will be reset.",
    sendSuccess2: "The price of items has gone up, but your efficiency has increased as well.",

    // Errors & Lang
    cmdUnknown: "Unrecognized command: '{cmd}'. Type <span class='log-success'>help</span>.",
    langSuccess: "Language set to:",
    langInvalid: "Invalid language. Use: <span class='log-success'>es, en, eo</span>",

    //cheats
    activate: "<span class='log-success'>Cheat activated</span>",
  },

  eo: {
    // GUI
    perf: "Rendimento",
    teamTitle: "--- ETIPO & SERVICILOJ ---",
    instructions: "[SPACO] aŭ alklaku komputilon por kodi.<br>[TAB] por fokusi konzolon.",
    placeholder: "Skribu komandon...",

    // Welcome logs
    welcomeHeader: "Code-Clicker v1.0 [Retro Konzolo]",
    welcomeHelp: 'Skribu <span class="log-success">help</span> por vidi komandojn.',

    // Help
    helpTitle: "DISPONERABLAJ KOMANDOJ:",
    helpShop: "Montras objektojn kaj prezojn.",
    helpBuy: "Aĉetas plibonigon (ekz. buy junior).",
    helpStatus: "Sistema stato kaj metrikorj.",
    helpSave: "Konservas kaj kreas ludo-kodon.",
    helpLoad: "Ŝargas ludon per kodo.",
    helpClear: "Vakigas konzolan ekranon.",
    helpLang: "Ŝanĝas lingvon (es, en, eo).",
    helpSend: "elmeti projekton (rekreas loc sed plibonigas rendimenton).",

    // Shop & buy
    shopTitle: "--- RESSURSA BUTIKO ---",
    buyPrompt: 'Specifu kion vi volas aĉeti. Ekzemplo: <span class="log-success">buy junior</span>',
    buyNotFound: "La objekto '{target}' ne ekzistas. Kontrolu 'shop'.",
    buyNoLoc: "Ne sufiĉaj LOC. Bezonas {cost} LOC.",
    bought: "Aĉetita: {name}. Nova kosto: {cost} LOC.",
    costLabel: "Kosto",
    youHave: "Vi havas",

    items: {
      junior: "Juna Programisto",
      senior: "Spertula Programisto",
      copilot: "GitHub Copilot",
      chatgpt: "ChatGPT Plus",
      agent: "Aŭtonoma AI-Aganto",
      claude: "Claude Code"
    },

    // Status
    statusTitle: "--- SESIA STATO ---",
    statusLoc: "Aplikataj LOC:",
    statusPerf: "Tuta Rendimento:",
    statusPower: "Klika Potenco:",

    // Under development
    devFeature: "ĉi tiu funkcio nuntempe estas evoluigata",

    // Send
    sendNotAvailable: "Komando ankoraŭ ne disponebla: 'send'. Skribu <span class='log-success'>help</span>.",
    sendSuccessHeader: ">>> PROJEKTO SUKCESE ELMETITA AL PRODUKTADO! <<<",
    sendSuccess1: "Vi kompletigis la sendon; viaj LOC-oj estos restarigitaj.",
    sendSuccess2: "La prezo de varoj altiĝis, sed ankaŭ via efikeco pliiĝis.",

    // Errors & Lang
    cmdUnknown: "Nekonata komando: '{cmd}'. Skribu <span class='log-success'>help</span>.",
    langSuccess: "Lingvo ŝanĝita al:",
    langInvalid: "Nevalida lingvo. Uzu: <span class='log-success'>es, en, eo</span>",

    //cheats
    activate: "<span class='log-success'>Ruz-truko aktivigita</span>",
  }
};

let currentLang = 'es';