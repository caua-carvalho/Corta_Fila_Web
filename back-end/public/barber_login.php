<?php
header('Content-Type: application/json');
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['phone']) || empty($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields']);
    exit;
}

$stmt = $pdo->prepare('SELECT barber_id, password_hash FROM barbers WHERE phone = ?');
$stmt->execute([$data['phone']]);
$barber = $stmt->fetch();

if ($barber && password_verify($data['password'], $barber['password_hash'])) {
    echo json_encode(['success' => true, 'barber_id' => $barber['barber_id']]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
}
?>
