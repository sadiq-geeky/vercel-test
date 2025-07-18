// Data storage
const data = {
  categories: [
    { id: 1, name: "Service Quality" },
    { id: 2, name: "Billing" },
    { id: 3, name: "Technical" },
  ],
  types: [
    { id: 1, categoryId: 1, name: "Slow Response" },
    { id: 2, categoryId: 1, name: "Poor Quality" },
    { id: 3, categoryId: 2, name: "Wrong Charges" },
    { id: 4, categoryId: 3, name: "System Down" },
  ],
  turnarounds: [
    { id: 1, categoryId: 1, typeId: 1, low: 3, medium: 5, mediumHigh: 7, high: 10 },
    { id: 2, categoryId: 1, typeId: 2, low: 2, medium: 4, mediumHigh: 6, high: 8 },
    { id: 3, categoryId: 2, typeId: 3, low: 1, medium: 2, mediumHigh: 3, high: 5 },
    { id: 4, categoryId: 3, typeId: 4, low: 1, medium: 1, mediumHigh: 2, high: 3 },
  ],
  branches: [
    { id: 1, name: "Main Branch", code: "MB001", address: "123 Main Street, City, State" },
    { id: 2, name: "North Branch", code: "NB002", address: "456 North Avenue, City, State" },
  ],
}

const nextId = {
  categories: 4,
  types: 5,
  turnarounds: 5,
  branches: 3,
}

// Module and sub-section navigation
function showModule(moduleId) {
  document.querySelectorAll(".module-content").forEach((module) => {
    module.classList.remove("active")
  })

  document.getElementById(moduleId + "-module").classList.add("active")

  document.querySelectorAll(".main-tab").forEach((tab) => {
    tab.classList.remove("active")
  })
  event.target.classList.add("active")

  const firstSubTab = document.querySelector(`#${moduleId}-module .sub-tab`)
  if (firstSubTab) {
    firstSubTab.click()
  }
}

function showSubSection(module, section) {
  document.querySelectorAll(`#${module}-module .form-section`).forEach((section) => {
    section.classList.remove("active")
  })

  document.getElementById(`${module}-${section}`).classList.add("active")

  document.querySelectorAll(`#${module}-module .sub-tab`).forEach((tab) => {
    tab.classList.remove("active")
  })
  event.target.classList.add("active")
}

// Utility functions
function showAlert(elementId, message, type = "success") {
  const alert = document.getElementById(elementId)
  alert.textContent = message
  alert.className = `alert ${type}`
  alert.style.display = "block"
  setTimeout(() => {
    alert.style.display = "none"
  }, 3000)
}

function getCategoryName(categoryId) {
  const category = data.categories.find((c) => c.id == categoryId)
  return category ? category.name : ""
}

function getTypeName(typeId) {
  const type = data.types.find((t) => t.id == typeId)
  return type ? type.name : ""
}

// Populate dropdowns
function populateDropdowns() {
  const categorySelects = ["complaint-category", "type-category"]
  categorySelects.forEach((selectId) => {
    const select = document.getElementById(selectId)
    select.innerHTML = '<option value="">Select Category</option>'
    data.categories.forEach((category) => {
      select.innerHTML += `<option value="${category.id}">${category.name}</option>`
    })
  })

  document.getElementById("complaint-category").addEventListener("change", function () {
    const categoryId = this.value
    const typeSelect = document.getElementById("complaint-type")
    typeSelect.innerHTML = '<option value="">Select Type</option>'

    if (categoryId) {
      const filteredTypes = data.types.filter((type) => type.categoryId == categoryId)
      filteredTypes.forEach((type) => {
        typeSelect.innerHTML += `<option value="${type.id}">${type.name}</option>`
      })
    }
  })
}

// Render functions
function renderTurnarounds() {
  const tbody = document.getElementById("turnaround-list")
  tbody.innerHTML = ""

  data.turnarounds.forEach((turnaround) => {
    const row = `
            <tr>
                <td>${getCategoryName(turnaround.categoryId)}</td>
                <td>${getTypeName(turnaround.typeId)}</td>
                <td>${turnaround.low}</td>
                <td>${turnaround.medium}</td>
                <td>${turnaround.mediumHigh}</td>
                <td>${turnaround.high}</td>
                <td class="action-buttons">
                    <button class="btn btn-danger btn-sm" onclick="deleteTurnaround(${turnaround.id})">Delete</button>
                </td>
            </tr>
        `
    tbody.innerHTML += row
  })
}

function renderCategories() {
  const tbody = document.getElementById("category-list")
  tbody.innerHTML = ""

  data.categories.forEach((category) => {
    const row = `
            <tr>
                <td>${category.name}</td>
                <td class="action-buttons">
                    <button class="btn btn-danger btn-sm" onclick="deleteCategory(${category.id})">Delete</button>
                </td>
            </tr>
        `
    tbody.innerHTML += row
  })
}

function renderTypes() {
  const tbody = document.getElementById("type-list")
  tbody.innerHTML = ""

  data.types.forEach((type) => {
    const row = `
            <tr>
                <td>${getCategoryName(type.categoryId)}</td>
                <td>${type.name}</td>
                <td class="action-buttons">
                    <button class="btn btn-danger btn-sm" onclick="deleteType(${type.id})">Delete</button>
                </td>
            </tr>
        `
    tbody.innerHTML += row
  })
}

function renderBranches() {
  const tbody = document.getElementById("branch-list")
  tbody.innerHTML = ""

  data.branches.forEach((branch) => {
    const row = `
            <tr>
                <td>${branch.name}</td>
                <td>${branch.code}</td>
                <td>${branch.address}</td>
                <td class="action-buttons">
                    <button class="btn btn-danger btn-sm" onclick="deleteBranch(${branch.id})">Delete</button>
                </td>
            </tr>
        `
    tbody.innerHTML += row
  })
}

// Form handlers
document.addEventListener("DOMContentLoaded", () => {
  // Turnaround form
  document.getElementById("turnaround-form").addEventListener("submit", (e) => {
    e.preventDefault()

    const categoryId = document.getElementById("complaint-category").value
    const typeId = document.getElementById("complaint-type").value
    const low = document.getElementById("low-days").value
    const medium = document.getElementById("medium-days").value
    const mediumHigh = document.getElementById("medium-high-days").value
    const high = document.getElementById("high-days").value

    const existing = data.turnarounds.find((t) => t.categoryId == categoryId && t.typeId == typeId)
    if (existing) {
      showAlert("turnaround-error", "Turnaround time already exists for this category and type!", "error")
      return
    }

    data.turnarounds.push({
      id: nextId.turnarounds++,
      categoryId: Number.parseInt(categoryId),
      typeId: Number.parseInt(typeId),
      low: Number.parseInt(low),
      medium: Number.parseInt(medium),
      mediumHigh: Number.parseInt(mediumHigh),
      high: Number.parseInt(high),
    })

    renderTurnarounds()
    resetTurnaroundForm()
    showAlert("turnaround-success", "Turnaround time saved successfully!")
  })

  // Category form
  document.getElementById("category-form").addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("category-name").value

    const existing = data.categories.find((c) => c.name.toLowerCase() === name.toLowerCase())
    if (existing) {
      showAlert("category-error", "Category already exists!", "error")
      return
    }

    data.categories.push({
      id: nextId.categories++,
      name: name,
    })

    renderCategories()
    populateDropdowns()
    resetCategoryForm()
    showAlert("category-success", "Category added successfully!")
  })

  // Type form
  document.getElementById("type-form").addEventListener("submit", (e) => {
    e.preventDefault()

    const categoryId = document.getElementById("type-category").value
    const name = document.getElementById("type-name").value

    const existing = data.types.find((t) => t.categoryId == categoryId && t.name.toLowerCase() === name.toLowerCase())
    if (existing) {
      showAlert("type-error", "Type already exists in this category!", "error")
      return
    }

    data.types.push({
      id: nextId.types++,
      categoryId: Number.parseInt(categoryId),
      name: name,
    })

    renderTypes()
    populateDropdowns()
    resetTypeForm()
    showAlert("type-success", "Type added successfully!")
  })

  // Branch form
  document.getElementById("branch-form").addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("branch-name").value
    const code = document.getElementById("branch-code").value
    const address = document.getElementById("branch-address").value

    const existing = data.branches.find((b) => b.code.toLowerCase() === code.toLowerCase())
    if (existing) {
      showAlert("branch-error", "Branch code already exists!", "error")
      return
    }

    data.branches.push({
      id: nextId.branches++,
      name: name,
      code: code,
      address: address,
    })

    renderBranches()
    resetBranchForm()
    showAlert("branch-success", "Branch added successfully!")
  })

  // Other forms
  document.getElementById("system-form").addEventListener("submit", (e) => {
    e.preventDefault()
    showAlert("system-success", "System settings updated successfully!")
  })

  document.getElementById("email-form").addEventListener("submit", (e) => {
    e.preventDefault()
    showAlert("email-success", "Email settings saved successfully!")
  })

  document.getElementById("sms-form").addEventListener("submit", (e) => {
    e.preventDefault()
    showAlert("sms-success", "SMS settings saved successfully!")
  })

  // Initialize
  populateDropdowns()
  renderTurnarounds()
  renderCategories()
  renderTypes()
  renderBranches()
})

// Delete functions
function deleteTurnaround(id) {
  if (confirm("Are you sure you want to delete this turnaround time?")) {
    data.turnarounds = data.turnarounds.filter((t) => t.id !== id)
    renderTurnarounds()
    showAlert("turnaround-success", "Turnaround time deleted successfully!")
  }
}

function deleteCategory(id) {
  if (
    confirm(
      "Are you sure you want to delete this category? This will also delete all related types and turnaround times.",
    )
  ) {
    data.categories = data.categories.filter((c) => c.id !== id)
    data.types = data.types.filter((t) => t.categoryId !== id)
    data.turnarounds = data.turnarounds.filter((t) => t.categoryId !== id)
    renderCategories()
    renderTypes()
    renderTurnarounds()
    populateDropdowns()
    showAlert("category-success", "Category deleted successfully!")
  }
}

function deleteType(id) {
  if (confirm("Are you sure you want to delete this type? This will also delete related turnaround times.")) {
    data.types = data.types.filter((t) => t.id !== id)
    data.turnarounds = data.turnarounds.filter((t) => t.typeId !== id)
    renderTypes()
    renderTurnarounds()
    populateDropdowns()
    showAlert("type-success", "Type deleted successfully!")
  }
}

function deleteBranch(id) {
  if (confirm("Are you sure you want to delete this branch?")) {
    data.branches = data.branches.filter((b) => b.id !== id)
    renderBranches()
    showAlert("branch-success", "Branch deleted successfully!")
  }
}

// Reset form functions
function resetTurnaroundForm() {
  document.getElementById("turnaround-form").reset()
}

function resetCategoryForm() {
  document.getElementById("category-form").reset()
}

function resetTypeForm() {
  document.getElementById("type-form").reset()
}

function resetBranchForm() {
  document.getElementById("branch-form").reset()
}
