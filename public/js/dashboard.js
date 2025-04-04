document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const userInfoDiv = document.getElementById('userInfo');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check if user is authenticated
    if (!token) {
        window.location.href = '/index.html';
        return;
    }

    // Fetch user information
    async function fetchUserInfo() {
        try {
            const response = await fetch('/api/auth/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const user = await response.json();
                displayUserInfo(user);
            } else {
                throw new Error('Failed to fetch user information');
            }
        } catch (error) {
            console.error('Error:', error);
            userInfoDiv.innerHTML = '<p class="text-red-600">Error loading user information</p>';
        }
    }

    // Display user information
    function displayUserInfo(user) {
        userInfoDiv.innerHTML = `
            <h2 class="text-lg font-semibold mb-2">Your Information</h2>
            <p><span class="font-medium">Username:</span> ${user.username}</p>
            <p><span class="font-medium">Email:</span> ${user.email}</p>
        `;
    }

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/index.html';
    });

    // Fetch user information when the page loads
    fetchUserInfo();
}); 
