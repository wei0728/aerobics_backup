<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <link rel=stylesheet type="text/css" href="../assets/css/noob_training.css">
        <script src="//cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
        <script src="https://unpkg.com/ml5@0.12.2/dist/ml5.min.js" type="text/javascript"></script>
        <script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"></script>
    </head>
    <body>
        <canvas id = "cam" width="320" height="240"></canvas>
        <div class="iframe-container">
            <p id="labeltime" class="label" ></p>
            <p id="labelscore" class="label" style="color:red"></p>
            <img id="img1">
            <p id="labelpose" class="label" >loading...</p>
            <button class = "end-btn" onclick="showAlert()">結束</button>
        </div>
        <script src="../assets/js/get_marathon_pose.js"></script>
    </body>
</html>