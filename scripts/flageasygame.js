// Select elements
let imgElement = document.querySelector(".flageasy-img-container img");
let optionsContainer = document.querySelector(".flageasy-options");
let timerElement = document.getElementById("current-time-left"); // Timer display

// Questions array with correct answers
const questions = [
  {
    image: "../assets/usa.png",
    options: ["USA", "China", "Japan"],
    correctAnswer: "USA",
  },
  {
    image: "../assets/sweden.png",
    options: ["Canada", "Sweden", "Australia"],
    correctAnswer: "Sweden",
  },
  {
    image: "../assets/china.png",
    options: ["China", "India", "Germany"],
    correctAnswer: "China",
  },
  {
    image: "../assets/canada.png",
    options: ["UK", "India", "Canada"],
    correctAnswer: "Canada",
  },
  {
    image: "../assets/japan.png",
    options: ["USA", "Japan", "Germany"],
    correctAnswer: "Japan",
  },
  {
    image: "../assets/india.png",
    options: ["Japan", "India", "Germany"],
    correctAnswer: "India",
  },
  {
    image: "../assets/south-korea.png",
    options: ["South Korea", "Australia", "China"],
    correctAnswer: "South Korea",
  },
  {
    image: "../assets/bangladesh.png",
    options: ["Bangladesh", "UK", "Nepal"],
    correctAnswer: "Bangladesh",
  },
  {
    image: "../assets/pakistan.png",
    options: ["Canada", "Pakistan", "Germany"],
    correctAnswer: "Pakistan",
  },
  {
    image: "../assets/uk.png",
    options: ["UK", "Iceland", "Canada"],
    correctAnswer: "UK",
  },
];

// Shuffle array utility function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Shuffle questions and options
shuffleArray(questions);
questions.forEach((question) => {
  question.options = shuffleArray(question.options);
});

// Track the current question index, correct answers, and user answers
let currentQuestionIndex = 0;
let correctAnswers = 0;
let userAnswers = [];
let timerInterval;

// Function to load the current question
function loadQuestion() {
  // Get the current question from the array
  let currentQuestion = questions[currentQuestionIndex];

  // Update the image source
  imgElement.src = currentQuestion.image;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Populate new options
  currentQuestion.options.forEach((option, index) => {
    let optionDiv = document.createElement("div");
    optionDiv.className = `flageasy-option${index + 1}`;
    optionDiv.innerHTML = `<span>${option}</span>`;
    optionDiv.addEventListener("click", () => handleOptionClick(option));
    optionsContainer.appendChild(optionDiv);
  });

  // Start the countdown timer
  startCountdown();
}

// Function to handle option clicks
function handleOptionClick(selectedOption) {
  let currentQuestion = questions[currentQuestionIndex];

  // Save the user's answer
  userAnswers.push(selectedOption);

  // Check if the selected option is correct
  if (selectedOption === currentQuestion.correctAnswer) {
    correctAnswers++;
  }

  // Stop the countdown when an option is selected
  clearInterval(timerInterval);

  // Move to the next question if available
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    // Save results in localStorage
    localStorage.setItem("questions", JSON.stringify(questions));
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    localStorage.setItem("correctAnswers", correctAnswers);
    localStorage.setItem("totalQuestions", questions.length);

    // Redirect to the result page
    window.location.href = "flageasyresult.html";
  }
}

// Function to start the countdown
function startCountdown() {
  let countdownTime = 30; // Reset countdown time to 30 seconds
  timerElement.textContent = countdownTime; // Display the initial countdown time

  // Update the countdown every second
  timerInterval = setInterval(() => {
    countdownTime--;
    timerElement.textContent = countdownTime;

    // When the timer reaches 0, automatically move to the next question
    if (countdownTime === 0) {
      clearInterval(timerInterval); // Clear the interval
      userAnswers.push(""); // Record an empty answer for timeout
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        loadQuestion();
      } else {
        // Save results in localStorage
        localStorage.setItem("questions", JSON.stringify(questions));
        localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
        localStorage.setItem("correctAnswers", correctAnswers);
        localStorage.setItem("totalQuestions", questions.length);

        // Redirect to the result page
        window.location.href = "flageasyresult.html";
      }
    }
  }, 1000);
}

// Initial question load
loadQuestion();
