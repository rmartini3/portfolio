/* ==========================================================================
   FUNÇÕES: mobile.js (Lógica de Menu Responsivo)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const header = document.querySelector('header');
  const mainNav = document.querySelector('header nav');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const headerActions = header.querySelector('.header-actions'); // Mantemos a referência para o container original do menu-toggle

  if (!menuToggle || !header || !mainNav || !themeToggleBtn) {
    console.error('Elementos essenciais para o menu mobile não foram encontrados.');
    return;
  }

  // Cria o container do menu móvel que ficará fixo na tela
  const mobileNavContainer = document.createElement('div');
  mobileNavContainer.className = 'nav-mobile';
  mobileNavContainer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(mobileNavContainer);

  // Função para mover os elementos (nav) para o lugar certo
  const arrangeNavElements = () => {
    const isMobile = window.innerWidth <= 768;

    // No mobile, apenas a navegação precisa ser movida para o overlay.
    // O #theme-toggle e #menu-toggle permanecem no header-actions e são estilizados via CSS.

    if (isMobile) {
      // Move a nav para dentro do container do menu mobile
      if (!mobileNavContainer.contains(mainNav)) {
        mobileNavContainer.prepend(mainNav); // Usa prepend para garantir a ordem
      }
      // Move o themeToggleBtn para dentro do mobileNavContainer se ainda não estiver lá
      // Isso é necessário porque no desktop ele é movido para o headerActions e no mobile para o container.
      if (!mobileNavContainer.contains(themeToggleBtn)) {
          mobileNavContainer.appendChild(themeToggleBtn);
      }

    } else {
      // Se for desktop, devolve os elementos para o header
      // Devolve a nav para o header (antes de headerActions)
      if (!header.contains(mainNav)) {
        header.insertBefore(mainNav, headerActions);
      }
      // Devolve o themeToggleBtn para o headerActions (se ele tiver sido movido para o mobile container)
      if (mobileNavContainer.contains(themeToggleBtn)) {
        headerActions.prepend(themeToggleBtn);
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