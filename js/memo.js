var canvas;
var ctx;

var m_width;

var myAddress = 'http://121.135.150.5:12111/data/memo';

function resize_canvas(height) {
    canvas = document.getElementById("MemoCanvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.width  = document.getElementById('MemoBtnContainer').clientWidth;
    ctx.canvas.height = height;

    m_width = ctx.canvas.width * 23 / 100;

    //start loop
    init();
}

function DestroyMemo(){
    memo_array = [];
    document.getElementById('MemoPage').style.display = 'none';
    var refreshIntervalId = setInterval(Loop, 1000/fps);
    clearInterval(refreshIntervalId);

}

var memo_array = new Array();

function AddMemo() {
    var inputContent = prompt('메모 내용', '');
    if (inputContent == '') return;
    if (inputContent == null) return;
    var my = parseInt(memo_array.length / 4) * (m_width * 25 / 23) + 20;
    var mx = (memo_array.length % 4) * (m_width  * 25 / 23) + m_width / 20;

    var color_R = parseInt(Math.random() * 255) + 1;
    var color_G = parseInt(Math.random() * 255) + 1;
    var color_B = parseInt(Math.random() * 255) + 1;

    var color = 'rgba(' + color_R + ',' + color_G + ','
        +color_B + ',' + 0.5 + ')';

    memo_array.push(new Memo(inputContent, mx, my, m_width, m_width, color));
    var client_json = { type: "MEMO", msg: 'REQUEST_MEMO_ADD', data: inputContent };
    $.get(myAddress, client_json, function(obj){
        console.log(obj)
    });
}

var isDel = false;
function DelMemo() {
    if (isDel == false){
        alert("삭제할 메모를 선택해주세요");
        deleting = false;
        document.getElementById('but2').value = "삭제 취소";
        isDel = true;
    }
    else {
        alert("삭제를 취소 하였습니다.")
        document.getElementById('but2').value = "메모 삭제";
        isDel = false;
    }
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
    $.get(myAddress, client_json, function(obj){
        var memo_json = JSON.parse(obj);
        console.log(memo_json.data);
        for (var i = 0; i < memo_json.data.length; i++){
            var my = parseInt(memo_array.length / 4) * (m_width * 25 / 23) + 20;
            var mx = (memo_array.length % 4) * (m_width  * 25 / 23) + m_width / 20;

            var color_R = parseInt(Math.random() * 255) + 1;
            var color_G = parseInt(Math.random() * 255) + 1;
            var color_B = parseInt(Math.random() * 255) + 1;

            var color = 'rgba(' + color_R + ',' + color_G + ','
                +color_B + ',' + 0.5 + ')';

            memo_array.push(new Memo(memo_json.data[i], mx, my, m_width, m_width, color));
        }

    });
}

var dragging;
var dragIndex;

var deleting;
var delIndex;

function mouseDownListener(evt) {
    var blank = canvas.getBoundingClientRect();
    var canvas_x = (evt.clientX - blank.left) * (canvas.width / blank.width);
    var canvas_y = (evt.clientY - blank.top) * (canvas.height / blank.height);
    var index_memo;

    if (isDel == false) {
        for (index_memo = 0; index_memo < memo_array.length; index_memo++) {
            if (memo_array[index_memo].HitTest(canvas_x, canvas_y)) {
                dragging = true;
                dragIndex = index_memo;
            }
        }
        if (dragging) {
            window.addEventListener("mousemove", mouseMoveListener, false);
            window.addEventListener("mouseup", mouseUpListener, false);
        }
    } else {
        for (index_memo = 0; index_memo < memo_array.length; index_memo++) {
            if (memo_array[index_memo].HitTest(canvas_x, canvas_y)) {
                delIndex = index_memo;
                deleting = true;
            }
        }
        if (deleting == true){
            alert(delIndex + "번 메모를 삭제하시겠습니까?")
            var del_data = memo_array[delIndex].my_content
            console.log(del_data);
            var client_json = { type: "MEMO", msg: 'REQUEST_MEMO_DEL', data: del_data };
            $.get(myAddress, client_json, function(obj){
                console.log(obj)
            });
            memo_array.splice(delIndex,1);
            deleting = false;
            document.getElementById('but2').value = "메모 삭제";
            isDel = false;
        }

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
        ctx.fillRect(memo_array[index_memo].x, memo_array[index_memo].y,
            memo_array[index_memo].width, memo_array[index_memo].height);

        ctx.fillStyle = 'rgba(0,0,0,1)';

        var content_array = new Array();
        var content_size =  memo_array[index_memo].my_content.length;
        var count = 0;
        do {
            content_size = content_size - 10;
            count++;
        } while (content_size > 0);
        ctx.font="12px Arial";
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
    return ((cx > this.x) && (cx < this.x + this.width)
        && (cy > this.y) && (cy < this.y + this.height));
}