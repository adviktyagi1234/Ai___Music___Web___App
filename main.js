song1 = "";
song2 = "";
LeftWristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;
ScoreLeftWrist = 0;
PlayOrNot_Left = "";
ScoreRightWrist = 0;
PlayOrNot_Right = "";

function preload() {
    song1 = loadSound("Song1.mp3");
    song2 = loadSound("Song2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("DOne!(Posenet Is Initialized)");
}

function gotPoses(results) {
    if (results.length > 0) {
        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + RightWristX + " rightWristY = " + RightWristY);

        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + LeftWristX + " leftWristY = " + LeftWristY);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
    }
}

function draw() {
    //for left wrist song
    image(video, 0, 0, 600, 500)


    PlayOrNot_Left = song1.isPlaying();

    if (ScoreLeftWrist > 0.2) {

        fill("Red");
        stroke("Black");
        circle(LeftWristX, LeftWristY, 50);

        song2.stop();

        if (PlayOrNot_Left == false) {
            song1.play();
            document.getElementById("snnm").innerHTML = "Song Name = Beat It ";
        }
    }

    //-----------------------------------------------------------------------------

    //for right wrist song
    PlayOrNot_Right = song2.isPlaying();

    if (ScoreRightWrist > 0.2) {
        fill("blue");
        stroke("green");
        circle(RightWristX, RightWristY, 50);

        song1.stop();

        if (PlayOrNot_Right) {
            song2.play();
            document.getElementById("snnm").innerHTML = "Song Name = Ya Li li";
        }
    }
}