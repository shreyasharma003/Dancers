// Back to Home Button
document.getElementById("backHomeBtn").addEventListener("click", function () {
  window.location.href = "index.html";
});

// Form Submission Handler
document
  .getElementById("signupForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const userid = document.getElementById("userid").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validate password match
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // Prepare data for API
    const signupData = {
      name: name,
      email: email,
      password: password,
      role: role || "user",
    };

    try {
      // Make API call to signup endpoint
      const response = await fetch(
        "https://dancers.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Show success message
        alert("Signup complete! Redirecting to login page…");
        // Redirect to login page
        window.location.href = "login.html";
      } else {
        // Show error message from backend
        alert(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert(
        "An error occurred. Please check if the backend server is running."
      );
    }
  });
