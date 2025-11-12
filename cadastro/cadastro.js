// Espera o DOM carregar antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('formCadastro');

  form.addEventListener('submit', function(e) {
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

    cadastrarUsuario(email, password);
  });

  function cadastrarUsuario(email, senha) {
    // Verifica se o email já existe
    const existe = dbService.some(usuario => usuario.email === email);

    if (existe) {
      alert('Este e-mail já está cadastrado!');
      return;
    }

    dbService.push({ email, senha });
    console.log('Usuário cadastrado com sucesso!');
    console.log(dbService);

    // Salva o login
    localStorage.setItem('usuarioLogado', email);

    // Redireciona para a home
    window.location.href = '../home.html';
  }

});
