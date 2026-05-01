<?php
header('Content-Type: application/json; charset=utf-8');

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

echo json_encode([
    'raw_input' => $raw,
    'json_decode' => $data,
    'json_error' => json_last_error_msg(),
    'method' => $_SERVER['REQUEST_METHOD'],
    'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'NAO_DEFINIDO'
]);
?>
