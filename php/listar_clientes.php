<?php
require_once 'config.php';

try {
    $sql = "SELECT id, CONCAT(nome, ' ', IFNULL(sobrenome, '')) AS nome, telefone, email, foto, obs, criado 
            FROM pacientes 
            ORDER BY criado DESC";
    
    $stmt = $pdo->query($sql);
    $pacientes = $stmt->fetchAll();

    echo json_encode($pacientes);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => $e->getMessage()]);
}
