const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu-overlay');
const closeButton = document.querySelector('.close-button');

// Menu mobile functions
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

document.addEventListener("DOMContentLoaded", () => {
    // Botões das trilhas em desenvolvimento
    const idsBotoesDev = ["card4", "card5", "card6"];
    
    idsBotoesDev.forEach(id => {
        const botao = document.getElementById(id);
        if (botao) {
            botao.addEventListener("click", function(e) {
                e.preventDefault();
                
                // Mapeia os IDs para nomes mais amigáveis
                const nomesTrilhas = {
                    "card4": "Renda Extra",
                    "card5": "Investimentos", 
                    "card6": "Planejamento Financeiro"
                };
                
                const nomeTrilha = nomesTrilhas[id] || "esta trilha";
                showBlueToast(`🚧 A trilha ${nomeTrilha} está em desenvolvimento!`);
                
                // Efeito visual opcional no botão
                this.style.opacity = "0.7";
                setTimeout(() => {
                    this.style.opacity = "1";
                }, 300);
            });
        }
    });
});

/* ===========================
   TOAST AZUL - Trilha em Desenvolvimento
  ============================ */
function showBlueToast(message) {
    // Remove toast anterior se existir
    const existingToast = document.getElementById("blue-toast");
    if (existingToast) {
        existingToast.remove();
    }

    // Cria o novo toast
    const toast = document.createElement("div");
    toast.id = "blue-toast";
    toast.className = "blue-toast";
    toast.textContent = message;

    // Estilos do toast azul
    Object.assign(toast.style, {
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%) translateY(-20px)",
        backgroundColor: "#209CEE", // Azul do Bulma
        color: "white",
        padding: "12px 24px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: "10000",
        fontSize: "16px",
        fontWeight: "500",
        textAlign: "center",
        minWidth: "300px",
        maxWidth: "90%",
        opacity: "0",
        transition: "all 0.3s ease-in-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px"
    });

    // Adiciona ícone de construção
    toast.innerHTML = `🚧 ${message}`;

    document.body.appendChild(toast);

    // Animação de entrada
    setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateX(-50%) translateY(0)";
    }, 50);

    // Remove após 3 segundos
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(-50%) translateY(-20px)";
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}