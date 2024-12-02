<!DOCTYPE html>

<head>
    <meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8">
    <link rel="stylesheet" href="../assets/css/home_page.css">
    <title>lobby</title>
    <?php
        session_start();
    ?>
</head>

<body>
    <header>
        <h1><?php echo "歡迎 " . $_SESSION['last_name'] . " " . $_SESSION['first_name'] . " 來到整合肢體辨識技術的創新輔助運動系統"; ?></h1>
        <div class="link">
            <a href="account_center.php"><?php echo $_SESSION['last_name'] . " " . $_SESSION['first_name'] ?></a>
            <a href="front_page.php">登出</a>
        </div>
    </header>

    <!-- 下拉式選單-->
    <div class="list">
        <ul class="drop-down-menu">
            <li><a href="#">遊戲</a>
                <ul>
                    <li><a href="runner.php">小恐龍</a></li>
                    <li><a href="snake.php">貪食蛇</a></li>
                    <li><a href="classic_game.php">小星星</a></li>
                </ul>
            </li>
            <li><a href="page2.php">健身操</a>
                <ul>
                    <li><a href="jump_pack.php">開合跳</a></li>
                    <li><a href="deep_squat.php">深蹲</a></li>
                    <li><a href="left_ankle_left_knee.php">左手肘碰左膝</a></li>
                    <li><a href="sidebend.php">側身伸展</a></li>
                </ul>
            </li>
        </ul>
    </div>

    <!--中間-->
    <div class="all">
        <div class="show_game">
            <div class="card">
                <div class="pic">
                    <a href="runner.php"><img src="../assets/img/dino.png" , alt="Avatar"></a>
                </div>
                <div class="text">
                    <h3>小恐龍</h3>
                    <p>這是一款經典的跑酷遊戲，藉由操作小恐龍無盡的奔跑，躲避各種障礙，以盡可能的奔跑更長的距離。這款遊戲簡單易上手，較為不同的是，我們以雙手控制取代手指的操作，以此來增加遊戲體驗與更高的挑戰性。</p>
                </div>
            </div>

            <div class="card">
                <div class="pic">
                    <a href="snake.php"><img src="../assets/img/snake.jpg" , alt="Avatar"></a>
                </div>
                <div class="text">
                    <h3>貪食蛇</h3>
                    <p>這是一款經典的遊戲，玩家操作小蛇，透過吃掉在畫面中的食物增長身體，同時要避免碰到遊戲畫面的邊界。遊戲一開始，小蛇的身體只有一小部分，藉由吃的食物越來越多，小蛇的長度會不斷變長，速度會越來越快，遊戲也會逐漸變困難且極具挑戰性。</p>
                </div>
            </div>

            <div class="card">
                <div class="pic">
                    <a href="classic_game.php"><img src="../assets/img/star.png" , alt="Avatar"></a>
                </div>
                <div class="text">
                    <h3>吃星星</h3>
                    <p>這是一款經典小遊戲，藉由吃地圖上的小星星和躲避障礙來獲得更多的分數，並操控手部的不同方向，來使地圖上的人物進行移動與跳躍。</p>
                </div>
            </div>
        </div>
    </div>
</body>