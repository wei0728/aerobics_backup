<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>打磚塊遊戲</title>
  <link rel="stylesheet" href="styles.css">
  <!-- 引入 p5.js -->
  <script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.min.js"></script>
</head>
<body>
  <div id="gameContainer">
    <button id="fullscreenBtn">全螢幕</button>
    <div id="info">
      <span id="score">分數: 0</span>
      <span id="lives">生命: 3</span>
    </div>
  </div>
  <!-- 引入 p5.js 的 sketch 文件 -->
  <script src="sketch.js"></script>
</body>
</html>
