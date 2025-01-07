// Select elements
let imgElement = document.querySelector(".flaghard-img-container img");
let timerElement = document.getElementById("current-time-left");
let userInput = document.getElementById("user-input");
let submitAnswerBtn = document.getElementById("submit-answer-btn");

// Questions array with correct answers
const questions = [
  // {
  //   image: "../assets/australia.png",
  //   correctAnswer: "Australia",
  // },
  // {
  //   image: "../assets/belgium.png",
  //   correctAnswer: "Belgium",
  // },
  {
    image: "../assets/israel.png",
    correctAnswer: "Israel",
  },
  // {
  //   image: "../assets/spain.png",
  //   correctAnswer: "Spain",
  // },
  // {
  //   image: "../assets/qatar.png",
  //   correctAnswer: "Qatar",
  // },
  // {
  //   image: "../assets/croatia.png",
  //   correctAnswer: "Croatia",
  // },
  {
    image: "../assets/south-africa.png",
    correctAnswer: "South Africa",
  },
  // {
  //   image: "../assets/vietnam.png",
  //   correctAnswer: "Vietnam",
  // },
  {
    image: "../assets/uruguay.png",
    correctAnswer: "Uruguay",
  },
  // {
  //   image: "../assets/russia.png",
  //   correctAnswer: "Russia",
  // },
  // {
  //   image: "../assets/ukraine.png",
  //   correctAnswer: "Ukraine",
  // },
  // {
  //   image: "../assets/saudi-arabia.png",
  //   correctAnswer: "Saudi Arabia",
  // },
  // {
  //   image: "../assets/uganda.png",
  //   correctAnswer: "Uganda",
  // },
  // {
  //   image: "../assets/germany.png",
  //   correctAnswer: "Germany",
  // },
  {
    image: "../assets/switzerland.png",
    correctAnswer: "Switzerland",
  },
  {
    image: "../assets/afghanistan.png",
    correctAnswer: "Afghanistan",
  },
  // {
  //   image: "../assets/argentina.png",
  //   correctAnswer: "Argentina",
  // },
  {
    image: "../assets/austria.png",
    correctAnswer: "Austria",
  },
  {
    image: "../assets/bahrain.png",
    correctAnswer: "Bahrain",
  },
  {
    image: "../assets/barbados.png",
    correctAnswer: "Barbados",
  },
  {
    image: "../assets/bhutan.png",
    correctAnswer: "Bhutan",
  },
  {
    image: "../assets/egypt.png",
    correctAnswer: "Egypt",
  },
  {
    image: "../assets/finland.png",
    correctAnswer: "Finland",
  },
  {
    image: "../assets/france.png",
    correctAnswer: "France",
  },
  {
    image: "../assets/ghana.png",
    correctAnswer: "Ghana",
  },
  {
    image: "../assets/greece.png",
    correctAnswer: "Greece",
  },
  {
    image: "../assets/indonesia.png",
    correctAnswer: "Indonesia",
  },
  {
    image: "../assets/ireland.png",
    correctAnswer: "Ireland",
  },
  {
    image: "../assets/jamaica.png",
    correctAnswer: "Jamaica",
  },
  {
    image: "../assets/kuwait.png",
    correctAnswer: "Kuwait",
  },
  {
    image: "../assets/lebanon.png",
    correctAnswer: "Lebanon",
  },
  {
    image: "../assets/malaysia.png",
    correctAnswer: "Malaysia",
  },
  {
    image: "../assets/north-korea.png",
    correctAnswer: "North Korea",
  },
  {
    image: "../assets/norway.png",
    correctAnswer: "Norway",
  },
  {
    image: "../assets/palestine.png",
    correctAnswer: "Palestine",
  },
  {
    image: "../assets/philippines.png",
    correctAnswer: "Philippines",
  },
  {
    image: "../assets/singapore.png",
    correctAnswer: "Singapore",
  },
  {
    image: "../assets/syria.png",
    correctAnswer: "Syria",
  },
  {
    image: "../assets/turkey.png",
    correctAnswer: "Turkey",
  },
  {
    image: "../assets/uae.png",
    correctAnswer: "UAE",
  },
  {
    image: "../assets/uzbekistan.png",
    correctAnswer: "Uzbekistan",
  },
  {
    image: "../assets/yemen.png",
    correctAnswer: "Yemen",
  },
  // {
  //   image: "../assets/brazil.png",
  //   correctAnswer: "Brazil",
  // },
];

// Shuffle array utility function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Shuffle questions
shuffleArray(questions);

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

  // Clear the input field
  userInput.value = "";

  // Start the countdown timer
  startCountdown();
}

// Function to handle answer submission
function handleAnswerSubmission() {
  let currentQuestion = questions[currentQuestionIndex];
  let userAnswer = userInput.value.trim();

  // Save the user's answer
  userAnswers.push(userAnswer);

  // Check if the entered answer is correct
  if (
    currentQuestion.correctAnswer.replace(/\s+/g, "").toLowerCase() ===
    userAnswer.replace(/\s+/g, "").toLowerCase()
  ) {
    correctAnswers++;
  }

  // Stop the countdown when the answer is submitted
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
    window.location.href = "flaghardresult.html";
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
        window.location.href = "flaghardresult.html";
      }
    }
  }, 1000);
}

// Event listener for answer submission
submitAnswerBtn.addEventListener("click", handleAnswerSubmission);

// Event listener for pressing "Enter" key
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default behavior
    handleAnswerSubmission(); // Trigger the answer submission
  }
});

// Initial question load
loadQuestion();
