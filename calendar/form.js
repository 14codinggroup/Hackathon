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


function LoadEvents() {
    var requsetMsg = {type: 'CALENDER', msg: 'REQUEST_CALENDER_GET', data: ''};
    var savedEvents = new Array();
    $.get('http://localhost:3000/data/calendar', requsetMsg, function (obj) {
        savedEvents = JSON.parse(obj);
        console.log('Request GetAllEvent');
    });

    return savedEvents;
}

function AddEvent(event) {
    var requsetMsg = {type:'CALENDER', msg: 'REQUEST_CALENDER_ADD', data: event};
    $.get('http://localhost:3000/data/calendar', requsetMsg, function (obj) {
        console.log('Request AddEvent');
    });
}

function DeleteEvent(event) {
    var requsetMsg = {type:'CALENDER', msg: 'REQUEST_CALENDER_DELETE', data: event};
    $.get('http://localhost:3000/data/calendar', requsetMsg, function (obj) {
        console.log('Request AddEvent');
    });
}

function UpdateEvent(oldEvent, updateInfo) {
    var sendData = {'oldEvent': oldEvent, 'updateInfo': updateInfo};
    var requsetMsg = {type:'CALENDER', msg: 'REQUEST_CALENDER_UPDATE', data: sendData};
    $.get('http://localhost:3000/data/calendar', requsetMsg, function (obj) {
        console.log('Request DeleteEvent');
    });
}

