<!-- Notification Configuration Module -->
<div id="notifications-module" class="module-content">
    <div class="sub-tabs">
        <button class="sub-tab active" onclick="showSubSection('notifications', 'email')">Email Settings</button>
        <button class="sub-tab" onclick="showSubSection('notifications', 'sms')">SMS Settings</button>
    </div>

    <!-- Email Settings -->
    <div id="notifications-email" class="form-section active">
        <h3>Email Notification Settings</h3>
        <div class="alert success" id="email-success"></div>
        <div class="alert error" id="email-error"></div>
        
        <form id="email-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="smtp-host">SMTP Host</label>
                    <input type="text" id="smtp-host" placeholder="smtp.gmail.com">
                </div>
                <div class="form-group">
                    <label for="smtp-port">SMTP Port</label>
                    <input type="number" id="smtp-port" placeholder="587">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="smtp-username">Username</label>
                    <input type="email" id="smtp-username">
                </div>
                <div class="form-group">
                    <label for="smtp-password">Password</label>
                    <input type="password" id="smtp-password">
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Save Email Settings</button>
        </form>
    </div>

    <!-- SMS Settings -->
    <div id="notifications-sms" class="form-section">
        <h3>SMS Notification Settings</h3>
        <div class="alert success" id="sms-success"></div>
        <div class="alert error" id="sms-error"></div>
        
        <form id="sms-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="sms-provider">SMS Provider</label>
                    <select id="sms-provider">
                        <option value="twilio">Twilio</option>
                        <option value="nexmo">Nexmo</option>
                        <option value="textlocal">TextLocal</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="sms-api-key">API Key</label>
                    <input type="text" id="sms-api-key">
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Save SMS Settings</button>
        </form>
    </div>
</div>
