// =================================================================================
// FUNÇÃO GENÉRICA PARA FUNDO ANIMADO
// =================================================================================
const setupAnimatedBackground = (container, boxCount = 100) => {
  if (!container) return;
  container.innerHTML = ''; // Limpa o container caso já tenha algo
  for (let i = 0; i < boxCount; i++) {
    const box = document.createElement('div');
    box.classList.add('preloader-box'); // Reutiliza a mesma classe de estilo
    const randomDuration = Math.random() * 15 + 10;
    const randomDelay = Math.random() * 5;
    box.style.animationDuration = `${randomDuration}s`;
    box.style.animationDelay = `${randomDelay}s`;
    container.appendChild(box);
  }
};

// =================================================================================
// PRELOADER - PÁGINA: index.html
// =================================================================================
const preloader = document.getElementById('preloader');
if (preloader) {
  // Verifica se o preloader já foi exibido nesta sessão
  if (sessionStorage.getItem('preloaderShown') === 'true') {
    preloader.classList.add('preloader-inactive');
  } else {
    // --- ELEMENTOS ---
    const clockElement = document.getElementById('preloader-clock');
    const todIconContainer = document.getElementById('preloader-tod-icon');
    const loginContainer = document.getElementById('preloader-login-container');
    const nameInput = document.getElementById('preloader-name-input');
    const enterBtn = document.getElementById('preloader-enter-btn');

    // --- FUNÇÕES DE SETUP ---
    const setupClock = () => {
      const updateClock = () => {
        const now = new Date();
        const options = {
          timeZone: 'America/Sao_Paulo',
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit', second: '2-digit',
          hour12: false
        };
        const formatter = new Intl.DateTimeFormat('pt-BR', options);
        const parts = formatter.formatToParts(now);
        const dateParts = {};
        parts.forEach(part => dateParts[part.type] = part.value);
        clockElement.textContent = `${dateParts.day}/${dateParts.month}/${dateParts.year} ${dateParts.hour}:${dateParts.minute}:${dateParts.second}`;
      };
      updateClock();
      setInterval(updateClock, 1000);
    };

    const setupTimeOfDayIcon = () => {
      const sun = document.createElement('div');
      sun.className = 'sun';
      const moon = document.createElement('div');
      moon.className = 'moon';
      todIconContainer.appendChild(sun);
      todIconContainer.appendChild(moon);
      const hour = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})).getHours();
      if (hour >= 6 && hour < 18) sun.classList.add('visible');
      else moon.classList.add('visible');
    };

    // --- FUNÇÕES DE TRANSIÇÃO ---
    const hidePreloader = () => {
      preloader.classList.add('hidden');
      sessionStorage.setItem('preloaderShown', 'true');
    };

    const handleEnter = () => {
      const userName = nameInput.value.trim();
      const hour = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})).getHours();
      
      let greeting;
      if (hour >= 6 && hour < 12) {
        greeting = "Bom dia";
      } else if (hour >= 12 && hour < 18) {
        greeting = "Boa tarde";
      } else {
        greeting = "Boa noite";
      }

      const messageText = userName 
        ? `${greeting} ${userName}, seja bem-vindo ao meu portfólio.`
        : `${greeting}, seja bem-vindo ao meu portfólio.`;

      const finalMessage = document.createElement('div');
      finalMessage.id = 'preloader-final-message';
      finalMessage.textContent = messageText;

      loginContainer.parentNode.replaceChild(finalMessage, loginContainer);

      setTimeout(hidePreloader, 3000);
    };

    // --- INICIALIZAÇÃO ---
    if (clockElement && todIconContainer) {
      setupClock();
      setupTimeOfDayIcon();
    }
    const preloaderBackground = document.getElementById('preloader-background');
    setupAnimatedBackground(preloaderBackground, 100);

    enterBtn.addEventListener('click', handleEnter);
  }
}

// =================================================================================
// LÓGICA DO TEMA (APLICAÇÃO IMEDIATA)
// =================================================================================
const applyTheme = (theme) => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
};

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
applyTheme(initialTheme);


// =================================================================================
// ANIMAÇÕES GLOBAIS E EVENT LISTENERS
// =================================================================================
document.addEventListener('DOMContentLoaded', () => {
  /**
   * Animação de fade-in para seções ao rolar a página.
   */
  const fadeInObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('main > section, .sobre-info, .timeline-item, .habilidade, .cert-card, .card-projeto').forEach(el => {
    fadeInObserver.observe(el);
  });

  // =================================================================================
  // SELETOR DE TEMA (EVENTO DE CLICK)
  // =================================================================================
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const sunIcon = themeToggle.querySelector('.sun');
    const moonIcon = themeToggle.querySelector('.moon');

    const updateIcons = (theme) => {
        if(!sunIcon || !moonIcon) return;
        if (theme === 'light') {
            sunIcon.classList.remove('visible');
            moonIcon.classList.add('visible');
        } else {
            sunIcon.classList.add('visible');
            moonIcon.classList.remove('visible');
        }
    };

    // Update icons on initial load
    updateIcons(document.body.dataset.theme);

    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        updateIcons(newTheme);
    });
  }

  // =================================================================================
  // INICIALIZAÇÃO DE FUNDO ANIMADO DO HERO
  // =================================================================================
  const heroBackground = document.getElementById('hero-background');
  if (heroBackground) {
      setupAnimatedBackground(heroBackground, 50);
  }
});
