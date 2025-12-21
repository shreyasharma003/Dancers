// Data storage
let danceStyles = [];
let currentDancers = [];

// Navigation state
let currentView = "styles"; // styles, dancers, detail
let currentStyleId = null;
let currentStyleName = null;
let currentDancer = null;

// DOM Elements
const backBtn = document.getElementById("backBtn");
const logoutBtn = document.getElementById("logoutBtn");
const pageTitle = document.getElementById("pageTitle");
const stylesView = document.getElementById("stylesView");
const dancersView = document.getElementById("dancersView");
const dancerDetailView = document.getElementById("dancerDetailView");
const stylesGrid = document.getElementById("stylesGrid");
const dancersGrid = document.getElementById("dancersGrid");
const dancerDetailCard = document.getElementById("dancerDetailCard");
const searchInput = document.getElementById("searchInput");
const addDancerBtn = document.getElementById("addDancerBtn");
const editModal = document.getElementById("editModal");
const addModal = document.getElementById("addModal");
const closeEditModal = document.getElementById("closeEditModal");
const closeAddModal = document.getElementById("closeAddModal");
const cancelEdit = document.getElementById("cancelEdit");
const cancelAdd = document.getElementById("cancelAdd");
const editDancerForm = document.getElementById("editDancerForm");
const addDancerForm = document.getElementById("addDancerForm");

// Initialize dashboard
async function init() {
  checkAuth();
  setupEventListeners();
  await loadDanceStyles();
}

// Check if user is authenticated
function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }
}

// Setup event listeners
function setupEventListeners() {
  backBtn.addEventListener("click", handleBack);
  logoutBtn.addEventListener("click", handleLogout);
  searchInput.addEventListener("input", handleSearch);
  addDancerBtn.addEventListener("click", openAddModal);
  closeEditModal.addEventListener("click", closeEditModalFn);
  closeAddModal.addEventListener("click", closeAddModalFn);
  cancelEdit.addEventListener("click", closeEditModalFn);
  cancelAdd.addEventListener("click", closeAddModalFn);
  editDancerForm.addEventListener("submit", handleEditSubmit);
  addDancerForm.addEventListener("submit", handleAddSubmit);
}

// ============================================
// API INTEGRATION - Dance Styles
// ============================================

// Load dance styles from backend
async function loadDanceStyles() {
  try {
    danceStyles = await apiGet("/dance-styles");

    // Get dancer count for each style
    for (let style of danceStyles) {
      // Skip if style_id is missing or invalid
      if (!style.style_id) {
        console.warn("Style missing style_id:", style);
        style.dancerCount = 0;
        continue;
      }

      try {
        const dancers = await apiGet(`/dance-styles/${style.style_id}/dancers`);
        style.dancerCount = dancers.length;
      } catch (error) {
        console.error(
          `Failed to load dancers for style ${style.style_id}:`,
          error
        );
        style.dancerCount = 0;
      }
    }

    renderStyles();
  } catch (error) {
    console.error("Failed to load dance styles:", error);
    alert("Failed to load dance styles. Please try again.");
  }
}

// Render dance styles
function renderStyles() {
  stylesGrid.innerHTML = "";

  if (danceStyles.length === 0) {
    stylesGrid.innerHTML =
      '<div class="no-results">No dance styles available.</div>';
    return;
  }

  danceStyles.forEach((style) => {
    const styleCard = createStyleCard(style);
    stylesGrid.appendChild(styleCard);
  });
}

// Create style card
function createStyleCard(style) {
  const card = document.createElement("div");
  card.className = "style-card";

  // Icon mapping
  const iconMap = {
    "Hip Hop": "🎤",
    Ballet: "🩰",
    Contemporary: "💃",
    Jazz: "🎷",
    Salsa: "🔥",
    Breakdance: "🕺",
  };
  const icon = iconMap[style.style_name] || "💃";

  card.innerHTML = `
    <div class="style-card-icon">${icon}</div>
    <h3 class="style-card-name">${style.style_name}</h3>
    <p class="style-card-count">${style.dancerCount || 0} Dancers</p>
  `;

  card.addEventListener("click", () =>
    showDancers(style.style_id, style.style_name)
  );

  return card;
}

// ============================================
// API INTEGRATION - Dancers
// ============================================

// Show dancers for a specific style
async function showDancers(styleId, styleName) {
  currentStyleId = styleId;
  currentStyleName = styleName;
  currentView = "dancers";

  // Update UI
  pageTitle.textContent = styleName;
  backBtn.style.display = "flex";

  // Hide styles view, show dancers view
  stylesView.style.display = "none";
  dancersView.style.display = "block";
  dancerDetailView.style.display = "none";

  // Clear search
  searchInput.value = "";

  // Load and render dancers
  await loadDancers(styleId);
}

// Load dancers from backend
async function loadDancers(styleId) {
  try {
    currentDancers = await apiGet(`/dance-styles/${styleId}/dancers`);
    renderDancers();
  } catch (error) {
    console.error("Failed to load dancers:", error);
    currentDancers = [];
    renderDancers();
  }
}

// Render dancers for a style
function renderDancers() {
  dancersGrid.innerHTML = "";

  if (currentDancers.length === 0) {
    dancersGrid.innerHTML =
      '<div class="no-results">No dancers found for this style.</div>';
    return;
  }

  currentDancers.forEach((dancer) => {
    const dancerCard = createDancerCard(dancer);
    dancersGrid.appendChild(dancerCard);
  });
}

// Create dancer card
function createDancerCard(dancer) {
  const card = document.createElement("div");
  card.className = "dancer-card";

  const initials = dancer.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  card.innerHTML = `
    <div class="dancer-card-header">
      <div class="dancer-avatar">${initials}</div>
      <div class="dancer-info">
        <h3 class="dancer-name">${dancer.name}</h3>
        <p class="dancer-meta">${dancer.email}</p>
      </div>
    </div>
    <div class="dancer-card-footer">
      <div class="dancer-stat">
        <div class="dancer-stat-value">ID: ${dancer.id}</div>
        <div class="dancer-stat-label">Dancer ID</div>
      </div>
      <div class="dancer-stat">
        <div class="dancer-stat-value">${
          dancer.style_name || currentStyleName
        }</div>
        <div class="dancer-stat-label">Style</div>
      </div>
    </div>
    <div class="dancer-card-actions">
      <button class="btn-edit" data-id="${dancer.id}" title="Edit Dancer">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M11.3 1.7a2 2 0 0 1 2.8 2.8L5 13.6l-3.8.8.8-3.8L11.3 1.7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Edit
      </button>
      <button class="btn-delete" data-id="${dancer.id}" title="Delete Dancer">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4h12M5.3 4V2.7A1.3 1.3 0 0 1 6.7 1.3h2.6A1.3 1.3 0 0 1 10.7 2.7V4m2 0v9.3A1.3 1.3 0 0 1 11.3 14.7H4.7A1.3 1.3 0 0 1 3.3 13.3V4h9.4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Delete
      </button>
    </div>
  `;

  // Add click handler to card (but not on buttons)
  card.addEventListener("click", (e) => {
    if (!e.target.closest(".dancer-card-actions")) {
      showDancerDetail(dancer);
    }
  });

  // Add event listeners to buttons
  const editBtn = card.querySelector(".btn-edit");
  const deleteBtn = card.querySelector(".btn-delete");

  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openEditModal(dancer);
  });

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteDancer(dancer.id);
  });

  return card;
}

// Show dancer detail
function showDancerDetail(dancer) {
  currentDancer = dancer;
  currentView = "detail";

  // Update UI
  pageTitle.textContent = "Dancer Profile";
  backBtn.style.display = "flex";

  // Hide dancers view, show detail view
  stylesView.style.display = "none";
  dancersView.style.display = "none";
  dancerDetailView.style.display = "block";

  // Render detail
  renderDancerDetail(dancer);
}

// Render dancer detail
function renderDancerDetail(dancer) {
  const initials = dancer.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  dancerDetailCard.innerHTML = `
    <div class="dancer-detail-header">
      <div class="dancer-detail-avatar">${initials}</div>
      <h2 class="dancer-detail-name">${dancer.name}</h2>
      <p class="dancer-detail-style">${
        dancer.style_name || currentStyleName
      } Dancer</p>
    </div>
    
    <div class="dancer-detail-stats">
      <div class="detail-stat-box">
        <div class="detail-stat-value">${dancer.id}</div>
        <div class="detail-stat-label">ID</div>
      </div>
      <div class="detail-stat-box">
        <div class="detail-stat-value">${dancer.style_id}</div>
        <div class="detail-stat-label">Style ID</div>
      </div>
      <div class="detail-stat-box">
        <div class="detail-stat-value">$${parseFloat(
          dancer.salary
        ).toLocaleString()}</div>
        <div class="detail-stat-label">Salary</div>
      </div>
      <div class="detail-stat-box">
        <div class="detail-stat-value">${new Date(
          dancer.joining_date
        ).toLocaleDateString()}</div>
        <div class="detail-stat-label">Joining Date</div>
      </div>
    </div>
    
    <div class="dancer-detail-section">
      <h3 class="detail-section-title">Contact Information</h3>
      <p class="detail-section-content"><strong>Email:</strong> ${
        dancer.email
      }</p>
    </div>
    
    <div class="dancer-detail-section">
      <h3 class="detail-section-title">Additional Details</h3>
      <p class="detail-section-content"><strong>Name:</strong> ${
        dancer.name
      }<br>
      <strong>Dance Style:</strong> ${dancer.style_name || currentStyleName}</p>
    </div>
  `;
}

// ============================================
// Navigation
// ============================================

// Handle back navigation
function handleBack() {
  if (currentView === "detail") {
    // Go back to dancers list
    showDancers(currentStyleId, currentStyleName);
  } else if (currentView === "dancers") {
    // Go back to styles
    showStyles();
  }
}

// Show styles view
function showStyles() {
  currentView = "styles";
  currentStyleId = null;
  currentStyleName = null;
  currentDancer = null;

  // Update UI
  pageTitle.textContent = "Dance Styles";
  backBtn.style.display = "none";

  // Show styles view, hide others
  stylesView.style.display = "block";
  dancersView.style.display = "none";
  dancerDetailView.style.display = "none";
}

// Handle logout
function handleLogout() {
  // Use the logout function from api.js
  logout();
}

// ============================================
// Search
// ============================================

// Search dancers
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();

  dancersGrid.innerHTML = "";

  const filteredDancers = currentDancers.filter(
    (dancer) =>
      dancer.name.toLowerCase().includes(searchTerm) ||
      dancer.email.toLowerCase().includes(searchTerm)
  );

  if (filteredDancers.length === 0) {
    dancersGrid.innerHTML =
      '<div class="no-results">No dancers found matching your search.</div>';
  } else {
    filteredDancers.forEach((dancer) => {
      const dancerCard = createDancerCard(dancer);
      dancersGrid.appendChild(dancerCard);
    });
  }
}

// ============================================
// Edit Dancer
// ============================================

// Open edit modal
function openEditModal(dancer) {
  document.getElementById("editDancerId").value = dancer.id;
  document.getElementById("editDancerIdDisplay").value = dancer.id;
  document.getElementById("editName").value = dancer.name;
  document.getElementById("editEmail").value = dancer.email;
  document.getElementById("editJoiningDate").value = dancer.joining_date;
  document.getElementById("editSalary").value = dancer.salary;
  editModal.style.display = "flex";
}

// Close edit modal
function closeEditModalFn() {
  editModal.style.display = "none";
  editDancerForm.reset();
}

// Handle edit submit
async function handleEditSubmit(e) {
  e.preventDefault();

  const id = parseInt(document.getElementById("editDancerId").value);
  const name = document.getElementById("editName").value;
  const email = document.getElementById("editEmail").value;
  const joining_date = document.getElementById("editJoiningDate").value;
  const salary = parseFloat(document.getElementById("editSalary").value);

  const updatedData = {
    name,
    email,
    joining_date,
    salary,
    style_id: currentStyleId,
  };

  try {
    await apiPut(`/dancers/${id}`, updatedData);

    // Reload dancers
    await loadDancers(currentStyleId);
    closeEditModalFn();
    alert("Dancer updated successfully!");
  } catch (error) {
    console.error("Failed to update dancer:", error);
    alert("Failed to update dancer. Please try again.");
  }
}

// ============================================
// Add Dancer
// ============================================

// Open add modal
function openAddModal() {
  addModal.style.display = "flex";
}

// Close add modal
function closeAddModalFn() {
  addModal.style.display = "none";
  addDancerForm.reset();
}

// Handle add submit
async function handleAddSubmit(e) {
  e.preventDefault();

  const id = parseInt(document.getElementById("addId").value);
  const name = document.getElementById("addName").value;
  const email = document.getElementById("addEmail").value;
  const joining_date = document.getElementById("addJoiningDate").value;
  const salary = parseFloat(document.getElementById("addSalary").value);

  const newDancerData = {
    name,
    email,
    joining_date,
    salary,
    style_id: currentStyleId,
  };

  try {
    const response = await apiPost("/dancers", newDancerData);

    // Reload dancers and styles
    await loadDancers(currentStyleId);
    await loadDanceStyles();

    closeAddModalFn();
    alert("Dancer added successfully!");
  } catch (error) {
    console.error("Failed to add dancer:", error);

    // Check if it's a duplicate email error
    if (error.message && error.message.includes("email already exists")) {
      alert(
        "A dancer with this email already exists. Please use a different email."
      );
    } else {
      alert("Failed to add dancer. Please try again.");
    }
  }
}

// ============================================
// Delete Dancer
// ============================================

// Delete dancer
async function deleteDancer(id) {
  if (!confirm("Are you sure you want to delete this dancer?")) {
    return;
  }

  try {
    await apiDelete(`/dancers/${id}`);

    // Reload dancers and styles
    await loadDancers(currentStyleId);
    await loadDanceStyles();

    alert("Dancer deleted successfully!");
  } catch (error) {
    console.error("Failed to delete dancer:", error);
    alert("Failed to delete dancer. Please try again.");
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
