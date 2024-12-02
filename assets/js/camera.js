let video;
let features;
let KNN;
let labelP;
let ready=false;
var over=false;
let label_time=document.getElementById("labeltime");
let main = document.getElementById("main-game");
let loading = document.getElementById("loading-screen");
let past;

var controller="n";
main.style.display="none";

function setup(){
  //noCanvas();
  createCanvas(640,480,cam);
  video=createCapture(VIDEO);
  video.size(640,480);
  video.hide();
  features=ml5.featureExtractor("MobileNet",modelLoaded);
  labelP=createP("...");
  labelP.style('font-size','2em');
  labelP.parent('main-game');
  //label_time.innerText="0秒";
  cd_timer=Date.now();
}

function goClassify(){
  const logits=features.infer(video);
  knn.classify(logits,function(error,result){
    if(error){
      console.log(error);
    }else{
      past=Date.now()-begin_time;
      //label_time.innerText=(Math.floor(past/1000))+"秒";
      //console.log(result);
      if (result.label=="0") {
        result.label="left";
        controller="l";
      }else if (result.label=="1") {
        result.label="right";
        controller="r";
      }else if(result.label=="2"){
        result.label="up";
        controller="u";
      }else{
        result.label="no pose";
        controller="n";
      }
      labelP.html(result.label);
      if(!over){goClassify();}
    }
  });
}

function modelLoaded(){
  begin_time=Date.now();
  console.log("MobileNet loaded!")
  knn=ml5.KNNClassifier();
  sql_load();
}
function draw(){
  translate(video.width,0);
  scale(-1,1);
  image(video,0,0);
}

function sql_load(){
  // Set up the AJAX request
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "get_model.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // Request was successful
        console.log(xhr.responseText); // Log the response from the server
        let m = JSON.parse(xhr.responseText);
        knn.load(m);
        console.log("KNN Data Loaded")
        loading.style.display="none";
        main.style.display="block";
        goClassify();
      }
  };
  xhr.send();
}