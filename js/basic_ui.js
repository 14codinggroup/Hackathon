
function onclick_memo(){
    //lobby ui --> memo ui
    document.getElementById('MiddleContent').style.display = 'none';
    document.getElementById('FooterContent').style.display = 'none';
    document.getElementById('MemoCanvas').style.display = 'block';
    document.getElementById('MemoBtnContainer').style.display = 'block';
    resize_canvas();
}


function onclick_event(){
    //lobby ui --> memo ui
    document.getElementById('MiddleContent').style.display = 'none';
    document.getElementById('FooterContent').style.display = 'none';
    document.getElementById('EventList').style.display = 'block';
    //alert("A");
    event_init();
}

function draw() {
    // ui resize
    //var w = document.getElementById('MemoContent').clientWidth;
    //document.getElementById('MemoContent').style.height = w + "px";
    //w = document.getElementById('EventContent').clientWidth;
    //document.getElementById('EventContent').style.height = w + "px";

    var w = document.getElementById('MemoPicture').clientHeight;
    document.getElementById('MemoPicture').style.width = w + "px";
    var all = document.getElementById('FooterContent').clientWidth;
    document.getElementById('MemoText').style.width = (all - w) * 90 / 100 + "px";
    document.getElementById('MemoText').style.height = w + "px";
    document.getElementById('MemoText').style.paddingTop = (w / 2) * 60 / 100 + "px";

    document.getElementById('EventPicture').style.width = w + "px";
    document.getElementById('EventText').style.width = (all - w) * 90 / 100 + "px";
    document.getElementById('EventText').style.height = w + "px";
    document.getElementById('EventText').style.paddingTop = (w / 2) * 20 / 100 + "px";
}
