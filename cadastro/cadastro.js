// Validação do formulário
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (!name || !email || !password || !confirmPassword) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem. Por favor, verifique.');
      return;
    }
    
    // Simulação de cadastro bem-sucedido
    alert('Cadastro realizado com sucesso! Redirecionando...');
    // Aqui normalmente redirecionaria para a página de login ou dashboard
  });