const API_BASE_URL = "https://dancers.onrender.com";
// const API_BASE_URL = "http://127.0.0.1:5000";

async function authenticatedFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage");
    window.location.href = "login.html";
    throw new Error("No authentication token found");
  }

  console.log("Making request to:", `${API_BASE_URL}${endpoint}`);
  console.log("Token:", token ? token.substring(0, 20) + "..." : "none");

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

    console.log("Response status:", response.status);

    if (response.status === 401) {
      console.error("401 Unauthorized - token invalid or expired");
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

function isAuthenticated() {
  return localStorage.getItem("token") !== null;
}

function getCurrentUser() {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
