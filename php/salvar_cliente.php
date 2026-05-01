<?php
require_once 'config.php';

$dados = json_decode(file_get_contents('php://input'), true);

$nome = trim($dados['nome'] ?? '');
$sobrenome = trim($dados['sobrenome'] ?? '');
$ano_nasc = intval($dados['ano_nasc'] ?? 0);
$telefone = trim($dados['telefone'] ?? '');
$email = trim($dados['email'] ?? '');
$logradouro = trim($dados['logradouro'] ?? '');
$remedios = trim($dados['remedios'] ?? '');
$medico_resp = trim($dados['medico_resp'] ?? '');
$prescricao = trim($dados['prescricao'] ?? '');
$medicos_atend = trim($dados['medicos_atend'] ?? '');
$foto = $dados['foto'] ?? null;
$obs = trim($dados['obs'] ?? '');

if (empty($nome) || empty($telefone)) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'erro' => 'Nome e telefone são obrigatórios']);
    exit;
}

try {
    $sql = "INSERT INTO pacientes (nome, sobrenome, ano_nasc, telefone, email, logradouro, remedios, medico_resp, prescricao, medicos_atend, foto, obs) 
            VALUES (:nome, :sobrenome, :ano_nasc, :telefone, :email, :logradouro, :remedios, :medico_resp, :prescricao, :medicos_atend, :foto, :obs)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nome' => $nome,
        ':sobrenome' => $sobrenome,
        ':ano_nasc' => $ano_nasc > 0 ? $ano_nasc : null,
        ':telefone' => $telefone,
        ':email' => $email,
        ':logradouro' => $logradouro,
        ':remedios' => $remedios,
        ':medico_resp' => $medico_resp,
        ':prescricao' => $prescricao,
        ':medicos_atend' => $medicos_atend,
        ':foto' => $foto,
        ':obs' => $obs
    ]);

    echo json_encode([
        'sucesso' => true,
        'id' => $pdo->lastInsertId(),
        'mensagem' => 'Paciente cadastrado com sucesso'
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['sucesso' => false, 'erro' => $e->getMessage()]);
}
