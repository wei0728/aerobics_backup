let video;
let features;
let KNN;
let poseNet;
let pose;
let score = 0; // 分數
let lock = false; // 作答鎖
let label_pose = document.getElementById("labelpose");
let label_score = document.getElementById("labelscore");
let label_time = document.getElementById("labeltime");
let img = document.getElementById("img1");
let stop = document.getElementById("stopgame");
let ready = false;
let working = false;
let loadnum = 0;
let labelp;
let key = false;
let cur_pose;

let begin_time;
let cd_timer;
let past;

// Get 'pose' from URL parameters
const urlParams = new URLSearchParams(window.location.search);
cur_pose = urlParams.get('pose'); // Assign a value to 'cur_pose'

function setup() {
  createCanvas(640, 480, cam); // Corrected createCanvas function
  video = createCapture(VIDEO); // 擷取視訊畫面
  video.size(640, 480);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded); // 引用並實體化套件
  knn = ml5.KNNClassifier();
  poseNet.on('pose', gotPoses);
  features = ml5.featureExtractor("MobileNet", modelLoaded);
  label_score.innerText = "0";
  label_time.innerText = "0秒";
  label_pose.innerText = "動作是...";
}

function draw() {
  try {
    if (ready) {
      if (!working) {
        begin_time = Date.now();
        goClassify();
        working = true;
        is_label();
      } else {
        past = Date.now() - begin_time;
        cd = Date.now() - cd_timer;
        label_time.innerText = Math.floor(past / 1000) + "秒";
        if (true) {
          if (cd > 1000) {
            lock = false;
          }
          const logits = features.infer(video);
          if (pose) {
            translate(video.width, 0); // 水平翻轉鏡頭畫面
            scale(-1, 1);
            image(video, 0, 0);
            if (!lock) {
              if (is_pose(pose)) {
                key = true;
                score++;
                label_score.innerText = score;
                cd_timer = Date.now();
                lock = true;
              }
            }
          }
        } else {
          alert(score);
        }
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
    console.log("modelLoaded!");
  }
}

// Pose detection functions
function isSquat(pose) {
  if (
    pose.nose.y > 250 &&
    pose.leftShoulder.y > 210 &&
    pose.keypoints[0].score > 0.60 &&
    pose.keypoints[5].score > 0.60
  ) {
    return true;
  } else return false;
}

function isFrontBend(pose) {
  if (
    pose.rightShoulder.y > 300 &&
    pose.leftShoulder.y > 300 &&
    pose.keypoints[6].score > 0.4 &&
    pose.keypoints[5].score > 0.4
  ) {
    return true;
  } else return false;
}

function isJumpingJack(pose) {
  if (
    Math.sqrt(
      Math.pow(pose.leftElbow.x - pose.leftEar.x, 2) +
        Math.pow(pose.leftElbow.y - pose.leftEar.y, 2)
    ) < 60
  ) {
    return true;
  } else return false;
}

function isLeftKnee(pose) {
  if (
    Math.sqrt(
      Math.pow(pose.leftKnee.x - pose.leftElbow.x, 2) +
        Math.pow(pose.leftKnee.y - pose.leftElbow.y, 2)
    ) < 50 &&
    pose.keypoints[13].score > 0.60 &&
    pose.keypoints[7].score > 0.60
  ) {
    return true;
  } else return false;
}

function isSideBend(pose) {
  if (
    pose.leftElbow.y < pose.nose.y &&
    pose.leftShoulder.y < pose.rightShoulder.y &&
    pose.keypoints[7].score > 0.40 &&
    pose.keypoints[0].score > 0.40 &&
    pose.keypoints[5].score > 0.40 &&
    pose.keypoints[6].score > 0.40
  ) {
    return true;
  } else return false;
}

function is_pose(pose) {
  switch (cur_pose) {
    case 'deep_squat':
      return isSquat(pose);
    case 'frontbend':
      return isFrontBend(pose);
    case 'jump_pack':
      return isJumpingJack(pose);
    case 'left_ankle_left_knee':
      return isLeftKnee(pose);
    case 'sidebend':
      return isSideBend(pose);
    default:
      return false;
  }
}

function is_label() {
  switch (cur_pose) {
    case 'deep_squat':
      img.src = "../assets/img/squat.webp";
      label_pose.innerText = "深蹲";
      break;
    case 'frontbend':
      img.src = "../assets/img/frontbend.jpg";
      label_pose.innerText = "站姿前曲";
      break;
    case 'jump_pack':
      img.src = "../assets/img/jump_pack.jpeg";
      label_pose.innerText = "開合跳";
      break;
    case 'left_ankle_left_knee':
      img.src = "../assets/img/left_ankle_left_knee.jpeg";
      label_pose.innerText = "左肘碰左膝";
      break;
    case 'sidebend':
      img.src = "../assets/img/sidebend.jpeg";
      label_pose.innerText = "站姿側曲";
      break;
    default:
      label_pose.innerText = "未知動作";
  }
}

function goClassify() {
  try {
    const logits = features.infer(video);
    knn.classify(logits, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        goClassify();
      }
    });
  } catch (e) {
    console.log(e);
  }
}

function showAlert() {
    var score = document.getElementById("labelscore").innerText;
    var time = document.getElementById("labeltime").innerText;
    alert("分數: " + score+"，時間:"+time);
    send_score("ajax.php", score);
}

function send_score(url, score){
    var xhr = new XMLHttpRequest();
        const urlParams = new URLSearchParams(window.location.search);
        var va_pose = urlParams.get('pose');
        var va_mode = urlParams.get('mode');
        // Prepare the data to send
        var data = {
          score: score, // Change 'Your value here' to the value you want to send
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
              location.href = va_mode + "_result.php"+window.location.search;   
              // Request was successful
                //console.log(xhr.responseText); // Log the response from the server
            }
        };
        
        // Send the request
        xhr.send(jsonData);
  }
  