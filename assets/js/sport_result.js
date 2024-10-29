
document.addEventListener("DOMContentLoaded", function() {
    let img = document.getElementById('img1');
    let pose = document.getElementById('pose');
    let score = document.getElementById('score').innerText;
    let grade1 = document.getElementById('grade1');
    let grade2 = document.getElementById('grade2');
    let grade3 = document.getElementById('grade3');
    let grade4 = document.getElementById('grade4');
    let grade5 = document.getElementById('grade5');
    let age = document.getElementById('age');
    const urlParams = new URLSearchParams(window.location.search);
    const pose_label = urlParams.get('pose');
    console.log(pose_label);
    const mode_label = urlParams.get('mode');
    //score.innerText = "Your score is : "+ score_label;


    switch (pose_label){
        case "jump_pack":
            pose.innerText = "開合跳";
            img.src = "../assets/img/jump_pack.jpeg";
            grade1.innerText = "45次以上 ---- 卓越：極佳的心肺耐力和全身協調能力。";
            grade2.innerText = "35次 ~ 44次 ---- 優秀：心肺耐力和協調能力良好。";
            grade3.innerText = "25次 ~ 34次 ---- 良好：基本能完成開合跳，有提升空間。";
            grade4.innerText = "15次 ~ 24次 ---- 較弱：需要加強心肺耐力和全身協調。";
            grade5.innerText = "低於15次 ---- 待加強：表現待加強，需立即加強訓練。";            
            score > 45 ? age.innerText = 20 :  age.innerText = Math.round((score -62) / -0.85);
            if (score >= 45) {
                highlight('grade1'); // 卓越
                startConfetti();
            }
            else if (score >= 35 && score <= 44) {
                highlight('grade2'); // 優秀
                startConfetti();
            }
            else if (score >= 25 && score <= 34) {
                highlight('grade3'); // 良好
                startConfetti();
            }
            else if (score >= 15 && score <= 24) {
                highlight('grade4'); // 較弱
            }
            else {
                highlight('grade5'); // 待加強
            }
            break;
        case "deep_squat":
            pose.innerText = "深蹲";
            img.src = "../assets/img/squat.webp";
            grade1.innerText = "25次以上 ---- 卓越：極佳的下肢力量和耐力。";
            grade2.innerText = "20次 ~ 24次 ---- 優秀：下肢力量和耐力良好。";
            grade3.innerText = "15次 ~ 19次 ---- 良好：基本能完成深蹲，有提升空間。";
            grade4.innerText = "10次 ~ 14次 ---- 較弱：需要加強下肢力量和耐力。";
            grade5.innerText = "低於10次 ---- 待加強：表現待加強，需立即加強訓練。";  
            score > 25 ? age.innerText = 25 :  age.innerText =  Math.round((score -34)/ -0.31);
            if (score >= 25) {
                highlight('grade1'); // 卓越
                startConfetti();
            }
            else if (score >= 20 && score <= 24) {
                highlight('grade2'); // 優秀
                startConfetti();
            }
            else if (score >= 15 && score <= 19) {
                highlight('grade3'); // 良好
                startConfetti();
            }
            else if (score >= 10 && score <= 14) {
                highlight('grade4'); // 較弱
            }
            else {
                console.log(score.innerText);
                highlight('grade5'); // 待加強
            }
            break;
        case "left_ankle_left_knee":
            pose.innerText = "左肘碰左膝";
            img.src = "../assets/img/left_ankle_left_knee.jpeg";
            grade1.innerText = "20次以上 ---- 卓越：極佳的核心力量和協調能力。";
            grade2.innerText = "15次 ~ 19次 ---- 優秀：核心力量和協調能力良好。";
            grade3.innerText = "10次 ~ 14次 ---- 良好：基本能完成動作，有提升空間。";
            grade4.innerText = "5次 ~ 9次 ---- 較弱：需要加強核心力量和協調能力。";
            grade5.innerText = "低於5次 ---- 待加強：表現待加強，需立即加強訓練。";            
            score > 20 ? age.innerText = 20 :  age.innerText =  Math.round((score - 25)/ -0.25);
            if (score >= 20) {
                highlight('grade1'); // 卓越
                startConfetti();
            }
            else if (score >= 15 && score <= 19) {
                highlight('grade2'); // 優秀
                startConfetti();
            }
            else if (score >= 10 && score <= 14) {
                highlight('grade3'); // 良好
                startConfetti();
            }
            else if (score >= 5 && score <= 9) {
                highlight('grade4'); // 較弱
            }
            else {
                highlight('grade5'); // 待加強
            }
            break;
        case "sidebend":
            pose.innerText = "站姿側曲";
            img.src = "../assets/img/sidebend.jpeg";
            grade1.innerText = "26次以上 ---- 卓越：極佳的側腹力量和柔韌性。";
            grade2.innerText = "20次 ~ 25次 ---- 優秀：側腹力量和柔韌性良好。";
            grade3.innerText = "15次 ~ 19次 ---- 良好：基本能完成動作，有提升空間。";
            grade4.innerText = "10次 ~ 14次 ---- 較弱：需要加強側腹力量和柔韌性。";
            grade5.innerText = "低於10次 ---- 待加強：表現待加強，需立即加強訓練。";            
            score > 26 ? age.innerText = 20 :  age.innerText =  Math.round((score - 33)/ -0.33);
            if (score >= 26) {
                highlight('grade1'); // 卓越
                startConfetti();
            }
            else if (score >= 20 && score <= 25) {
                highlight('grade2'); // 優秀
                startConfetti();
            }
            else if (score >= 15 && score <= 19) {
                highlight('grade3'); // 良好
                startConfetti();
            }
            else if (score >= 10 && score <= 14) {
                highlight('grade4'); // 較弱
            }
            else {
                highlight('grade5'); // 待加強
            }
            break;
        case "frontbend":
            pose.innerText = "站姿前曲";
            img.src = "../assets/img/frontbend.jpg";
            grade1.innerText = "30次以上 ---- 卓越：極佳的腰背柔韌性和核心力量。";
            grade2.innerText = "25次 ~ 29次 ---- 優秀：腰背柔韌性和核心力量良好。";
            grade3.innerText = "20次 ~ 24次 ---- 良好：基本能完成彎腰，有提升空間。";
            grade4.innerText = "15次 ~ 19次 ---- 較弱：需要加強腰背柔韌性和核心力量。";
            grade5.innerText = "低於15次 ---- 待加強：表現待加強，需立即加強訓練。";            
            score > 30 ? age.innerText = 20 :  age.innerText =  Math.round((score - 38)/ -0.42);
            if (score >= 30) {
                highlight('grade1'); // 卓越
                startConfetti();
            }
            else if (score >= 25 && score <= 29) {
                highlight('grade2'); // 優秀
                startConfetti();
            }
            else if (score >= 20 && score <= 24) {
                highlight('grade3'); // 良好
                startConfetti();
            }
            else if (score >= 15 && score <= 19) {
                highlight('grade4'); // 較弱
            }
            else {
                highlight('grade5'); // 待加強
            }
            break;
    }
});

function highlight(comment) {
    document.getElementById(comment).classList.add('highlight');
}

function clear_highlight(){

}

function startConfetti() {
    run();
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.style.display = 'block'; // 显示画布
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const confetti = [];
    const confettiCount = 300; // 您可以根据需要调整粒子数量
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = [
      { front: 'red', back: 'darkpurple' },
      { front: 'blue', back: 'darkgreen' },
      { front: 'yellow', back: 'darkorange' },
      { front: 'pink', back: 'darkblue' },
      { front: 'purple', back: 'turquoise' },
      // 根据需要添加更多颜色
    ];
  
    // 调整画布大小
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    // 生成指定范围内的随机数
    function randomRange(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    // 初始化彩带粒子
    function initConfetti() {
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
            color: colors[Math.floor(randomRange(0, colors.length))],
            dimensions: { x: randomRange(10, 20), y: randomRange(10, 30) },
            position: { x: randomRange(0, canvas.width), y: canvas.height - 1 },
            rotation: randomRange(0, 2 * Math.PI),
            scale: { x: 1, y: 1 },
            velocity: { x: randomRange(-25, 25), y: randomRange(0, -50) }
            });
        }
        }
  
    // 渲染动画
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach((confetto, index) => {
            confetto.position.x += confetto.velocity.x;
            confetto.position.y += confetto.velocity.y;
            confetto.velocity.y += gravity;
            confetto.velocity.x += confetto.velocity.x * drag;
    
            // 旋转
            confetto.rotation += confetto.velocity.x * 0.01;
    
            // 绘制彩带
            ctx.save();
            ctx.translate(confetto.position.x, confetto.position.y);
            ctx.rotate(confetto.rotation);
            ctx.fillStyle = confetto.color.front;
            ctx.fillRect(-confetto.dimensions.x / 2, -confetto.dimensions.y / 2, confetto.dimensions.x, confetto.dimensions.y);
            ctx.restore();
    
            // 如果彩带超出屏幕底部，则移除
            if (confetto.position.y >= canvas.height) {
            confetti.splice(index, 1);
            }
    
            // 如果所有彩带都已落下，则隐藏画布
            if (confetti.length === 0) {
            canvas.style.display = 'none'; // 隐藏画布
            }
        });
    
        if (confetti.length > 0) {
            requestAnimationFrame(render);
        }
    }
  
    // 初始化和开始渲染
    initConfetti();
    render();
  
    // 监听窗口调整大小事件
    window.addEventListener('resize', resizeCanvas);
}

function sleep(time){
    return new Promise((resolve) => setTimeout(resolve, time));
}
    
async function run(){
    await sleep(1000);
}