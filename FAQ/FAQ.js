document.addEventListener("DOMContentLoaded", () => {
  /* ===========================
     FAQ — Abrir / Fechar Itens
  ============================ */
  const answersMap = {
    "O que é a plataforma?":
      "A FinUp é uma plataforma educacional focada em educação financeira, oferecendo missões, conteúdos e ferramentas para ajudar você a alcançar sua liberdade financeira.",
    "A plataforma é gratuita?":
      "Sim! A plataforma FinUp é completamente gratuita para todos os usuários."
  };

  const getAnswer = q => answersMap[q] || "Resposta em desenvolvimento.";

  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
      let answer = item.querySelector(".faq-answer");

      // Cria somente se não existir
      if (!answer) {
        const text = item.querySelector(".faq-question span").textContent;
        answer = document.createElement("div");
        answer.className = "faq-answer";
        answer.textContent = getAnswer(text);

        item.querySelector(".faq-question").after(answer);
      }

      item.classList.toggle("active");

      // Remove ao fechar com atraso para animação
      if (!item.classList.contains("active")) {
        setTimeout(() => {
          if (!item.classList.contains("active") && answer) answer.remove();
        }, 400);
      }
    });
  });

  /* ===========================
      FORM — Envio (Formspree)
  ============================ */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async e => {
      e.preventDefault();

      const formData = {
        nome: contactForm.querySelector('input[placeholder="Caio Hígor"]').value,
        email: contactForm.querySelector('input[placeholder="email@gmail.com"]').value,
        assunto: contactForm.querySelector('input[placeholder="Assunto da mensagem"]').value,
        mensagem: contactForm.querySelector("textarea").value
      };

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.classList.add("is-loading");
      btn.disabled = true;
      btn.textContent = "Enviando...";

      try {
        const response = await fetch("https://formspree.io/f/movyqrgo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        response.ok
          ? (contactForm.reset(), showToast("✅ Mensagem enviada com sucesso!"))
          : showToast("❌ Erro ao enviar. Tente novamente.", true);

      } catch {
        showToast("⚠️ Erro de conexão. Verifique sua internet.", true);
      } finally {
        btn.classList.remove("is-loading");
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
  }

  /* ===========================
      MENU MOBILE
  ============================ */
  const menuBtn = document.querySelector(".menu-button");
  const closeBtn = document.querySelector(".close-button");
  const overlay = document.querySelector(".mobile-menu-overlay");

  const toggleMenu = open => {
    overlay.classList.toggle("active", open);
    menuBtn.classList.toggle("active", open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  menuBtn.addEventListener("click", () => toggleMenu(true));
  closeBtn.addEventListener("click", () => toggleMenu(false));

  overlay.addEventListener("click", e => {
    if (e.target === overlay) toggleMenu(false);
  });

  document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && overlay.classList.contains("active")) toggleMenu(false);
  });
});


/* ===========================
      TOAST — Feedback
  ============================ */
function showToast(message, isError = false) {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "notification is-fixed-top hidden";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.toggle("is-danger", isError);
  toast.classList.toggle("is-success", !isError);

  Object.assign(toast.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: "1000",
    maxWidth: "350px",
    opacity: "0",
    transform: "translateY(-20px)",
    transition: "all .3s ease"
  });

  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  }, 50);


  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-20px)";

    setTimeout(() => toast.classList.add("hidden"), 400);
  }, 4000);
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

