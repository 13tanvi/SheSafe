let form = document.getElementById("form");
let tableBody = document.getElementById("tableBody");

let filterType = document.getElementById("filterType");
let filterStatus = document.getElementById("filterStatus");

let openCount = document.getElementById("openCount");
let resolvedCount = document.getElementById("resolvedCount");


// ADD DATA
form.addEventListener("submit", function(e) {
  e.preventDefault();

  let id = document.getElementById("deliveryId").value;
  let name = document.getElementById("customerName").value;
  let issue = document.getElementById("issueType").value;
  let priority = document.querySelector('input[name="priority"]:checked').value;

  let row = document.createElement("tr");

  // highlight high priority
  if (priority === "High") {
    row.classList.add("high");
  }

  row.innerHTML = `
    <td>${id}</td>
    <td>${name}</td>
    <td class="issue">${issue}</td>
    <td>${priority}</td>
    <td class="status">Open</td>
    <td>
      <button class="resolve-btn">Resolve</button>
      <button class="delete-btn">Delete</button>
    </td>
  `;

  tableBody.appendChild(row);

  updateCounts();
  form.reset();
});


// BUTTON ACTIONS
tableBody.addEventListener("click", function(e) {

  let row = e.target.parentElement.parentElement;

  // RESOLVE
  if (e.target.classList.contains("resolve-btn")) {
    row.classList.add("resolved");
    row.querySelector(".status").textContent = "Resolved";
    e.target.disabled = true;

    updateCounts();
  }

  // DELETE
  if (e.target.classList.contains("delete-btn")) {
    if (confirm("Are you sure?")) {
      row.remove();
      updateCounts();
    }
  }
});


// FILTER FUNCTION
function applyFilters() {
  let typeValue = filterType.value;
  let statusValue = filterStatus.value;

  let rows = tableBody.querySelectorAll("tr");

  rows.forEach(function(row) {
    let issue = row.querySelector(".issue").textContent;
    let status = row.querySelector(".status").textContent;

    let show = true;

    if (typeValue && issue !== typeValue) {
      show = false;
    }

    if (statusValue && status !== statusValue) {
      show = false;
    }

    row.style.display = show ? "" : "none";
  });
}


// FILTER EVENTS
filterType.addEventListener("change", applyFilters);
filterStatus.addEventListener("change", applyFilters);


// COUNT FUNCTION
function updateCounts() {
  let rows = tableBody.querySelectorAll("tr");

  let open = 0;
  let resolved = 0;

  rows.forEach(function(row) {
    let status = row.querySelector(".status").textContent;

    if (status === "Open") open++;
    else resolved++;
  });

  openCount.textContent = open;
  resolvedCount.textContent = resolved;
}