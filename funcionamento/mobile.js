document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const header = document.querySelector('header');
  const mainNav = header ? header.querySelector('nav') : null;
  const themeToggleBtn = header ? header.querySelector('#theme-toggle') : null;

  if (menuToggle && mainNav && themeToggleBtn) {
    // Cria o container do menu móvel uma única vez
    const mobileNav = document.createElement('div');
    mobileNav.className = 'nav-mobile';
    mobileNav.setAttribute('aria-hidden', 'true');

    // Clona os elementos para dentro do menu móvel
    mobileNav.appendChild(mainNav.cloneNode(true));
    mobileNav.appendChild(themeToggleBtn.cloneNode(true));

    // Adiciona o novo menu móvel ao corpo do documento
    document.body.appendChild(mobileNav);

    // Controla a abertura e fechamento do menu
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-active');
      mobileNav.classList.toggle('is-active');

      // Atualiza o atributo aria-expanded para acessibilidade
      const isActive = mobileNav.classList.contains('is-active');
      menuToggle.setAttribute('aria-expanded', isActive);
      mobileNav.setAttribute('aria-hidden', !isActive);
    });
  }
});