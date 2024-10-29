<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="utf-8" />
    <title>Signup Page</title>
    <link rel="stylesheet" href="../assets/css/signup_page.css">
</head>
<body>
    <form action="#" method="post">
        <div class="container">
            <div class="imgcontainer">
                <img src="../assets/img/avatar_img2.png" alt="Avatar" class="avatar">
            </div>
            <h1>Register Form</h1>
            
            <label for="first_name"><b>First Name:</b></label>
            <input type="text" placeholder="Enter your first name" name="first_name" id="first_name" required>
            
            <label for="last_name"><b>Last Name:</b></label>
            <input type="text" placeholder="Enter your last name" name="last_name" id="last_name" required>
            
            <label for="account"><b>Account:</b></label>
            <input type="text" placeholder="Enter account" name="account" id="account" required>
            
            <label for="password"><b>Password:</b></label>
            <input type="password" placeholder="Enter Password" name="password" id="password" required>
            
            <button type="submit"><b>Signup</b></button>
            
            <div class="scale">                
                Already have an account? <a href="login_page.php">Login</a>
            </div>
        </div>
    </form>
        <?php
            if ($_SERVER['REQUEST_METHOD'] == 'POST'){
                $server_name = '127.0.0.1:3306';
                $username = 'root';
                $password = '12345678';
                $dbname = 'project';
                $conn = mysqli_connect($server_name, $username, $password, $dbname);
                if (!$conn){
                    die("Connection failed: " . mysqli_connect_error());
                }
                $acc = $_POST['account'];
                $psw = $_POST['password'];
                $sql = "select * from account where player_acc = '$acc' and player_psw = md5('$psw')";
                $result = mysqli_query($conn, $sql); 
                if (mysqli_num_rows($result) > 0) {     
                    // output data of each row
                    while($row = mysqli_fetch_assoc($result)) {
                        $message = "user account have already been created";
                        echo "<script>alert('$message');</script>";
                    }
                }
                else {
                    $f_name = $_POST['first_name'];
                    $l_name = $_POST['last_name'];
                    $sql = "insert into account (player_last_name, player_first_name, player_acc, player_psw) Values ('$l_name', '$f_name', '$acc',md5('$psw'))";
                    $result = mysqli_query($conn, $sql);
                    $message = 'user account created successfully';
                    echo "<script>alert('$message');</script>";
                    header('Location: login_page.php');
                    exit;
                }
            }
        ?>
    </body>                      