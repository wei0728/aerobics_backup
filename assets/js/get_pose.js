let video;
let features;
let knn;
let poseNet;
let pose;
let score = 0; // 分數
let lock = false; // 作答鎖
let label_pose = document.getElementById("labelpose");
let label_score = document.getElementById("labelscore");
let label_time = document.getElementById("labeltime");
let img = document.getElementById("img1");
let ready = false;
let working = false;
let loadnum = 0;
let labelp;
let key = false;
let cur_pose;

let startTime; // 計時開始的時間點
let duration = 60000; // 總計時時間，例如 180000 毫秒（3 分鐘）

let lastPoseTime = 0; // 上一次偵測到姿勢的時間點
let cooldownDuration = 1000; // 冷卻時間，例如 1000 毫秒（1 秒）

function setup() {
  createCanvas(640, 480, cam); // 建立視訊鏡頭的畫布
  video = createCapture(VIDEO); // 擷取視訊畫面
  video.size(640, 480);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded); // 引用並實體化套件
  knn = ml5.KNNClassifier();
  poseNet.on('pose', gotPoses);
  features = ml5.featureExtractor("MobileNet", modelLoaded);
  get_pose();
}

function draw() {
  try {
    if (ready) { // 若模型皆引入完成則進入
      let elapsedTime = millis() - startTime; // 計算經過的總時間（毫秒）

      if (elapsedTime < duration) { // 檢查是否達到結束時間
        const logits = features.infer(video);
        if (pose) {
          translate(video.width, 0); // 水平翻轉鏡頭畫面
          scale(-1, 1);
          image(video, 0, 0);
          
          // 將經過的時間轉換為秒數
          label_time.innerText = '時間 : ' + Math.floor((60000 - elapsedTime) / 1000);
          if (lock) {
            img.src="../assets/img/check.png";
            label_pose.innerText="回到原位";
            if(isrollback(pose)){
              lock = false; 
              is_label();
            }
            // 如果上鎖，可以在這裡添加顯示鎖定狀態的邏輯
          } else { // 若沒上鎖則進入
            if (is_pose(pose)) {
              //key = true;
              score++;
              label_score.innerText = '分數 : ' + score;
              lastPoseTime = millis(); // 更新上一次偵測到姿勢的時間
              lock = true;
            }
          }

          if (ready && !working) { // 已就緒且未執行，則呼叫一次goClassify()，並由其遞迴自己呼叫
            goClassify();
            working = true;
            is_label();
          }
        }
      } else {
        // 結束計時，發送分數
        send_score("ajax.php", score);
        // 你可以在這裡添加結束後的其他邏輯，例如顯示結果頁面
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  loadnum += 1;
  if (loadnum == 2) {
    ready = true;
    startTime = millis(); // 初始化總計時器
    lastPoseTime = millis(); // 初始化冷卻計時器
    console.log("modelLoaded!");
  }
}

function isSideBend(pose){
  if(                                                       //左肘高於鼻、左肩高於右肩，且..
    pose.leftElbow.y < pose.nose.y &&
    pose.leftShoulder.y < pose.rightShoulder.y &&
    pose.keypoints[7].score > 0.40 &&
    pose.keypoints[0].score > 0.40 &&    
    pose.keypoints[5].score > 0.40 &&
    pose.keypoints[6].score > 0.40
    ){
    return true;
  } else return false;
}

function isSquat(pose) {
    if(                                                       //若鼻子低於250，肩膀低於210，且..
      pose.nose.y > 250 &&
      pose.leftShoulder.y > 210 &&
      pose.keypoints[0].score > 0.60 &&
      pose.keypoints[5].score > 0.60
      ){
      return true;
    } else return false;
}
  
function isFrontBend(pose){
    if(                                                       //兩邊肩膀低於300，且信賴度高於0.4
      pose.rightShoulder.y > 300 &&
      pose.leftShoulder.y > 300 &&
      pose.keypoints[6].score > 0.4 &&
      pose.keypoints[5].score > 0.4
      ){
      return true;
    } else return false;
}

function isJumpingJack(pose) {
    if(
      Math.sqrt(Math.abs(pose.leftElbow.x - pose.leftEar.x) ** 2 +
      Math.abs(pose.leftElbow.y - pose.leftEar.y) ** 2) < 60 /*&&
      pose.keypoints[7].score > 0.60 &&
      pose.keypoints[3].score > 0.60*/
      ){
      return true;
    } else return false;
}

function isleftknee(pose){
    if(                                                       //若左肘與左膝距離<50，且..
      Math.sqrt(Math.abs(pose.leftKnee.x - pose.leftElbow.x) ** 2 +       
      Math.abs(pose.leftKnee.y - pose.leftElbow.y) ** 2) < 50 &&
      pose.keypoints[13].score > 0.60 &&
      pose.keypoints[7].score > 0.60
      ){
      return true;
    } else return false;
}

function isrollback(pose){
  let boo=false;
    switch(cur_pose){
      case 'deep_squat':
      if(
        pose.nose.y<250&&
        pose.leftShoulder.y<300&&
        pose.keypoints[0].score>0.60&&
        pose.keypoints[5].score>0.60
      ) return true;
      break;
      case 'frontbend':
      if(
        pose.nose.y<250&&
        pose.leftShoulder.y<300&&
        pose.keypoints[0].score>0.60&&
        pose.keypoints[5].score>0.60
      )
      break;
      case 'jump_pack':
      if(
        pose.leftShoulder.y<250&&
        pose.rightShoulder.y<250
      )
      break;
      case 'left_ankle_left_knee':
      if(
        pose.leftShoulder.y<250&&
        pose.rightShoulder.y<250
      )
      break;
      case 'sidebend':
      if(true){
        Math.sqrt(Math.abs(pose.leftElbow.x-pose.leftEar.x) **2+
        Math.abs(pose.leftElbow.y-pose.leftEar.y) **2)>80&&
        pose.leftWrist.y>250
      }
      break;
    }
}

function goClassify(){
  try{
    const logits = features.infer(video);
    knn.classify(logits, function(error, result){
      if(error){
        console.log(error);
      } else {
        goClassify();
      }
    });
  } catch(e){
    console.log(e);
  }
}

function get_pose(){
    const urlParams = new URLSearchParams(window.location.search);
    cur_pose = urlParams.get('pose');
}

function is_label(){
    switch(cur_pose){
        case 'deep_squat':
            img.src = "../assets/img/squat.webp";
            label_pose.innerText = "深蹲";
            break;
        case 'frontbend':
            img.src = "../assets/img/frontbend.jpg"
            label_pose.innerText = "站姿前曲";
            break;
        case 'jump_pack':
            img.src = "../assets/img/jump_pack.jpeg";
            label_pose.innerText = "開合跳";
            break;
        case 'left_ankle_left_knee':
            img.src = "../assets/img/left_ankle_left_knee.jpeg"
            label_pose.innerText = "左肘碰左膝";
            break;
        case 'sidebend':
            img.src = "../assets/img/sidebend.jpeg"
            label_pose.innerText = "站姿側曲";
            break;
    }
}

function is_pose(pose){
    switch(cur_pose){
        case 'deep_squat':
            return isSquat(pose);
        case 'frontbend':
            return isFrontBend(pose);
        case 'jump_pack':
            return isJumpingJack(pose);
        case 'left_ankle_left_knee':
            return isleftknee(pose);
        case 'sidebend':
            return isSideBend(pose);
    }
}

function send_score(url, score){
  var xhr = new XMLHttpRequest();
      const urlParams = new URLSearchParams(window.location.search);
      var va_pose = urlParams.get('pose');
      var va_mode = urlParams.get('mode');
      // Prepare the data to send
      var data = {
        score: score, // 分數
        mode: va_mode,
        pose: va_pose
      };
      
      // Convert the data to a JSON string
      var jsonData = JSON.stringify(data);
      
      // Set up the AJAX request
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      
      // Define what happens on successful data submission
      xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            location.href = va_mode + "_result.php" + window.location.search;   
            // Request was successful
              //console.log(xhr.responseText); // Log the response from the server
          }
      };
      
      // Send the request
      xhr.send(jsonData);
}
