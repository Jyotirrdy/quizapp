const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Management Language",
      "High Text Main Language",
    ],
    answer: 0,
  },
  {
    question: "Which language runs in the browser?",
    options: ["Python", "C", "JavaScript", "Go"],
    answer: 2,
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-color", "text-style", "color", "foreground"],
    answer: 2,
  },
];

const timePerQuestion = 15;

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const quizCard = document.getElementById("quiz-card");
const resultCard = document.getElementById("result-card");
const statusText = document.getElementById("status");
const questionCount = document.getElementById("question-count");
const questionText = document.getElementById("question-text");
const answers = document.getElementById("answers");
const timerText = document.getElementById("timer");
const scoreText = document.getElementById("score");

let currentQuestion = 0;
let score = 0;
let timeLeft = timePerQuestion;
let timerId;

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  statusText.textContent = "Answer before time runs out!";
  startBtn.classList.add("hidden");
  resultCard.classList.add("hidden");
  quizCard.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timerId);
  timeLeft = timePerQuestion;
  updateTimer();

  const item = questions[currentQuestion];
  questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = item.question;
  answers.innerHTML = "";

  item.options.forEach((option, idx) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => answerQuestion(idx));
    answers.appendChild(button);
  });

  timerId = setInterval(() => {
    timeLeft -= 1;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      nextQuestion();
    }
  }, 1000);
}

function updateTimer() {
  timerText.textContent = `Time: ${timeLeft}s`;
}

function answerQuestion(selected) {
  const item = questions[currentQuestion];
  if (selected === item.answer) {
    score += 1;
  }
  nextQuestion();
}

function nextQuestion() {
  clearInterval(timerId);
  currentQuestion += 1;

  if (currentQuestion >= questions.length) {
    finishQuiz();
    return;
  }

  loadQuestion();
}

function finishQuiz() {
  quizCard.classList.add("hidden");
  resultCard.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${questions.length}.`;
  statusText.textContent = "Great job!";
  startBtn.classList.remove("hidden");
  startBtn.textContent = "Start Again";
}

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);
