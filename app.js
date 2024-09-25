function showLogin() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-tab').classList.add('active-tab');
    document.getElementById('signup-tab').classList.remove('active-tab');
  }
  
  function showSignup() {
    document.getElementById('signup-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-tab').classList.add('active-tab');
    document.getElementById('login-tab').classList.remove('active-tab');
  }