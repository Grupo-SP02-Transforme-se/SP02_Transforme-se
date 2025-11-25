document.addEventListener("DOMContentLoaded", () => {
  // Burger menu
  const burger = document.querySelector(".navbar-burger");
  const menu = document.getElementById("menu");

  if (burger && menu) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("is-active");
      menu.classList.toggle("is-active");
    });
  }

  // Contact form
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async e => {
      e.preventDefault();

      // Função segura para obter valores
      const getFormValue = (selector) => {
        const element = contactForm.querySelector(selector);
        return element ? element.value : '';
      };

      const formData = {
        nome: getFormValue('[name="nome"]'),
        email: getFormValue('[name="email"]'),
        assunto: getFormValue('[name="assunto"]'),
        mensagem: getFormValue('[name="mensagem"]')
      };

      // Verificar se todos os campos têm valores
      if (!formData.nome || !formData.email || !formData.mensagem) {
        showToast("⚠️ Preencha todos os campos obrigatórios", true);
        return;
      }

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

        if (response.ok) {
          contactForm.reset();
          showToast("✅ Mensagem enviada com sucesso!");
        } else {
          showToast("❌ Erro ao enviar. Tente novamente.", true);
        }
      } catch {
        showToast("⚠️ Erro de conexão. Verifique sua internet.", true);
      } finally {
        btn.classList.remove("is-loading");
        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
  }

  // Mobile menu - COM VERIFICAÇÃO
  const menuBtn = document.querySelector(".menu-button");
  const closeBtn = document.querySelector(".close-button");
  const overlay = document.querySelector(".mobile-menu-overlay");

  if (menuBtn && closeBtn && overlay) {
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

    const mobileNav = document.querySelector(".mobile-nav");
    if (mobileNav) {
      mobileNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => toggleMenu(false));
      });
    }

    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && overlay.classList.contains("active")) {
        toggleMenu(false);
      }
    });
  }
});