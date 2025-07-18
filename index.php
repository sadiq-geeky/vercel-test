<?php include 'includes/header.php'; ?>

<body>
    <div class="container">
        <?php include 'includes/page-header.php'; ?>
        
        <!-- Main Navigation Tabs -->
        <div class="main-tabs">
            <button class="main-tab active" onclick="showModule('complaints')">Complaints Module</button>
            <button class="main-tab" onclick="showModule('general')">General Configuration</button>
            <button class="main-tab" onclick="showModule('notifications')">Notification Configuration</button>
        </div>

        <div class="content-area">
            <?php include 'modules/complaints-module.php'; ?>
            <?php include 'modules/general-module.php'; ?>
            <?php include 'modules/notifications-module.php'; ?>
        </div>
    </div>

    <script src="custom/modules/kmbl_Complain_Conf/custom_ui/js/api-client.js"></script>
    <script src="custom/modules/kmbl_Complain_Conf/custom_ui/js/app-backend.js"></script>
</body>
</html>
