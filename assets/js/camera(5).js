let video;
let features;
let KNN;
let poseNet;
let pose;
let score=0;
let mode;
let begin_time;
let cd_timer;
let past;
let label_pose=document.getElementById("labelpose");
let label_score=document.getElementById("labelscore");
let label_time=document.getElementById("labeltime");
let img=document.getElementById("img1");
let ready=false;
let working=false;
let loadnum=0;
let models=0;
let key=false;
let lock;

function setup(){
  createCanvas(640,480,cam);
  video=createCapture(VIDEO);
  video.size(640,480);
  video.hide();
  poseNet=ml5.poseNet(video,modelLoaded);
  knn=ml5.KNNClassifier();
  poseNet.on('pose',gotPoses);
  features=ml5.featureExtractor("MobileNet",modelLoaded);
  mode=0;
  label_score.innerText="0";
  label_time.innerText="0秒";
  label_pose.innerText="動作是...";
  cd_timer=Date.now();
}

function draw(){
  try{
    if(ready){
      show();
      if(!working){
        already();
      }else if(Date.now()-cd_timer>200){
        const logits=features.infer(video);
        if(past<50000){
          if(!lock){
            if (pose){
              switch(mode){
                case 0:
                  if (isJumpingJack(pose)){
                    key=true;
                  }
                  break;
                case 1:
                  if (isSquat(pose)){
                    key=true;
                  }
                  break;
                case 2:
                  if (isHighKnee(pose)){
                    key=true;
                  }
                  break;
                case 3:
                  if (isFrontBend(pose)){
                    key=true;
                  }
                  break;
                case 4:
                  if (true){
                    key=true;
                  }
                  break;
                default:
                  console.log("error mode");
              }
              if(key){
                posematch(mode);
              }
            }
          }else{
            if(isrollback(pose,mode)){
              lock=false;
            } 
          }
        }else{alert(score);}
      }
    }else{label_pose.innerText="Loading...";}
  }catch(e){
    console.log(e);
  }
}

function gotPoses(poses){
  if (poses.length>0){
    pose=poses[0].pose;
  }
}
function modelLoaded(){
  loadnum+=1;
  if(loadnum==2){
    ready=true;
    console.log("modelLoaded!");
  }
}
function isJumpingJack(pose){
  if(Math.sqrt(Math.abs(pose.leftElbow.x-pose.leftEar.x)**2+
    Math.abs(pose.leftElbow.y-pose.leftEar.y)**2)<60/*&&
    pose.keypoints[7].score>0.60&&
    pose.keypoints[3].score>0.60*/
    ){
    return true;
  } else return false;
}
function isSquat(pose){
  if(pose.nose.y>250&&
    pose.leftShoulder.y>300&&
    pose.keypoints[0].score>0.60&&
    pose.keypoints[5].score>0.60
    ){
    return true;
  } else return false;
}
function isHighKnee(pose){
  if(
    (pose.leftKnee.y<390&&pose.keypoints[13].score>0.40)||
    (pose.rightKnee.y<390&&pose.keypoints[14].score>0.40)
    //pose.leftKnee.y<
    /*(pose.keypoints[13].score>0.70&&pose.keypoints[16].score>0.70&&pose.leftKnee.y>pose.rightAnkle.y)||
    (pose.keypoints[14].score>0.70&&pose.keypoints[15].score>0.70&&pose.rightKnee.y>pose.leftAnkle.y)*/
    ){
    return true;
  }else return false;
}
function isSideBend(pose){
  if(pose.leftElbow.y<pose.nose.y&&
    pose.leftShoulder.y<pose.rightShoulder.y&&
    pose.keypoints[7].score>0.40&&
    pose.keypoints[0].score>0.40&&
    pose.keypoints[5].score>0.40&&
    pose.keypoints[6].score>0.40
    ){
    return true;
  }else return false;
}
function isFrontBend(pose){
  if(pose.rightShoulder.y>280&&
    pose.leftShoulder.y>280&&
    pose.keypoints[6].score>0.35&&
    pose.keypoints[5].score>0.35
    ){
    return true;
  }else return false;
}
function isrollback(pose,posemode){
  let boo=false;
    switch(mode){
      case 0:
      if(
        Math.sqrt(Math.abs(pose.leftElbow.x-pose.leftEar.x) **2+
        Math.abs(pose.leftElbow.y-pose.leftEar.y) **2)>80&&
        pose.leftWrist.y>250
      ){
        img.src="https://media.gq.com.tw/photos/5dbc4dcb801fc800083f31f3/master/w_1600%2Cc_limit/2018053058351453.jpg";
        label_pose.innerText="深蹲";
        boo=true;
      }
      break;
    case 1:
      if(
        pose.nose.y<250&&
        pose.leftShoulder.y<300&&
        pose.keypoints[0].score>0.60&&
        pose.keypoints[5].score>0.60
      ){
        img.src="https://media.istockphoto.com/id/1148862848/photo/fit-athletic-male-model-in-sportswear-doing-strength-exercise-with-knee-up-in-gym-isolated-on.jpg?s=1024x1024&w=is&k=20&c=4_E5cLb6yQM5Lx6IJhHLH0_JgkBINfdaOHmt4SjwGic="
        label_pose.innerText="高抬腿";
        boo=true;
      }
      break;
    case 2:
      if(
        pose.leftKnee.y>pose.rightHip.y&&
        pose.rightKnee.y>pose.leftHip.y
      ){
        img.src="https://www.yogaclassplan.com/wp-content/uploads/2021/06/standing-half-forward-bend.jpg"
        label_pose.innerText="站姿前曲";
        boo=true;
      }
      break;
    case 3:
      if(
        pose.leftShoulder.y<250&&
        pose.rightShoulder.y<250
      ){
        img.src="https://media.istockphoto.com/id/625389694/photo/man-smiling-happiness-carefree-emotional-expression-concept.jpg?s=612x612&w=0&k=20&c=pzs1i8TTfk58kgRtoXo9-6Hx2xrTQIl8ylg2WVCRRWg="
        label_pose.innerText="回到原位";
        boo=true;
      }
      break;
    case 4:
      if(true){
        img.src="https://p0.itc.cn/q_70/images03/20220710/5a95c6e2c4f04d9e923ea7617ef00513.jpeg"
        label_pose.innerText="開合跳";
        boo=true;
      }
      break;
    default:
      console.log("error mode");
    }if(boo){
      mode++;
      if(mode==5){mode=0;}
      lock=false;
      return true;
    }
    return false;
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
function posematch(posemode){
  img.src="https://media.istockphoto.com/id/625389694/photo/man-smiling-happiness-carefree-emotional-expression-concept.jpg?s=612x612&w=0&k=20&c=pzs1i8TTfk58kgRtoXo9-6Hx2xrTQIl8ylg2WVCRRWg="
  label_pose.innerText="回到原位";
  const logits=features.infer(video);
  cd_timer=Date.now();
  score++;
  lock=true;
  key=false;
  switch(posemode){
    case 0:
      knn.addExample(logits,"mode0");
      break;
    case 1:
      knn.addExample(logits,"mode1");
      break;
    case 2:
      knn.addExample(logits,"mode2");
      break;
    case 3:
      knn.addExample(logits,"mode3");
      break;
    case 4:
      knn.addExample(logits,"mode4");
      break;
    default:
      console.log("error mode");
  }
  models+=1;
  if(models==15){
    knn.save("model.json");
  }
}

function already(){
  begin_time=Date.now();
  goClassify();
  working=true;
  img.src="https://p0.itc.cn/q_70/images03/20220710/5a95c6e2c4f04d9e923ea7617ef00513.jpeg"
  label_pose.innerText="開合跳";
}

function show(){
  past=Date.now()-begin_time;
  label_time.innerText=(Math.floor(past/1000))+"秒";
  label_score.innerText=score;
  translate(video.width,0);
  scale(-1,1);
  image(video,0,0);
}