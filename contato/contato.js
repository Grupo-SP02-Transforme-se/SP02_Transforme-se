document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".navbar-burger");
  const menu = document.getElementById("menu");

  // Se não existir, evitar erro
  if (!burger || !menu) {
    console.warn("Navbar burger ou menu não encontrados no DOM.");
    return;
  }

  burger.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  }); // <-- CORRIGIDO: }); em vez de );

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
}); // <-- Esta é a chave de fechamento correta do DOMContentLoaded

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