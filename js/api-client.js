// API Client for backend communication
function ApiClient(baseUrl) {
  this.baseUrl = baseUrl || "custom/modules/kmbl_Complain_Conf/custom_ui/api/"
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

  return fetch(url, config)
    .then((response) => response.json())
    .catch((error) => {
      console.error("API request failed:", error)
      return { success: false, message: "Network error occurred" }
    })
}

// Categories API
ApiClient.prototype.getCategories = function () {
  return this.request("categories.php")
}

ApiClient.prototype.addCategory = function (name) {
  return this.request("categories.php", {
    method: "POST",
    body: { name: name },
  })
}

ApiClient.prototype.deleteCategory = function (key) {
  return this.request("categories.php", {
    method: "DELETE",
    body: { key: key },
  })
}

// Types API
ApiClient.prototype.getTypes = function () {
  return this.request("types.php")
}

ApiClient.prototype.addType = function (name, categoryKey) {
  return this.request("types.php", {
    method: "POST",
    body: { name: name, categoryKey: categoryKey },
  })
}

ApiClient.prototype.deleteType = function (key) {
  return this.request("types.php", {
    method: "DELETE",
    body: { key: key },
  })
}

// Turnarounds API
ApiClient.prototype.getTurnarounds = function () {
  return this.request("turnarounds.php")
}

ApiClient.prototype.addTurnaround = function (data) {
  return this.request("turnarounds.php", {
    method: "POST",
    body: data,
  })
}

ApiClient.prototype.deleteTurnaround = function (id) {
  return this.request("turnarounds.php", {
    method: "DELETE",
    body: { id: id },
  })
}

// Initialize API client
var apiClient = new ApiClient()
