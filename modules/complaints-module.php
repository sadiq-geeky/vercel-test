<div id="complaints-module" class="module-content active">
    <div class="sub-tabs">
        <button class="sub-tab active" onclick="showSubSection('complaints', 'categories')">Categories</button>
        <button class="sub-tab" onclick="showSubSection('complaints', 'types')">Types</button>
        <button class="sub-tab" onclick="showSubSection('complaints', 'turnaround')">Turnaround Time</button>
    </div>

    <!-- Categories Section -->
    <div id="complaints-categories" class="form-section active">
        <h3>Manage Categories</h3>
        
        <div class="form-container">
            <form id="category-form">
                <div class="form-group">
                    <label for="category-name">Category Name:</label>
                    <input type="text" id="category-name" name="category-name" required>
                </div>
                <button type="submit" class="btn btn-primary">Add Category</button>
            </form>
        </div>

        <div id="category-success" class="alert success" style="display: none;"></div>
        <div id="category-error" class="alert error" style="display: none;"></div>

        <div class="table-container">
            <h4>Existing Categories</h4>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Category Name (Key)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="category-list">
                    <!-- Categories will be populated here -->
                </tbody>
            </table>
        </div>
    </div>

    <!-- Types Section -->
    <div id="complaints-types" class="form-section">
        <h3>Manage Types</h3>
        
        <div class="form-container">
            <form id="type-form">
                <div class="form-group">
                    <label for="type-category">Select Category:</label>
                    <select id="type-category" name="type-category" required>
                        <option value="">Select Category</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="type-name">Type Name:</label>
                    <input type="text" id="type-name" name="type-name" required>
                </div>
                <button type="submit" class="btn btn-primary">Add Type</button>
            </form>
        </div>

        <div id="type-success" class="alert success" style="display: none;"></div>
        <div id="type-error" class="alert error" style="display: none;"></div>

        <div class="table-container">
            <h4>Existing Types</h4>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Category (Key)</th>
                        <th>Type Name (Key)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="type-list">
                    <!-- Types will be populated here -->
                </tbody>
            </table>
        </div>
    </div>

    <!-- Turnaround Time Section -->
    <div id="complaints-turnaround" class="form-section">
        <h3>Manage Turnaround Times</h3>
        
        <div class="form-container">
            <form id="turnaround-form">
                <div class="form-group">
                    <label for="complaint-category">Select Category:</label>
                    <select id="complaint-category" name="complaint-category" required>
                        <option value="">Select Category</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="complaint-type">Select Type:</label>
                    <select id="complaint-type" name="complaint-type" required>
                        <option value="">Select Type</option>
                    </select>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="low-days">Low Priority (Days):</label>
                        <input type="number" id="low-days" name="low-days" min="1" required>
                    </div>
                    <div class="form-group">
                        <label for="medium-days">Medium Priority (Days):</label>
                        <input type="number" id="medium-days" name="medium-days" min="1" required>
                    </div>
                    <div class="form-group">
                        <label for="medium-high-days">Medium-High Priority (Days):</label>
                        <input type="number" id="medium-high-days" name="medium-high-days" min="1" required>
                    </div>
                    <div class="form-group">
                        <label for="high-days">High Priority (Days):</label>
                        <input type="number" id="high-days" name="high-days" min="1" required>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Add Turnaround Time</button>
            </form>
        </div>

        <div id="turnaround-success" class="alert success" style="display: none;"></div>
        <div id="turnaround-error" class="alert error" style="display: none;"></div>

        <div class="table-container">
            <h4>Existing Turnaround Times</h4>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Low</th>
                        <th>Medium</th>
                        <th>Medium-High</th>
                        <th>High</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="turnaround-list">
                    <!-- Turnaround times will be populated here -->
                </tbody>
            </table>
        </div>
    </div>
</div>
