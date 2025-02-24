const inputs = document.querySelectorAll("input");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPassInput = document.querySelector("#confirmpass");
const viewPass = document.querySelectorAll(".inp i");
const submit = document.querySelector(".submit button");
const signupBtn = document.querySelector(".signup a");

const nameRegex = /^[A-Za-z\s]{3,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const showError = (input, message) => {
    alert(message);
    input.focus();
};

const validateForm = (event) => {

    const isSignUp = submit.innerText === "Sign Up";

    if (!nameInput.value.trim()) {
        showError(nameInput, "Please enter your name!");
        event.preventDefault();
        return false;
    } else if (!nameRegex.test(nameInput.value.trim())) {
        showError(nameInput, "Name must be at least 3 characters and contain only letters and spaces.");
        event.preventDefault();
        return false;
    }

    if (!emailInput.value.trim()) {
        showError(emailInput, "Please enter your email!");
        event.preventDefault();
        return false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, "Invalid email format!");
        event.preventDefault();
        return false;
    }

    if (!passwordInput.value.trim()) {
        showError(passwordInput, "Please enter a password!");
        event.preventDefault();
        return false;
    } else if (!passwordRegex.test(passwordInput.value.trim())) {
        showError(passwordInput, "Password must be 8+ chars, include uppercase, number & special character.");
        event.preventDefault();
        return false;
    }

    if (isSignUp) {
        if (!confirmPassInput.value.trim()) {
            showError(confirmPassInput, "Please confirm your password!");
            event.preventDefault();
            return false;
        } else if (confirmPassInput.value !== passwordInput.value) {
            showError(confirmPassInput, "Passwords do not match!");
            event.preventDefault();
            return false;
        }
    }

    return true;
};

inputs.forEach(input => {
    input.addEventListener("focus", () => input.parentElement.classList.add("focus"));
    input.addEventListener("blur", () => input.parentElement.classList.remove("focus"));
});

viewPass.forEach(icon => {
    icon.addEventListener("click", () => {
        const input = icon.previousElementSibling;
        input.type = input.type === "password" ? "text" : "password";
        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
    });
});

submit.addEventListener("click", (event) => {
    event.preventDefault();
    const isSignUp = submit.innerText === "Sign Up";

    if (validateForm(event)) {
        let user = nameInput.value.trim();
        let mail = emailInput.value.trim();
        let pass = passwordInput.value.trim();

        if (isSignUp) {  
            if (localStorage.getItem(`user_${mail}`)) {
                alert("This email is already registered! Please login.");
                return;
            }

            localStorage.setItem(`user_${mail}`, JSON.stringify({ name: user, pass: pass }));
            alert("Sign Up Successful! Now Log In.");
            switchToLogin();
        } else {
            let storedUser = JSON.parse(localStorage.getItem(`user_${mail}`));

            if (storedUser && storedUser.pass === pass) {
                localStorage.setItem("loggedIn", "true");
                window.location.href = "../index.html";
            } else {
                alert("Can't Login, Invalid credentials! Check name, email and password.");
            }
        }
    }
});

const switchToLogin = () => {
    submit.innerText = "Login";
    document.querySelector(".heading h1").innerText = "Login";
    document.querySelector(".signup p").innerText = "Don't have an account?";
    document.querySelector(".signup a").innerText = "Sign Up";
    document.querySelector(".container").style.height = "72vh";
    document.querySelector(".container").style.width = "25vw";
    document.querySelector(".confirmpass").classList.add("hide");
};

signupBtn.addEventListener("click", () => {
    if (submit.innerText === "Login") {
        submit.innerText = "Sign Up";
        document.querySelector(".heading h1").innerText = "Sign Up";
        document.querySelector(".signup p").innerText = "Already have an account?";
        document.querySelector(".signup a").innerText = "Login";
        document.querySelector(".container").style.height = "85vh";
        document.querySelector(".container").style.width = "27vw";
        document.querySelector(".confirmpass").classList.remove("hide");
    } else {
        switchToLogin();
    }
});
