var canvas;
var ctx;

function onclick_memo(){
    //lobby ui --> memo ui
    document.getElementById('MiddleContent').style.display = 'none';
    document.getElementById('FooterContent').style.display = 'none';
    document.getElementById('MemoCanvas').style.display = 'block';
    document.getElementById('MemoBtnContainer').style.display = 'block';

    resize_canvas();
}

function resize_canvas() {
    canvas = document.getElementById("MemoCanvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.width  = document.getElementById('LobbyContent').clientWidth * 980 / 1000;
    ctx.canvas.height = document.getElementById('LobbyContent').clientHeight * 1000 / 1000;

    //start loop
    init();
}

function AddMemo() {
    var inputName = prompt('메모 제목', '');
    //alert(inputName);
    var inputContent = prompt('메모 내용', '');
    //alert(inputContent);


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
    setInterval(Loop, 1000/fps);
}

function Loop(){
    update();
    display();
}

function update(){
    //Set Random Coloring
    ctx.fillStyle = 'rgba(' + 255 + ','
        + 102 + ',' + 153 + ',' + 0.1 + ')';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function display(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillRect(0, 0, canvas.width, canvas.height);
}