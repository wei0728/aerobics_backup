//  KNN Classification

let video;
let features;
let KNN;
let labelP;
let ready=false;

function setup(){
  createCanvas(320,240);
  video=createCapture(VIDEO);
  video.size(320,240);
  video.hide();
  features=ml5.featureExtractor("MobileNet",modelLoaded);
  knn=ml5.KNNClassifier();
  labelP=createP("need training data")
  labelP.style('font-size','32pt');
}
function goClassify(){
  const logits=features.infer(video);
  knn.classify(logits,function(error,result){
    if(error){
      console.log(error);
    }else{
      console.log(result);
      labelP.html(result.label);
      goClassify();
    }
  });
}

function keyPressed(){
  const logits=features.infer(video);
  if(key=="l"){
    knn.addExample(logits,"left");
    console.log("left");
  }else if(key=="r"){
    knn.addExample(logits,"right");
    console.log("right");
  }else if(key=="u"){
    knn.addExample(logits,"up");
    console.log("up");
  }else if(key=="n"){
    knn.addExample(logits,"down");
    console.log("nopose");
  }else if(key=="s"){
    knn.save("model.json");
  }
  //console.log(logits.dataSync());
}
function modelLoaded(){
  console.log('poseNet ready.')
}
function draw(){
  const flippedVideo = ml5.flipImage(video);
  image(flippedVideo,0,0);
  if(!ready && knn.getNumLabels()>0){
    goClassify();
    ready=true;
  }
}