<?php
require_once 'config.php';

$id = intval($_GET['id'] ?? 0);

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'erro' => 'ID inválido']);
    exit;
}

try {
    $sql = "SELECT * FROM pacientes WHERE id = :id LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $id]);
    $paciente = $stmt->fetch();

    if (!$paciente) {
        http_response_code(404);
        echo json_encode(['sucesso' => false, 'erro' => 'Paciente não encontrado']);
        exit;
    }

    // Formata o nome completo
    $paciente['nome'] = trim($paciente['nome'] . ' ' . ($paciente['sobrenome'] ?? ''));

    echo json_encode(['sucesso' => true, 'cliente' => $paciente]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['sucesso' => false, 'erro' => $e->getMessage()]);
}
