// Check if user is logged in
function checkAuth() {
    const username = localStorage.getItem('username');
    const loginButton = document.querySelector('.login-button');
    const welcomeMessage = document.querySelector('.welcome-message');
    
    if (username) {
        // User is logged in
        if (loginButton) {
            loginButton.textContent = 'Log out';
            loginButton.href = '#';
            loginButton.onclick = handleLogout;
        }
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome to SecureYou, ${username}!`;
            welcomeMessage.style.display = 'block';
        }
    } else {
        // User is not logged in
        if (loginButton) {
            loginButton.textContent = 'Login';
            loginButton.href = 'login.html';
            loginButton.onclick = null;
        }
        if (welcomeMessage) {
            welcomeMessage.style.display = 'none';
        }
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // For demo purposes, we'll accept any non-empty username/password
    // In a real application, you would validate against a backend
    if (username && password) {
        localStorage.setItem('username', username);
        window.location.href = 'index.html';
    } else {
        alert('Please enter both username and password');
    }
}

// Handle logout
function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

// Add event listener to login form
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    checkAuth();
}); 