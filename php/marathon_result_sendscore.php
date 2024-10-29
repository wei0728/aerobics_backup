<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include "Connect.php";
    session_start();
    // 獲取從客戶端發送的 JSON 數據
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);
    
    // 檢查是否成功解析 JSON
    $mode = $data['mode'];
    $pose = $data['pose'];
    $sql =  "select ".$pose." from ".$mode. "_aerobics where player_id = ".$_SESSION['id'];
    $conn= new Connect();
    $conn->sql_setup();
    $score = $conn->sql_search($sql, $pose);
    $response = array(
        "score" => $score
    );
    echo json_encode($response);
    exit;    
} else {
    http_response_code(405); // Method Not Allowed
    echo "<script>console.log('Only POST requests are allowed');</script>";
}
?>
