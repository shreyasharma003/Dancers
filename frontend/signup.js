document.getElementById("backHomeBtn").addEventListener("click", function () {
  window.location.href = "index.html";
});

document
  .getElementById("signupForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const userid = document.getElementById("userid").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const signupData = {
      name: name,
      email: email,
      password: password,
      role: role || "user",
    };

    try {
      const response = await fetch(
        "https://dancers.onrender.com/api/auth/signup",
        // "http://127.0.0.1:5000/api/auth/signup",
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
        alert("Signup complete! Redirecting to login page…");
        window.location.href = "login.html";
      } else {
        alert(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert(
        "An error occurred. Please check if the backend server is running."
      );
    }
  });
