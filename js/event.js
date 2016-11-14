
function addDiv(date, url, title) {

    var list = document.getElementById('EventList');
    var image = document.createElement("img");
    image.src = 'calendar.png';
    list.appendChild(image);

    //divtest.style.backgroundImage = "url('calendar.png')";
        //'<div style="background-image: url(' + url +
        //+ ');"></div>' // ' //date + " + " + image + " + " + txt';
    //divtest.


    //list.appendChild(divtest);
    divtest.onclick = loadEvent;
}



function loadEvent(){
    document.getElementById('EventList').style.display = 'none';
    document.getElementById('EventInfo').style.display = 'block';
}

function event_init() {
    var event_array = new Array();

    var index_events;
    for (index_events = 0; index_events < 3; index_events++) {
        event_array.push(new EventClass(index_events + 1, index_events * 10 + 3, index_events * 100 + 3));
        addDiv(event_array[index_events].date, event_array[index_events].url, event_array[index_events].title);
    }
}

function EventClass (date, url, title) {
    this.date = date;
    this.url = url;
    this.title = title;
}




