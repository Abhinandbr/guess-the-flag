let easyLevel = document.querySelector(".flag-option1");
let mediumLevel = document.querySelector(".flag-option2");
let hardLevel = document.querySelector(".flag-option3");

// options click event
easyLevel.addEventListener("click", function () {
  window.location.href = "pages/flageasyhome.html";
});

mediumLevel.addEventListener("click", function () {
  window.location.href = "pages/flagmedium.html";
});

hardLevel.addEventListener("click", function () {
  window.location.href = "pages/flaghard.html";
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
