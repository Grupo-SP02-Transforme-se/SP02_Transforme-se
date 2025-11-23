document.addEventListener('DOMContentLoaded', () => {

    /* ============================
       MENU MOBILE
    ============================ */
    const menuButton = document.querySelector('.menu-button');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeButton = document.querySelector('.close-button');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            menuOverlay.classList.add('active');
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                menuOverlay.classList.remove('active');
            }
        });
    }

    /* ============================
       CALCULADORA DE RESERVA
    ============================ */
    const btnCalcular = document.getElementById("btnCalcular");

    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            const custo = parseFloat(document.getElementById("custo").value);

            if (isNaN(custo) || custo <= 0) {
                alert("Digite um valor válido!");
                return;
            }

            const resultado = custo * 6;

            document.getElementById("resultado").value =
                resultado.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                });
        });
    }

    /* ============================
       TEMA DARK/LIGHT
    ============================ */
    const toggleBtnDesktop = document.getElementById("theme-toggle");
    const toggleBtnMobile = document.getElementById("theme-toggle-mobile");

    function toggleTheme() {
        document.body.classList.toggle("dark-mode");

        const dark = document.body.classList.contains("dark-mode");

        if (toggleBtnDesktop) toggleBtnDesktop.textContent = dark ? "🌙" : "☀️";
        if (toggleBtnMobile)  toggleBtnMobile.textContent = dark ? "🌙" : "☀️";
    }

    if (toggleBtnDesktop) toggleBtnDesktop.addEventListener("click", toggleTheme);
    if (toggleBtnMobile) toggleBtnMobile.addEventListener("click", toggleTheme);

});
