score_right_wrist = 0;
song1="";
song2="";
song1_status="";
song2_status="";
left_wrist_x = 0;
right_wrist_x = 0;
left_wrist_y = 0;
right_wrist_y = 0;
score_left_wrist = 0;

function preLoad(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music.mp3");
}


function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide;
    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_left_wrist = results[0].pose.keypoints[9].score;
        score_right_wrist = results[0].pose.keypoints[10].score;
        console.log("score right wrist = " + score_right_wrist + "score left wrist = " + score_left_wrist);
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + left_wrist_x + "left wrist y = " + left_wrist_y);
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + right_wrist_x + "right wrist y = " + right_wrist_y);
    }
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function draw(){
    image(video, 0, 0, 600, 500);
    song1_status= song1.isPlaying();
    song2_status= song2.isPlaying();
    fill('#FF0000');
    stroke('red');
    if(score_right_wrist > 0.2){
        circle(right_wrist_x, right_wrist_y, 20);
        song2.stop();
        if(song1_status == false){
            document.getElementById("song").innerHTML = "playing song";
            song1.play();
        }
    }
    if(score_left_wrist > 0.2){
        circle(left_wrist_x, left_wrist_y, 20);
        song1.stop();
        if(song2_status == false){
            document.getElementById("song").innerHTML = "playing song";
            song2.play();
        }
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}