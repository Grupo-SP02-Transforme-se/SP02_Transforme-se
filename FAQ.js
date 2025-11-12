// Seleciona todas as perguntas da FAQ
const questions = document.querySelectorAll(".faq-question");


questions.forEach(q => {
  q.addEventListener("click", () => {
    q.classList.toggle("active");
    const answer = q.nextElementSibling;

    if (q.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
  });
});


// Logica do formulário 


  document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      nome: e.target.nome.value,
      email: e.target.email.value,
      assunto: e.target.assunto.value,
      mensagem: e.target.mensagem.value
    };

    try {
      const response = await fetch('https://formspree.io/f/movyqrgo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        e.target.reset();
        showToast('✅ Mensagem enviada com sucesso!');
      } else {
        showToast('❌ Erro ao enviar. Tente novamente.', true);
      }
    } catch (error) {
      showToast('⚠️ Erro de conexão. Verifique sua internet.', true);
    } finally {
      // Restaura o botão
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
  


  //Função para mostrar o Toast

  function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    
    if (isError) {
      toast.classList.add('error');
    } else {
      toast.classList.remove('error');
    }
  
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('show'), 50);
  
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.classList.add('hidden'), 400);
    }, 4000);
  }
  
