var g = require('./lib/g');
var WebSocketServer = new require('ws');
var clients = {};
var mobs = [];
var port = process.env.PORT || 5000;

/** Init field (put metal and brick)*/
global.field = require('./lib/field')(g.fieldSize, 120);

var field = global.field.getField();

var mobsCount = 20;
var addMobs = function(field){
    if (mobsCount < 1) {
        return field;
    }

    var x = parseInt(g.random(0, g.fieldSize-1));
    var y = parseInt(g.random(0, g.fieldSize-1));
    if (field[x][y] ==g. NONE) {
        field[x][y] = g.MEAT_CHOPPER;
        mobs.push({x: x, y: y});
        mobsCount --;
    }

    return addMobs(field);
};

var moveMob = function(field) {
    for (var index in mobs) {
        var mobX = mobs[index].x;
        var mobY = mobs[index].y;
        var posibleStep = [];
        if (field[mobX][mobY] == g.MEAT_CHOPPER) {
            if ((mobX-1 > 0) && field[mobX-1][mobY] == g.NONE) {
                posibleStep.push('left');
            }
            if (((mobX + 1) < g.fieldSize) && field[mobX+1][mobY] == g.NONE) {
                posibleStep.push('right');
            }
            if ((mobY-1 > 0) && field[mobX][mobY-1] == g.NONE) {
                posibleStep.push('top');
            }
            if (((mobY + 1) < g.fieldSize) && field[mobX][mobY+1] == g.NONE) {
                posibleStep.push('bottom');
            }

            // No free space
            if (!posibleStep.length) {
                continue;
            }

            var goTo = parseInt(g.random(0, posibleStep.length));
            //console.log(goTo, posibleStep);

            field[mobX][mobY] = g.NONE;
            switch (posibleStep[goTo]) {
                case 'left':
                    field[mobX-1][mobY] = g.MEAT_CHOPPER;
                    mobs[index].x = mobX-1;
                    break;
                case 'right':
                    field[mobX+1][mobY] = g.MEAT_CHOPPER;
                    mobs[index].x = mobX+1;
                    break;
                case 'top':
                    field[mobX][mobY-1] = g.MEAT_CHOPPER;
                    mobs[index].y = mobY-1;
                    break;
                case 'bottom':
                    field[mobX][mobY+1] = g.MEAT_CHOPPER;
                    mobs[index].y = mobY+1;
                    break;
            }
        }
    }

    return field;
};

field = addMobs(field);

var fieldToString = function (field) {
    var result = '';
    for(var i in field) {
        for(var j in field[i]) {
            result += field[i][j];
        }
    }

    return result;
};

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
    //field = moveMob(field);
    var fieldString = fieldToString(field);
    for (var key in clients) {
        clients[key].send(fieldString);
    }
}, 1000);