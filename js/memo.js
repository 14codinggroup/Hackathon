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
    var client_json = { type: "MEMO", msg: 'REQUEST_MEMO_ADD', data: inputContent };
    $.get('http://localhost:3000/data/memo', client_json, function(obj){
        console.log(obj)
    });


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

function init() {
    LoadMemo();
    canvas.addEventListener("mousedown", mouseDownListener, false);
    setInterval(Loop, 1000/fps);
}
function LoadMemo() {
    var client_json = { type: "MEMO", msg: 'REQUEST_MEMO_ALL', data: "" };
    $.get('http://localhost:3000/data/memo', client_json, function(obj){
        var memo_json = JSON.parse(obj);
        console.log(memo_json.data);
        for (var i = 0; i < memo_json.data.length; i++){
            var my = parseInt(memo_array.length / 4) * 100 + 100;
            var mx = (memo_array.length % 4) * 100;

            var color_R = parseInt(Math.random() * 255) + 1;
            var color_G = parseInt(Math.random() * 255) + 1;
            var color_B = parseInt(Math.random() * 255) + 1;

            var color = 'rgba(' + color_R + ',' + color_G + ','
                +color_B + ',' + 0.1 + ')';

            memo_array.push(new Memo(memo_json.data[i], mx, my, 100, 100, color));
        }

    });
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

        ctx.fillStyle = 'rgba(0,0,0,1)';

        var content_array = new Array();
        var content_size =  memo_array[index_memo].my_content.length;
        var count = 0;
        do {
            content_size = content_size - 10;
            count++;
        } while (content_size > 0);

        for (var index_memo_size = 0; index_memo_size < count; index_memo_size++) {
            ctx.fillText(memo_array[index_memo].my_content.substr(index_memo_size,10),
                memo_array[index_memo].x + 10, memo_array[index_memo].y + 40 + 20 * index_memo_size);
        }

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