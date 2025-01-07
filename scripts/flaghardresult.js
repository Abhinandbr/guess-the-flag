// Select elements
let performanceHeading = document.getElementById(
  "flaghard-performance-heading"
);
let resultText = document.getElementById("flaghard-result-text");
let restartButton = document.getElementById("flaghard-restart-btn");
let answerContainer = document.querySelector(".flaghard-result");
let linkToHome = document.getElementById("link-to-home");

// Retrieve data from localStorage
let questions = JSON.parse(localStorage.getItem("questions")) || [];
let userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
let correctAnswers = localStorage.getItem("correctAnswers") || 0;
let totalQuestions = localStorage.getItem("totalQuestions") || questions.length;

// Set performance heading and result text
performanceHeading.textContent = `Your Score: ${correctAnswers} / ${totalQuestions}`;
resultText.textContent = `You answered ${correctAnswers} questions correctly out of ${totalQuestions}.`;

// Populate the answer containers
questions.forEach((question, index) => {
  let isCorrect =
    question.correctAnswer.replace(/\s+/g, "").toLowerCase() ===
    (userAnswers[index] || "").replace(/\s+/g, "").toLowerCase();

  // Create a divider
  let divider = document.createElement("div");
  divider.className = "result-divider";

  // Create the answer container
  let answerDiv = document.createElement("div");
  answerDiv.className = "answer-container";

  // Question number
  let questionHeader = document.createElement("h2");
  questionHeader.textContent = `Question ${index + 1}:`;

  // Correct answer text (with optional incorrect answer inline)
  let answerTextDiv = document.createElement("div");
  answerTextDiv.className = "answer-text-container";
  let correctAnswerText = document.createElement("p");

  if (!isCorrect && userAnswers[index]) {
    // Add user's incorrect answer with strikethrough and red color
    correctAnswerText.innerHTML = `
            <span style="text-decoration: line-through; color: red; font-size: 23px;font-weight: 700;">${userAnswers[index]}</span> (Correct answer: 
            <span style="color: #009400; font-size: 23px;font-weight: 700;">${question.correctAnswer})</span>
          `;
  } else {
    // Show only the correct answer in green
    correctAnswerText.innerHTML = `Correct answer: <span style="color: #009400; font-size: 23px;font-weight: 700;">${question.correctAnswer}</span>`;
  }
  answerTextDiv.appendChild(correctAnswerText);

  // Flag image
  let flagContainer = document.createElement("div");
  flagContainer.className = "answerflag-container";
  let flagImage = document.createElement("img");
  flagImage.src = question.image;
  flagImage.alt = `${question.correctAnswer} flag`;
  flagContainer.appendChild(flagImage);

  // Append elements to the answer container
  answerDiv.appendChild(questionHeader);
  answerDiv.appendChild(answerTextDiv);
  answerDiv.appendChild(flagContainer);

  // Append the answer container and divider to the result section
  answerContainer.appendChild(answerDiv);
  answerContainer.appendChild(divider);
});

// Restart button functionality
restartButton.addEventListener("click", () => {
  // Clear localStorage and redirect to the game page
  localStorage.removeItem("questions");
  localStorage.removeItem("userAnswers");
  localStorage.removeItem("correctAnswers");
  localStorage.removeItem("totalQuestions");
  window.location.href = "../pages/flaghardgame.html"; // Redirect to the game page
});

// Try different levels
linkToHome.addEventListener("click", () => {
  window.location.href = "../index.html";
});
