function signup() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const messageDiv = document.getElementById('message');

    if (password !== confirmPassword) {
        messageDiv.textContent = 'Passwords do not match.';
        return;
    }

    if (localStorage.getItem(username)) {
        messageDiv.textContent = 'Username already exists. Try a different one.';
        return;
    }

    const user = {
        username: username,
        password: password
    };

    localStorage.setItem(username, JSON.stringify(user));
    alert('Signup successful! You can now login.');
    messageDiv.textContent = '';
    // Optionally, redirect to the login page
    window.location.href = 'login.html';
}