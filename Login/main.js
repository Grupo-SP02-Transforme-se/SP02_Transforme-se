

// Banco de dados fake para teste
const dbService = [
  { email: 'teste@finup.com', senha: '12345678' },
  { email: 'matheus@finup.com', senha: 'abc12378' }
];

// Seletores
const btnPrimary = document.getElementsByClassName('btn-primary')[0];
const erroMsg = document.querySelector('.error');

// Alternar visibilidade da senha
document.getElementById('togglePassword').addEventListener('click', function() {
  const passwordInput = document.getElementById('password');
  const icon = this.querySelector('i');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
});

// Lógica de login
btnPrimary.addEventListener('click', (e) => {
  e.preventDefault(); // evita reload do form

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('password').value.trim();

  const usuarioValido = dbService.some(u => u.email === email && u.senha === senha);

  if (usuarioValido) {
    // Armazena login no localStorage (opcional)
    localStorage.setItem('usuarioLogado', email);
    // Redireciona para a página principal
    window.location.href = '../home.html';
  } else {
    erroMsg.textContent = 'Usuário ou senha inválidos.';
  }
});
