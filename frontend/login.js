// Back to Home Button
document.getElementById("backHomeBtn").addEventListener("click", function () {
  window.location.href = "index.html";
});

// Form Submission Handler
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Store authentication token
    localStorage.setItem("token", "dummy-token-12345");
    // Show success alert
    alert("Login successful!");
    // Redirect to dashboard
    window.location.href = "dashboard.html";
  });