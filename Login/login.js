document.addEventListener('DOMContentLoaded', () => {
  const dbService = [
    { email: 'teste@finup.com', senha: '12345678' },
    { email: 'matheus@finup.com', senha: 'abc12378' }
  ];

  const btnPrimary = document.querySelector('.btn-primary');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const form = document.querySelector('.login-form');
  const googleButton = document.getElementById('googleButton');

  let msgBox = document.createElement('div');
  msgBox.classList.add('notification', 'is-danger', 'is-light', 'has-text-centered');
  msgBox.style.display = 'none';
  msgBox.style.marginTop = '10px';
  form.appendChild(msgBox);

  const togglePassword = document.getElementById('togglePassword');
  togglePassword.addEventListener('click', function () {
    const icon = this.querySelector('i');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
      passwordInput.type = 'password';
      icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
  });

  const showError = (message) => {
    msgBox.textContent = message;
    msgBox.style.display = 'block';
    msgBox.classList.remove('is-success');
    msgBox.classList.add('is-danger');
  };

  const clearError = () => {
    msgBox.style.display = 'none';
    emailInput.classList.remove('is-danger');
    passwordInput.classList.remove('is-danger');
  };

  emailInput.addEventListener('input', clearError);
  passwordInput.addEventListener('input', clearError);

  btnPrimary.addEventListener('click', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const senha = passwordInput.value.trim();

    if (!email || !senha) {
      showError('Preencha todos os campos.');
      if (!email) emailInput.classList.add('is-danger');
      if (!senha) passwordInput.classList.add('is-danger');
      return;
    }

    const usuarioValido = dbService.some(u => u.email === email && u.senha === senha);

    if (usuarioValido) {
      msgBox.classList.remove('is-danger');
      msgBox.classList.add('is-success');
      msgBox.textContent = 'Login realizado com sucesso!';
      msgBox.style.display = 'block';

      setTimeout(() => {
        localStorage.setItem('usuarioLogado', email);
        window.location.href = '../home.html';
      }, 1000);
    } else {
      showError('Usuário ou senha inválidos.');
      emailInput.classList.add('is-danger');
      passwordInput.classList.add('is-danger');
    }
  });

  initializeGoogleAuth();
});

// Função para inicializar o Google Auth de forma segura
function initializeGoogleAuth() {
  if (typeof google === 'undefined') {
    console.log('Aguardando biblioteca do Google...');
    setTimeout(initializeGoogleAuth, 500);
    return;
  }

  try {
    console.log('Inicializando Google Auth...');
    
    google.accounts.id.initialize({
      client_id: "32096085213-j21nv2218r61u3ic4421lpgh8sbbgdco.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      { 
        theme: "outline", 
        size: "large",
        width: document.getElementById("googleButton").offsetWidth,
        text: "continue_with"
      }
    );
    
    console.log('Google Auth inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar Google Auth:', error);
  }
}

function handleCredentialResponse(response) {
  console.log("Credential Response:", response);
  
  try {
    const user = parseJwt(response.credential);
    console.log("User Info:", user);
    
    localStorage.setItem('usuarioLogado', user.email);
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userPicture', user.picture);
    
    window.location.href = "../home.html";
    
  } catch (error) {
    console.error('Erro ao processar login do Google:', error);
    alert('Erro ao fazer login com Google. Tente novamente.');
  }
}

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erro ao decodificar JWT:', error);
    throw error;
  }
}