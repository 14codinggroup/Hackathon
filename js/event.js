var event_array = new Array();

function addDiv(id, date, url, title) {
    var Lobby = document.getElementById('LobbyContent');
    var str =
        '<div class="EventList" id ="EventList' + id + '" style = "display: block" onclick="loadEvent(' + id + ')">' +
            '<div class = "EventListImage" style="background-image: url(' + url + ')"></div>' +
            '<div class = "EvnetListRight">' +
                '<div class = "EventListTitle">' + title + '</div>' +
                '<div class = "EventListDate">' + date + '</div>' +
            '</div>' +
        '</div>';
    Lobby.insertAdjacentHTML( 'beforeend', str );
}



function loadEvent(id){
    var str;
    for(var i = 0; i < event_array.length; i++){
        str = 'EventList' + i;
        document.getElementById(str).style.display = 'none';
    }
    document.getElementById('EventInfo').style.display = 'block';
}



function event_init() {
    var index_events;
    for (index_events = 0; index_events < 3; index_events++) {
        event_array.push(new EventClass(index_events, index_events + 1, 'calendar.png', index_events * 100 + 3));
        addDiv(event_array[index_events].id, event_array[index_events].date, event_array[index_events].url, event_array[index_events].title);
    }
}

function EventClass (id, date, url, title) {
    this.id = id;
    this.date = date;
    this.url = url;
    this.title = title;
}




