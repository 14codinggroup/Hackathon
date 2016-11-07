
function addDiv(image, txt) {
    var list = document.getElementById('EventList');
    var divtest = document.createElement("div");
    divtest.innerHTML = image + " + " + txt;
    list.appendChild(divtest);
}


function event_init() {
    var event_array = new Array();
    var index_events;
    for (index_events = 0; index_events < 33; index_events++) {
        event_array.push(new EventClass(index_events + 1, index_events * 100 + 3));
        addDiv(event_array[index_events].image, event_array[index_events].txt);
    }

}

function EventClass (image, txt) {
    this.image = image;
    this.txt = txt;

}
