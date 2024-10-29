<?php
    include "Connect.php";
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the JSON data sent from the client
        $json_data = file_get_contents("php://input");
        
        $data = json_decode($json_data, true);
        $score = $data['score']; 
        $mode = $data['mode'];
        $pose = $data['pose'];          
        session_start();
        $id = $_SESSION['id'];   
        $Connect = new Connect();
        $Connect->sql_setup();               
        if (!$Connect->connect_success()){
            die("Connection failed: " . mysqli_connect_error());
        }                
        $_SESSION['score'] = $score;
        $sql = "select * from ".$mode."_aerobics where player_id = $id";                    
        $result = $Connect->sql_command($sql);
        if (mysqli_num_rows($result) > 0) {     
            // output data of each row
            //if 現有資料大於等於傳送來的資料
            if ($Connect->sql_search($sql, $pose) < $score){

                $sql = "update ".$mode."_aerobics set ".$pose." = $score where player_id = $id";
                $Connect->sql_command($sql);
            }
        }
        else {
            $sql = "insert into ".$mode."_aerobics (player_id, ".$pose.") Values ('$id', $score)";
            $Connect->sql_command($sql);
        }
        
    } else {
        http_response_code(405); // Method Not Allowed
        echo "<script>console.log('Only POST requests are allowed')</>";
        //echo "Only POST requests are allowed";
    }
?>
