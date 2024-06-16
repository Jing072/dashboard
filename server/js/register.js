console.log('register loaded');

// Variabelen
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const registerBtn = document.querySelector('.register-button');
const registerForm = document.querySelector('.register-form');

// Event listener
registerBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    passwordInput.classList.remove('red');
    emailInput.classList.remove('red');
    if (registerForm.checkValidity() == false) {
        if (passwordInput.checkValidity() == false) {
            passwordInput.classList.add('red');
        } 
        if (emailInput.checkValidity() == false) {
            emailInput.classList.add('red');
        }
    } else {
        const email = emailInput.value;
        const password = passwordInput.value;

        (async () => {
            const rawResponse = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password})
            });
            const content = await rawResponse.json();

            if (!content.existingUser) {
                window.location.href = 'login.html';
            }
        })();
    }
});