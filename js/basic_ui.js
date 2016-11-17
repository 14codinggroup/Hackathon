
function onclick_calendar(){
    MoveOther();
    document.getElementById('LobbyContent').style.display = 'block';
}

function onclick_memo(){
    document.getElementById('LobbyContent').style.display = 'block';
    var height = document.getElementById('LobbyContent').clientHeight * 8 / 10;
    document.getElementById('LobbyContent').style.display = 'none';
    MoveOther();
    document.getElementById('MemoPage').style.display = 'block';

    resize_canvas(height);
}

function onclick_event(){
    MoveOther();
    document.getElementById('EventList').style.display = 'block';
    //alert("A");
    event_init();
}

function onclick_header(){

}


function MoveOther(){
    document.getElementById('LobbyContent').style.display = 'none';
    document.getElementById('MemoPage').style.display = 'none';
    document.getElementById('EventInfo').style.display = 'none';
    DestroyMemo();
}
