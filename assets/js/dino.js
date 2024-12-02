// dino-game.js

let board;
let boardWidth = 1440;
let boardHeight = 250;
let context;

let dinoWidth = 86;
let dinoHeight = 100;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight
};

// Cactus
let cactusArray = [];
let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 75;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight + 5;

let cactus1Img;
let cactus2Img;
let cactus3Img;

// Physics parameters
let velocityX = -8;
let velocityY = 0;
let gravity = 0.4;

let gameOverFlag = false;
let score = 0;
let frameCount = 0;

let sumElement = document.getElementById('btn');
let finalScoreElement = document.getElementById('final-score');

window.addEventListener('load', function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");
    
    // 加载恐龙图像
    dinoImg = new Image();
    dinoImg.src = "../assets/img/dino.png";
    dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    };
    
    // 加载仙人掌图像
    cactus1Img = new Image();
    cactus1Img.src = "../assets/img/cactus1.png";
    cactus2Img = new Image();
    cactus2Img.src = "../assets/img/cactus2.png";
    cactus3Img = new Image();
    cactus3Img.src = "../assets/img/cactus3.png";
    
    // 延迟启动游戏以确保ML5.js已加载
    setTimeout(function() {   
        requestAnimationFrame(update);
        setInterval(placeCactus, 1000);
    }, 5000);
});

// 更新游戏状态
function update() {
    if (gameOverFlag) {    
        return;
    }
    
    // 清除画布
    context.clearRect(0, 0, board.width, board.height);
    
    // 根据 controller 变量控制恐龙跳跃
    if (controller === "u" && dino.y === dinoY) {
        velocityY = -12;
    }


    
    // 应用重力
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY);
    
    // 绘制恐龙
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    
    // 移动和绘制仙人掌
    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
        
        // 检测碰撞
        if (detectCollision(dino, cactus)) {
            gameOverFlag = true;
            dinoImg.src = "../assets/img/dino-dead.png";
            dinoImg.onload = function() {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            };
            // 显示游戏结束界面
            send_score(score);
            sumElement.hidden = false;
            finalScoreElement.innerText = score;
            return;
        }
    }
    
    // 绘制分数
    context.fillStyle = "black";
    context.font = "20px Arial";
    score++;
    context.fillText(`分数: ${score}`, 5, 20);
    
    // 继续下一帧
    requestAnimationFrame(update);
}

// 放置仙人掌
function placeCactus() {
    let cactus = {
        img: null,
        x: boardWidth,
        y: cactusY,
        width: null,
        height: cactusHeight
    };

    let placeCactusChance = Math.random();

    if (placeCactusChance < 0.50) {
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
    } else if (placeCactusChance < 0.70) {
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
    } else {
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
    }

    cactusArray.push(cactus);

    // 限制仙人掌数量
    if (cactusArray.length > 5) {
        cactusArray.shift();
    }
}

// 检测碰撞
function detectCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}


function replay(){
    location.reload(true);
}

function send_score(score){
    var xhr = new XMLHttpRequest();
        // Prepare the data to send
        var data = {
          score: score // 分數
        };
        
        // Convert the data to a JSON string
        var jsonData = JSON.stringify(data);
        
        // Set up the AJAX request
        xhr.open("POST", "runner.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        
        // Define what happens on successful data submission
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {  
              // Request was successful
                //console.log(xhr.responseText); // Log the response from the server
            }
        };
        
        // Send the request
        xhr.send(jsonData);
}
  