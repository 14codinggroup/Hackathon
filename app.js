/* express */
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);


/* Binding */
app.use('/public', express.static('public'));
app.use('/calendar', express.static('calendar'));
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
    end: String,
    info: String
});
var Memo = mongoose.model('Memo_msg', memoSchema);
var Calendar = mongoose.model('Calendar_msg', calendarSchema);


/* Mongo Act */
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
                var obj = { type: "MEMO", msg: 'REQUEST_MEMO_ALL', data: memodata };
                res.send(JSON.stringify(obj));
            });
            break;
        case "REQUEST_MEMO_ADD": // Adding one to mongo
            var newMsg = new Memo({data: client_obj.data});
            newMsg.save(function (err) {
                if(err) console.log(err);
                console.log("save memo");
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

app.get('/data/calendar', function(req, res){
    var client_obj = req.query;
    switch (client_obj.msg) {
        case "REQUEST_CALENDAR_ALL": // Semd All data of Memo
            var calendardata = [];
            Calendar.find(function (err, calendars) {
                if(err) console.log(err);
                for (var i = 0; i < Calendar.length; i ++){
                    calendardata.push(calendars[i]);
                }
                var obj = { type: "MEMO", msg: 'REQUEST_MEMO_ALL', data: calendardata };
                res.send(JSON.stringify(obj));
            });
            break;
        case "REQUEST_CALENDAR_ADD": // Adding one to mongo
            var newCalendar = new Calendar({title: client_obj.title, start: client_obj.start
                                        , end: client_obj.end, info: client_obj.info});
            newCalendar.save(function (err) {
                if(err) console.log(err);
                console.log("save calendar");
            });
            break;
        case "REQUEST_CALENDAR_DEL":
            //var newMsg = new Memo({data: client_obj.data});
            Calendar.remove({title: client_obj.title, start: client_obj.start
                    , end: client_obj.end, info: client_obj.info}, function (err) {
                if(err) console.log(err);
                console.log("del calendar");
            });
            break;
        case "REQUEST_CALENDAR_UPDATE":
            Calendar.remove({data: client_obj.data}, function (err) {
                if(err) console.log(err);
                console.log("update calendar");
            });
            break;
        default:
            return
            break;
    }
});

/* firebase */
var gcm = require('node-gcm');
var message = new gcm.Message();

message.addData('hello', 'world');
message.addNotification('title', 'Hello');
message.addNotification('icon', 'ic_launcher');
message.addNotification('body', 'World');

var regTokens = ['a'];
var sender = new gcm.Sender('AIzaSyDIG6zqCH8j82fpHjHfzqtniy2dXTkfHUg');

sender.send(message, regTokens, function (err, response) {
    if(err) {
        console.error(err);
    } else {
        console.log(response);
    }
});

