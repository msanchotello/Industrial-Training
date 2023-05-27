
function button1(){
    document.getElementById("first_iframe").style.visibility = "visible";
    document.getElementById("first_iframe").style.height ="350px";
    document.getElementById("second_iframe").style.visibility ="hidden";
    document.getElementById("second_iframe").style.height ="0px";
    document.getElementById("third_iframe").style.visibility ="hidden";
    document.getElementById("third_iframe").style.height ="0px";
}


function button2(){
    document.getElementById("first_iframe").style.visibility = "hidden";
    document.getElementById("first_iframe").style.height ="0px";
    document.getElementById("second_iframe").style.visibility ="visible";
    document.getElementById("second_iframe").style.height ="350px";
    document.getElementById("second_iframe").style.marginTop ="-20px";
    document.getElementById("second_iframe").style.marginBottom ="20px";
    document.getElementById("third_iframe").style.visibility ="hidden";
    document.getElementById("third_iframe").style.height ="0px";

}

function button3(){
    document.getElementById("first_iframe").style.visibility = "hidden";
    document.getElementById("first_iframe").style.height ="0px";
    document.getElementById("second_iframe").style.visibility ="hidden";
    document.getElementById("second_iframe").style.height ="0px";
    document.getElementById("third_iframe").style.visibility ="visible";
    document.getElementById("third_iframe").style.height ="350px";
    document.getElementById("third_iframe").style.marginTop ="-40px";
    document.getElementById("third_iframe").style.marginBottom ="40px";
}



