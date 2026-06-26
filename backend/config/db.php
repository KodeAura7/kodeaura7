<?php

$host = "localhost";
$dbname = "u512009538_kodeAura7";
$username = "u512009538_kodeAura7";
$password = "KodeAura7@da";
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
?>