// Select elements
let imgElement = document.querySelector(".flagmedium-img-container img");
let optionsContainer = document.querySelector(".flagmedium-options");
let timerElement = document.getElementById("current-time-left"); // Timer display

// Questions array with correct answers
const questions = [
  {
    image: "../assets/australia.png",
    options: ["New Zealand", "UK", "Australia"],
    correctAnswer: "Australia",
  },
  {
    image: "../assets/belgium.png",
    options: ["Germany", "Uganda", "Belgium"],
    correctAnswer: "Belgium",
  },
  {
    image: "../assets/israel.png",
    options: ["Russia", "Israel", "Colombia"],
    correctAnswer: "Israel",
  },
  {
    image: "../assets/spain.png",
    options: ["Colombia", "Spain", "Ghana"],
    correctAnswer: "Spain",
  },
  {
    image: "../assets/qatar.png",
    options: ["Qatar", "Japan", "Bahrain"],
    correctAnswer: "Qatar",
  },
  {
    image: "../assets/croatia.png",
    options: ["Croatia", "Russia", "Serbia"],
    correctAnswer: "Croatia",
  },
  {
    image: "../assets/south-africa.png",
    options: ["South Africa", "Uganda", "Vietnam"],
    correctAnswer: "South Africa",
  },
  {
    image: "../assets/vietnam.png",
    options: ["Bangladesh", "Vietnam", "Nepal"],
    correctAnswer: "Vietnam",
  },
  {
    image: "../assets/uruguay.png",
    options: ["Uruguay", "Argentina", "Switzerland"],
    correctAnswer: "Uruguay",
  },
  {
    image: "../assets/switzerland.png",
    options: ["Georgia", "Switzerland", "Canada"],
    correctAnswer: "Switzerland",
  },
  {
    image: "../assets/ukraine.png",
    options: ["Ukraine", "Iceland", "Poland"],
    correctAnswer: "Ukraine",
  },
  {
    image: "../assets/saudi-arabia.png",
    options: ["Egypt", "Saudi Arabia", "Bahrain"],
    correctAnswer: "Saudi Arabia",
  },
  {
    image: "../assets/uganda.png",
    options: ["Uganda", "Iceland", "Spain"],
    correctAnswer: "Uganda",
  },
  {
    image: "../assets/germany.png",
    options: ["Belgium", "Germany", "Russia"],
    correctAnswer: "Germany",
  },
  {
    image: "../assets/russia.png",
    options: ["Russia", "Iceland", "France"],
    correctAnswer: "Russia",
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
    optionDiv.className = `flagmedium-option${index + 1}`;
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
    window.location.href = "flagmediumresult.html";
  }
}

// Function to start the countdown
function startCountdown() {
  let countdownTime = 15; // Reset countdown time to 15 seconds
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
        window.location.href = "flagmediumresult.html";
      }
    }
  }, 1000);
}

// Initial question load
loadQuestion();
