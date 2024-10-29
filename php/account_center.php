<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Access-Control-Allow-Origin" content="*" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script>jQuery.support.cors = true;</script>
        <link rel="stylesheet" href="../assets/css/account_center.css">
        <title>account center</title>    
    </head>   
    <body>
        <header>    
            <?php 
                session_start();
                include "Connect.php";
            ?>
            <h1>帳號中心</h1>
            <div class="link">
                <a href="account_center.php"><?php echo $_SESSION['last_name'].' '.$_SESSION['first_name'];?></a>
                <a href="login_page.php">登出</a>
            </div>
        </header> 
        <div class="flex">
            <div class="info-block">
                <h2>用戶名稱: </h2>
                <?php echo $_SESSION['last_name'].' '.$_SESSION['first_name'];?>
            </div>
            <div class = "info-block">
                <h2>用戶 id:</h2>
                <?php echo $_SESSION['id'];?>
            </div>
            <div class = "info-block">
                <h2>分數換算年齡:</h2>
                <span id = "age"></span>
                <?php
                //edit after
                    $Connect = new Connect();
                    $v = 0;
                    $Connect->sql_setup();
                    if (mysqli_num_rows($Connect->sql_command("select jump_pack from sport_aerobics where player_id = ".$_SESSION['id']))  <= 0|| mysqli_num_rows($Connect->sql_command("select deep_squat from sport_aerobics where player_id = ".$_SESSION['id']))  <= 0|| mysqli_num_rows($Connect->sql_command("select sidebend from sport_aerobics where player_id = ".$_SESSION['id']))  <= 0|| mysqli_num_rows($Connect->sql_command("select frontbend from sport_aerobics where player_id = ".$_SESSION['id'])) <= 0)
                        $v = 'NAN';
                    else {
                        $sql = "select jump_pack from sport_aerobics where player_id = ".$_SESSION['id'];
                        $v += ($Connect->sql_search($sql, 'jump_pack') - 62) / -0.85;
                        $sql = "select deep_squat from sport_aerobics where player_id = ".$_SESSION['id'];
                        $v += ($Connect->sql_search($sql, 'deep_squat') - 34) / -0.31;
                        $sql = "select sidebend from sport_aerobics where player_id = ".$_SESSION['id'];
                        $v += ($Connect->sql_search($sql, 'sidebend') - 33) / -0.33;
                        $sql = "select frontbend from sport_aerobics where player_id = ".$_SESSION['id'];
                        $v += ($Connect->sql_search($sql, 'frontbend') - 38) / -0.42;
                        $v = round($v /= 4);
                    }
                    echo $v;
                ?>
            </div>
        </div>   
        <div class="flex">
            <div class="info-block">
                <h2 id = 'rank_name'>rank:</h2>
                <div class="button-container">
                    <button onclick="jump_pack_rank()" id = "jump_pack">開合跳</button>
                    <button onclick="deep_squat_rank()" id = "deep_squat">深蹲</button>
                    <button onclick="left_ankle_left_knee_rank()" id = "left_ankle_left_knee">左肘碰左膝</button>
                    <button onclick="side_bend_rank()" id = "sidebend">側身伸展</button>
                    <button onclick="front_bend_rank()" id = "frontbend">站姿前曲</button>
                </div>
                <div id = "result1"></div><br>
                <div id = "result2" ></div><br>
                <div id = "result3" ></div><br>
                <div id = "result4" ></div><br>
                <div id = "result5" ></div>
            </div>
            <div class="info-block">
                <h2 id = 'm_rank_name'>marathon: </h2>
                <div class="button-container">
                    <button onclick="marathon_jump_pack_rank()" id = "m_jump_pack">開合跳</button>
                    <button onclick="marathon_deep_squat_rank()" id = "m_deep_squat">深蹲</button>
                    <button onclick="marathon_left_ankle_left_knee_rank()" id = "m_left_ankle_left_knee">左肘碰左膝</button>
                    <button onclick="marathon_side_bend_rank()" id = "m_sidebend">側身伸展</button>
                    <button onclick="marathon_front_bend_rank()" id = "m_frontbend">站姿前曲</button>
                </div>
                <div id = "m_result1"></div><br>
                <div id = "m_result2" ></div><br>
                <div id = "m_result3" ></div><br>
                <div id = "m_result4" ></div><br>
                <div id = "m_result5" ></div>
                <script src="../assets/js/account_center.js"></script>
            </div>
        </div>
        <div class="flex">
            <div class="edit-block">
                <a href="edit.php">edit</a>
                <a href="home_page.php">home</a>
            </div>
        </div>
        <?php
        ob_start();
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Get the JSON data sent from the client
            $json_data = file_get_contents("php://input");
            $data = json_decode($json_data, true);
            $value = $data['value'];
            $mode = $data['mode'];
            if ($mode == "marathon" || "sport"){
                $id = $_SESSION['id'];
                $Connect->sql_setup();
                if (!$Connect->connect_success()){
                    die("Connection failed: " . mysqli_connect_error());
                }
                $a = 69;
                $sql = "SELECT account.player_last_name, account.player_first_name, account.player_id, ".$mode."_aerobics.".$value." FROM account JOIN ".$mode."_aerobics ON account.player_id = ".$mode."_aerobics.player_id ORDER BY ".$mode."_aerobics.".$value." DESC LIMIT 5;";                   
                $result = $Connect->sql_command($sql);
                if ($result->num_rows > 0) {
                    $output = [];
                    while ($row = $result->fetch_assoc()) {
                        $output[] = $row["player_last_name"]. " ".$row["player_first_name"].": "  . $row[$value];
                    }
                    echo json_encode($output, $a);
                } else {
                    echo json_encode(['message' => 'No results found']);
                }
                ob_end_flush();
            }
        } else {

        }
        ?>
    </body>
</html>

