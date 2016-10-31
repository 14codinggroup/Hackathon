var canvas;
var ctx;

function onclick_memo(){
    //lobby ui --> memo ui
    document.getElementById('MiddleContent').style.display = 'none';
    document.getElementById('FooterContent').style.display = 'none';
    document.getElementById('MemoCanvas').style.display = 'block';
    resize_canvas();
}

function resize_canvas() {
    canvas = document.getElementById("MemoCanvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.width  = document.getElementById('LobbyContent').clientWidth * 980 / 1000;
    ctx.canvas.height = document.getElementById('LobbyContent').clientHeight * 980 / 1000;

    //start loop
    init();
}


function draw() {
    // ui resize
    var w = document.getElementById('MemoContent').clientWidth;
    document.getElementById('MemoContent').style.height = w + "px";
    w = document.getElementById('EventContent').clientWidth;
    document.getElementById('EventContent').style.height = w + "px";
}


var fps = 10;
var position = {};

function init(){
    alert("A");
    setInterval(gameLoop, 1000/fps);
}

function gameLoop(){
    update();
    display();
}

function update(){
    //Set Rectangle Position(Random Positioning In Canvas)
    position.x = Math.floor(Math.random() * (canvas.width - 20));  //0~480
    position.y = Math.floor(Math.random() * (canvas.height - 20)); //0~380

    //Set Random Coloring
    ctx.fillStyle = 'rgb(' + Math.floor(Math.random() * 255) + ','
        + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
}

function display(){
    ctx.fillRect(position.x, position.y, 20, 20);
}