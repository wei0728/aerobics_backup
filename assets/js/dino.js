let board;
let boardWidth = 1440;
let boardHeight = 250;
let context;

let dinoWidth = 86;
let dinoHeight = 100;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;
let handstate = 0;

let dino={
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}
//cactus
let cactusArray = [];
let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 75;
let cactusX = 700;
let cactusY =boardHeight-cactusHeight+5;

let cactus1Img;
let cactus2Img;
let cactus3Img;

//sketch parameters
//physics
let velocityX = -8;
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;
let frame = 0;

let video;
let features;
let KNN;
let labelP;
let ready=false;
let model;
//screen frame onloading
window.onload = function(){ 

    if(gameOver == true){

        getElementById.ready 
        document.addEventListener("keydown", playAgain);
        return;
    }
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");
    //drow initial dinosour
    //context.fillStyle = 'green';
    //context.fillRect(dino.x, dino.y, dino.width, dino.height);
    dinoImg = new Image();
    dinoImg.src = "../assets/img/dino.png";
    dinoImg.onload = function(){
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }
    cactus1Img = new Image();
    cactus1Img.src = "../assets/img/cactus1.png";
    cactus2Img = new Image();
    cactus2Img.src = "../assets/img/cactus2.png";
    cactus3Img = new Image();
    cactus3Img.src = "../assets/img/cactus3.png";
    setTimeout(function(){   
      requestAnimationFrame(update);
      document.addEventListener("keydown", moveDino);
      setInterval(placeCactus, 1000);
    }, 5000);
 
}
//keyPressed();
function update(){
    if (gameOver==true){    
        send_score("runner.php");
        return ;
    }
    console.log(handstate);
    if(handstate == 1 && dino.y == dinoY){
      velocityY = -10;
      if(handstate == 0){
        console.log(handstate);
      }
      //gameOver = false;
    }


    context.clearRect(0,0,board.width,board.height);

    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY);

    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    for(let i = 0; i < cactusArray.length; i++){
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

        if (detectCollision(dino, cactus)){
            gameOver = true;
            dinoImg.src = "../assets/img/dino-dead.png";
            dinoImg.onload = function(){
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            }
        }
    }

    context.fillStyle = "black";
    context.font = "20px Pixel";
    score++;
    context.fillText(score, 5,20);
    requestAnimationFrame(update);        
}

function moveDino(e){
    if (gameOver==true){
        document.addEventListener("keydown",playAgain) 
    }
    if((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY){
        velocityY = -10;
        //gameOver = false;
    }
}

function moveDino_hand(){
  if (gameOver==true){
      document.addEventListener("keydown",playAgain) 
  }
  if(handstate == 0 && dino.y == dinoY){
      velocityY = -10;
      if(handstate == 0){
        console.log(handstate);
      }
      //gameOver = false;
  }

}

function placeCactus(){

    let cactus = {
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height : cactusHeight
    }

    let placeCactusChance = Math.random();

    if(placeCactusChance < .90){
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }
    else if(placeCactusChance > .70){
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
    else if(placeCactusChance > .50){
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }
    if (cactusArray.length > 5){
        cactusArray.shift();
    }
}

function detectCollision(a,b){
    return  a.x < b.x + b.width && 
            a.x + a.width > b.x &&
            a.y < b.y + b.height && 
            a.y + a.height > b.y; 
}

function replace(){
    dino.y = dinoY;
    cactus.x = cactusX;
    cactusArray = [];
}

function playAgain(e){
    if(e.code == "Space" || e.code == "ArrowUp"){
        location.reload(true);
    }
}
function return_score(){
    return score;
}
function send_score(url){
    var xhr = new XMLHttpRequest();
        
        // Prepare the data to send
        var data = {
            value: score // Change 'Your value here' to the value you want to send
        };
        
        // Convert the data to a JSON string
        var jsonData = JSON.stringify(data);
        
        // Set up the AJAX request
        xhr.open("POST", url, true);
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
/*function send_score() {
    var data = {
        value: score // Ensure 'score' is defined and holds the value you want to send
    };

    $.ajax({
        url: "runner.php", // The server-side script to send data to
        type: "POST", // Use POST method
        contentType: "application/json", // Set the content type of the request
        data: JSON.stringify(data), // Convert data object to JSON string
        success: function(response) {
            // This function is called if the request was successful
            console.log(response); // Log the response from the server
        },
        error: function(xhr, status, error) {
            // This function is called if an error occurred during the request
            console.error("Error: " + status + " " + error);
        }
    });
}*/
