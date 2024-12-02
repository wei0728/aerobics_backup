<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="../assets/css/edit.css">
        <title>edit</title>
    </head>
    <body>
        <form action="#" method="post">
            <div class="container">
                <label for='new_password'><b>new password : </b></label>
                <input type="text" placeholder="Enter Password" name="new_password" required><br>  
                <label for="confirm_password"><b>confirm password :</b></label>
                <input type="password" placeholder="confirm Password" name="confirm_password" required><br>  
                <div class="button-group">
                    <button type="submit" class="btn confirm-btn"><b>確認</b></button>
                    <button type="reset" class="btn cancel-btn" onclick="location.href='home_page.php'">取消</button>
                </div>
            </div>
        </form>
        <?php
            session_start();
            if ($_SERVER["REQUEST_METHOD"] == "POST"){
                if ($_POST['confirm_password'] == $_POST["new_password"]){
                    $server_name = '127.0.0.1:3306';
                    $username = 'root';
                    $password = '12345678';
                    $dbname = 'project';
                    $conn = mysqli_connect($server_name, $username, $password, $dbname);
                    if (!$conn){
                        die("Connection failed: " . mysqli_connect_error());
                    }
                    $psw = $_POST["new_password"];
                    $acc = $_SESSION['account'];
                    $sql = "update account set player_psw = md5('$psw') where player_acc = '$acc'";
                    mysqli_query($conn, $sql); 
                    header("Location: login_page.php");
                    $message = "password changed successfully";
                    echo "<script>alert('$message');</script>";
                }
            }
        ?>
    </body>
</html>