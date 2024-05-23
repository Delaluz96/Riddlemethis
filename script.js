const questions = [
    {
        question: "I can be cracked, made, told, and played. What am I?",
        answers: {
            A: "A Secret",
            B: "A Code",
            C: "A Joke",
            D: "A Record"
        },
        correctAnswer: "C"
    },
    {
        question: "I have keys but open no locks. I have space but no room. You can enter but can't go outside. What am I?",
        answers: {
            A: "A Map",
            B: "A Piano",
            C: "A Computer Keyboard",
            D: "A Riddle"
        },
        correctAnswer: "C"
    },
    {
        question: "I can bring tears to your eyes, resurrect the dead, make you smile, and reverse time. I form in an instant but last a lifetime. What am I?",
        answers: {
            A: "A Photograph",
            B: "A Memory",
            C: "A Dream",
            D: "An Echo"
        },
        correctAnswer: "B"
    }, 
    {
        question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
        answers: {
            A: "A Map",
            B: "A Globe",
            C: "A Painting",
            D: "A Book"
        },
        correctAnswer: "A"
    },
    {
        question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
        answers: {
        A: "A Shadow",
        B: "A Echo",
        C: "A Whisper",
        D: "A Ghost"
    },
    correctAnswer: "B"
    }        
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function loadQuestion() {
    const questionContainer = document.getElementById('ques');
    const optionsContainer = document.getElementById('opt');

    questionContainer.innerHTML = questions[currentQuestion].question;
    optionsContainer.innerHTML = '';

    for (let key in questions[currentQuestion].answers) {
        optionsContainer.innerHTML += `
            <label>
                <input type="radio" name="option" value="${key}">
                ${key}: ${questions[currentQuestion].answers[key]}
            </label><br>
        `;
    }
}

function checkAns() {
    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (selectedOption) {
        const answer = selectedOption.value;
        userAnswers[currentQuestion] = answer;

        if (answer === questions[currentQuestion].correctAnswer) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    } else {
        alert("Please select an answer");
    }
}

function showResults() {
    const questionContainer = document.getElementById('ques');
    const optionsContainer = document.getElementById('opt');
    const scoreContainer = document.getElementById('score');
    const restartButton = document.getElementById('restartButton');
    const submitButton = document.getElementById('btn');

    questionContainer.innerHTML = '';
    optionsContainer.innerHTML = '';
    submitButton.style.display = 'none';
    restartButton.style.display = 'block';

    let resultsHTML = `You scored ${score} out of ${questions.length}<br><br>`;
    resultsHTML += '<h3>Review your answers:</h3><ol>';

    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index] ? userAnswers[index] : 'No answer';
        const correctAnswer = question.correctAnswer;
        const correctAnswerText = question.answers[correctAnswer];

        resultsHTML += `<li>
            ${question.question}<br>
            Your answer: ${userAnswer} - ${question.answers[userAnswer] || ''}<br>
            Correct answer: ${correctAnswer} - ${correctAnswerText}
        </li><br>`;
    });

    resultsHTML += '</ol>';
    scoreContainer.innerHTML = resultsHTML;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    loadQuestion();

    document.getElementById('score').innerHTML = '';
    document.getElementById('btn').style.display = 'block';
    document.getElementById('restartButton').style.display = 'none';
}

loadQuestion();
