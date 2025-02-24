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

document.addEventListener("DOMContentLoaded", () => {
    displayReviews();

    if(!loggedIn) {
        return;
    }

    let reviewMsg = document.querySelector(".review-msg");

    if (localStorage.getItem("reviewSubmitted") === "true") {
        document.querySelector(".rform").style.display = "none";
        document.querySelector(".add").style.display = "none";

        // if (reviewMsg) {
        //     reviewMsg.style.display = "block";
        // }
    }
});

document.getElementById("add-review-btn").addEventListener("click", () => {
    const reviewForm = document.getElementById("review-form");
    const offset = 100;

    window.scrollTo({
        top: reviewForm.offsetTop - offset,
        behavior: "smooth"
    });
});

let currentIndex = 0;

const showReview = (index) => {
    const reviews = document.querySelector(".comments-container");
    const totalReviews = document.querySelectorAll(".comment").length;
    
    if (index < 0) {
        currentIndex = totalReviews - 1;
    } else if (index >= totalReviews) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100; 
    reviews.style.transform = `translateX(${offset}%)`;
};

const prevReview = () => {
    showReview(currentIndex - 1);
};

const nextReview = () => {
    showReview(currentIndex + 1);
};

showReview(currentIndex);

document.querySelector(".submit").addEventListener("click", (event) => {
    if(!loggedIn){
        alert("Please Login first");
        return;
    }

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let review = document.getElementById("review").value.trim();
    let rating = document.querySelector("input[name='rating']:checked");
    let reviewMsg = document.querySelector(".review-msg");

    if (name === "" || review === "" || rating === null) {
        alert("Please fill all fields before submitting.");
        return;
    }

    let newReview = {
        name: name,
        review: review,
        rating: rating.value
    };

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.unshift(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    localStorage.setItem("reviewSubmitted", "true");

    displayReviews();

    document.querySelector(".rform").style.display = "none";
    document.querySelector(".add").style.display = "none";

    alert("🎉 Review submitted successfully! Thank you for your feedback. 😊");

    // if (reviewMsg) {
    //     reviewMsg.style.display = "block";
    // }

    setTimeout(() => {
        const offset = 120;
        window.scrollTo({
            top: document.querySelector(".rev").offsetTop - offset,
            behavior: "smooth"
        });
    }, 300);
});

document.querySelector(".close").addEventListener("click", (event) => {
    event.preventDefault();

    document.querySelector(".rform").style.display = "none";
    document.querySelector(".add").style.display = "none";

    setTimeout(() => {
        const offset = 120;
        window.scrollTo({
            top: document.querySelector(".rev").offsetTop - offset,
            behavior: "smooth"
        });
    }, 300);
});

const displayReviews = () => {
    let commentsContainer = document.querySelector(".comments-container");
    // commentsContainer.innerHTML = "";

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // if (reviews.length === 0) {
    //     reviews = [
    //         { name: "John Doe", review: "This is an amazing product!", rating: 5 },
    //         { name: "Alice Smith", review: "Good quality, but could be improved.", rating: 4 }
    //     ];
    //     localStorage.setItem("reviews", JSON.stringify(reviews));
    // }

    reviews.forEach(review => {
        let newReview = document.createElement("div");

        newReview.classList.add("comment");
        newReview.innerHTML = `
            <p class="name">${review.name}</p>
            <p class="star">${"🌟".repeat(review.rating)}</p>
            <p class="cmt">${review.review}</p>
        `;

        commentsContainer.prepend(newReview);
    });
}

document.addEventListener("DOMContentLoaded", displayReviews);

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
