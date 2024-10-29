<!DOCTYPE html>
<html lang="en">
    <head>             
        <title>dino runner</title>   
        <script scr = "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="//cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
        <link rel="stylesheet" href="../assets/css/dino.css">
        <script src="../assets/js/dino.js"></script>        
        <script src="../assets/model.json" id="model"></script> 
        <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"></script>
    </head>
    <body>  

        <h1>dino runner advanture</h1>
        <div class="canvas_container">       
            <canvas id="board"></canvas>
            <div id = "score"></div>
        </div>
        <?php
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                // Get the JSON data sent from the client
                $json_data = file_get_contents("php://input");
                
                $data = json_decode($json_data, true);
                $value = $data['value'];
                session_start();
                $server_name = '127.0.0.1:3306';
                $username = 'root';
                $password = '12345678';
                $dbname = 'project';
                $conn = mysqli_connect($server_name, $username, $password, $dbname);
                if (!$conn){
                    die("Connection failed: " . mysqli_connect_error());
                }
                $id = $_SESSION['id'];               
                $sql = "select * from game where player_id = '$id'";                    
                $result = mysqli_query($conn, $sql);
                if (mysqli_num_rows($result) > 0) {     
                    // output data of each row
                    $sql = "update game set dino = $value where player_id = $id";
                    mysqli_query($conn, $sql);
                }
                else {
                    $sql = "insert into game (player_id, dino) Values ('$id', $value)";
                    mysqli_query($conn, $sql);
                }
                
            } else {
                http_response_code(405); // Method Not Allowed
                echo "<script>console.log('Only POST requests are allowed')</>";
                //echo "Only POST requests are allowed";
            }
        ?>
    </body>
</html>