<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../classes/DropdownManager.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

$categoryManager = new DropdownManager('case_type_dom');

switch ($method) {
    case 'GET':
        $categories = $categoryManager->getDropdownOptions();
        $result = [];
        
        foreach ($categories as $key => $value) {
            // Only include numeric keys (categories)
            if (is_numeric($key)) {
                $result[] = [
                    'id' => (int)$key,
                    'key' => $key,
                    'name' => $value
                ];
            }
        }
        
        // Sort by key
        usort($result, function($a, $b) {
            return strcmp($a['key'], $b['key']);
        });
        
        echo json_encode(['success' => true, 'data' => $result]);
        break;
        
    case 'POST':
        if (!isset($input['name'])) {
            echo json_encode(['success' => false, 'message' => 'Category name is required']);
            break;
        }
        
        $key = $categoryManager->addEntryWithAutoKey($input['name']);
        
        if ($key) {
            echo json_encode([
                'success' => true, 
                'message' => 'Category added successfully',
                'key' => $key
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to add category']);
        }
        break;
        
    case 'DELETE':
        if (!isset($input['key'])) {
            echo json_encode(['success' => false, 'message' => 'Key is required']);
            break;
        }
        
        // First delete all related types
        $typeManager = new DropdownManager('sub_category_0');
        $typeManager->deleteEntriesByPrefix($input['key']);
        
        // Then delete the category
        $success = $categoryManager->deleteEntry($input['key']);
        
        if ($success) {
            echo json_encode(['success' => true, 'message' => 'Category and related types deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete category']);
        }
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
?>
