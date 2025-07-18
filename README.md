# Configuration Management System with Sequential Keys

A PHP-based configuration management system that integrates with your existing dropdown management functions using sequential keys for categories (0001, 0002, etc.) and dependent keys for types (0001_0000, 0001_0001, etc.).

## Key Features

### Sequential Key Management
- **Categories**: Auto-generated sequential keys (0001, 0002, 0003, etc.)
- **Types**: Dependent keys using category prefix (0001_0000, 0001_0001, etc.)
- **Automatic Key Generation**: System finds the next available key automatically
- **Dependent Dropdown**: Types are filtered by category key prefix

### Backend Integration
- **DropdownManager Class**: Enhanced with sequential key generation
- **Language File Integration**: Uses `case_type_dom` for categories and `sub_category_0` for types
- **Cascade Delete**: Deleting a category removes all related types and turnarounds

## File Structure

\`\`\`
project/
├── index.php                    # Main entry point
├── classes/
│   └── DropdownManager.php      # Enhanced dropdown management with sequential keys
├── api/
│   ├── categories.php           # Categories API (case_type_dom)
│   ├── types.php               # Types API (sub_category_0)
│   └── turnarounds.php         # Turnarounds API
├── includes/
│   ├── header.php              # HTML head section
│   └── page-header.php         # Page header component
├── modules/
│   ├── complaints-module.php   # Enhanced UI showing keys
│   ├── general-module.php      # General configuration UI
│   └── notifications-module.php # Notification settings UI
├── css/
│   └── styles.css              # All CSS styles
├── js/
│   ├── api-client.js           # API communication layer
│   └── app-backend.js          # Enhanced with key display
└── data/
    └── turnarounds.json        # Turnaround data storage
\`\`\`

## Key Generation Logic

### Categories (case_type_dom)
- Keys: `0001`, `0002`, `0003`, etc.
- Auto-incremented based on existing highest numeric key
- 4-digit zero-padded format

### Types (sub_category_0)
- Keys: `{categoryKey}_{sequence}` (e.g., `0001_0000`, `0001_0001`)
- Dependent on category key
- Auto-incremented within each category
- 4-digit zero-padded sequence

## Setup Instructions

1. **Extract Files**: Place all files in your web server directory
2. **Configure Language File**: Update the `$langFile` path in `DropdownManager.php`
3. **Create Data Directory**: Ensure the `data/` directory exists and is writable
4. **Set Permissions**: Make sure PHP can read/write to the language file

## API Endpoints

### Categories (case_type_dom)
- `GET api/categories.php` - Fetch all categories with sequential keys
- `POST api/categories.php` - Add new category (auto-generates key)
- `PUT api/categories.php` - Update existing category
- `DELETE api/categories.php` - Delete category and all related types

### Types (sub_category_0)
- `GET api/types.php` - Fetch all types with dependent keys
- `POST api/types.php` - Add new type (auto-generates dependent key)
- `PUT api/types.php` - Update existing type
- `DELETE api/types.php` - Delete type

## Example Data Structure

### Language File (custom/include/language/en_us.lang.php)
\`\`\`php
$app_list_strings['case_type_dom'] = array (
  '0001' => 'Service Quality',
  '0002' => 'Billing Issues',
  '0003' => 'Technical Problems',
);

$app_list_strings['sub_category_0'] = array (
  '0001_0000' => 'Slow Response',
  '0001_0001' => 'Poor Quality',
  '0002_0000' => 'Wrong Charges',
  '0002_0001' => 'Missing Invoice',
  '0003_0000' => 'System Down',
);
\`\`\`

## Usage

1. **Add Category**: Enter name, system generates key (e.g., 0004)
2. **Add Type**: Select category, enter name, system generates dependent key (e.g., 0004_0000)
3. **Configure Turnarounds**: Select category and type combinations
4. **View Keys**: All tables show both names and keys for reference

## Requirements

- PHP 5.4 or higher
- Web server with write permissions
- Modern web browser with JavaScript enabled
- Existing SugarCRM/SuiteCRM language file structure
\`\`\`
