/* ==========================================================================
   FUNÇÕES: mobile.js (Lógica de Menu Responsivo - AVANÇADA)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const header = document.querySelector('header');
  const mainNav = document.querySelector('header nav');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const headerActions = header.querySelector('.header-actions');
  const logoWrapper = header.querySelector('.logo-link-wrapper'); 
  
  // Cria o container do menu móvel APENAS UMA VEZ
  const mobileNavContainer = document.createElement('div');
  mobileNavContainer.className = 'nav-mobile';
  mobileNavContainer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(mobileNavContainer);

  if (!menuToggle || !header || !mainNav || !themeToggleBtn || !headerActions || !logoWrapper) {
    console.warn('Elementos essenciais não foram encontrados. Verifique seu HTML.');
    return;
  }

  // Função central para re-arranjar elementos com base no tamanho da tela
  const arrangeNavElements = () => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      
      // CONFIGURAÇÃO MOBILE (Logo | Toggle | Tema na 3ª coluna)
      
      // Move o menu toggle para ser filho direto do header (COLUNA 2 do Grid)
      if (!header.contains(menuToggle)) {
        header.appendChild(menuToggle);
      }
      
      // Move o tema toggle para DENTRO DO headerActions (COLUNA 3 do Grid)
      if (!headerActions.contains(themeToggleBtn) && !mobileNavContainer.contains(themeToggleBtn)) {
          headerActions.appendChild(themeToggleBtn); 
      }
      
      // Move a navegação (links) para dentro do overlay, se ainda não estiver lá
      if (!mobileNavContainer.contains(mainNav)) {
        mobileNavContainer.appendChild(mainNav);
      }
      
      // Garante que o menu esteja FECHADO (útil ao redimensionar)
      menuToggle.classList.remove('is-active');
      mobileNavContainer.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNavContainer.setAttribute('aria-hidden', 'true');
      
    } else {
      // CONFIGURAÇÃO DESKTOP
      
      // Devolve a navegação para o HEADER (desktop)
      if (!header.contains(mainNav)) {
        // Insere o 'nav' antes do 'headerActions'
        header.insertBefore(mainNav, headerActions); 
      }
      
      // Devolve os botões (toggle e tema) para dentro do .header-actions
      if (!headerActions.contains(menuToggle)) {
        headerActions.prepend(menuToggle);
      }
      if (!headerActions.contains(themeToggleBtn)) {
        headerActions.appendChild(themeToggleBtn);
      }
      
      // Se o botão de tema estava no overlay, ele é movido para o headerActions acima.
      // E a navegação é garantida de estar na posição desktop.
    }
  };

  // CONTROLADOR DE CLIQUE (simplificado para apenas TOGGLE de classes)
  menuToggle.addEventListener('click', () => {
    const isActive = menuToggle.classList.toggle('is-active');
    mobileNavContainer.classList.toggle('is-active');
    menuToggle.setAttribute('aria-expanded', isActive);
    mobileNavContainer.setAttribute('aria-hidden', !isActive);
    
    // NO MOBILE: Lógica crucial para mover o botão de tema APENAS ao abrir/fechar
    if (window.innerWidth <= 768) {
      if (isActive) {
        // Menu aberto: Move o botão de tema para dentro do overlay
        mobileNavContainer.appendChild(themeToggleBtn);
      } else {
        // Menu fechado: Move o botão de tema de volta para o headerActions (coluna 3)
        headerActions.appendChild(themeToggleBtn); 
      }
    }
  });

  // FECHAMENTO DO MENU AO CLICAR EM LINK
  mobileNavContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      // Fecha o menu
      menuToggle.classList.remove('is-active');
      mobileNavContainer.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNavContainer.setAttribute('aria-hidden', 'true');
      
      // Devolve o botão de tema para o headerActions após fechar o overlay
      if (window.innerWidth <= 768 && !headerActions.contains(themeToggleBtn)) {
          headerActions.appendChild(themeToggleBtn);
      }
    }
  });

  // EXECUÇÃO INICIAL E LISTENER DE REDIMENSIONAMENTO
  arrangeNavElements();
  window.addEventListener('resize', arrangeNavElements);
});