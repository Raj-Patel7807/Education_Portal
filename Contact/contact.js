const logoutbtn = document.querySelector(".navbar .logout");

let loggedIn = localStorage.getItem("loggedIn");

if(loggedIn) {
    logoutbtn.innerText = "Logout";
    logoutbtn.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        window.location.href = "../Login/login.html";
    });
} else {
    logoutbtn.innerText = "Login";
    logoutbtn.addEventListener("click", () => {
        window.location.href = "../Login/login.html";
    });
    
    setTimeout(() => {
        alert("You Are Not Logged In, Please Login..!!");
    }, 6000);
}

const validateForm = () => {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let msg = document.getElementById("msg").value.trim();

    let nameRegex = /^[A-Za-z\s]+$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phoneRegex = /^[0-9]{10}$/;

    if (name === "") {
        alert("Name field cannot be empty.");
        document.getElementById("name").focus();
        return false;
    }
    if (!nameRegex.test(name)) {
        alert("Name can only contain alphabets and spaces.");
        document.getElementById("name").focus();
        return false;
    }

    if (email === "") {
        alert("Email field cannot be empty.");
        document.getElementById("email").focus();
        return false;
    }
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        document.getElementById("email").focus();
        return false;
    }

    if (phone === "") {
        alert("Phone number cannot be empty.");
        document.getElementById("phone").focus();
        return false;
    }
    if(isNaN(phone)) {
        alert("Phone number can only contain digits.");
        document.getElementById("phone").focus();
        return false;
    }
    if (!phoneRegex.test(phone)) {
        alert("Phone number must be exactly 10 digits.");
        document.getElementById("phone").focus();
        return false;
    }

    if (msg === "") {
        alert("Message field cannot be empty.");
        document.getElementById("msg").focus();
        return false;
    }

    return true;
}

document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();

    validateForm();

    if (validateForm()) {
        alert("Form submitted successfully! We Contact You Soon..!!");

        setTimeout(() => {
            window.location.reload();
        }, 200);
    }    
});

let defaultMsgTimeout;

const courses = {
    'java': 'The Java course costs ₹969 and takes 3 months. Do you want to continue?',
    'c++': 'The C++ course costs ₹999++ and takes 4 months. Jindagi badal jayegi Do you want to continue ?',
    'python': 'The Python course costs ₹777 and takes 3 months.',
    'react-js': 'The React-Js course costs ₹199 and takes 3 months.',
    'trading': 'The Trading course costs ₹420 and takes 3 months.',
    'calculus': 'The Calculus course is absolutely free and takes 3 months.',
    'dsa': 'The DSA course costs ₹700 and takes 3 months. Do you want to continue?',
    'cyber-security': 'The Cyber-security course is absolutely free and takes 4 months.',
    'electronics': 'The Electronics course costs ₹299 and takes 3 months.',
    'upsc': 'The UPSC course costs ₹1999 and takes 3 months.',
    'quantum-computing': 'The Quantum-computing course costs ₹1000 and takes 3 months.',
    'history': 'The History course is absolutely free and takes 3 months.'
};

const openChat = () => {
    document.getElementById('chatIcon').style.display = 'none';
    document.getElementById('chatContainer').style.display = 'block';

    setTimeout(sendDefaultMessage, 500);
};

const closeChat = () => {
    document.getElementById('chatContainer').style.display = 'none';
    document.getElementById('chatIcon').style.display = 'flex';

    document.getElementById('chatBody').innerHTML = "";

    clearTimeout(defaultMsgTimeout);
};

const sendDefaultMessage = () => {
    let chatBody = document.getElementById('chatBody');

    chatBody.innerHTML += `<p>🤖 Hello!
                            <br/>
                            I can Help you with Course Information.
                            <br/>
                            Which Course Are You interested in..?
                            <br/>
                            Here are the Available Courses:
                            <br/>
                            - Java
                            - C++
                            - Python
                            - React-JS
                            - Trading
                            - Calculus
                            - DSA
                            - Cyber-Security
                            - Electronics
                            - UPSC
                            - Quantum Computing
                            - History
                            </p>
                            <br/>`;

    chatBody.scrollTop = chatBody.scrollHeight;

};

const sendMessage = () => {
    let input = document.getElementById('chatInput').value.trim();

    if (input === '') return;
    
    let chatBody = document.getElementById('chatBody');

    chatBody.innerHTML += `<p style="color: green;">
                            ${input}
                            </p> <br/>`;

    document.getElementById('chatInput').value = '';

    chatBody.scrollTop = chatBody.scrollHeight;
    
    setTimeout(() => {
        let botReply = courses[input.toLowerCase()] || `Sorry!
                            <br/>
                            I couldn't Find That Course.
                            <br/>
                            Please Choose from the Available Courses:
                            <br/>
                            - Java
                            - C++
                            - Python
                            - React-JS
                            - Trading
                            - Calculus
                            - DSA
                            - Cyber-Security
                            - Electronics
                            - UPSC
                            - Quantum Computing
                            - History
                            `;

        chatBody.innerHTML += `<p>🤖 ${botReply}</p> <br/>`;
        chatBody.scrollTop = chatBody.scrollHeight;
        
        if (courses[input.toLowerCase()]) {
            addYesNoButtons();
        }

    }, 1000);
};

const addYesNoButtons = () => {
    let chatBody = document.getElementById('chatBody');

    chatBody.innerHTML += `
        <div class="buttons">
            <button class="btn yes" onclick="respond('Yes')">Yes</button>
            <button class="btn no" onclick="respond('No')">No</button>
        </div>
    `;

    chatBody.scrollTop = chatBody.scrollHeight;
};

const respond = (answer) => {
    let chatBody = document.getElementById('chatBody');

    chatBody.innerHTML += `<p style="color: blue;">${answer}</p>`;
    chatBody.scrollTop = chatBody.scrollHeight;
    
    setTimeout(() => {
        if (answer === 'Yes') {
            chatBody.innerHTML += `<br/>
                                    <p>
                                    🤖 You can contact us at +91 9434783930. Thank you! 😊
                                    </p>
                                    <br/>`;
        } else {
            chatBody.innerHTML += `<br/>
                                    <p>
                                    🤖 Okay, let us know if you need more information! 👍
                                    </p>
                                    <br/>`;
        }

        chatBody.scrollTop = chatBody.scrollHeight;

    }, 1000);

    defaultMsgTimeout = setTimeout(sendDefaultMessage, 5000);
};

document.querySelector("#chatIcon").addEventListener("click", openChat);

document.querySelector("#close-bot").addEventListener("click", closeChat);

document.querySelector("#send-bot").addEventListener("click", sendMessage);

document.querySelector("#chatInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});
