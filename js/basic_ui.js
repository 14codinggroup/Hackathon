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

