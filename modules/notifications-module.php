<div id="notifications-module" class="module-content">
    <div class="sub-tabs">
        <button class="sub-tab active" onclick="showSubSection('notifications', 'email')">Email Settings</button>
        <button class="sub-tab" onclick="showSubSection('notifications', 'sms')">SMS Settings</button>
    </div>

    <!-- Email Settings Section -->
    <div id="notifications-email" class="form-section active">
        <h3>Email Configuration</h3>
        
        <div class="form-container">
            <form id="email-form">
                <div class="form-group">
                    <label for="smtp-host">SMTP Host:</label>
                    <input type="text" id="smtp-host" name="smtp-host" value="smtp.gmail.com">
                </div>
                <div class="form-group">
                    <label for="smtp-port">SMTP Port:</label>
                    <input type="number" id="smtp-port" name="smtp-port" value="587">
                </div>
                <div class="form-group">
                    <label for="smtp-username">Username:</label>
                    <input type="email" id="smtp-username" name="smtp-username">
                </div>
                <div class="form-group">
                    <label for="smtp-password">Password:</label>
                    <input type="password" id="smtp-password" name="smtp-password">
                </div>
                <div class="form-group">
                    <label for="from-email">From Email:</label>
                    <input type="email" id="from-email" name="from-email">
                </div>
                <div class="form-group">
                    <label for="from-name">From Name:</label>
                    <input type="text" id="from-name" name="from-name" value="Configuration System">
                </div>
                <button type="submit" class="btn btn-primary">Save Email Settings</button>
            </form>
        </div>

        <div id="email-success" class="alert success" style="display: none;"></div>
        <div id="email-error" class="alert error" style="display: none;"></div>
    </div>

    <!-- SMS Settings Section -->
    <div id="notifications-sms" class="form-section">
        <h3>SMS Configuration</h3>
        
        <div class="form-container">
            <form id="sms-form">
                <div class="form-group">
                    <label for="sms-provider">SMS Provider:</label>
                    <select id="sms-provider" name="sms-provider">
                        <option value="twilio">Twilio</option>
                        <option value="nexmo">Nexmo</option>
                        <option value="textlocal">TextLocal</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="sms-api-key">API Key:</label>
                    <input type="text" id="sms-api-key" name="sms-api-key">
                </div>
                <div class="form-group">
                    <label for="sms-api-secret">API Secret:</label>
                    <input type="password" id="sms-api-secret" name="sms-api-secret">
                </div>
                <div class="form-group">
                    <label for="sms-sender-id">Sender ID:</label>
                    <input type="text" id="sms-sender-id" name="sms-sender-id">
                </div>
                <button type="submit" class="btn btn-primary">Save SMS Settings</button>
            </form>
        </div>

        <div id="sms-success" class="alert success" style="display: none;"></div>
        <div id="sms-error" class="alert error" style="display: none;"></div>
    </div>
</div>
