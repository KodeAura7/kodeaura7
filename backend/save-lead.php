<?php

header('Content-Type: application/json');

require_once 'config/db.php';

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
    ]);
    exit;
}

// Get form values
$full_name = trim($_POST['full_name'] ?? '');
$email = trim($_POST['email'] ?? '');
$service = trim($_POST['service_of_interest'] ?? '');
$project = trim($_POST['project_details'] ?? '');
$privacy = isset($_POST['privacy_accepted']) ? 1 : 0;

$ip = $_SERVER['REMOTE_ADDR'] ?? '';
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';

// Basic Validation
if (
    empty($full_name) ||
    empty($email) ||
    empty($service) ||
    empty($project) ||
    !$privacy
) {
    echo json_encode([
        "success" => false,
        "message" => "Please fill all required fields."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid email address."
    ]);
    exit;
}

// Prepare SQL
$sql = "INSERT INTO website_leads
(
    full_name,
    email,
    service_of_interest,
    project_details,
    privacy_accepted,
    ip_address,
    user_agent
)
VALUES
(
    ?,?,?,?,?,?,?
)";

$stmt = $conn->prepare($sql);

if (!$stmt) {

    echo json_encode([
        "success" => false,
        "message" => "Database error."
    ]);

    exit;
}

$stmt->bind_param(
    "ssssiss",
    $full_name,
    $email,
    $service,
    $project,
    $privacy,
    $ip,
    $userAgent
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "🎉 Thank you! Your request has been submitted successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Unable to save your request."
    ]);

}

$stmt->close();
$conn->close();

exit;