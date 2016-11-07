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

app.get('/data', function(req, res){
    var obj = { hello: 'world', data: [1,2,3] };
    res.send(JSON.stringify(obj));
});

