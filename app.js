/* express */
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);


/* Binding */
app.use('/public', express.static('public'));
app.use('/calendar', express.static('calendar'));
app.use('/event', express.static('event'));
app.use('/js', express.static('js'));


/* Web Server Open at 3000 */
server.listen(3000);
console.log("wait port 3000")


/* Rendring index */
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


/* Declare Mongo */
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("connected mongo serv");
});
mongoose.connect('mongodb://localhost/hackathon_db', function(err){
    if(err) console.log(err);
});
var memoSchema = mongoose.Schema({
    data: String,
    created: {type: Date, default: Date.now}
});
var calendarSchema = mongoose.Schema({
    title: String,
    start: String,
    end: {type: String, default: ""},
    info: {type: String, default: ""}
});
var eventSchema = mongoose.Schema({
    start: String,
    end: String,
    img: String,
    url: String
});
var tokenSchema = mongoose.Schema({
    token: String
});

var Memo = mongoose.model('Memo_msg', memoSchema);
var Calendar = mongoose.model('Calendar_msg', calendarSchema);
var Event = mongoose.model('Event_msg', eventSchema);
var Token = mongoose.model('user', tokenSchema);

/* Mongo Act */
/* Mongo Memo */
app.get('/data/memo', function(req, res){
    var client_obj = req.query;
    switch (client_obj.msg) {
        case "REQUEST_MEMO_ALL": // Semd All data of Memo
            var memodata = [];
            Memo.find(function (err, memos) {
                if(err) console.log(err);
                for (var i = 0; i < memos.length; i ++){
                    memodata.push(memos[i].data);
                }
                var obj = { type: "MEMO", msg: 'RESPONSE_MEMO_ALL', data: memodata };
                res.send(JSON.stringify(obj));
            });
            break;
        case "REQUEST_MEMO_ADD": // Adding one to mongo
            var newMsg = new Memo({data: client_obj.data});
            newMsg.save(function (err) {
                if(err) console.log(err);
                console.log("save memo");
            });
            Token.find(function (err, tokens) {
                if(err) console.log(err);
                for (var i = 0; i < tokens.length; i ++){
                    var mytoken = tokens[i].token;

                    var message = {
                        to: mytoken, // required fill with device token or topics

                        data: {
                            your_custom_data_key: 'your_custom_data_value'
                        },
                        notification: {
                            title: 'Family Hub 알림',
                            body: '새로운 메모가 등록되었습니다.'
                        }
                    };

                    //callback style
                    fcm.send(message, function(err, response){
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Successfully sent with response: ", response);
                        }
                    });

                }
            });
            break;
        case "REQUEST_MEMO_DEL":
            //var newMsg = new Memo({data: client_obj.data});
            Memo.remove({data: client_obj.data}, function (err) {
                if(err) console.log(err);
                console.log("del memo");
            });
            break;
        default:
            return
            break;
    }
});

/* Mongo Calendar */
app.get('/data/calendar', function(req, res){
    var client_obj = req.query;
    switch (client_obj.msg) {
        case "REQUEST_CALENDAR_ALL": // Semd All data of Memo
            Calendar.find(function (err, calendars) {
                if(err) console.log(err);
                var obj = { type: "CALENDAR", msg: 'RESPONSE_CALENDAR_ALL', data: calendars };
                res.send(JSON.stringify(obj));
            });
            break;
        case "REQUEST_CALENDAR_ADD": // Adding one to mongo
            var newCalendar = new Calendar({title: client_obj.data.title, start: client_obj.data.start
                                        , end: client_obj.data.end, info: client_obj.data.info});
            console.log(client_obj.data);
            newCalendar.save(function (err) {
                if(err) console.log(err);
                console.log("save calendar");
            });

            break;
        case "REQUEST_CALENDAR_ONE": // Adding one to mongo
            var newCalendar = new Calendar({title: client_obj.data.title, start: client_obj.data.start
                , end: client_obj.data.end});
            console.log(client_obj.data);
            res.send(JSON.stringify(obj));

            break;
        case "REQUEST_CALENDAR_DEL":
            //var newMsg = new Memo({data: client_obj.data});
            Calendar.remove({title: client_obj.data.title, start: client_obj.data.start
                    , end: client_obj.data.end, info: client_obj.data.info}, function (err) {
                if(err) console.log(err);
                console.log("del calendar");
            });
            break;
        case "REQUEST_CALENDAR_UPDATE":
            console.log(client_obj.data.oldEvent);
            console.log(client_obj.data.updateInfo);
            Calendar.update( client_obj.data.oldEvent, client_obj.data.updateInfo, function (err) {
                if(err) console.log(err);
                console.log("update calendar");
            })
            break;
        default:
            return
            break;
    }
});
app.get('/data/event', function(req, res){
    var client_obj = req.query;
    console.log(client_obj);
    switch (client_obj.msg) {
        case "REQUEST_EVENT_ALL": // Semd All data of Memo
            var eventdata = [];
            Event.find(function (err, events) {
                if(err) console.log(err);
                for (var i = 0; i < events.length; i ++){
                    eventdata.push(events[i]);
                }
                console.log(eventdata);
                var obj = { type: "DATA", msg: 'RESPONSE_EVENT_ALL', data: eventdata };
                res.send(JSON.stringify(obj));
            });
            break;
        case "REQUEST_EVENT_ADD": // Adding one to mongo
            console.log("A");
            var newEvent = new Event({start: client_obj.data.start, end: client_obj.data.end
                , img: client_obj.data.img, url: client_obj.data.url});
            console.log(client_obj.data);
            newEvent.save(function (err) {
                if(err) console.log(err);
                console.log("save event");
            });
            break;
    }
});
/* firebase */





var FCM = require('fcm-node');

var serverKey = 'AIzaSyDIG6zqCH8j82fpHjHfzqtniy2dXTkfHUg';
var fcm = new FCM(serverKey);
/*
function SendNotification(){
    Token.find(function (err, tokens) {
        if(err) console.log(err);
        for (var i = 0; i < tokens.length; i ++){
            var mytoken = tokens[i].token;

            var message = {
                to: mytoken, // required fill with device token or topics

                data: {
                    your_custom_data_key: 'your_custom_data_value'
                },
                notification: {
                    title: 'Family Hub 알림',
                    body: '새로운 메모가 등록되었습니다.'
                }
            };

    //callback style
            fcm.send(message, function(err, response){
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully sent with response: ", response);
                }
            });

        }
    });
}
*/

