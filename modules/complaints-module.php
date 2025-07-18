<!-- Complaints Module -->
<div id="complaints-module" class="module-content active">
    <div class="sub-tabs">
        <button class="sub-tab active" onclick="showSubSection('complaints', 'turnaround')">Turnaround Time</button>
        <button class="sub-tab" onclick="showSubSection('complaints', 'categories')">Complaint Categories</button>
        <button class="sub-tab" onclick="showSubSection('complaints', 'types')">Complaint Types</button>
    </div>

    <!-- Turnaround Time Configuration -->
    <div id="complaints-turnaround" class="form-section active">
        <h3>Turnaround Time Configuration</h3>
        <div class="alert success" id="turnaround-success"></div>
        <div class="alert error" id="turnaround-error"></div>
        
        <form id="turnaround-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="complaint-category">Complaint Category</label>
                    <select id="complaint-category" required>
                        <option value="">Select Category</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="complaint-type">Complaint Type</label>
                    <select id="complaint-type" required>
                        <option value="">Select Type</option>
                    </select>
                </div>
            </div>
            
            <div class="turnaround-grid">
                <div class="form-group">
                    <label for="low-days">Low (Days)</label>
                    <input type="number" id="low-days" min="1" max="365" required>
                </div>
                <div class="form-group">
                    <label for="medium-days">Medium (Days)</label>
                    <input type="number" id="medium-days" min="1" max="365" required>
                </div>
                <div class="form-group">
                    <label for="medium-high-days">Medium High (Days)</label>
                    <input type="number" id="medium-high-days" min="1" max="365" required>
                </div>
                <div class="form-group">
                    <label for="high-days">High (Days)</label>
                    <input type="number" id="high-days" min="1" max="365" required>
                </div>
            </div>
            
            <button type="submit" class="btn btn-primary">Save Turnaround Time</button>
            <button type="button" class="btn btn-secondary" onclick="resetTurnaroundForm()">Reset</button>
        </form>

        <table class="data-table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Low</th>
                    <th>Medium</th>
                    <th>Medium High</th>
                    <th>High</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="turnaround-list">
            </tbody>
        </table>
    </div>

    <!-- Complaint Categories -->
    <div id="complaints-categories" class="form-section">
        <h3>Complaint Categories</h3>
        <div class="alert success" id="category-success"></div>
        <div class="alert error" id="category-error"></div>
        
        <form id="category-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="category-name">Category Name</label>
                    <input type="text" id="category-name" required>
                    <small class="text-muted">A sequential key (e.g., 0001, 0002) will be automatically generated.</small>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Add Category</button>
            <button type="button" class="btn btn-secondary" onclick="resetCategoryForm()">Reset</button>
        </form>

        <table class="data-table">
            <thead>
                <tr>
                    <th>Category Name (Key)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="category-list">
            </tbody>
        </table>
    </div>

    <!-- Complaint Types -->
    <div id="complaints-types" class="form-section">
        <h3>Complaint Types</h3>
        <div class="alert success" id="type-success"></div>
        <div class="alert error" id="type-error"></div>
        
        <form id="type-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="type-category">Category</label>
                    <select id="type-category" required>
                        <option value="">Select Category</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="type-name">Type Name</label>
                    <input type="text" id="type-name" required>
                    <small class="text-muted">Key will be auto-generated as CategoryKey_0000, CategoryKey_0001, etc.</small>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Add Type</button>
            <button type="button" class="btn btn-secondary" onclick="resetTypeForm()">Reset</button>
        </form>

        <table class="data-table">
            <thead>
                <tr>
                    <th>Category (Key)</th>
                    <th>Type Name (Key)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="type-list">
            </tbody>
        </table>
    </div>
</div>
