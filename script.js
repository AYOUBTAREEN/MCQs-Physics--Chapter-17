// MCQs data
const questions = [
    { question: "Which of the following is not processing?", options: ["Arranging", "Manipulating", "Calculating", "Gathering"], correct: 3 },
    { question: "ICT stands for?", options: ["International Computer Technology", "Information and Communication Technology", "Information and Computer Technology", "Indian Computer Technology"], correct: 1 },
    { question: "The Computer-Based Information System (CBIS) is formed by?", options: ["4", "3", "5", "6"], correct: 0 },
    { question: "Telephone was first invented in?", options: ["1676", "1776", "1876", "1976"], correct: 2 },
    { question: "Telephone system has how many parts?", options: ["2", "4", "5", "6"], correct: 1 },
    { question: "Alexander Graham Bell in 1876 made?", options: ["Machine", "Computer", "Telephone", "Cell"], correct: 2 },
    { question: "Mouthpiece and earpiece are the parts of?", options: ["Microscope", "Telephone", "Television", "Computer"], correct: 1 },
    { question: "Radio waves are?", options: ["Longitudinal waves", "Transverse waves", "Electromagnetic waves", "All of these"], correct: 3 },
    { question: "Fax machine is also called?", options: ["Radio", "Computer", "Telefacsimile machine", "Telephone"], correct: 2 },
    { question: "How many metal rods are in a radio station transmission antenna?", options: ["8", "6", "4", "2"], correct: 2 },
    { question: "The brain of any computer system is?", options: ["Monitor", "Memory", "CPU", "Control unit"], correct: 2 },
    { question: "Which of the following is not a storage device?", options: ["Hard disc", "Flash drive", "Keyboard", "Cassettes"], correct: 2 },
    { question: "In computer terminology, the term 'machinery' refers to?", options: ["Software", "Hardware", "Data", "Procedure"], correct: 1 },
    { question: "A megabyte has how many kilobytes?", options: ["1004", "1014", "1024", "1034"], correct: 2 },
    { question: "If a CD is made of soft elastic material, then it is called?", options: ["Hard disc", "Floppy disc", "Compound disc", "Metallic disc"], correct: 1 },
    { question: "A CD can store over how much computer data?", options: ["17 Megabytes", "17 Gigabytes", "680 Gigabytes", "680 Megabytes"], correct: 3 },
    { question: "What does the term 'email' stand for?", options: ["Emergency Mail", "Electronic Mail", "Extra Male", "External Mail"], correct: 1 },
    { question: "In computer terminology, 'information' means?", options: ["Any data", "Raw data", "Processed data", "Large data"], correct: 2 },
    { question: "Which of these is not a web browser?", options: ["Chrome", "YouTube", "Mozilla Firefox", "Safari"], correct: 1 }
];

let currentQuestionIndex = 0;
let selected = false;
let correctAnswers = 0;
let timer;
let timeLeft = 20; // Time per question in seconds

// Load question
function loadQuestion() {
    clearInterval(timer);
    timeLeft = 20;

    const q = questions[currentQuestionIndex];
    document.getElementById("question").innerText = q.question;
    document.getElementById("question-count").innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    
    let optionsHtml = "";
    q.options.forEach((option, index) => {
        optionsHtml += `<button onclick="checkAnswer(${index}, this)">${option}</button>`;
    });

    document.getElementById("options").innerHTML = optionsHtml;
    document.getElementById("next-btn").disabled = true;
    selected = false;

    // Update timer display
    updateTimerDisplay();
    
    // Start timer countdown
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft === 0) {
            clearInterval(timer);
            autoMoveToNext();
        }
    }, 1000);
}

// Function to update timer display
function updateTimerDisplay() {
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
}

// Check answer and highlight
function checkAnswer(index, button) {
    if (selected) return;

    selected = true;
    clearInterval(timer);

    const correctIndex = questions[currentQuestionIndex].correct;
    const buttons = document.querySelectorAll("#options button");

    buttons[correctIndex].classList.add("correct");
    if (index !== correctIndex) {
        button.classList.add("wrong");
    } else {
        correctAnswers++;
    }

    document.getElementById("next-btn").disabled = false;
}

// Move to next question or show summary
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showSummary();
    }
}

// Automatically move to next question if time runs out
function autoMoveToNext() {
    checkAnswer(-1, null);
    setTimeout(() => {
        nextQuestion();
    }, 1000);
}

// Show summary at the end
function showSummary() {
    let totalQuestions = questions.length;
    let percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
    
    document.querySelector(".quiz-container").innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Total Questions: ${totalQuestions}</p>
        <p>Correct Answers: ${correctAnswers}</p>
        <p>Score: ${percentage}%</p>
    `;
}

// Initialize quiz
loadQuestion();
