<div id="general-module" class="module-content">
    <div class="sub-tabs">
        <button class="sub-tab active" onclick="showSubSection('general', 'system')">System Settings</button>
        <button class="sub-tab" onclick="showSubSection('general', 'branches')">Branches</button>
    </div>

    <!-- System Settings Section -->
    <div id="general-system" class="form-section active">
        <h3>System Settings</h3>
        
        <div class="form-container">
            <form id="system-form">
                <div class="form-group">
                    <label for="system-name">System Name:</label>
                    <input type="text" id="system-name" name="system-name" value="Configuration Management System">
                </div>
                <div class="form-group">
                    <label for="admin-email">Admin Email:</label>
                    <input type="email" id="admin-email" name="admin-email" value="admin@example.com">
                </div>
                <div class="form-group">
                    <label for="timezone">Timezone:</label>
                    <select id="timezone" name="timezone">
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Save Settings</button>
            </form>
        </div>

        <div id="system-success" class="alert success" style="display: none;"></div>
        <div id="system-error" class="alert error" style="display: none;"></div>
    </div>

    <!-- Branches Section -->
    <div id="general-branches" class="form-section">
        <h3>Branch Management</h3>
        
        <div class="form-container">
            <form id="branch-form">
                <div class="form-group">
                    <label for="branch-name">Branch Name:</label>
                    <input type="text" id="branch-name" name="branch-name" required>
                </div>
                <div class="form-group">
                    <label for="branch-code">Branch Code:</label>
                    <input type="text" id="branch-code" name="branch-code" required>
                </div>
                <div class="form-group">
                    <label for="branch-address">Address:</label>
                    <textarea id="branch-address" name="branch-address" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Add Branch</button>
            </form>
        </div>

        <div id="branch-success" class="alert success" style="display: none;"></div>
        <div id="branch-error" class="alert error" style="display: none;"></div>

        <div class="table-container">
            <h4>Existing Branches</h4>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Branch Name</th>
                        <th>Code</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="branch-list">
                    <tr>
                        <td>Main Branch</td>
                        <td>MB001</td>
                        <td>123 Main Street, City</td>
                        <td class="action-buttons">
                            <button class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
