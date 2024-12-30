let easyLevel = document.querySelector(".flag-option1");
let mediumLevel = document.querySelector(".flag-option2");
let hardLevel = document.querySelector(".flag-option3");

// options click event
easyLevel.addEventListener("click", function () {
  window.location.href = "pages/flageasyhome.html";
});

mediumLevel.addEventListener("click", function () {
  window.location.href = "pages/flagmediumhome.html";
});

hardLevel.addEventListener("click", function () {
  window.location.href = "pages/flaghardhome.html";
});

// opening sidebar
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

// closing sidebar
function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

// until the release
let popUpMsg = document.querySelector(".popUpMsg");
let flagOption4 = document.querySelector(".flag-option4");

flagOption4.onclick = () => {
  popUpMsg.classList.add("show");
  setTimeout(() => {
    popUpMsg.classList.remove("show");
  }, 2000);
};
