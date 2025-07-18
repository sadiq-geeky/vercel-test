<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../classes/DropdownManager.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

$typeManager = new DropdownManager('sub_category_0');
$categoryManager = new DropdownManager('case_type_dom');

switch ($method) {
    case 'GET':
        $types = $typeManager->getDropdownOptions();
        $categories = $categoryManager->getDropdownOptions();
        $result = [];
        
        foreach ($types as $key => $value) {
            // Extract category key from type key (format: categoryKey_typeKey)
            $parts = explode('_', $key, 2);
            if (count($parts) === 2) {
                $categoryKey = $parts[0];
                $categoryName = isset($categories[$categoryKey]) ? $categories[$categoryKey] : $categoryKey;
                
                $result[] = [
                    'key' => $key,
                    'name' => $value,
                    'categoryKey' => $categoryKey,
                    'categoryName' => $categoryName
                ];
            }
        }
        
        // Sort by category key, then by type key
        usort($result, function($a, $b) {
            $categoryCompare = strcmp($a['categoryKey'], $b['categoryKey']);
            if ($categoryCompare === 0) {
                return strcmp($a['key'], $b['key']);
            }
            return $categoryCompare;
        });
        
        echo json_encode(['success' => true, 'data' => $result]);
        break;
        
    case 'POST':
        if (!isset($input['name']) || !isset($input['categoryKey'])) {
            echo json_encode(['success' => false, 'message' => 'Type name and category key are required']);
            break;
        }
        
        $key = $typeManager->addEntryWithAutoKey($input['name'], $input['categoryKey']);
        
        if ($key) {
            echo json_encode([
                'success' => true, 
                'message' => 'Type added successfully',
                'key' => $key
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to add type']);
        }
        break;
        
    case 'DELETE':
        if (!isset($input['key'])) {
            echo json_encode(['success' => false, 'message' => 'Key is required']);
            break;
        }
        
        $success = $typeManager->deleteEntry($input['key']);
        
        if ($success) {
            echo json_encode(['success' => true, 'message' => 'Type deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete type']);
        }
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
?>
