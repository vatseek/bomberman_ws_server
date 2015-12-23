var g = require('./lib/g');
var WebSocketServer = new require('ws');
var clients = {};
var mobs = [];
var port = process.env.PORT || 5000;

/** Init field (put metal and brick)*/
global.field = require('./lib/field')(g.fieldSize, 120);
/** Set mobs to field */
global.field.setMobs(20);

var webSocketServer = new WebSocketServer.Server({ port: port });
console.log('Starting on port:' + port);
webSocketServer.on('connection', function (ws) {
    var id = Math.random();
    clients[id] = ws;

    ws.on('message', function (message) {

    });

    ws.on('close', function () {
        console.log('Connection close: ' + id);
        delete clients[id];
    });
});

setInterval(function() {
    global.field.next();
    var fieldString = global.field.getFieldString();
    for (var key in clients) {
        clients[key].send(fieldString);
    }
}, 1000);