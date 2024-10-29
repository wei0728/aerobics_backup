let video;
let features;
let KNN;
let poseNet;
let pose;
let score = 0;                                            //分數
let mode;                                                 //題號
let cdtimer = 0;                                          //計數器(冷卻
let lock=new Boolean(false);                              //作答鎖
let label_pose = document.getElementById("labelpose");
let label_score = document.getElementById("labelscore");
let label_time=document.getElementById("labeltime");
let img=document.getElementById("img1");
let ready=false;
let working=false;
let loadnum=0;
let labelp;
let models=0;
let key=false;

function setup() {
  createCanvas(640, 480, cam);                            //建立視訊鏡頭的畫布
  video = createCapture(VIDEO);                           //擷取視訊畫面
  video.size(640, 480);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);              //引用並實體化套件
  knn=ml5.KNNClassifier();
  poseNet.on('pose', gotPoses);
  features=ml5.featureExtractor("MobileNet",modelLoaded);
  mode = 0;
}

function draw() {
  try{
    if(ready){                                             //若模型皆引入完成則進入
      cdtimer++;                                           //每次進入則計數器+1 
      if(cdtimer>120){                                     //若冷卻達到100則解鎖
        lock=false; 
      }
      const logits=features.infer(video);
      if (pose) {
        translate(video.width, 0);                         //水平翻轉鏡頭畫面
        scale(-1, 1);
        image(video, 0, 0);
        if (lock==true) {                //若上鎖則顯示答對
          label_time.innerText="答對";
        }
        else{                            //若沒上鎖則進入
          label_time.innerText="...";
          switch(mode){                                    //根據題號進行判斷
            case 0:
              if (isJumpingJack(pose)) {           //若正確則給鑰匙並下一題
                key=true;
                img.src="../assets/img/squat.webp";
                label_pose.innerText = "深蹲";
              }
              break;
            case 1:
              if (isSquat(pose)) {
                key=true;
                img.src="../assets/img/left_ankle_left_knee.jpeg"
                label_pose.innerText = "左肘碰左膝";
              }
              break;
            case 2:
              if (isleftelknee(pose)) {
                key=true;
                img.src="../assets/img/sidebend.jpeg"
                label_pose.innerText = "站姿側曲";
              }
              break;
            case 3:
              if (isSideBend(pose)) {
                key=true;
                img.src="../assets/img/pose.jpg"
                label_pose.innerText = "回到原位";
              }
              break;
            case 4:
              if (isdd(pose)) {
                key=true;
                 img.src="../assets/img/jump_pack.jpeg"
                label_pose.innerText = "開合跳";
              }
              break;
            default:
              console.log("error mode");
          }
          if(key){                                       //有鑰匙則加分、分數更新、加入模型、上鎖、收回鑰匙
            score++;
            label_score.innerText=score;
            posematch(mode);
            cdtimer = 0;
            lock=true;
            mode++;
            if(mode==5){
              mode=0;
            }
            key=false;
          }
        }
        if(ready&& !working){            //已就緒且未執行，則呼叫一次goClassify()，並由其遞迴自己呼叫
          goClassify();
          working=true;
          img.src="https://p0.itc.cn/q_70/images03/20220710/5a95c6e2c4f04d9e923ea7617ef00513.jpeg"
          label_pose.innerText = "開合跳";
        }
      }
    }else{
      label_pose.innerText ="Loading...";
    }
  }catch(e){
    console.log(e);
  }
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}
function modelLoaded() {
  loadnum+=1;
  if(loadnum==2){
    ready=true;
    console.log("modelLoaded!");
  }
}
function isJumpingJack(pose) {
  if(
    Math.sqrt(Math.abs(pose.leftElbow.x-pose.leftEar.x) **2+
    Math.abs(pose.leftElbow.y-pose.leftEar.y) **2)<60/*&&
    pose.keypoints[7].score>0.60&&
    pose.keypoints[3].score>0.60*/
    ){
    return true;
  } else return false;
}

function isSquat(pose) {
  if(                                                       //若鼻子低於250，肩膀低於210，且..
    pose.nose.y>250&&
    pose.leftShoulder.y>210&&
    pose.keypoints[0].score>0.60&&
    pose.keypoints[5].score>0.60
    ){
    return true;
  } else return false;
}

function isleftelknee(pose){
  if(                                                       //若左肘與左膝距離<50，且..
    Math.sqrt(Math.abs(pose.leftKnee.x-pose.leftElbow.x) **2 +       
    Math.abs(pose.leftKnee.y-pose.leftElbow.y) **2)<50 &&
    pose.keypoints[13].score>0.60&&
    pose.keypoints[7].score>0.60
    ){
    return true;
  }else return false;
}

function isSideBend(pose){
  if(                                                       //左肘高於鼻、左肩高於右肩，且..
    pose.leftElbow.y<pose.nose.y&&
    pose.leftShoulder.y<pose.rightShoulder.y&&
    pose.keypoints[7].score>0.40&&
    pose.keypoints[0].score>0.40&&    
    pose.keypoints[5].score>0.40&&
    pose.keypoints[6].score>0.40
    ){
    return true;
  }else return false;
}

function isdd(pose) {
  return true;
}


function goClassify(){
  try{
  const logits=features.infer(video);
  knn.classify(logits,function(error,result){
    if(error){
      console.log(error);
    }else{
      goClassify();
    }
  });}catch(e){
    console.log(e);
  }
}

function posematch(mode){                         //根據題號與畫面，訓練出相應的模型
  const logits=features.infer(video);
  if(mode==0){
    knn.addExample(logits,"mode0");
    console.log()
  }else if(mode==1){
    knn.addExample(logits,"mode1");
  }else if(mode==2){
    knn.addExample(logits,"mode2");
  }else if(mode==3){
    knn.addExample(logits,"mode3");
  }else if(mode==4){
    knn.addExample(logits,"mode4");
  }else{console.log("error");}
  models+=1;
  if(models==20){
    knn.save("model.json");
    location.href="home_page.php";
  }
}