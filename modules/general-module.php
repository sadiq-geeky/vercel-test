<!-- General Configuration Module -->
<div id="general-module" class="module-content">
    <div class="sub-tabs">
        <button class="sub-tab active" onclick="showSubSection('general', 'system')">System Settings</button>
    </div>

    <!-- System Settings -->
    <div id="general-system" class="form-section active">
        <h3>System Settings</h3>
        <div class="alert success" id="system-success"></div>
        <div class="alert error" id="system-error"></div>
        
        <form id="system-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="system-name">System Name</label>
                    <input type="text" id="system-name" value="Complaint Management System">
                </div>
                <div class="form-group">
                    <label for="system-version">Version</label>
                    <input type="text" id="system-version" value="1.0.0">
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Update Settings</button>
        </form>
    </div>
</div>
