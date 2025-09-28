document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const header = document.querySelector('header');

  if (menuToggle && header) {
    // Clona a navegação principal e o botão de tema para criar o menu móvel
    const mainNav = header.querySelector('nav');
    const themeToggleBtn = header.querySelector('#theme-toggle');

    const mobileNav = document.createElement('div');
    mobileNav.className = 'nav-mobile';
    mobileNav.appendChild(mainNav.cloneNode(true));
    mobileNav.appendChild(themeToggleBtn.cloneNode(true));

    // Adiciona o novo menu móvel ao corpo do documento
    document.body.appendChild(mobileNav);

    // Adiciona o evento de clique ao botão hambúrguer
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-active');
      mobileNav.classList.toggle('is-active');

      // Atualiza o atributo aria-expanded para acessibilidade
      const isActive = mobileNav.classList.contains('is-active');
      menuToggle.setAttribute('aria-expanded', isActive);
    });
  }
});