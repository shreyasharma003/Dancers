// Back to Home Button
document.getElementById("backHomeBtn").addEventListener("click", function () {
  window.location.href = "index.html";
});

// Form Submission Handler
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Prepare data for API
    const loginData = {
      email: email,
      password: password,
    };

    try {
      // Make API call to login endpoint
      const response = await fetch(
        "https://dancers.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store authentication token in localStorage
        localStorage.setItem("token", data.token);

        // Store user information (optional, for display purposes)
        localStorage.setItem("user", JSON.stringify(data.user));

        // Show success alert
        alert("Login successful!");

        // Redirect to dashboard
        window.location.href = "dashboard.html";
      } else {
        // Show error message from backend
        alert(data.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(
        "An error occurred. Please check if the backend server is running."
      );
    }
  });
