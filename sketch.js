let capture;
let posenet;

let noseX, noseY;

// set up p5 js
function setup() {
    // create canvas for ui
    createCanvas(800, 500);

    // initialize video
    capture = createCapture(VIDEO);
    capture.hide();     // hide camera output

    posenet = ml5.poseNet(capture, modelLoaded);
    // identify body 17 points
    // 5 face point, 12 other body point
    // capture number of human appear infront of camera and transfer as object number of human
    posenet.on('pose', receivedPoses);
}

// number of body in the image
// as object
function receivedPoses(poses) {
    // console.log(poses);

    let singlePose;
    if (poses.length > 0) {
        singlePose = poses[0];
        noseX = singlePose.pose.x;
        noseY = singlePose.pose.y;
    }
    console.log(noseX + " " + noseY);
}

function modelLoaded() {
    console.log('Model has loaded');
}

// draw 
function draw() {
    // background(255);

    // images and videos from webcam
    image(capture, 0, 0, 800, 500);

    fill(255, 0, 0);
    ellipse(noseX, noseY, 30, 30);
}