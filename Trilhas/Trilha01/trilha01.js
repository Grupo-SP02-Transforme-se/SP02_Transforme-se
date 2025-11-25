document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("flip");
    });
});
    // Toggle do tema claro/escuro
    const toggleBtn = document.getElementById("theme-toggle");

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const dark = document.body.classList.contains("dark-mode");
        toggleBtn.textContent = dark ? "🌙" : "☀️";
    });