<?php
require_once "config.php";
$stmt = $pdo->query("DESCRIBE pacientes");
$colunas = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($colunas, JSON_PRETTY_PRINT);