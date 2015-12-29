var g = require('./lib/g');
var WebSocketServer = new require('ws');
var clients = {};
var port = process.env.PORT || 5000;
var Field = require('./lib/field');

/** Init field */
global.field = new Field(g.fieldSize, 120);
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

var tickLong = 1000;
setInterval(function() {
    global.field.next();
    var fieldString = global.field.getFieldString();
    for (var key in clients) {
        clients[key].send(fieldString);
    }
}, tickLong);