function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const storedUser = localStorage.getItem(username);
    const messageDiv = document.getElementById('message');

    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === password) {
            alert('Login successful!');
            messageDiv.textContent = '';
            // Takes you to the dashboard
            window.location.href = '../modules/index.html';
        } else {
            messageDiv.textContent = 'Incorrect password.';
        }
    } else {
        messageDiv.textContent = 'User not found. Please sign up.';
    }
}