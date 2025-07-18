// Main application logic using const instead of var
const data = {
  categories: [],
  types: [],
  turnarounds: [],
}

// Declare apiClient variable
const apiClient = {
  getCategories: () => {
    // Implementation for getting categories
  },
  getTypes: () => {
    // Implementation for getting types
  },
  getTurnarounds: () => {
    // Implementation for getting turnarounds
  },
  addTurnaround: (turnaround) => {
    // Implementation for adding turnaround
  },
  addCategory: (name) => {
    // Implementation for adding category
  },
  addType: (name, categoryKey) => {
    // Implementation for adding type
  },
  deleteTurnaround: (id) => {
    // Implementation for deleting turnaround
  },
  deleteCategory: (key) => {
    // Implementation for deleting category
  },
  deleteType: (key) => {
    // Implementation for deleting type
  },
}

// Load data from backend
function loadData() {
  return Promise.all([apiClient.getCategories(), apiClient.getTypes(), apiClient.getTurnarounds()])
    .then((responses) => {
      const categoriesResponse = responses[0]
      const typesResponse = responses[1]
      const turnaroundsResponse = responses[2]

      if (categoriesResponse.success) {
        data.categories = categoriesResponse.data
      }

      if (typesResponse.success) {
        data.types = typesResponse.data
      }

      if (turnaroundsResponse.success) {
        data.turnarounds = turnaroundsResponse.data
      }

      // Refresh UI
      populateDropdowns()
      renderTurnarounds()
      renderCategories()
      renderTypes()
    })
    .catch((error) => {
      console.error("Failed to load data:", error)
      showAlert("category-error", "Failed to load data from server", "error")
    })
}

// Module and sub-section navigation
function showModule(moduleId) {
  const modules = document.querySelectorAll(".module-content")
  for (let i = 0; i < modules.length; i++) {
    modules[i].classList.remove("active")
  }

  document.getElementById(moduleId + "-module").classList.add("active")

  const tabs = document.querySelectorAll(".main-tab")
  for (let j = 0; j < tabs.length; j++) {
    tabs[j].classList.remove("active")
  }
  event.target.classList.add("active")

  const firstSubTab = document.querySelector("#" + moduleId + "-module .sub-tab")
  if (firstSubTab) {
    firstSubTab.click()
  }
}

function showSubSection(module, section) {
  const sections = document.querySelectorAll("#" + module + "-module .form-section")
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove("active")
  }

  document.getElementById(module + "-" + section).classList.add("active")

  const tabs = document.querySelectorAll("#" + module + "-module .sub-tab")
  for (let j = 0; j < tabs.length; j++) {
    tabs[j].classList.remove("active")
  }
  event.target.classList.add("active")
}

// Utility functions
function showAlert(elementId, message, type) {
  type = type || "success"
  const alert = document.getElementById(elementId)
  if (alert) {
    alert.textContent = message
    alert.className = "alert " + type
    alert.style.display = "block"
    setTimeout(() => {
      alert.style.display = "none"
    }, 3000)
  }
}

function getCategoryName(categoryKey) {
  for (let i = 0; i < data.categories.length; i++) {
    if (data.categories[i].key === categoryKey) {
      return data.categories[i].name
    }
  }
  return categoryKey
}

function getTypeName(typeKey) {
  for (let i = 0; i < data.types.length; i++) {
    if (data.types[i].key === typeKey) {
      return data.types[i].name
    }
  }
  return typeKey
}

// Populate dropdowns
function populateDropdowns() {
  const categorySelects = ["complaint-category", "type-category"]

  for (let j = 0; j < categorySelects.length; j++) {
    const select = document.getElementById(categorySelects[j])
    if (!select) continue

    select.innerHTML = '<option value="">Select Category</option>'
    for (let i = 0; i < data.categories.length; i++) {
      const category = data.categories[i]
      select.innerHTML += '<option value="' + category.key + '">' + category.name + " (" + category.key + ")</option>"
    }
  }

  const complaintCategorySelect = document.getElementById("complaint-category")
  if (complaintCategorySelect) {
    complaintCategorySelect.addEventListener("change", function () {
      const categoryKey = this.value
      const typeSelect = document.getElementById("complaint-type")
      if (!typeSelect) return

      typeSelect.innerHTML = '<option value="">Select Type</option>'

      if (categoryKey) {
        for (let i = 0; i < data.types.length; i++) {
          const type = data.types[i]
          if (type.categoryKey === categoryKey) {
            typeSelect.innerHTML += '<option value="' + type.key + '">' + type.name + " (" + type.key + ")</option>"
          }
        }
      }
    })
  }
}

// Render functions
function renderTurnarounds() {
  const tbody = document.getElementById("turnaround-list")
  if (!tbody) return

  tbody.innerHTML = ""

  for (let i = 0; i < data.turnarounds.length; i++) {
    const turnaround = data.turnarounds[i]
    const row =
      "<tr>" +
      "<td>" +
      (turnaround.categoryName || turnaround.categoryKey) +
      " (" +
      turnaround.categoryKey +
      ")</td>" +
      "<td>" +
      (turnaround.typeName || turnaround.typeKey) +
      " (" +
      turnaround.typeKey +
      ")</td>" +
      "<td>" +
      turnaround.low +
      "</td>" +
      "<td>" +
      turnaround.medium +
      "</td>" +
      "<td>" +
      turnaround.mediumHigh +
      "</td>" +
      "<td>" +
      turnaround.high +
      "</td>" +
      '<td class="action-buttons">' +
      '<button class="btn btn-danger btn-sm" onclick="deleteTurnaround(' +
      turnaround.id +
      ')">Delete</button>' +
      "</td>" +
      "</tr>"
    tbody.innerHTML += row
  }
}

function renderCategories() {
  const tbody = document.getElementById("category-list")
  if (!tbody) return

  tbody.innerHTML = ""

  for (let i = 0; i < data.categories.length; i++) {
    const category = data.categories[i]
    const row =
      "<tr>" +
      "<td>" +
      category.name +
      " (" +
      category.key +
      ")</td>" +
      '<td class="action-buttons">' +
      '<button class="btn btn-danger btn-sm" onclick="deleteCategory(\'' +
      category.key +
      "')\">Delete</button>" +
      "</td>" +
      "</tr>"
    tbody.innerHTML += row
  }
}

function renderTypes() {
  const tbody = document.getElementById("type-list")
  if (!tbody) return

  tbody.innerHTML = ""

  for (let i = 0; i < data.types.length; i++) {
    const type = data.types[i]
    const row =
      "<tr>" +
      "<td>" +
      (type.categoryName || type.categoryKey) +
      " (" +
      type.categoryKey +
      ")</td>" +
      "<td>" +
      type.name +
      " (" +
      type.key +
      ")</td>" +
      '<td class="action-buttons">' +
      '<button class="btn btn-danger btn-sm" onclick="deleteType(\'' +
      type.key +
      "')\">Delete</button>" +
      "</td>" +
      "</tr>"
    tbody.innerHTML += row
  }
}

// Form handlers
document.addEventListener("DOMContentLoaded", () => {
  // Load data from backend
  loadData()

  // Turnaround form
  const turnaroundForm = document.getElementById("turnaround-form")
  if (turnaroundForm) {
    turnaroundForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const categoryKey = document.getElementById("complaint-category").value
      const typeKey = document.getElementById("complaint-type").value
      const low = document.getElementById("low-days").value
      const medium = document.getElementById("medium-days").value
      const mediumHigh = document.getElementById("medium-high-days").value
      const high = document.getElementById("high-days").value

      // Check if combination already exists
      let existing = false
      for (let i = 0; i < data.turnarounds.length; i++) {
        if (data.turnarounds[i].categoryKey === categoryKey && data.turnarounds[i].typeKey === typeKey) {
          existing = true
          break
        }
      }

      if (existing) {
        showAlert("turnaround-error", "Turnaround time already exists for this category and type!", "error")
        return
      }

      apiClient
        .addTurnaround({
          categoryKey: categoryKey,
          typeKey: typeKey,
          low: Number.parseInt(low),
          medium: Number.parseInt(medium),
          mediumHigh: Number.parseInt(mediumHigh),
          high: Number.parseInt(high),
        })
        .then((response) => {
          if (response.success) {
            loadData()
            resetTurnaroundForm()
            showAlert("turnaround-success", response.message)
          } else {
            showAlert("turnaround-error", response.message, "error")
          }
        })
    })
  }

  // Category form
  const categoryForm = document.getElementById("category-form")
  if (categoryForm) {
    categoryForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("category-name").value

      // Check if category already exists
      let existing = false
      for (let i = 0; i < data.categories.length; i++) {
        if (data.categories[i].name.toLowerCase() === name.toLowerCase()) {
          existing = true
          break
        }
      }

      if (existing) {
        showAlert("category-error", "Category already exists!", "error")
        return
      }

      apiClient.addCategory(name).then((response) => {
        if (response.success) {
          loadData()
          resetCategoryForm()
          showAlert("category-success", response.message + " (Key: " + response.key + ")")
        } else {
          showAlert("category-error", response.message, "error")
        }
      })
    })
  }

  // Type form
  const typeForm = document.getElementById("type-form")
  if (typeForm) {
    typeForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const categoryKey = document.getElementById("type-category").value
      const name = document.getElementById("type-name").value

      // Check if type already exists in category
      let existing = false
      for (let i = 0; i < data.types.length; i++) {
        if (data.types[i].categoryKey === categoryKey && data.types[i].name.toLowerCase() === name.toLowerCase()) {
          existing = true
          break
        }
      }

      if (existing) {
        showAlert("type-error", "Type already exists in this category!", "error")
        return
      }

      apiClient.addType(name, categoryKey).then((response) => {
        if (response.success) {
          loadData()
          resetTypeForm()
          showAlert("type-success", response.message + " (Key: " + response.key + ")")
        } else {
          showAlert("type-error", response.message, "error")
        }
      })
    })
  }

  // Other forms
  const systemForm = document.getElementById("system-form")
  if (systemForm) {
    systemForm.addEventListener("submit", (e) => {
      e.preventDefault()
      showAlert("system-success", "System settings updated successfully!")
    })
  }

  const emailForm = document.getElementById("email-form")
  if (emailForm) {
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault()
      showAlert("email-success", "Email settings saved successfully!")
    })
  }

  const smsForm = document.getElementById("sms-form")
  if (smsForm) {
    smsForm.addEventListener("submit", (e) => {
      e.preventDefault()
      showAlert("sms-success", "SMS settings saved successfully!")
    })
  }
})

// Delete functions
function deleteTurnaround(id) {
  if (confirm("Are you sure you want to delete this turnaround time?")) {
    apiClient.deleteTurnaround(id).then((response) => {
      if (response.success) {
        loadData()
        showAlert("turnaround-success", response.message)
      } else {
        showAlert("turnaround-error", response.message, "error")
      }
    })
  }
}

function deleteCategory(key) {
  if (
    confirm(
      "Are you sure you want to delete this category? This will also delete all related types and turnaround times.",
    )
  ) {
    apiClient.deleteCategory(key).then((response) => {
      if (response.success) {
        loadData()
        showAlert("category-success", response.message)
      } else {
        showAlert("category-error", response.message, "error")
      }
    })
  }
}

function deleteType(key) {
  if (confirm("Are you sure you want to delete this type? This will also delete related turnaround times.")) {
    apiClient.deleteType(key).then((response) => {
      if (response.success) {
        loadData()
        showAlert("type-success", response.message)
      } else {
        showAlert("type-error", response.message, "error")
      }
    })
  }
}

// Reset form functions
function resetTurnaroundForm() {
  const form = document.getElementById("turnaround-form")
  if (form) form.reset()
}

function resetCategoryForm() {
  const form = document.getElementById("category-form")
  if (form) form.reset()
}

function resetTypeForm() {
  const form = document.getElementById("type-form")
  if (form) form.reset()
}
