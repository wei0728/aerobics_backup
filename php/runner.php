<!DOCTYPE html>
<html lang="en">
    <head>             
        <title>dino runner</title>   
        <link rel="stylesheet" href="../assets/css/dino.css">
        <script src="//cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
        <script src="https://unpkg.com/ml5@0.12.2/dist/ml5.min.js" type="text/javascript"></script>
        <script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"></script>
    </head>
    <body>  
        <div id="loading-screen">
            <div class="loader">
                <p>加載中，請稍候...</p>
            </div>
        </div>
        <div id = "main-game">
            <h1>dino runner advanture</h1>
            <div class="canvas_container">       
                <canvas id="board"></canvas>
                <canvas id="cam"></canvas>
                <div id = "score"></div>
            </div>
        </div>
        <audio src='https://node11-cdn.dl-api.com/dl?hash=mDA5liJ1mq1KxLWadLKQUnp5nzWk8gMeN1QR4PBis%2FOqLxAOaoS59s7ZNjBt16H0LzGcyoaHqC83I15Y%2FUoZ%2FuVHB2GBXKPm84NhRA37G%2FKGmpuPwnJCFHQSVrBTgqxZENH%2BK3bZ9jcPOUK%2F%2FnnriHAACqZQLU8qCl8s29SfOEEd7dSoLJJJ3JeuTof3gAhGKAaf6Csu8Hv5ZhwkH45wDw%3D%3D' autoplay loop> </audio>
            <p id="labeltime" class="label" ></p>
            <form action="#" method="post">
                <input type="hidden" id="hiddenField" name="value">
                <button type="submit" onclick="replay()" id="btn" hidden>play again</button>
            </form>
        </div>                    
        <script src="../assets/js/camera.js"></script>           
        <script src="../assets/js/dino.js"></script>  
    </body>
    <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST"){
            include "Connect.php";
            $json_data = file_get_contents("php://input");
            $data = json_decode($json_data, true);    
            $score = $data['score'];
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
                $sql = "update game set dino = $score where player_id = $id";
                $Connect->sql_command($sql);
            }
            else {
                $sql = "insert into game(player_id, dino) Values ('$id', $score)";
                $Connect->sql_command($sql);
            }
        }
        ?>
</html>