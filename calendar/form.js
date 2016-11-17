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
    console.log('[AddSchedule]',event);

    alert("일정 '"+event['title']+"'가 일정에 추가되었습니다.");
    document.getElementById("start").value = null;
    document.getElementById("end").value = null;
    document.getElementById("title").value = null;
    document.getElementById("info").value = null;
}

function deleteSchedule(event) {
    DelCalendar(event);
    console.log('[DeleteSchedule]',event);
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
    console.log('[UpdateSchedule]',event);
    alert("일정이 수정되었습니다.");
    return_index()
}

function return_index() {
    window.location.href="calendar.html";
}


var dbLink = 'http://121.135.150.5:12111/data/calendar';

var savedEvents = new Array();
function LoadCalendar() {

    savedEvents = [];
    var k;
    console.log('load calendar');
    var requestMsg = {type: 'CALENDAR', msg: 'REQUEST_CALENDAR_ALL', data: ''};

    $.get(dbLink, requestMsg, function (obj) {
        var temp = JSON.parse(obj);
        savedEvents = temp.data;
        //console.log(savedEvents);
     });
    return savedEvents;
}

var oneTuple = new Array();
var filledOneTuple;

function LoadOneCalendar(event,callback) {

    oneTuple = [];
    var event_json = {title: event['title'], start: event['start'], end: event['end']};
    var requestMsg = {type: 'CALENDAR', msg: 'REQUEST_CALENDAR_ONE', data: event_json};

    $.get(dbLink, requestMsg, function (obj) {

        var $temp = JSON.parse(obj);
        oneTuple = $temp.data;
        console.log(oneTuple);
        callback();
    });


}

function oneTupleWait() {
    if(filledOneTuple){
        return false;
    }else{
        setTimeout(oneTupleWait, 250);
    }
}

function AddCalendar(event) {
    var client_json = {title: event['title'], start: event['start'],
                        end: event['end'], info: event['info']};
    console.log('[AddCalendar]',client_json);
    var requestMsg = {type:'CALENDAR', msg: 'REQUEST_CALENDAR_ADD', data: client_json};

    $.get(dbLink, requestMsg, function (obj) {
        console.log('Request AddEvent');
    });
}

function DelCalendar(event) {
    var client_json = {title: event['title'], start: event['start'],
        end: event['end'], info: event['info']};
    console.log('[DelCalendar]',client_json);
    var requestMsg = {type:'CALENDAR', msg: 'REQUEST_CALENDAR_DEL', data: client_json};
    $.get(dbLink, requestMsg, function (obj) {
        console.log('Request DelEvent');
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
        console.log('Request UpdateEvent');
    });
}




