// Create
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


//Read 
function getUser(username) {
    const storedUser = localStorage.getItem(username);
    if (storedUser){
        return JSON.parse(storedUser);
    } else {
        return null;
    }
    
}


//Update
function UpdateUser(username, newPassword) {
    const storedUser = localStorage.getItem(username);
    if (storedUser) {
        const user = JSON.parse(storedUser);
        user.password = newPassword;
        localStorage.setItem(username, JSON.stringify(user));
        alert('Password succesfully updated!');
    } else{
        alert('User not found!');
    }
    
}

//Delete
function deleteUser(username) {
    localStorage.removeItem(username)
    alert('User deleted successfully!');
}


// Add event listeners to form buttons
document.getElementById('signup-btn').addEventListener('click', signup);
document.getElementById('login-btn').addEventListener('click', function() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const user = getUser(username);
    if (user && user.password === password) {
        alert('Login successful!');
        // Optionally, redirect to a protected page
        window.location.href = 'protected.html';
    } else {
        alert('Invalid username or password!');
    }
});
document.getElementById('update-btn').addEventListener('click', updateUser);
document.getElementById('delete-btn').addEventListener('click', deleteUser);