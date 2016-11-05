var canvas;
var ctx;

function resize_canvas() {
    canvas = document.getElementById("MemoCanvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.width  = document.getElementById('LobbyContent').clientWidth * 980 / 1000;
    ctx.canvas.height = document.getElementById('LobbyContent').clientHeight * 1000 / 1000;

    //start loop
    init();
}

var memo_array = new Array();

function AddMemo() {
    var inputContent = prompt('메모 내용', '');
    var my = parseInt(memo_array.length / 4) * 100 + 100;
    var mx = (memo_array.length % 4) * 100;

    var color_R = parseInt(Math.random() * 255) + 1;
    var color_G = parseInt(Math.random() * 255) + 1;
    var color_B = parseInt(Math.random() * 255) + 1;

    var color = 'rgba(' + color_R + ',' + color_G + ','
        +color_B + ',' + 0.1 + ')';

    memo_array.push(new Memo(inputContent, mx, my, 100, 100, color));
    //alert(memo_array[1].my_content);
    //alert(memo_array.length);
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
    canvas.addEventListener("mousedown", mouseDownListener, false);
    setInterval(Loop, 1000/fps);
}

var dragging;
var dragIndex;

function mouseDownListener(evt) {
    var blank = canvas.getBoundingClientRect();
    var canvas_x = (evt.clientX - blank.left) * (canvas.width/blank.width);
    var canvas_y = (evt.clientY - blank.top) * (canvas.height/blank.height);

    var index_memo;
    //alert("X=" + canvas_x + "Y=" + canvas_y);
    for (index_memo = 0; index_memo < memo_array.length; index_memo++) {
        if(memo_array[index_memo].HitTest(canvas_x, canvas_y)){
            dragging = true;
            dragIndex = index_memo;
        }
    }
    if (dragging) {
        window.addEventListener("mousemove", mouseMoveListener, false);
        window.addEventListener("mouseup", mouseUpListener, false);
    }
    //canvas.removeEventListener("mousedown", mouseDownListener, false);
}

function mouseMoveListener(evt) {
    var blank = canvas.getBoundingClientRect();
    var canvas_x = (evt.clientX - blank.left) * (canvas.width/blank.width);
    var canvas_y = (evt.clientY - blank.top) * (canvas.height/blank.height);
    memo_array[dragIndex].x = canvas_x;
    memo_array[dragIndex].y = canvas_y;
}
function mouseUpListener(evt) {
    window.removeEventListener("mousemove", mouseMoveListener, false);
    window.removeEventListener("mouseup", mouseUpListener, false);
    dragging = false;
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

    var index_memo;
    for (index_memo = 0; index_memo < memo_array.length; index_memo++) {
        ctx.fillStyle = memo_array[index_memo].color;
        ctx.fillRect(memo_array[index_memo].x, memo_array[index_memo].y, 100, 100);
    }
}

function Memo (my_content, mx, my, mwidth, mheight, color) {
    this.my_content = my_content;
    this.x = mx;
    this.y = my;
    this.width = mwidth;
    this.height = mheight;

    this.color = color;
}
Memo.prototype.getMemo = function() {
  return this.my_content;
};
Memo.prototype.HitTest = function(cx, cy) {
    return ((cx > this.x - this.width) && (cx < this.x + this.width)
        && (cy > this.y - this.height) && (cy < this.y + this.height));

}