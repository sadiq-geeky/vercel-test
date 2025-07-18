<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$turnaroundFile = '../data/turnarounds.json';

// Ensure data directory exists
$dataDir = dirname($turnaroundFile);
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

// Initialize file if it doesn't exist
if (!file_exists($turnaroundFile)) {
    file_put_contents($turnaroundFile, json_encode([]));
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

function loadTurnarounds($file) {
    if (!file_exists($file)) {
        return [];
    }
    $content = file_get_contents($file);
    return json_decode($content, true) ?: [];
}

function saveTurnarounds($file, $data) {
    return file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT)) !== false;
}

function getNextId($turnarounds) {
    $maxId = 0;
    foreach ($turnarounds as $turnaround) {
        if (isset($turnaround['id']) && $turnaround['id'] > $maxId) {
            $maxId = $turnaround['id'];
        }
    }
    return $maxId + 1;
}

switch ($method) {
    case 'GET':
        $turnarounds = loadTurnarounds($turnaroundFile);
        
        // Load category and type names for display
        require_once '../classes/DropdownManager.php';
        $categoryManager = new DropdownManager('case_type_dom');
        $typeManager = new DropdownManager('sub_category_0');
        
        $categories = $categoryManager->getDropdownOptions();
        $types = $typeManager->getDropdownOptions();
        
        // Enhance turnaround data with names
        foreach ($turnarounds as &$turnaround) {
            $turnaround['categoryName'] = isset($categories[$turnaround['categoryKey']]) 
                ? $categories[$turnaround['categoryKey']] 
                : $turnaround['categoryKey'];
            $turnaround['typeName'] = isset($types[$turnaround['typeKey']]) 
                ? $types[$turnaround['typeKey']] 
                : $turnaround['typeKey'];
        }
        
        echo json_encode(['success' => true, 'data' => $turnarounds]);
        break;
        
    case 'POST':
        if (!isset($input['categoryKey']) || !isset($input['typeKey']) || 
            !isset($input['low']) || !isset($input['medium']) || 
            !isset($input['mediumHigh']) || !isset($input['high'])) {
            echo json_encode(['success' => false, 'message' => 'All fields are required']);
            break;
        }
        
        $turnarounds = loadTurnarounds($turnaroundFile);
        
        // Check if combination already exists
        foreach ($turnarounds as $existing) {
            if ($existing['categoryKey'] === $input['categoryKey'] && 
                $existing['typeKey'] === $input['typeKey']) {
                echo json_encode(['success' => false, 'message' => 'Turnaround time already exists for this combination']);
                exit;
            }
        }
        
        $newTurnaround = [
            'id' => getNextId($turnarounds),
            'categoryKey' => $input['categoryKey'],
            'typeKey' => $input['typeKey'],
            'low' => (int)$input['low'],
            'medium' => (int)$input['medium'],
            'mediumHigh' => (int)$input['mediumHigh'],
            'high' => (int)$input['high']
        ];
        
        $turnarounds[] = $newTurnaround;
        
        if (saveTurnarounds($turnaroundFile, $turnarounds)) {
            echo json_encode(['success' => true, 'message' => 'Turnaround time added successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to save turnaround time']);
        }
        break;
        
    case 'DELETE':
        if (!isset($input['id'])) {
            echo json_encode(['success' => false, 'message' => 'ID is required']);
            break;
        }
        
        $turnarounds = loadTurnarounds($turnaroundFile);
        $found = false;
        
        foreach ($turnarounds as $index => $turnaround) {
            if ($turnaround['id'] == $input['id']) {
                unset($turnarounds[$index]);
                $found = true;
                break;
            }
        }
        
        if (!$found) {
            echo json_encode(['success' => false, 'message' => 'Turnaround time not found']);
            break;
        }
        
        // Reindex array
        $turnarounds = array_values($turnarounds);
        
        if (saveTurnarounds($turnaroundFile, $turnarounds)) {
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
