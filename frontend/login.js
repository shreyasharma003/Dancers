// Back to Home Button
document.getElementById("backHomeBtn").addEventListener("click", function () {
  window.location.href = "index.html";
});

// Form Submission Handler
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Show success alert
    alert("Login successful!");

    // Redirect to home page
    window.location.href = "index.html";
  });
