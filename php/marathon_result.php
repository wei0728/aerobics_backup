<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <?php 
        session_start();
        include "Connect.php";
    ?>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">    
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../assets/css/marathon_result.css">
    <title>運動成績</title>
</head>

<body>
    <canvas id="confettiCanvas"></canvas>
    <div id="container">
        <div id="img-container">  
            <h1 id="pose-name">            
                <div>運動：</div>         
                <div id="pose"></div>
            </h1> 
            <img id="img1" alt="深蹲姿勢圖片">
        </div>
        <div id="comments">
            <div id="score-container">        
                <h1>分數：</h1>
                <div id="score"><?php echo $_SESSION["score"]; ?></div>
            </div>
            <div class="comment" id="grade1">恭喜你完成挑戰！</div>
        </div>
    </div>
    <script src="../assets/js/marathon_result.js"></script>
</body>
</html>
