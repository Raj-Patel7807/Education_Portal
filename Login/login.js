const inputs = document.querySelectorAll("input");
const name = document.querySelector(".name input");
const email = document.querySelector(".email input");
const password = document.querySelector(".password input");
const viewPass = document.querySelectorAll(".inp i");
const confirmPass = document.querySelector(".confirmpass input");
const submit = document.querySelector(".submit button");
const signup = document.querySelector(".signup a");

inputs.forEach(input => {
    input.addEventListener("focus", () => {
        input.parentElement.classList.add("focus");
    });
    input.addEventListener("blur", () => {
        input.parentElement.classList.remove("focus");
    });
});

viewPass.forEach(pass => {
    pass.addEventListener("click", () => {
        const input = pass.previousElementSibling; 
        
        if (input.type === "password") {
            input.type = "text";
            pass.classList.remove("fa-eye");
            pass.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            pass.classList.remove("fa-eye-slash");
            pass.classList.add("fa-eye");
        }
    });
});

submit.addEventListener("click", (event) => {
    if(name.value === "" || name.value === null) {
        alert("EPlease, Enter Your Name!!");
        name.focus();
        event.preventDefault();
    } else if(email.value === "" || email.value === null) {
        alert("Please, Enter Your Email!!");
        email.focus();
        event.preventDefault();
    } else if(password.value === "" || password.value === null) {
        alert("Please, Enter PassWord!!");
        password.focus();
        event.preventDefault();
    } else if(password.value.includes(" ")) {
        alert("Password CANNOT Contain Spaces!");
        password.focus();
        event.preventDefault();
    } else if(confirmPass.value === "" || confirmPass.value === null) {
        alert("Please, Enter Confirm PassWord!!");
        confirmPass.focus();
        event.preventDefault();
    } else if(confirmPass.value !== password.value) {
        alert("PassWord and Confirm PassWord Are NOT Same!!");
        confirmPass.focus();
        event.preventDefault();
    }
});

signup.addEventListener("click", () => {
    if (submit.innerText === "Login") {
        submit.innerText = "Sign Up";
        document.querySelector(".heading h1").innerText = "Sign Up";
        document.querySelector(".signup p").innerText = "Already have an account? ";
        document.querySelector(".signup a").innerText = "Login Here";
        document.querySelector(".container").style.height = "85vh";
        document.querySelector(".container").style.width = "27vw";
        document.querySelector(".confirmpass").classList.remove("hide");
    } else {
        submit.innerText = "Login";
        document.querySelector(".heading h1").innerText = "Login";
        document.querySelector(".signup p").innerText = "Don't have an account? ";
        document.querySelector(".signup a").innerText = "Sign Up Here";
        document.querySelector(".container").style.height = "72vh";
        document.querySelector(".container").style.width = "25vw";
        document.querySelector(".confirmpass").classList.add("hide");
    }
});
