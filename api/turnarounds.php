<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../classes/DropdownManager.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

// Use JSON file to store turnaround data
$dataFile = '../data/turnarounds.json';

function loadTurnarounds() {
    global $dataFile;
    if (!file_exists($dataFile)) {
        return [];
    }
    $content = file_get_contents($dataFile);
    return json_decode($content, true) ?: [];
}

function saveTurnarounds($data) {
    global $dataFile;
    $dir = dirname($dataFile);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    return file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT)) !== false;
}

function getCategoryName($categoryKey) {
    $categoryManager = new DropdownManager('case_type_dom');
    $categories = $categoryManager->getDropdownOptions();
    return isset($categories[$categoryKey]) ? $categories[$categoryKey] : '';
}

function getTypeName($typeKey) {
    $typeManager = new DropdownManager('sub_category_0');
    $types = $typeManager->getDropdownOptions();
    return isset($types[$typeKey]) ? $types[$typeKey] : '';
}

switch ($method) {
    case 'GET':
        $turnarounds = loadTurnarounds();
        
        // Enrich with category and type names
        foreach ($turnarounds as &$turnaround) {
            $turnaround['categoryName'] = getCategoryName($turnaround['categoryKey']);
            $turnaround['typeName'] = getTypeName($turnaround['typeKey']);
        }
        
        echo json_encode(['success' => true, 'data' => $turnarounds]);
        break;
        
    case 'POST':
        $required = ['categoryKey', 'typeKey', 'low', 'medium', 'mediumHigh', 'high'];
        foreach ($required as $field) {
            if (!isset($input[$field])) {
                echo json_encode(['success' => false, 'message' => "Field $field is required"]);
                exit;
            }
        }
        
        // Verify category and type exist
        $categoryName = getCategoryName($input['categoryKey']);
        $typeName = getTypeName($input['typeKey']);
        
        if (!$categoryName) {
            echo json_encode(['success' => false, 'message' => 'Invalid category key']);
            break;
        }
        
        if (!$typeName) {
            echo json_encode(['success' => false, 'message' => 'Invalid type key']);
            break;
        }
        
        // Check if combination already exists
        $turnarounds = loadTurnarounds();
        foreach ($turnarounds as $existing) {
            if ($existing['categoryKey'] === $input['categoryKey'] && 
                $existing['typeKey'] === $input['typeKey']) {
                echo json_encode(['success' => false, 'message' => 'Turnaround time already exists for this category and type']);
                exit;
            }
        }
        
        $newId = count($turnarounds) + 1;
        
        $newTurnaround = [
            'id' => $newId,
            'categoryKey' => $input['categoryKey'],
            'typeKey' => $input['typeKey'],
            'low' => (int)$input['low'],
            'medium' => (int)$input['medium'],
            'mediumHigh' => (int)$input['mediumHigh'],
            'high' => (int)$input['high']
        ];
        
        $turnarounds[] = $newTurnaround;
        
        if (saveTurnarounds($turnarounds)) {
            echo json_encode(['success' => true, 'message' => 'Turnaround time saved successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to save turnaround time']);
        }
        break;
        
    case 'DELETE':
        if (!isset($input['id'])) {
            echo json_encode(['success' => false, 'message' => 'ID is required']);
            break;
        }
        
        $turnarounds = loadTurnarounds();
        $turnarounds = array_filter($turnarounds, function($item) use ($input) {
            return $item['id'] != $input['id'];
        });
        
        if (saveTurnarounds(array_values($turnarounds))) {
            echo json_encode(['success' => true, 'message' => 'Turnaround time deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete turnaround time']);
        }
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
?>
