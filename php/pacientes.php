<?php
header("Content-Type: application/json; charset=utf-8");
require_once "config.php";
try {
    $stmt = $pdo->query("SELECT * FROM pacientes");
    $pacientes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($pacientes, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["erro" => $e->getMessage()]);
}