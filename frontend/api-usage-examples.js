// Example: Using Authenticated API Calls in Dashboard

// Import the api.js file in your HTML before dashboard.js:
// <script src="api.js"></script>
// <script src="dashboard.js"></script>

// ============================================
// Example 1: Fetch all dancers with authentication
// ============================================
async function fetchAllDancers() {
  try {
    const dancers = await apiGet("/dancers");
    console.log("Dancers:", dancers);
    return dancers;
  } catch (error) {
    console.error("Failed to fetch dancers:", error);
  }
}

// ============================================
// Example 2: Search for a dancer
// ============================================
async function searchDancer(searchParam) {
  try {
    const result = await apiGet(`/dancers/search/${searchParam}`);
    console.log("Search result:", result);
    return result;
  } catch (error) {
    console.error("Search failed:", error);
  }
}

// ============================================
// Example 3: Get dancers by style
// ============================================
async function getDancersByStyle(styleId) {
  try {
    const dancers = await apiGet(`/dancers/style/${styleId}`);
    console.log("Dancers by style:", dancers);
    return dancers;
  } catch (error) {
    console.error("Failed to fetch dancers by style:", error);
  }
}

// ============================================
// Example 4: Add a new dancer
// ============================================
async function addNewDancer(dancerData) {
  try {
    const newDancer = await apiPost("/dancers", dancerData);
    console.log("New dancer added:", newDancer);
    return newDancer;
  } catch (error) {
    console.error("Failed to add dancer:", error);
  }
}

// Example usage:
// addNewDancer({
//   name: "John Doe",
//   email: "john@example.com",
//   joining_date: "2024-01-01",
//   salary: 50000,
//   style_id: 1
// });

// ============================================
// Example 5: Update a dancer
// ============================================
async function updateDancer(dancerId, dancerData) {
  try {
    const updatedDancer = await apiPut(`/dancers/${dancerId}`, dancerData);
    console.log("Dancer updated:", updatedDancer);
    return updatedDancer;
  } catch (error) {
    console.error("Failed to update dancer:", error);
  }
}

// ============================================
// Example 6: Delete a dancer
// ============================================
async function deleteDancer(dancerId) {
  try {
    const result = await apiDelete(`/dancers/${dancerId}`);
    console.log("Dancer deleted:", result);
    return result;
  } catch (error) {
    console.error("Failed to delete dancer:", error);
  }
}

// ============================================
// Example 7: Get user profile (protected route)
// ============================================
async function getUserProfile() {
  try {
    const profile = await apiGet("/auth/profile");
    console.log("User profile:", profile);
    return profile;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
  }
}

// ============================================
// Check authentication status
// ============================================
if (isAuthenticated()) {
  console.log("User is logged in");
  const currentUser = getCurrentUser();
  console.log("Current user:", currentUser);
} else {
  console.log("User is not logged in");
}

// ============================================
// Using in event handlers
// ============================================
document
  .getElementById("addDancerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("dancerName").value,
      email: document.getElementById("dancerEmail").value,
      joining_date: document.getElementById("joiningDate").value,
      salary: parseFloat(document.getElementById("salary").value),
      style_id: parseInt(document.getElementById("styleId").value),
    };

    try {
      const result = await apiPost("/dancers", formData);
      alert("Dancer added successfully!");
      // Refresh the dancers list
      await fetchAllDancers();
    } catch (error) {
      alert("Failed to add dancer");
    }
  });
