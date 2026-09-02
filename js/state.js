    // --- STATE MANAGEMENT ---
    let state = {
      loc: 0, // Lines of Code (Currency)
      locPerClick: 1,
      items: {
        junior: { id: 'junior', name: 'Junior Dev', cost: 15, pps: 0.5, count: 0 },
        senior: { id: 'senior', name: 'Senior Dev', cost: 100, pps: 4, count: 0 },
        copilot: { id: 'copilot', name: 'GitHub Copilot', cost: 1100, pps: 32, count: 0 },
        chatgpt: { id: 'chatgpt', name: 'ChatGPT Plus', cost: 12000, pps: 260, count: 0 },
        agent: { id: 'agent', name: 'Agente IA Autónomo', cost: 130000, pps: 1400, count: 0 },
        claude: { id: 'claude', name: 'claude code', cost: 500000, pps: 5000, count: 0 },
        torvals: { id: 'torvals', name: 'linus torvals', cost: 1000000, pps: 10000, count: 0 },
        god: {id: 'god', name: 'god', cost: 20000000, pps: 1000000, count: 0},
      }
    };