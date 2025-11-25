document.addEventListener('DOMContentLoaded', () => {
    // Elementos do menu mobile
    const menuButton = document.querySelector('.menu-button');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeButton = document.querySelector('.close-button');

    // Abre o menu
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            menuOverlay.classList.add('active');
        });
    }

    // Fecha pelo botão X
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
        });
    }

    // Fecha ao clicar fora do menu (no overlay escuro)
    if (menuOverlay) {
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                menuOverlay.classList.remove('active');
            }
        });
    }
});

    document.getElementById("btnSimular").addEventListener("click", () => {
        const valor = parseFloat(document.getElementById("valorDivida").value);
        const juros = parseFloat(document.getElementById("taxaJuros").value);

        if (isNaN(valor) || isNaN(juros) || valor <= 0 || juros <= 0) {
            alert("Preencha os valores corretamente.");
            return;
        }

        // Fórmula juros compostos
        const valor3 = valor * Math.pow((1 + juros/100), 3);
        const valor6 = valor * Math.pow((1 + juros/100), 6);

        const format = v => 
            "R$ " + v.toFixed(2).replace(".", ",");

        document.getElementById("valoresResultado").innerHTML = `
            ${format(valor3)}<br>
            ${format(valor6)}
        `;

        document.getElementById("resultado").classList.remove("is-hidden");
        document.getElementById("alerta").classList.remove("is-hidden");
    });


    // Toggle do tema claro/escuro
const toggleBtnDesktop = document.getElementById("theme-toggle");
const toggleBtnMobile = document.getElementById("theme-toggle-mobile");

function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    const dark = document.body.classList.contains("dark-mode");

    // Atualiza o ícone nos dois botões (se existirem)
    if (toggleBtnDesktop) toggleBtnDesktop.textContent = dark ? "🌙" : "☀️";
    if (toggleBtnMobile) toggleBtnMobile.textContent  = dark ? "🌙" : "☀️";
}

// Liga o evento em ambos os botões (se existirem)
if (toggleBtnDesktop) toggleBtnDesktop.addEventListener("click", toggleTheme);
if (toggleBtnMobile) toggleBtnMobile.addEventListener("click", toggleTheme);


