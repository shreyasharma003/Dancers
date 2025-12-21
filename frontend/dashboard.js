// Static dummy data
const danceStyles = [
  { id: 1, name: "Hip Hop", icon: "🎤", dancerCount: 12 },
  { id: 2, name: "Ballet", icon: "🩰", dancerCount: 8 },
  { id: 3, name: "Contemporary", icon: "💃", dancerCount: 15 },
  { id: 4, name: "Jazz", icon: "🎷", dancerCount: 10 },
  { id: 5, name: "Salsa", icon: "🔥", dancerCount: 9 },
  { id: 6, name: "Breakdance", icon: "🕺", dancerCount: 7 },
];

const dancersByStyle = {
  1: [
    // Hip Hop
    {
      id: 101,
      name: "Marcus Johnson",
      email: "marcus.johnson@dancers.com",
      joining_date: "2019-03-15",
      salary: 45000.0,
      style_id: 1,
    },
    {
      id: 102,
      name: "Jasmine Lee",
      email: "jasmine.lee@dancers.com",
      joining_date: "2020-06-01",
      salary: 42000.0,
      style_id: 1,
    },
    {
      id: 103,
      name: "Andre Williams",
      email: "andre.williams@dancers.com",
      joining_date: "2018-01-20",
      salary: 52000.0,
      style_id: 1,
    },
    {
      id: 104,
      name: "Maya Rodriguez",
      email: "maya.rodriguez@dancers.com",
      joining_date: "2021-09-10",
      salary: 38000.0,
      style_id: 1,
    },
  ],
  2: [
    // Ballet
    {
      id: 201,
      name: "Elena Petrov",
      email: "elena.petrov@dancers.com",
      joining_date: "2017-02-10",
      salary: 65000.0,
      style_id: 2,
    },
    {
      id: 202,
      name: "Sophie Martin",
      email: "sophie.martin@dancers.com",
      joining_date: "2019-08-15",
      salary: 58000.0,
      style_id: 2,
    },
    {
      id: 203,
      name: "Isabella Chen",
      email: "isabella.chen@dancers.com",
      joining_date: "2018-05-20",
      salary: 62000.0,
      style_id: 2,
    },
    {
      id: 204,
      name: "Oliver Thompson",
      email: "oliver.thompson@dancers.com",
      joining_date: "2016-11-05",
      salary: 68000.0,
      style_id: 2,
    },
  ],
  3: [
    // Contemporary
    {
      id: 301,
      name: "Ava Mitchell",
      email: "ava.mitchell@dancers.com",
      joining_date: "2018-07-12",
      salary: 48000.0,
      style_id: 3,
    },
    {
      id: 302,
      name: "Michael Santos",
      email: "michael.santos@dancers.com",
      joining_date: "2017-04-22",
      salary: 55000.0,
      style_id: 3,
    },
    {
      id: 303,
      name: "Riya Sharma",
      email: "riya.sharma@dancers.com",
      joining_date: "2019-01-18",
      salary: 46000.0,
      style_id: 3,
    },
    {
      id: 304,
      name: "Lucas Anderson",
      email: "lucas.anderson@dancers.com",
      joining_date: "2018-10-08",
      salary: 50000.0,
      style_id: 3,
    },
  ],
  4: [
    // Jazz
    {
      id: 401,
      name: "Nina Foster",
      email: "nina.foster@dancers.com",
      joining_date: "2016-09-14",
      salary: 54000.0,
      style_id: 4,
    },
    {
      id: 402,
      name: "Ryan Cooper",
      email: "ryan.cooper@dancers.com",
      joining_date: "2018-11-30",
      salary: 47000.0,
      style_id: 4,
    },
    {
      id: 403,
      name: "Zara Khan",
      email: "zara.khan@dancers.com",
      joining_date: "2020-03-25",
      salary: 43000.0,
      style_id: 4,
    },
  ],
  5: [
    // Salsa
    {
      id: 501,
      name: "Carlos Mendez",
      email: "carlos.mendez@dancers.com",
      joining_date: "2015-05-01",
      salary: 60000.0,
      style_id: 5,
    },
    {
      id: 502,
      name: "Maria Garcia",
      email: "maria.garcia@dancers.com",
      joining_date: "2017-12-10",
      salary: 51000.0,
      style_id: 5,
    },
    {
      id: 503,
      name: "Diego Torres",
      email: "diego.torres@dancers.com",
      joining_date: "2016-08-18",
      salary: 53000.0,
      style_id: 5,
    },
  ],
  6: [
    // Breakdance
    {
      id: 601,
      name: "Kevin Park",
      email: "kevin.park@dancers.com",
      joining_date: "2019-04-05",
      salary: 44000.0,
      style_id: 6,
    },
    {
      id: 602,
      name: "Takeshi Yamamoto",
      email: "takeshi.yamamoto@dancers.com",
      joining_date: "2017-10-12",
      salary: 49000.0,
      style_id: 6,
    },
    {
      id: 603,
      name: "Alex Rivera",
      email: "alex.rivera@dancers.com",
      joining_date: "2020-02-28",
      salary: 41000.0,
      style_id: 6,
    },
  ],
};

// Navigation state
let currentView = "styles"; // styles, dancers, detail
let currentStyleId = null;
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
function init() {
  renderStyles();
  setupEventListeners();
  checkAuth();
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

// Render dance styles
function renderStyles() {
  stylesGrid.innerHTML = "";

  danceStyles.forEach((style) => {
    const styleCard = createStyleCard(style);
    stylesGrid.appendChild(styleCard);
  });
}

// Create style card
function createStyleCard(style) {
  const card = document.createElement("div");
  card.className = "style-card";
  card.innerHTML = `
    <div class="style-card-icon">${style.icon}</div>
    <h3 class="style-card-name">${style.name}</h3>
    <p class="style-card-count">${style.dancerCount} Dancers</p>
  `;

  card.addEventListener("click", () => showDancers(style.id, style.name));

  return card;
}

// Show dancers for a specific style
function showDancers(styleId, styleName) {
  currentStyleId = styleId;
  currentView = "dancers";

  // Update UI
  pageTitle.textContent = styleName;
  backBtn.style.display = "flex";

  // Hide styles view, show dancers view
  stylesView.style.display = "none";
  dancersView.style.display = "block";
  dancerDetailView.style.display = "none";

  // Render dancers
  renderDancers(styleId);
}

// Render dancers for a style
function renderDancers(styleId) {
  dancersGrid.innerHTML = "";

  const dancers = dancersByStyle[styleId] || [];
  const style = danceStyles.find((s) => s.id === styleId);

  dancers.forEach((dancer) => {
    const dancerCard = createDancerCard(dancer, style.name);
    dancersGrid.appendChild(dancerCard);
  });
}

// Create dancer card
function createDancerCard(dancer, styleName) {
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
        <div class="dancer-stat-value">${styleName}</div>
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
      showDancerDetail(dancer, styleName);
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
function showDancerDetail(dancer, styleName) {
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
  renderDancerDetail(dancer, styleName);
}

// Render dancer detail
function renderDancerDetail(dancer, styleName) {
  const initials = dancer.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  dancerDetailCard.innerHTML = `
    <div class="dancer-detail-header">
      <div class="dancer-detail-avatar">${initials}</div>
      <h2 class="dancer-detail-name">${dancer.name}</h2>
      <p class="dancer-detail-style">${styleName} Dancer</p>
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
        <div class="detail-stat-value">$${dancer.salary.toLocaleString()}</div>
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
      <strong>Dance Style:</strong> ${styleName}</p>
    </div>
  `;
}

// Handle back navigation
function handleBack() {
  if (currentView === "detail") {
    // Go back to dancers list
    const style = danceStyles.find((s) => s.id === currentStyleId);
    showDancers(currentStyleId, style.name);
  } else if (currentView === "dancers") {
    // Go back to styles
    showStyles();
  }
}

// Show styles view
function showStyles() {
  currentView = "styles";
  currentStyleId = null;
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
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// Search dancers
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  const dancers = dancersByStyle[currentStyleId] || [];
  const style = danceStyles.find((s) => s.id === currentStyleId);

  dancersGrid.innerHTML = "";

  const filteredDancers = dancers.filter(
    (dancer) =>
      dancer.name.toLowerCase().includes(searchTerm) ||
      dancer.email.toLowerCase().includes(searchTerm)
  );

  if (filteredDancers.length === 0) {
    dancersGrid.innerHTML =
      '<div class="no-results">No dancers found matching your search.</div>';
  } else {
    filteredDancers.forEach((dancer) => {
      const dancerCard = createDancerCard(dancer, style.name);
      dancersGrid.appendChild(dancerCard);
    });
  }
}

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
function handleEditSubmit(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById("editDancerId").value);
  const joining_date = document.getElementById("editJoiningDate").value;
  const salary = parseFloat(document.getElementById("editSalary").value);

  // Update only editable fields (joining_date and salary)
  const dancers = dancersByStyle[currentStyleId];
  const dancerIndex = dancers.findIndex((d) => d.id === id);
  if (dancerIndex !== -1) {
    dancers[dancerIndex] = {
      ...dancers[dancerIndex],
      joining_date,
      salary,
    };
  }

  // Re-render dancers
  renderDancers(currentStyleId);
  closeEditModalFn();
  alert("Dancer updated successfully!");
}

// Open add modal
function openAddModal() {
  // Generate next available ID
  const dancers = dancersByStyle[currentStyleId];
  let maxId = 0;

  // Find the highest ID in the current style
  dancers.forEach((dancer) => {
    if (dancer.id > maxId) {
      maxId = dancer.id;
    }
  });

  // Set the next ID
  const nextId = maxId + 1;
  document.getElementById("addId").value = nextId;

  addModal.style.display = "flex";
}

// Close add modal
function closeAddModalFn() {
  addModal.style.display = "none";
  addDancerForm.reset();
}

// Handle add submit
function handleAddSubmit(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById("addId").value);
  const name = document.getElementById("addName").value;
  const email = document.getElementById("addEmail").value;
  const joining_date = document.getElementById("addJoiningDate").value;
  const salary = parseFloat(document.getElementById("addSalary").value);

  // Add new dancer (ID is already validated as auto-generated)
  const dancers = dancersByStyle[currentStyleId];
  const newDancer = {
    id,
    name,
    email,
    joining_date,
    salary,
    style_id: currentStyleId,
  };

  dancers.push(newDancer);

  // Update dancer count
  const style = danceStyles.find((s) => s.id === currentStyleId);
  if (style) {
    style.dancerCount++;
  }

  // Re-render dancers
  renderDancers(currentStyleId);
  closeAddModalFn();
  alert("Dancer added successfully!");
}

// Delete dancer
function deleteDancer(id) {
  if (!confirm("Are you sure you want to delete this dancer?")) {
    return;
  }

  // Remove dancer from data
  const dancers = dancersByStyle[currentStyleId];
  const dancerIndex = dancers.findIndex((d) => d.id === id);
  if (dancerIndex !== -1) {
    dancers.splice(dancerIndex, 1);
  }

  // Update dancer count
  const style = danceStyles.find((s) => s.id === currentStyleId);
  if (style) {
    style.dancerCount--;
  }

  // Re-render dancers
  renderDancers(currentStyleId);
  alert("Dancer deleted successfully!");
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
