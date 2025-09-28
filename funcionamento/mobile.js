document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const header = document.querySelector('header');
  const mainNav = document.querySelector('header nav');
  const themeToggleBtn = document.getElementById('theme-toggle');

  if (!menuToggle || !header || !mainNav || !themeToggleBtn) {
    console.error('Elementos essenciais para o menu mobile não foram encontrados.');
    return;
  }

  // Cria o container do menu móvel que ficará fixo na tela
  const mobileNavContainer = document.createElement('div');
  mobileNavContainer.className = 'nav-mobile';
  mobileNavContainer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(mobileNavContainer);

  // Função para mover os elementos (nav e theme-toggle) para o lugar certo
  const arrangeNavElements = () => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Se for mobile, move a nav e o theme-toggle para dentro do container do menu mobile
      if (!mobileNavContainer.contains(mainNav)) {
        mobileNavContainer.appendChild(mainNav);
      }
      if (!mobileNavContainer.contains(themeToggleBtn)) {
        mobileNavContainer.appendChild(themeToggleBtn);
      }
    } else {
      // Se for desktop, devolve os elementos para o header
      const headerActions = header.querySelector('.header-actions');
      if (!header.contains(mainNav)) {
        header.insertBefore(mainNav, headerActions);
      }
      if (!headerActions.contains(themeToggleBtn)) {
        headerActions.appendChild(themeToggleBtn);
      }
      // Garante que o menu mobile esteja fechado se redimensionar para desktop
      menuToggle.classList.remove('is-active');
      mobileNavContainer.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNavContainer.setAttribute('aria-hidden', 'true');
    }
  };

  // Controla a abertura e fechamento do menu
  menuToggle.addEventListener('click', () => {
    const isActive = menuToggle.classList.toggle('is-active');
    mobileNavContainer.classList.toggle('is-active');
    menuToggle.setAttribute('aria-expanded', isActive);
    mobileNavContainer.setAttribute('aria-hidden', !isActive);
  });

  // Executa a função ao carregar a página e ao redimensionar a janela
  arrangeNavElements();
  window.addEventListener('resize', arrangeNavElements);
});