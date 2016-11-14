var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.use('/public', express.static('public'));
app.use('/js', express.static('js'));

var mongoose = require('mongoose');

server.listen(3000);
console.log("wait port 3000")

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
    id: String,
    data: String,
    created: {type: Date, default: Date.now}
});

var Memo = mongoose.model('Memo_msg', memoSchema);
var Calendar = mongoose.model('Calendar_msg', calendarSchema);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/calendar.html');
});

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

