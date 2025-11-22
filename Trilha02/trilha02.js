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
    const toggleBtn = document.getElementById("theme-toggle");

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const dark = document.body.classList.contains("dark-mode");
        toggleBtn.textContent = dark ? "🌙" : "☀️";
    });

