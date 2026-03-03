const quizData = [
  {
    question: "What is the smallest country in the world?",
    options: [
      "Vatican City",
      "Greenland",
      "Monaco"
    ],
    answer: 0
  },
  {
    question: "Who led the American Revolution?",
    options: ["Abraham Lincoln", "George Washington", "Alexander Hamilton"],
    answer: 1
  },
  {
    question: "According to the five kingdom classifications, what kingdom do humans belong to?",
    options: ["Kingdom Protista","Kingdom of Enchancia", "Kingdom Animalia"],
    answer: 2
  }
];

// STATE
let current = 0;
let score = 0;
let time = 20;
let timerId;

// ELEMENTS
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");
const restartBtn = document.getElementById("restart");

// LOAD QUESTION
function loadQuestion() {
  clearInterval(timerId);
  time = 15;

  const q = quizData[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;

    btn.addEventListener("click", () => handleAnswer(index));
    optionsEl.appendChild(btn);
  });

  updateProgress();
  startTimer();
}

// HANDLE ANSWER
function handleAnswer(selected) {
  if (selected === quizData[current].answer) {
    score++;
  }
  nextQuestion();
}

// TIMER
function startTimer() {
  timerEl.textContent = `⏱ ${time}s`;

  timerId = setInterval(() => {
    time--;
    timerEl.textContent = `⏱ ${time}s`;

    if (time === 0) {
      nextQuestion();
    }
  }, 1000);
}

// NEXT QUESTION
function nextQuestion() {
  clearInterval(timerId);
  current++;

  if (current < quizData.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

// PROGRESS
function updateProgress() {
  progressEl.textContent = `Question ${current + 1} of ${quizData.length}`;
}

// END QUIZ
function endQuiz() {
  questionEl.textContent = `You scored ${score} / ${quizData.length} 🎉`;
  optionsEl.innerHTML = "";
  progressEl.textContent = "";
  timerEl.textContent = "";
  restartBtn.hidden = false;
}

// RESTART
restartBtn.addEventListener("click", () => {
  current = 0;
  score = 0;
  restartBtn.hidden = true;
  loadQuestion();
});

// INIT
loadQuestion();