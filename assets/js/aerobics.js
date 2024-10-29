let video;
let poseNet;
let pose;
let score = 0;
let mode;
let timer = 0;
let label = document.getElementById("label1");

function setup() {
  createCanvas(640, 480, cam);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  mode = getRandomInt(2);
}

function draw() {
  if (pose) {
    if (timer === 20) {
      mode = getRandomInt(2);
      timer = 0;
    }
    timer = timer + 1;
    translate(video.width, 0);
    scale(-1, 1);
    image(video, 0, 0);    
    console.log("2");
    switch (mode) {
      case 0:
        label.innerText = "開合跳";
        console.log("跳");
        if (isJumpingJack(pose)) {
          score = score + 1;
        }
        break;
      case 1:
        label.innerText = "深蹲";
        console.log("蹲");
        if (isSquat(pose)) {
          score = score + 1;
        }
        break;
      default:
        console.log("error");
    }

    fill(255, 255, 0); //color
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);

  }
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function isJumpingJack(pose) {
  if ((pose.leftWrist.x - pose.rightWrist.x < 100) && (pose.leftWrist.y < pose.leftEar.y)) {
    return true;
  } else return false;
}

function isSquat(pose) {
  if ((pose.leftKnee.y - pose.leftHip.y < 100) && (pose.rightKnee.y - pose.rightHip.y < 100)) {
    return true;
  } else return false;
}
/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates drawing skeletons on poses for the MoveNet model.
 */

/*let video;
let bodyPose;
let poses = [];
let connections;

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480, cam);

  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
  //get the skeleton connection information
  connections = bodyPose.getSkeleton();
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  //draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.score > 0.1 && pointB.score > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw a circle if the keypoint's confidence is bigger than 0.1
      if (keypoint.score > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}*/