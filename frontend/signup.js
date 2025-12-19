// Back to Home Button
document.getElementById("backHomeBtn").addEventListener("click", function () {
  window.location.href = "index.html";
});

// Form Submission Handler
document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Show alert message
    alert("Signup complete! Redirecting to login page…");

    // Redirect to login page
    window.location.href = "login.html";
  });
