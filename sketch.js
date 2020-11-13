
/* === 

Available parts are:
0   nose
1	leftEye
2	rightEye
3	leftEar
4	rightEar
5	leftShoulder
6	rightShoulder
7	leftElbow
8	rightElbow
9	leftWrist
10	rightWrist
11	leftHip
12	rightHip
13	leftKnee
14	rightKnee
15	leftAnkle
16	rightAnkle
=== */ 

// declare variables
let video;
let poseNet;
let poses = [];
let noseImage;
let leftEyeImage;
let rightEyeImage;

//preload the images for our collage creator
function preload(){
  noseImage = loadImage("https://cdn.glitch.com/413a2f4e-8d13-4a2a-a8e0-d10ef444b82f%2Facnose.png?v=1605284579645");
  leftEyeImage = loadImage("https://cdn.glitch.com/413a2f4e-8d13-4a2a-a8e0-d10ef444b82f%2Faceyes2.png?v=1605285280663");
  rightEyeImage = loadImage("https://cdn.glitch.com/413a2f4e-8d13-4a2a-a8e0-d10ef444b82f%2Faceyes2.png?v=1605285280663");
}

//setup environment for poseNet
function setup(){
  createCanvas(640,480);
  video = createCapture(VIDEO);
  video.size(width, height);
  
//create a new poseNet method with a single detection 
  poseNet = ml5.poseNet(video, modelReady);
//   this sets up an event that fills the global variable "poses" with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
//hide the video element and just show the canvas
  video.hide();
}

//this is to let us know the model has loaded
function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed() {
  console.log(JSON.stringify(poses[0].pose.keypoints[0].part))
}

//draw collages
function draw() {
imageMode(CORNER);
  image(video, 0, 0,width, height);

  imageMode(CENTER);

if (poses.length > 0) {
  let pose = poses[0].pose;
  
//image(preloaded image, x-axis, y-axis, width, height)
  let nose = pose['nose'];
  image(noseImage, nose.x, nose.y, 40, 40);
  
  let rightEye = pose['rightEye'];
  image(rightEyeImage, rightEye.x, rightEye.y, 60, 60);
  
  let leftEye = pose['leftEye'];
  image(leftEyeImage, leftEye.x, leftEye.y, 60, 60);
 }
}