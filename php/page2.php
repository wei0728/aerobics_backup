<!DOCTYPE html>

<head>
    <meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8">
    <link rel="stylesheet" href="../assets/css/home_page.css">
    <script src = "../assets/js/choose_mode.js"></script>
    <title>lobby</title>
</head>

<body>
    <?php session_start() ?>
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
            <li><a href="home_page.php">遊戲</a>
                <ul>
                    <li><a href="runner.php">小恐龍</a></li>
                    <li><a href="snake.php">貪食蛇</a></li>
                    <li><a href="classic_game.php">小星星</a></li>
                </ul>
            </li>
            <li><a href="page2.php">健身操</a>
                <ul>
                    <li><a onclick="sendGet('jump_pack')">開合跳</a></li>
                    <li><a onclick="sendGet('deep_squat')">深蹲</a></li>
                    <li><a onclick="sendGet('deep_squat')">側身伸展</a></li>  
                    <li><a onclick="sendGet('frontbend')">站姿前驅</a></li>
                    <li><a onclick="train()">站姿前驅</a></li>
                </ul>
            </li>
        </ul>
    </div>

    <!--中間-->
    <div class="all">
        <div class="show_game">
            <div class="card">
                <div class="pic">
                <div onclick="sendGet('jump_pack')"><img src="../assets/img/jump_pack.jpeg" , alt="Avatar"></div>
                </div>
                <div class="text">
                    <h3>開合跳</h3>
                    <p><b>準備姿勢：</b>抬頭挺胸，眼睛直視前方，雙手垂在身體兩側。
                        <b>起跳：</b>上跳時，雙腳向外張開，雙手高舉過頭到接近頭頂正上方的位置。雙手雙腳打直，膝蓋不彎曲。</p>
                </div>
            </div>

            <div class="card">
                <div class="pic">
                    <div onclick="sendGet('deep_squat')"><img src="../assets/img/squat.webp" , alt="Avatar"></div>
                </div>
                <div class="text">
                    <h3>深蹲</h3>
                    <p>(1)雙腳分開略寬於臀部。<br>
                        (2)挺胸，收緊核心，將重心轉移到腳跟上。<br>
                        (3)慢慢將臀部往下推，直到大腿平行於地板。<br>
                        (4)過程中，頭部與頸椎呈一直線，不要低頭或者仰頭使力。</p>
                </div>
            </div>

            <div class="card">
                <div class="pic">
                    <div  onclick="sendGet('sidebend')"><img src="../assets/img/sidebend.jpeg" , alt="Avatar"></div>
                </div>
                <div class="text">
                    <h3>側身伸展</h3>
                    <p>側身伸展從站立姿勢開始，舉起一隻手臂過頭頂，慢慢向對側彎曲。保持上半身在同一平面內，感受側腰伸展，然後回到起始位置並換邊重複。
                    </p>
                </div>
            </div>

            <div class="card">
                <div class="pic">
                    <div  onclick="sendGet('frontbend')"><img src="../assets/img/frontbend.jpg" , alt="Avatar"></div>
                </div>
                <div class="text">
                    <h3>站姿前驅</h3>
                    <p>前彎是一種基本且有效的伸展運動，廣泛應用於瑜伽、普拉提及各種健身訓練中。這個動作主要針對下背部、臀部、大腿後側肌群及脊椎的柔韌性，能夠促進血液循環、緩解壓力並提升整體身體的靈活性。
                    </p>
                </div>
            </div>
            
        </div>
    </div>
</body>