document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message');

    // Tab switching
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('text-blue-600', 'border-blue-600');
        loginTab.classList.remove('text-gray-500', 'border-gray-200');
        registerTab.classList.add('text-gray-500', 'border-gray-200');
        registerTab.classList.remove('text-blue-600', 'border-blue-600');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('text-blue-600', 'border-blue-600');
        registerTab.classList.remove('text-gray-500', 'border-gray-200');
        loginTab.classList.add('text-gray-500', 'border-gray-200');
        loginTab.classList.remove('text-blue-600', 'border-blue-600');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    // Login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('Login successful!', 'success');
                // Store token in localStorage
                localStorage.setItem('token', data.token);
                // Redirect to dashboard or home page
                window.location.href = '/dashboard.html';
            } else {
                showMessage(data.message || 'Login failed', 'error');
            }
        } catch (error) {
            showMessage('An error occurred during login', 'error');
        }
    });

    // Register form submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('Registration successful! Please login.', 'success');
                // Switch to login tab
                loginTab.click();
            } else {
                showMessage(data.message || 'Registration failed', 'error');
            }
        } catch (error) {
            showMessage('An error occurred during registration', 'error');
        }
    });

    // Helper function to show messages
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = 'mt-4 text-center text-sm ' + 
            (type === 'success' ? 'text-green-600' : 'text-red-600');
    }
}); 
