// Menu toggle para mobile
document.addEventListener('DOMContentLoaded', () => {
    // Toggle do menu mobile
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarBurger && navbarMenu) {
      navbarBurger.addEventListener('click', () => {
        navbarBurger.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
      });
    }
  
    // Rolagem suave para todos os links internos
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Verificar se é um link interno (começa com #)
        if (href.startsWith('#')) {
          e.preventDefault();
          
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            // Calcular a posição considerando a altura da navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            
            // Fechar menu mobile se estiver aberto
            if (navbarBurger && navbarBurger.classList.contains('is-active')) {
              navbarBurger.classList.remove('is-active');
              navbarMenu.classList.remove('is-active');
            }
            
            // Fechar dropdown se estiver aberto
            const dropdown = this.closest('.navbar-dropdown');
            if (dropdown) {
              const dropdownParent = dropdown.closest('.navbar-item.has-dropdown');
              if (dropdownParent) {
                dropdownParent.classList.remove('is-active');
              }
            }
            
            // Rolagem suave
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
        // Links externos (que não começam com #) seguem normalmente
      });
    });
  });