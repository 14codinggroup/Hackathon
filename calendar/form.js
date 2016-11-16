/**
 * Created by seungmin on 2016-11-14.
 */
// Submit form with id function.
function addSchedule() {
    var event = new Array();
    event['start'] = document.getElementById("start").value;
    event['end'] = document.getElementById("end").value;
    event['title'] = document.getElementById("title").value;
    event['info'] = document.getElementById("info").value;
    if(!event['start']){
        alert("start는 필수입니다.")
        document.getElementById("start").focus();
        return false;
    }
    if(!event['title']){
        alert("title은 필수입니다.");
        document.getElementById("title").focus();
        return false;
    }

    AddEvent(event);
    alert("일정 '"+title+"'가 일정에 추가되었습니다.");
    document.getElementById("start").value = null;
    document.getElementById("end").value = null;
    document.getElementById("title").value = null;
    document.getElementById("info").value = null;
}

function return_index() {
    window.location.href="calendar.html";
}


function LoadCalendar() {
    var requsetMsg = {type: 'CALENDAR', msg: 'REQUEST_CALENDAR_ALL', data: ''};
    var savedEvents = new Array();

    $.get('http://localhost:3000/data/calendar', requsetMsg, function (obj) {

        savedEvents = JSON.parse(obj);
        console.log(savedEvents.data);
        for (var k = 0; k < savedEvents.data.length; k++){
            console.log(savedEvents.data[k]);
        }

    });

    return savedEvents;
}

var k =   {
    "title": "승민 생일",
        "start": "2017-01-10",
        "end": null,
        "info": "이새끼생일을 왜챙겨야되지"
}


function AddCalendar(event) {
    console.log(event);
    var requsetMsg = {type:'CALENDAR', msg: 'REQUEST_CALENDAR_ADD', data: event};
    $.get('http://localhost:3000/data/calendar', requsetMsg, function (obj) {
        console.log('Request AddEvent');
    });
}
//AddCalendar(k);
LoadCalendar();

function DelCalendar(event) {
    var requsetMsg = {type:'CALENDAR', msg: 'REQUEST_CALENDAR_ADD', data: event};
    $.get('http://localhost:3000/data/calendar', requsetMsg, function (obj) {
        console.log('Request AddEvent');
    });
}

function UpdateCalendar(oldEvent, updateInfo) {
    var sendData = {'oldEvent': oldEvent, 'updateInfo': updateInfo};
    var requsetMsg = {type:'CALENDAR', msg: 'REQUEST_CALENDAR_UPDATE', data: sendData};
    $.get('http://localhost:3000/data/calendar', requsetMsg, function (obj) {
        console.log('Request DeleteEvent');
    });
}
var k2 =   {
    "title": "승민",
    "start": "2017-01-10",
    "end": null,
    "info": "이새끼생일을 왜챙겨야되지"
}
UpdateCalendar(k,k2);

