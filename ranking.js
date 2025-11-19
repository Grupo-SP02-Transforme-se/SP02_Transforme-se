document.addEventListener('DOMContentLoaded', () => {
  // ===========================
  // SISTEMA DE ABAS DE RANKING
  // ===========================
  const tabButtons = document.querySelectorAll('.ranking-tab');
  const tabContents = document.querySelectorAll('.ranking-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');

      // Remove active class from all tabs and contents
      tabButtons.forEach(btn => btn.classList.remove('ranking-tab--active'));
      tabContents.forEach(content => content.classList.remove('ranking-content--active'));

      // Add active class to clicked tab and corresponding content
      this.classList.add('ranking-tab--active');
      document.getElementById(`${targetTab}-content`).classList.add('ranking-content--active');
    });
  });

  // ===========================
  // MENU MOBILE
  // ===========================
  const menuButton = document.querySelector('.menu-button');
  const closeButton = document.querySelector('.close-button');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

  const toggleMenu = (open) => {
    mobileMenuOverlay.classList.toggle('active', open);
    menuButton.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  menuButton.addEventListener('click', () => toggleMenu(true));
  closeButton.addEventListener('click', () => toggleMenu(false));

  // Fechar menu ao clicar fora
  mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) toggleMenu(false);
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Fechar menu com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
      toggleMenu(false);
    }
  });

  // ===========================
  // CARREGAR NOME DO USUÁRIO
  // ===========================
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  
  if (usuarioLogado) {
    try {
      const usuario = JSON.parse(usuarioLogado);
      const nomeUsuario = usuario.nome || usuario.email?.split('@')[0] || 'Usuário';
      
      // Atualizar nome no header desktop
      const userNameElement = document.getElementById('userName');
      if (userNameElement) {
        userNameElement.textContent = nomeUsuario;
      }

      // Atualizar nome no menu mobile
      const mobileUserNameElement = document.getElementById('mobileUserName');
      if (mobileUserNameElement) {
        mobileUserNameElement.textContent = nomeUsuario;
      }
    } catch (error) {
      console.error('Erro ao processar usuário logado:', error);
    }
  }

  // ===========================
  // BOTÃO ADICIONAR AMIGOS
  // ===========================
  const addFriendsButton = document.querySelector('.friends-header__add-button');
  if (addFriendsButton) {
    addFriendsButton.addEventListener('click', () => {
      showNotification('Funcionalidade de adicionar amigos em desenvolvimento! 👥', 'info');
    });
  }

  // ===========================
  // BUSCA DE AMIGOS
  // ===========================
  const searchInput = document.querySelector('.friends-sidebar__search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const friendItems = document.querySelectorAll('.ranking-list--friends .ranking-item');

      friendItems.forEach(item => {
        const name = item.querySelector('.ranking-item__name').textContent.toLowerCase();
        if (name.includes(searchTerm)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // ===========================
  // BOTÃO CONFIGURAÇÕES
  // ===========================
  const settingsButton = document.querySelector('.friends-sidebar__settings');
  if (settingsButton) {
    settingsButton.addEventListener('click', () => {
      showNotification('Configurações em desenvolvimento! ⚙️', 'info');
    });
  }

  // ===========================
  // FUNÇÃO DE NOTIFICAÇÃO
  // ===========================
  function showNotification(message, type = 'info') {
    // Remove notificação existente
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Criar notificação
    const notification = document.createElement('div');
    notification.className = `custom-notification custom-notification--${type}`;
    notification.innerHTML = `
      <i class="fas ${type === 'info' ? 'fa-info-circle' : 'fa-check-circle'}"></i>
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    `;

    // Estilos inline para garantir visibilidade
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: type === 'info' ? '#3e98c7' : '#48c78e',
      color: 'white',
      padding: '16px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: '9999',
      maxWidth: '400px',
      animation: 'slideInRight 0.3s ease',
      fontSize: '14px',
      fontWeight: '500'
    });

    document.body.appendChild(notification);

    // Botão de fechar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
      background: transparent;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      margin-left: auto;
    `;

    closeBtn.addEventListener('click', () => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    });

    // Auto-remover após 5 segundos
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // Adicionar animações CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ===========================
  // SIMULAÇÃO DE DADOS DINÂMICOS
  // ===========================
  // Você pode descomentar isso para simular dados dinâmicos
  /*
  const currentUserXP = 1356;
  const currentUserPosition = 4;
  
  // Atualizar XP do usuário no header
  const userXPElements = document.querySelectorAll('.user-stats .stat:last-child span');
  userXPElements.forEach(el => {
    if (el.textContent.includes('XP')) {
      el.textContent = `${currentUserXP} XP`;
    }
  });
  */

  console.log('✅ Sistema de Ranking FinUp carregado com sucesso!');
});