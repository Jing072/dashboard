console.log("login loaded");

// Variabelen
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginBtn = document.querySelector(".login-button");
const loginForm = document.querySelector(".login-form");

// Event listener
loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    emailInput.classList.remove("red");
    passwordInput.classList.remove("red");
    if (loginForm.checkValidity() == false) {
        if (emailInput.checkValidity() == false) {
            emailInput.classList.add("red");
        }
        if (passwordInput.checkValidity() == false) {
            passwordInput.classList.add("red");
        }
    } else {
        const email = emailInput.value;
        const password = passwordInput.value;

        (async () => {
            const rawResponse = await fetch("/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
            });
            const content = await rawResponse.json();
            console.log(content);
            if (content.loggedIn) {
                window.location.href = "/index.html";
            } else {
                alert("Login failed");
            }
        })();
    }
});
