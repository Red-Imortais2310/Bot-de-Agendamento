<?php
require_once 'db.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $stmt = $pdo->query('DESCRIBE pacientes');
    $columns = $stmt->fetchAll();
    echo json_encode($columns, JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
