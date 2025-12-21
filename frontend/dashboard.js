document.getElementById("logoutBtn").addEventListener("click", function () {
  window.location.href = "login.html";
});

const stylesContainer = document.getElementById("stylesContainer");
const loadingState = document.getElementById("loadingState");
const emptyState = document.getElementById("emptyState");

function displayDanceStyles() {
  loadingState.classList.remove("show");
  emptyState.classList.add("show");
}


function createStyleItem(style) {
  const item = document.createElement("div");
  item.className = "style-item";

  item.innerHTML = `
        <div class="style-name">${style.style_name}</div>
        <div class="style-id">ID: ${style.style_id}</div>
    `;

  return item;
}

