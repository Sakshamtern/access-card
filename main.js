function enter_person_name()
{
person_name_input = document.getElementById("person_name_input").value;
localStorage.setItem("person_name_input", person_name_input);
}

Webcam.set({
    width : 350,
    height : 300,
    image_format : 'png',
    png_quality : 90
}); 

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/g1wkIvNgc/model.json', modelLoaded);

function check_sound()
{
    navigator.mediaDevices.getUserMedia({audio : true});
    classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/zuwyjLqKT/model.json', modelReady);
}

function modelLoaded()
{
    console.log("Model is loaded");
}

function modelReady()
{
    classifier.classify(gotResults2);
}

function check_face()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults1);
    
}

function gotResults1(error, results)
{
    if(error)
    {
        console.error(error);
    } else{
        console.log(results);
        identify_face = document.getElementById("result_person_name_face").innerHTML = results[0].label;
        document.getElementById("result_person_accuracy_face").innerHTML = results[0].confidence.toFixed(3);
    }
}

function gotResults2(error, results)
{
    if(error)
    {
        console.error(error);
    } else{
        console.log(results);
        identify_sound = document.getElementById("result_person_name_sound").innerHTML = results[0].label;
        document.getElementById("result_person_accuracy_sound").innerHTML = results[0].confidence.toFixed(3);
    }
}

Saksham = "Saksham";
Anjali = "Anjali";
Raj = "Raj";


if((identify_face) && (identify_sound) && (person_name_input) == Saksham)
{
    document.getElementById("access_confirmed");
    
    console.log("Access confirmed");
} if((identify_face) && (identify_sound) && (person_name_input)  == Anjali)
{
    document.getElementById("access_confirmed");
    
    console.log("Access confirmed");
} if( (identify_face) && (identify_sound) && (person_name_input) == Raj)
{
    document.getElementById("access_confirmed");
    
    console.log("Access confirmed");
}