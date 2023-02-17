const quiz = [
  {
    question: "What is the syntax for creating a while loop in JavaScript?",
    choices: [
      "while (i < 5)",
      "while i = 0 to 5",
      "while (i <= 5)",
      "while { i < 5 }"
    ],
    correct: 0
  },

  {
    question: "What does CSS stand for?",
    choices: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Consistent Style Sheets"
    ],
    correct: 1
  },
  {
    question: "What is the correct syntax for creating a JavaScript function?",
    choices: [
      "function myFunction()",
      "function:myFunction()",
      "var myFunction() = function",
      "myFunction = function()"
    ],
    correct: 0
  },
  {
    question: "What does the DOM stand for in relation to JavaScript?",
    choices: [
      "Document Object Model",
      "Document Oriented Method",
      "Dynamic Object Model",
      "Dynamic Oriented Method"
    ],
    correct: 0
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    choices: [
      "color",
      "font-color",
      "text-color",
      "text-colour"
    ],
    correct: 0
  },
  {
    question: "What is the syntax for creating a for loop in JavaScript?",
    choices: [
      "for (var i = 0; i < 5; i++)",
      "for (i = 0; i <= 5; i++)",
      "for i = 0 to 5",
      "for (i <= 5; i++)"
    ],
    correct: 0
  },
  {
    question: "What is the CSS selector for selecting elements with a specific class name?",
    choices: [
      ".class-name",
      "#class-name",
      ":class-name",
      "class-name"
    ],
    correct: 0
  },
  {
    question: "What is the purpose of using JavaScript in a website?",
    choices: [
      "To improve website design",
      "To validate user inputs",
      "To create dynamic user interface",
      "All of the above"
    ],
    correct: 3
  },
  {
    question: "What is the default value of position property in CSS?",
    choices: [
      "absolute",
      "relative",
      "fixed",
      "static"
    ],
    correct: 3
  },
  {
    question: "What does the var keyword do in JavaScript?",
    choices: [
      "Declares a variable",
      "Declares a constant",
      "Declares a string",
      "Declares a function"
    ],
    correct: 0
  }
];

const title = document.querySelector("#quiz-title");
const instructions = document.querySelector("#instructions");
const question = document.querySelector("#question");
const choices = document.querySelectorAll(".choice");
const choicesButton = document.querySelector("#choices");
const progress = document.querySelector("#progress");
const startQuizButton = document.querySelector("#start-quiz");
const timer = document.querySelector("#timer");
const enter = document.querySelector("#end");
const submit = document.querySelector("#log-score");
const showHigh = document.querySelector('#highscores');
const clear = document.querySelector('#clear-scores');
const back = document.querySelector('#back');
const scores = document.querySelector('#top5');
const hide = document.querySelector("#hide");
const newScore = document.createElement('li');

let currentQuestion = 0;
let score = 0;
let timeLimit = 30;
let intervalId;
let initials;
let finalscore;

startQuizButton.addEventListener("click", startQuiz);
showHigh.addEventListener('click', showHighscores);

function startQuiz() {
  startQuizButton.style.display = 'none';
  choicesButton.style.display = 'block';
  title.style.display = 'none';
  instructions.style.display = 'none';
  title.innerHTML = 'Quiz';
  timer.innerHTML = 'Time: ' + timeLimit;
  timeLimit--;
  intervalId = setInterval(countdown, 1000);
  showQuestion();
}

function countdown() {
  timer.innerHTML = 'Time: ' + timeLimit;
  timeLimit--;
  if (timeLimit < 0) {
    clearInterval(intervalId);
    timeLimit = 0;
    endQuiz();
  }
}

function showQuestion() {
  removeAllListeners();
  if (currentQuestion == quiz.length) {
    clearInterval(intervalId);
    endQuiz();
    return;
  }
  const q = quiz[currentQuestion];
  question.innerHTML = q.question;
  for (let i = 0; i < choices.length; i++) {
    choices[i].innerHTML = q.choices[i];
    choices[i].addEventListener('click', allListeners);
  }
  showProgress();
}

function allListeners() {
  let choiceSelected = this.innerText;
  let correctAnswer = quiz[currentQuestion].choices[quiz[currentQuestion].correct];
  console.log(choiceSelected);
  checkAnswer(choiceSelected, correctAnswer);
}

function removeAllListeners() {
  for (let i = 0; i < choices.length; i++) {
    choices[i].removeEventListener('click', allListeners);
  }
}

function checkAnswer(userAnswer, correctAnswer) {
  console.log(userAnswer, correctAnswer);
  if (userAnswer === correctAnswer) {
    score++;
    currentQuestion++;
    console.log('score: ' + score);
    showQuestion();
  }
  else {
    currentQuestion++;
    timeLimit = (timeLimit - 5);
    if (timeLimit < 0)
      timeLimit = 0
    showQuestion();
    countdown(timeLimit);
  }
}

function endQuiz() {
  title.style.display = 'block';
  title.innerHTML = "All Done!";
  question.innerHTML = "You scored " + score + " out of " + quiz.length;
  enter.style.display = 'block';
  submit.removeEventListener('click', saveInput)
  submit.addEventListener('click', saveInput);
  choicesButton.style.display = 'none';
  progress.style.display = "none";
}

function saveInput() {
  const inputElement = document.querySelector('input');
  const initials = inputElement.value;
  let count = 0;
  while (localStorage.getItem('userInput' + count) && localStorage.getItem('userScore' + count)) {
    count++;
  }
  const keyInput = 'userInput' + count;
  const keyScore = 'userScore' + count;
  localStorage.setItem(keyInput, initials);
  localStorage.setItem(keyScore, score);
  showHighscores();
}

function showHighscores() {
  const scores = document.querySelector('#top5');
  scores.innerHTML = ''; // clear the list
  let count = 0;
  while (localStorage.getItem('userInput' + count) && localStorage.getItem('userScore' + count)) {
    count++;
  }
  for (let i = 0; i < count; i++) {
    const keyInput = 'userInput' + i;
    const keyScore = 'userScore' + i;
    const savedInitials = localStorage.getItem(keyInput);
    const savedScore = localStorage.getItem(keyScore);
    if (savedInitials && savedScore) {
      const newScore = document.createElement('li');
      newScore.textContent = savedInitials + " - " + savedScore;
      scores.appendChild(newScore);
    }
  }
  const hide = document.querySelector("#hide");
  const enter = document.querySelector("#end");
  enter.style.display = 'none';
  hide.style.display = 'block';
  title.innerHTML = "Highscores";
  question.style.display = 'none';
  instructions.style.display = 'none';
  startQuizButton.style.display = 'none';
  for (let i = 0; i < choices.length; i++) {
    choices[i].style.display = "none";
  }
  progress.style.display = "none";
  clear.addEventListener('click', clearScore);
  back.addEventListener('click', function () {
    location.reload();
  })
}

function showProgress() {
  progress.innerHTML = "Question " + (currentQuestion + 1) + " of " + quiz.length;
}

function clearScore() {
  localStorage.clear();
  scores.innerHTML = '';
}