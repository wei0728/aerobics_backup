var platforms;
var score = 0;
var scoreText = document.getElementById('labeltime');
var main_screen = document.getElementById('main-game');
var end_screen = document.getElementById("game_over_list");
end_screen.style.display = 'none';

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};
var game = new Phaser.Game(config);
function preload (){
  try{
    this.load.image('sky', '../assets/img/sky.png');
    this.load.image('ground', '../assets/img/platform.png');
    this.load.image('star', '../assets/img/star.png');
    this.load.image('bomb', '../assets/img/bomb.png');
    this.load.spritesheet(
      'dude','../assets/img/dude.png',{ frameWidth: 32, frameHeight: 48 } );
  }catch(e){console.log(e);}
}
function create (){
  try{
    this.add.image(400, 300, 'sky');
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    cursors = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
  }catch(e){console.log(e);}
}
function update (){
    document.getElementById('sum').removeAttribute("hidden");
    console.log(score);
  //console.log(controller);
  try{
    if (controller=="l"){
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (controller=="r"){
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else if(controller=="n"){
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (controller=="u" && player.body.touching.down){
        player.setVelocityY(-400);
    }
  }catch(e){}
}

function collectStar (player, star){
  star.disableBody(true, true);
  score += 10;
  scoreText.setText('Score: ' + score);
  if (stars.countActive(true) === 0){
    stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });
    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

  }
}
function hitBomb (player, bomb){
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');
  gameOver = true;
  document.getElementById('sum').removeAttribute("hidden");
  main_screen.style.display = 'none';
  end_screen.style.display = 'block';
  send_score(score);
}

function reload(){
  location.reload();
}

function home(){
  window.location.href = 'home_page.php';
}


function setValue() {
  document.getElementById('hiddenField').value = score;

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
      xhr.open("POST", "classic_game.php", true);
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