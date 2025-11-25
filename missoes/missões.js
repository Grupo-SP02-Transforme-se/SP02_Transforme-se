        const menuButton = document.querySelector('.menu-button');
        const mobileMenu = document.querySelector('.mobile-menu-overlay');
        const closeButton = document.querySelector('.close-button');

        menuButton.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            menuButton.classList.add('active');
        });

        closeButton.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuButton.classList.remove('active');
        });

        // Fechar menu ao clicar fora
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                menuButton.classList.remove('active');
            }
        });