
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
    event_init();
}

function onclick_eventdiv(){
    document.getElementById('MiddleContent').style.display = 'none';
    document.getElementById('FooterContent').style.display = 'none';
    document.getElementById('').style.display = 'block';
    eventdiv_init();
}