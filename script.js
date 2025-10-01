const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false }
        ]
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Leo Tolstoy", correct: false },
            { text: "Mark Twain", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Arctic Ocean", correct: false }
        ]
    },
    {
        question: "Which gas do plants absorb during photosynthesis?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Nitrogen", correct: false },
            { text: "Helium", correct: false }
        ]
    },
    {
        question: "In which year did World War II end?",
        answers: [
            { text: "1945", correct: true },
            { text: "1939", correct: false },
            { text: "1918", correct: false },
            { text: "1950", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "H2O", correct: true },
            { text: "O2", correct: false },
            { text: "CO2", correct: false },
            { text: "NaCl", correct: false }
        ]
    },
    {
        question: "Which is the smallest prime number?",
        answers: [
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false },
            { text: "5", correct: false }
        ]
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Seoul", correct: false },
            { text: "Beijing", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Bangkok", correct: false }
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Pablo Picasso", correct: false },
            { text: "Claude Monet", correct: false }
        ]
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: [
            { text: "India", correct: false },
            { text: "China", correct: false },
            { text: "Japan", correct: true },
            { text: "Thailand", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const darkModeToggle = document.getElementById("darkModeToggle");
const progressFill = document.getElementById("progressFill");

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Dark mode functionality
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const icon = darkModeToggle.querySelector("i");
    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
    showQuestion();
}

function showQuestion() {
    resetState();
    answered = false;
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Update progress bar
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressFill.style.width = progress + "%";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer, button));
        answerButton.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButton.innerHTML = "";
}

function selectAnswer(answer, button) {
    if (answered) return;
    answered = true;

    const buttons = answerButton.querySelectorAll(".btn");

    if (answer.correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("incorrect");
        // Show correct answer
        buttons.forEach(btn => {
            const btnText = btn.innerHTML;
            const correctAnswer = questions[currentQuestionIndex].answers.find(a => a.correct);
            if (btnText === correctAnswer.text) {
                btn.classList.add("correct");
            }
        });
    }

    buttons.forEach(btn => btn.disabled = true);
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    progressFill.style.width = "100%";

    const percentage = Math.round((score / questions.length) * 100);
    let icon = '<i class="fas fa-smile"></i>';
    let iconColor = "#667eea";
    let message = "Good job!";

    if (percentage === 100) {
        icon = '<i class="fas fa-trophy"></i>';
        iconColor = "#ffd700";
        message = "Perfect Score!";
    } else if (percentage >= 80) {
        icon = '<i class="fas fa-star"></i>';
        iconColor = "#ff6b6b";
        message = "Excellent!";
    } else if (percentage >= 60) {
        icon = '<i class="fas fa-thumbs-up"></i>';
        iconColor = "#4caf50";
        message = "Well done!";
    } else if (percentage >= 40) {
        icon = '<i class="fas fa-book"></i>';
        iconColor = "#2196f3";
        message = "Keep practicing!";
    } else {
        icon = '<i class="fas fa-dumbbell"></i>';
        iconColor = "#ff9800";
        message = "Don't give up!";
    }

    questionElement.innerHTML = `
                <div class="score-container">
                    <div class="score-icon" style="color: ${iconColor}">${icon}</div>
                    <div class="score-text">${message}</div>
                    <div class="score-percentage">${percentage}%</div>
                    <div class="score-text">You scored ${score} out of ${questions.length}</div>
                </div>
            `;

    nextButton.innerHTML = 'Play Again <i class="fas fa-redo"></i>';
    nextButton.style.display = "block";
    nextButton.onclick = startQuiz;
}

startQuiz();