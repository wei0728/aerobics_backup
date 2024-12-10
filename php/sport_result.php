<!DOCTYPE html>
<html>
    <head>
        <?php session_start();?>
        <meta charset="utf-8" />
        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
        <link rel=stylesheet type="text/css" href="../assets/css/result.css">
        <title>運動成績</title>
    </head>

    <body>
    <div id="container">
        <div id="img-container">  
            <div id="pose-name">            
                <h1>運動：</h1>         
                <h1 id="pose">pose</h1>
            </div> 
            <img id="img1" src="" alt="描述圖片">
        </div>
        <div id="comments">
            <div id = flex>        
                <h1> 分數：</h1>
                <h1 id = "score"><?php echo $_SESSION["score"]; ?></h1>
            </div>
            <div id = "flex">
                <h1>分數換算年齡：</h1>
                <h1 id = "age">age</h1>
            </div>
            <div class="comment1" id="grade1">word</div>
            <div class="comment2" id="grade2">word</div>
            <div class="comment3" id="grade3">word</div>
            <div class="comment4" id="grade4">word</div>
            <div class="comment5" id="grade5">word</div>   
            <div class = "btn-container">
                <button class = "button" id = "reload" onclick = reload()>再玩一次</button>
                <button class = "button" id = "home" onclick = home()>回首頁</button>
            </div>     
        </div>   
    </div>        
    <script src="../assets/js/sport_result.js"></script>
</body>
</html>