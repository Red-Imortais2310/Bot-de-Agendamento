<?php
require_once 'config.php';

$dados = json_decode(file_get_contents('php://input'), true);
$id = !empty($dados['id']) ? intval($dados['id']) : 0;

if ($id <= 0) {
    echo json_encode(['sucesso' => false, 'erro' => 'ID inválido']);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM agendamentos WHERE id = :id");
    $stmt->execute(['id' => $id]);
    echo json_encode(['sucesso' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['sucesso' => false, 'erro' => $e->getMessage()]);
}
?>
