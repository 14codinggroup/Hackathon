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
    alert("일정 '"+event['title']+"'가 일정에 추가되었습니다.");
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
    return_index()
}

function updateSchedule(oldEvent) {
    console.log(oldEvent);
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
    return_index()
}

var dbLink = 'http://localhost:3000/data/calendar';
var savedEvents = new Array();
function LoadCalendar() {
    console.log('load calendar');
    var requestMsg = {type: 'CALENDAR', msg: 'REQUEST_CALENDAR_ALL', data: ''};

    $.get(dbLink, requestMsg, function (obj) {
        var temp = JSON.parse(obj);
        for(var i=0;i<temp.data.length;i++){
            savedEvents.push(temp.data[i]);
        }

        console.log('Request GetAllEvent');
     });
    console.log(savedEvents);
    return savedEvents;
}

function AddCalendar(event) {
    var client_json = {title: event['title'], start: event['start'],
                        end: event['end'], info: event['info']};
    console.log(client_json);
    var requestMsg = {type:'CALENDAR', msg: 'REQUEST_CALENDAR_ADD', data: client_json};

    $.get(dbLink, requestMsg, function (obj) {
        console.log('Request AddEvent');
    });
}

function DelCalendar(event) {
    var client_json = {title: event['title'], start: event['start'],
        end: event['end'], info: event['info']};
    console.log(client_json);
    var requestMsg = {type:'CALENDAR', msg: 'REQUEST_CALENDAR_DEL', data: client_json};
    $.get(dbLink, requestMsg, function (obj) {
        console.log('Request AddEvent');
    });
}

function UpdateCalendar(oldEvent, updateInfo) {
    var old = {title: oldEvent['title'], start: oldEvent['start'],
        end: oldEvent['end'], info: oldEvent['info']};
    var update = {title: updateInfo['title'], start: updateInfo['start'],
        end: updateInfo['end'], info: updateInfo['info']};

    var sendData = {oldEvent: old, updateInfo: update};
    var requestMsg = {type:'CALENDAR', msg: 'REQUEST_CALENDAR_UPDATE', data: sendData};
    $.get(dbLink, requestMsg, function (obj) {
        console.log('Request DeleteEvent');
    });
}


