// API Utility functions for authenticated requests

const API_BASE_URL = "http://localhost:5000/api";

/**
 * Make an authenticated API request
 * @param {string} endpoint - API endpoint (e.g., '/dancers')
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise} - Response data
 */
async function authenticatedFetch(endpoint, options = {}) {
  // Get token from localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login if no token
    window.location.href = "login.html";
    throw new Error("No authentication token found");
  }

  // Set up headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Check if token is invalid or expired
    if (response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert("Session expired. Please login again.");
      window.location.href = "login.html";
      throw new Error("Unauthorized");
    }

    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

/**
 * GET request with authentication
 */
async function apiGet(endpoint) {
  const response = await authenticatedFetch(endpoint, {
    method: "GET",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

/**
 * POST request with authentication
 */
async function apiPost(endpoint, data) {
  const response = await authenticatedFetch(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error || "Request failed");
  }

  return responseData;
}

/**
 * PUT request with authentication
 */
async function apiPut(endpoint, data) {
  const response = await authenticatedFetch(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error || "Request failed");
  }

  return responseData;
}

/**
 * DELETE request with authentication
 */
async function apiDelete(endpoint) {
  const response = await authenticatedFetch(endpoint, {
    method: "DELETE",
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error || "Request failed");
  }

  return responseData;
}

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
  return localStorage.getItem("token") !== null;
}

/**
 * Get current user from localStorage
 */
function getCurrentUser() {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * Logout - clear token and user data
 */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
