<?php
require_once 'config.php';

$dados = json_decode(file_get_contents('php://input'), true);

$id = !empty($dados['id']) ? intval($dados['id']) : null;
$cliente = trim($dados['cliente'] ?? '');
$servico = trim($dados['servico'] ?? '');
$data = trim($dados['data'] ?? '');
$hora = trim($dados['hora'] ?? '');
$status = trim($dados['status'] ?? 'pendente');
$obs = trim($dados['obs'] ?? ''); // O HTML envia como 'obs'

if (empty($cliente) || empty($servico) || empty($data) || empty($hora)) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'erro' => 'Preencha todos os campos obrigatórios']);
    exit;
}

try {
    if ($id) {
        // Atualizar - salvando na coluna 'observacao'
        $sql = "UPDATE agendamentos SET cliente=:cliente, servico=:servico, data=:data, hora=:hora, status=:status, observacao=:observacao WHERE id=:id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['cliente' => $cliente, 'servico' => $servico, 'data' => $data, 'hora' => $hora, 'status' => $status, 'observacao' => $obs, 'id' => $id]);
    } else {
        // Inserir - salvando na coluna 'observacao'
        $sql = "INSERT INTO agendamentos (cliente, servico, data, hora, status, observacao) VALUES (:cliente, :servico, :data, :hora, :status, :observacao)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['cliente' => $cliente, 'servico' => $servico, 'data' => $data, 'hora' => $hora, 'status' => $status, 'observacao' => $obs]);
        $id = $pdo->lastInsertId();
    }

    echo json_encode(['sucesso' => true, 'id' => $id]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['sucesso' => false, 'erro' => $e->getMessage()]);
}
?>
