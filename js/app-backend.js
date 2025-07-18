// Import or declare the apiClient variable before using it


// Main application logic using var instead of const
var data = {
  categories: [],
  types: [],
  turnarounds: [],
}

// Load data from backend
function loadData() {
  console.log("Loading data from backend...")
  return Promise.all([apiClient.getCategories(), apiClient.getTypes(), apiClient.getTurnarounds()])
    .then((responses) => {
      console.log("All API responses received:", responses)
      var categoriesResponse = responses[0]
      var typesResponse = responses[1]
      var turnaroundsResponse = responses[2]

      if (categoriesResponse.success) {
        data.categories = categoriesResponse.data
        console.log("Categories loaded:", data.categories)
      } else {
        console.error("Failed to load categories:", categoriesResponse.message)
      }

      if (typesResponse.success) {
        data.types = typesResponse.data
        console.log("Types loaded:", data.types)
      } else {
        console.error("Failed to load types:", typesResponse.message)
      }

      if (turnaroundsResponse.success) {
        data.turnarounds = turnaroundsResponse.data
        console.log("Turnarounds loaded:", data.turnarounds)
      } else {
        console.error("Failed to load turnarounds:", turnaroundsResponse.message)
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
  var modules = document.querySelectorAll(".module-content")
  for (var i = 0; i < modules.length; i++) {
    modules[i].classList.remove("active")
  }

  document.getElementById(moduleId + "-module").classList.add("active")

  var tabs = document.querySelectorAll(".main-tab")
  for (var j = 0; j < tabs.length; j++) {
    tabs[j].classList.remove("active")
  }
  event.target.classList.add("active")

  var firstSubTab = document.querySelector("#" + moduleId + "-module .sub-tab")
  if (firstSubTab) {
    firstSubTab.click()
  }
}

function showSubSection(module, section) {
  var sections = document.querySelectorAll("#" + module + "-module .form-section")
  for (var i = 0; i < sections.length; i++) {
    sections[i].classList.remove("active")
  }

  document.getElementById(module + "-" + section).classList.add("active")

  var tabs = document.querySelectorAll("#" + module + "-module .sub-tab")
  for (var j = 0; j < tabs.length; j++) {
    tabs[j].classList.remove("active")
  }
  event.target.classList.add("active")
}

// Utility functions
function showAlert(elementId, message, type) {
  type = type || "success"
  var alert = document.getElementById(elementId)
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
  for (var i = 0; i < data.categories.length; i++) {
    if (data.categories[i].key === categoryKey) {
      return data.categories[i].name
    }
  }
  return categoryKey
}

function getTypeName(typeKey) {
  for (var i = 0; i < data.types.length; i++) {
    if (data.types[i].key === typeKey) {
      return data.types[i].name
    }
  }
  return typeKey
}

// Populate dropdowns
function populateDropdowns() {
  console.log("Populating dropdowns with categories:", data.categories)
  var categorySelects = ["complaint-category", "type-category"]

  for (var j = 0; j < categorySelects.length; j++) {
    var select = document.getElementById(categorySelects[j])
    if (!select) {
      console.log("Select element not found:", categorySelects[j])
      continue
    }

    select.innerHTML = '<option value="">Select Category</option>'
    for (var i = 0; i < data.categories.length; i++) {
      var category = data.categories[i]
      select.innerHTML += '<option value="' + category.key + '">' + category.name + " (" + category.key + ")</option>"
    }
    console.log("Populated select:", categorySelects[j], "with", data.categories.length, "categories")
  }

  var complaintCategorySelect = document.getElementById("complaint-category")
  if (complaintCategorySelect) {
    complaintCategorySelect.addEventListener("change", function () {
      var categoryKey = this.value
      var typeSelect = document.getElementById("complaint-type")
      if (!typeSelect) return

      typeSelect.innerHTML = '<option value="">Select Type</option>'

      if (categoryKey) {
        for (var i = 0; i < data.types.length; i++) {
          var type = data.types[i]
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
  var tbody = document.getElementById("turnaround-list")
  if (!tbody) return

  tbody.innerHTML = ""

  for (var i = 0; i < data.turnarounds.length; i++) {
    var turnaround = data.turnarounds[i]
    var row =
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
  var tbody = document.getElementById("category-list")
  if (!tbody) return

  tbody.innerHTML = ""

  for (var i = 0; i < data.categories.length; i++) {
    var category = data.categories[i]
    var row =
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
  var tbody = document.getElementById("type-list")
  if (!tbody) return

  tbody.innerHTML = ""

  for (var i = 0; i < data.types.length; i++) {
    var type = data.types[i]
    var row =
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
  console.log("DOM loaded, initializing app...")
  // Load data from backend
  loadData()

  // Turnaround form
  var turnaroundForm = document.getElementById("turnaround-form")
  if (turnaroundForm) {
    turnaroundForm.addEventListener("submit", (e) => {
      e.preventDefault()

      var categoryKey = document.getElementById("complaint-category").value
      var typeKey = document.getElementById("complaint-type").value
      var low = document.getElementById("low-days").value
      var medium = document.getElementById("medium-days").value
      var mediumHigh = document.getElementById("medium-high-days").value
      var high = document.getElementById("high-days").value

      // Check if combination already exists
      var existing = false
      for (var i = 0; i < data.turnarounds.length; i++) {
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
  var categoryForm = document.getElementById("category-form")
  if (categoryForm) {
    categoryForm.addEventListener("submit", (e) => {
      e.preventDefault()

      var name = document.getElementById("category-name").value

      // Check if category already exists
      var existing = false
      for (var i = 0; i < data.categories.length; i++) {
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
  var typeForm = document.getElementById("type-form")
  if (typeForm) {
    typeForm.addEventListener("submit", (e) => {
      e.preventDefault()

      var categoryKey = document.getElementById("type-category").value
      var name = document.getElementById("type-name").value

      // Check if type already exists in category
      var existing = false
      for (var i = 0; i < data.types.length; i++) {
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
  var systemForm = document.getElementById("system-form")
  if (systemForm) {
    systemForm.addEventListener("submit", (e) => {
      e.preventDefault()
      showAlert("system-success", "System settings updated successfully!")
    })
  }

  var emailForm = document.getElementById("email-form")
  if (emailForm) {
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault()
      showAlert("email-success", "Email settings saved successfully!")
    })
  }

  var smsForm = document.getElementById("sms-form")
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
  var form = document.getElementById("turnaround-form")
  if (form) form.reset()
}

function resetCategoryForm() {
  var form = document.getElementById("category-form")
  if (form) form.reset()
}

function resetTypeForm() {
  var form = document.getElementById("type-form")
  if (form) form.reset()
}
