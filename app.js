var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.use('/public', express.static('public'));
app.use('/js', express.static('js'));
server.listen(3000);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/data/memo', function(req, res){
    var client_obj = req.query;
    switch (client_obj.msg) {
        case "REQUEST_MEMO_ALL":
            var obj = { type: "MEMO", msg: 'REQUEST_MEMO_ALL', data: ["a","b","c"] };
            res.send(JSON.stringify(obj));
            break;
        case "REQUEST_MEMO_ADD":

            break;
        case "REQUEST_MEMO_REMOVE":

            break;
        default:
            return
            break;
    }
});

