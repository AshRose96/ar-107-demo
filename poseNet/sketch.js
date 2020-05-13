let video;
let poseNet;
let pose;
let skeleton;
let img;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  img = loadImage('assets/jelly2.png');
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  image(video, 0, 0);

  if (pose) {
    let earR = pose.rightEar;
    let earL = pose.leftEar;
    let d = dist(earR.x, earR.y, earL.x, earL.y);
    image(img, pose.nose.x-510, pose.nose.y-200);
    noStroke();
    fill(0,255,255,d);
    // ellipse(pose.rightEye.x,pose.rightEye.y,d);
    // ellipse(pose.leftEye.x,pose.leftEye.y,d);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, d);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, d);


    // for (let i = 0; i < pose.keypoints.length; i++) {
    //   let x = pose.keypoints[i].position.x;
    //   let y = pose.keypoints[i].position.y;
    //   fill(0, 255, 255,d);
    //   ellipse(x, y, 16, 16);
    // }
  }
}
