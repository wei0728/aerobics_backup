<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <link rel=stylesheet type="text/css" href="../assets/css/noob_training.css">
        <script src="//cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
        <script src="https://unpkg.com/ml5@0.12.2/dist/ml5.min.js" type="text/javascript"></script>
        <script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"></script>
    </head>
    <body>
        <canvas id = "cam" width="320" height="240"></canvas>
        <div class="iframe-container">
            <p id="labeltime" class="label" ></p>
            <p id="labelscore" class="label" style="color:red"></p>
            <img id="img1" width="460" height="415" >
            <p id="labelpose" class="label" >loading...</p>
        </div>
        <script src="../assets/js/noob_training.js"></script>
    </body>
    <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST"){
            include "Connect.php";
            $json_data = file_get_contents("php://input");
            session_start();
            $id = $_SESSION['id'];
            $Connect = new Connect();
            $Connect->sql_setup();               
            if (!$Connect->connect_success()){
                die("Connection failed: " . mysqli_connect_error());
            }                
            $sql = "select * from game where player_id = $id";                    
            $result = $Connect->sql_command($sql);
            if (mysqli_num_rows($result) > 0) {     
                // output data of each row
                //if 現有資料大於等於傳送來的資料
                $sql = "update game set json = '$json_data' where player_id = $id";
                $Connect->sql_command($sql);
            }
            else {
                $sql = "insert into game(player_id, json) Values ('$id', '$json_data')";
                $Connect->sql_command($sql);
            }
        }
        ?>
</html>
