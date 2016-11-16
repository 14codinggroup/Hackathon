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

    AddCalendar(event);
    alert("일정 '"+title+"'가 일정에 추가되었습니다.");
    document.getElementById("start").value = null;
    document.getElementById("end").value = null;
    document.getElementById("title").value = null;
    document.getElementById("info").value = null;
}

function return_index() {
    window.location.href="calendar.html";
}

function deleteSchedule(event) {
    DelCalendar(event);
    alert("일정 '"+event.title+"'가 삭제되었습니다.");
}

function updateSchedule(oldEvent) {
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

    UpdateCalendar(oldEvent, event);
    alert("일정 '"+title+"'가 수정되었습니다.");
    document.getElementById("start").value = null;
    document.getElementById("end").value = null;
    document.getElementById("title").value = null;
    document.getElementById("info").value = null;
}

var dbLink = 'http://localhost:3000/data/calendar';

function LoadCalendar() {
    var requsetMsg = {type: 'CALENDAR', msg: 'REQUEST_CALENDER_ALL', data: ''};
    var savedEvents = new Array();
    $.get(dbLink, requsetMsg, function (obj) {
        savedEvents = JSON.parse(obj);
        console.log('Request GetAllEvent');
    });

    return savedEvents.data;
}

function AddCalendar(event) {
    var requsetMsg = {type:'CALENDAR', msg: 'REQUEST_CALENDER_ADD', data: event};
    $.get(dbLink, requsetMsg, function (obj) {
        console.log('Request AddEvent');
    });
}

function DelCalendar(event) {
    var requsetMsg = {type:'CALENDAR', msg: 'REQUEST_CALENDER_DEL', data: event};
    $.get(dbLink, requsetMsg, function (obj) {
        console.log('Request AddEvent');
    });
}

function UpdateCalendar(oldEvent, updateInfo) {
    var sendData = {'oldEvent': oldEvent, 'updateInfo': updateInfo};
    var requsetMsg = {type:'CALENDAR', msg: 'REQUEST_CALENDER_UPDATE', data: sendData};
    $.get(dbLink, requsetMsg, function (obj) {
        console.log('Request DeleteEvent');
    });
}

