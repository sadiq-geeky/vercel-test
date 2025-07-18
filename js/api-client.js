// API Client for backend communication
function ApiClient(baseUrl) {
  console.log("Initializing API Client with base URL:", baseUrl)
  this.baseUrl = baseUrl || "api/"
}

ApiClient.prototype.request = function (endpoint, options) {
  options = options || {}
  var url = this.baseUrl + endpoint
  var config = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  // Merge options
  for (var key in options) {
    config[key] = options[key]
  }

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body)
  }

  console.log("Making API request to:", url, "with config:", config)

  return fetch(url, config)
    .then((response) => {
      console.log("API response status:", response.status)
      return response.json()
    })
    .then((data) => {
      console.log("API response data:", data)
      return data
    })
    .catch((error) => {
      console.error("API request failed:", error)
      return { success: false, message: "Network error occurred" }
    })
}

// Categories API
ApiClient.prototype.getCategories = function () {
  console.log("Getting categories...")
  return this.request("categories.php")
}

ApiClient.prototype.addCategory = function (name) {
  console.log("Adding category:", name)
  return this.request("categories.php", {
    method: "POST",
    body: { name: name },
  })
}

ApiClient.prototype.deleteCategory = function (key) {
  console.log("Deleting category:", key)
  return this.request("categories.php", {
    method: "DELETE",
    body: { key: key },
  })
}

// Types API
ApiClient.prototype.getTypes = function () {
  console.log("Getting types...")
  return this.request("types.php")
}

ApiClient.prototype.addType = function (name, categoryKey) {
  console.log("Adding type:", name, "to category:", categoryKey)
  return this.request("types.php", {
    method: "POST",
    body: { name: name, categoryKey: categoryKey },
  })
}

ApiClient.prototype.deleteType = function (key) {
  console.log("Deleting type:", key)
  return this.request("types.php", {
    method: "DELETE",
    body: { key: key },
  })
}

// Turnarounds API
ApiClient.prototype.getTurnarounds = function () {
  console.log("Getting turnarounds...")
  return this.request("turnarounds.php")
}

ApiClient.prototype.addTurnaround = function (data) {
  console.log("Adding turnaround:", data)
  return this.request("turnarounds.php", {
    method: "POST",
    body: data,
  })
}

ApiClient.prototype.deleteTurnaround = function (id) {
  console.log("Deleting turnaround:", id)
  return this.request("turnarounds.php", {
    method: "DELETE",
    body: { id: id },
  })
}

// Initialize API client
console.log("Creating global apiClient instance...")
var apiClient = new ApiClient()
