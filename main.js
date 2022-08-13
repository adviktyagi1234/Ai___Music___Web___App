song1 = "";
song2 = "";
LeftWristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;
ScoreLeftWrist = 0;
PlayOrNot = "";

function preload() {
    song1 = loadSound("Song2.mp3");
    song2 = loadSound("Song.mp3");
}

function setup() {
    canvas =    createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("DOne!(Posenet Is Initialized)");
}

function gotPoses(results)
{
    if(results[0] > 0)
    {
        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + RightWristX + " rightWristY = " + RightWristY);

        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + LeftWristX + " leftWristY = " + LeftWristY);

        ScoreLeftWrist = resluts[0].pose.keypoints[9].score;
    }
}

function draw() {
    image(video, 0, 0, 600, 500)

     
    PlayOrNot = song1.isPlaying();

    fill("Red");
    stroke("Black");

    if(LeftWristX > 0.2)
    {  
    circle(LeftWristX, LeftWristY, 10000);
    song2.stop();

    if(PlayOrNot = false)
    {
        song1.play();
        document.getElementById("snnm").innerHTML = "Song Name = " + song1;
    }
    }
}