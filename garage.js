img = "";
status = "";
objects = [];

function preload(){
    img = loadImage("garage.jpeg");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function back(){
    window.location = "home.html";
}

function draw(){
    image(img, 0, 0, 600, 500);
    // fill("#FF0000");
    // text("Dog", 100, 80);
    // noFill();
    // stroke("#FF0000");
    // rect(90, 60, 450, 380);

    // fill("#FF0000");
    // text("Cat", 310, 85);
    // noFill();
    // stroke("#FF0000");
    // rect(300, 65, 300, 380);

    if(status != ""){
        detector.detect(img, gotResults);

        for(i = 0; i < objects.length; i++){
            document.getElementById("no_objects").innerHTML = "The Number Of Objects Detected Are = " + objects.length;
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("#000000");
            percent = (objects[i].confidence * 100).toFixed(0);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();

            stroke("#000000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded! ");
    status = true;

}

function gotResults(error, results){
    if (error){
        console.error(error);
    } else{
        console.log(results);
        objects = results;
    }
}