<?php

class DropdownManager 
{
    protected $langFile = 'custom/include/language/en_us.lang.php';
    protected $dropdownName = 'case_type_dom';
    
    public function __construct($dropdownName = 'case_type_dom') 
    {
        $this->dropdownName = $dropdownName;
    }
    
    protected function loadDropdown()
    {
        if (!file_exists($this->langFile)) {
            return [];
        }
        
        include($this->langFile);
        return isset($app_list_strings[$this->dropdownName]) ? $app_list_strings[$this->dropdownName] : [];
    }
    
    public function getDropdownOptions()
    {
        return $this->loadDropdown();
    }
    
    public function getNextSequentialKey($prefix = '')
    {
        $dropdown = $this->loadDropdown();
        $maxKey = 0;
        
        if ($prefix) {
            // For types: find max key with the given prefix
            foreach (array_keys($dropdown) as $key) {
                if (strpos($key, $prefix . '_') === 0) {
                    $suffix = substr($key, strlen($prefix) + 1);
                    if (is_numeric($suffix)) {
                        $maxKey = max($maxKey, (int)$suffix);
                    }
                }
            }
            return $prefix . '_' . str_pad($maxKey + 1, 4, '0', STR_PAD_LEFT);
        } else {
            // For categories: find max numeric key
            foreach (array_keys($dropdown) as $key) {
                if (is_numeric($key)) {
                    $maxKey = max($maxKey, (int)$key);
                }
            }
            return str_pad($maxKey + 1, 4, '0', STR_PAD_LEFT);
        }
    }
    
    protected function updateDropdownEntry($key, $value)
    {
        if (!file_exists($this->langFile)) return false;
        
        $content = file_get_contents($this->langFile);
        if (!$content) return false;
        
        // Ensure dropdown array exists in file
        $dropdownBlockPattern = "/\\\$app_list_strings\\['{$this->dropdownName}'\]\s*=\s*array\s*$$(.*?)$$;/s";
        if (!preg_match($dropdownBlockPattern, $content, $matches)) {
            // Create new dropdown array if missing
            $newArray = "\n\$app_list_strings['{$this->dropdownName}'] = array (\n  '$key' => '$value',\n);\n";
            return file_put_contents($this->langFile, $content . $newArray) !== false;
        }
        
        $block = $matches[1];
        // Check if key exists and replace it
        $keyPattern = "/['\"]" . preg_quote($key, '/') . "['\"]\s*=>\s*['\"].*?['\"],?/";
        if (preg_match($keyPattern, $block)) {
            $newEntry = "'$key' => '$value',";
            $newBlock = preg_replace($keyPattern, $newEntry, $block);
        } else {
            // Add new key-value before the closing parenthesis
            $newBlock = $block . "\n  '$key' => '$value',";
        }
        
        // Replace the full dropdown block
        $newContent = str_replace($matches[0], "\$app_list_strings['{$this->dropdownName}'] = array ($newBlock\n);", $content);
        return file_put_contents($this->langFile, $newContent) !== false;
    }
    
    public function addEntry($key, $value)
    {
        return $this->updateDropdownEntry($key, $value);
    }
    
    public function addEntryWithAutoKey($value, $prefix = '')
    {
        $key = $this->getNextSequentialKey($prefix);
        return $this->updateDropdownEntry($key, $value) ? $key : false;
    }
    
    public function updateEntry($key, $value)
    {
        return $this->updateDropdownEntry($key, $value);
    }
    
    public function deleteEntry($key)
    {
        if (!file_exists($this->langFile)) return false;
        
        $content = file_get_contents($this->langFile);
        if (!$content) return false;
        
        $dropdownBlockPattern = "/\\\$app_list_strings\\['{$this->dropdownName}'\]\s*=\s*array\s*$$(.*?)$$;/s";
        if (!preg_match($dropdownBlockPattern, $content, $matches)) {
            return false;
        }
        
        $block = $matches[1];
        $keyPattern = "/['\"]" . preg_quote($key, '/') . "['\"]\s*=>\s*['\"].*?['\"],?\s*/";
        $newBlock = preg_replace($keyPattern, '', $block);
        
        $newContent = str_replace($matches[0], "\$app_list_strings['{$this->dropdownName}'] = array ($newBlock\n);", $content);
        return file_put_contents($this->langFile, $newContent) !== false;
    }
    
    public function getEntriesByPrefix($prefix)
    {
        $dropdown = $this->loadDropdown();
        $result = [];
        
        foreach ($dropdown as $key => $value) {
            if (strpos($key, $prefix . '_') === 0) {
                $result[$key] = $value;
            }
        }
        
        return $result;
    }
    
    public function deleteEntriesByPrefix($prefix)
    {
        $dropdown = $this->loadDropdown();
        $keysToDelete = [];
        
        foreach (array_keys($dropdown) as $key) {
            if (strpos($key, $prefix . '_') === 0) {
                $keysToDelete[] = $key;
            }
        }
        
        $success = true;
        foreach ($keysToDelete as $key) {
            if (!$this->deleteEntry($key)) {
                $success = false;
            }
        }
        
        return $success;
    }
}
