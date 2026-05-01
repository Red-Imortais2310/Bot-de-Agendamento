<?php
require_once 'config.php';

try {
    // Selecionamos as colunas e apelidamos 'observacao' de 'obs' apenas para o HTML entender
    $sql = "SELECT id, cliente, servico, data, hora, status, observacao AS obs, criado_em FROM agendamentos ORDER BY data ASC, hora ASC";
    $stmt = $pdo->query($sql);
    $agendamentos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($agendamentos);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
