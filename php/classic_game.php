<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link rel=stylesheet type="text/css" href="../assets/css/classic_game.css">
        <title>Phaser3.70</title>        
        <script src="//cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
        <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"></script>
        <script>
            var model_url = "../assets/model.json";
        </script>
        <a href="home_page.php">
            <button>home</button>
        </a>
    </head>
    <body>
        <form action="#" method = "post">
            <canvas id = "cam" width="320" height="240"></canvas>
            <script src="../assets/js/classic_game.js"></script>        
            <script src="../assets/js/sketch.js"></script>
            <script>var score;</script>
        </form>
    </body>
</html>
