<?php
header('Content-Type: application/json');
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['name']) || empty($data['phone']) || empty($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields']);
    exit;
}

$hash = password_hash($data['password'], PASSWORD_BCRYPT);

try {
    $stmt = $pdo->prepare('INSERT INTO barbers (name, phone, password_hash) VALUES (?, ?, ?)');
    $stmt->execute([$data['name'], $data['phone'], $hash]);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(400);
    echo json_encode(['error' => 'Barber registration failed']);
}
?>
