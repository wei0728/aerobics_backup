<?php
    include "Connect.php";
    if ($_SERVER["REQUEST_METHOD"] == "POST") {     
        session_start();
        $id = $_SESSION['id'];   
        $Connect = new Connect();
        $Connect->sql_setup();               
        if (!$Connect->connect_success()){
            die("Connection failed: " . mysqli_connect_error());
        }                
        $sql = "select * from game where player_id = $id";                    
        $result = $Connect->sql_search($sql, 'json');
        echo $result;
    } else {
        http_response_code(405); // Method Not Allowed
        echo "<script>console.log('Only POST requests are allowed')</>";
        //echo "Only POST requests are allowed";
    }
?>
