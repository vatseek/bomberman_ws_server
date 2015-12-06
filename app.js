const BOMBERMAN             = 'b'; // this is what he usually looks like
const BOMB_BOMBERMAN        = 'o'; // this is if he is sitting on own bomb
const DEAD_BOMBERMAN        = 'd'; // oops, your Bomberman is dead (don't worry, he will appear
const OTHER_BOMBERMAN       = 'a'; // this is what other Bombermans looks like
const OTHER_BOMB_BOMBERMAN  = 'c'; // this is if player just set the bomb
const OTHER_DEAD_BOMBERMAN  = 'k'; // enemy corpse (it will disappear shortly, right on the next move)
const BOMB_TIMER_5          = '5'; // after bomberman set the bomb, the timer starts (5 tacts)
const BOMB_TIMER_4          = '4'; // this will blow up after 4 tacts
const BOMB_TIMER_3          = '3'; // this after 3
const BOMB_TIMER_2          = '2'; // two
const BOMB_TIMER_1          = '1'; // one
const BOOM                  = 'w'; // Boom! this is what is bomb does, everything that is destroyable
const WALL                  = '*'; // indestructible wall - it will not fall from bomb
const DESTROY_WALL          = '#'; // this wall could be blowed up
const DESTROYED_WALL        = 'H'; // this is how broken wall looks like, it will dissapear on next move
const MEAT_CHOPPER          = '&'; // this guys runs over the board randomly and gets in the way all the time
const DEAD_MEAT_CHOPPER     = 'x'; // this is chopper corpse
const NONE                  = ' '; // this is the only place where you can move your Bomberman

const fieldSize = 33;

var WebSocketServer = new require('ws');
var clients = {};
var mobs = [];
var port = process.env.PORT || 5000;
var webSocketServer = new WebSocketServer.Server({ port: port });
console.log('Starting on port:' + port);

function initFields() {
    var field = { };
    for (var i = 0; i < fieldSize; i++) {
        if (!field[i]) {
            field[i] = { };
        }
        for (var j = 0; j < fieldSize; j++) {
            if (i == 0 || j == 0 || i == (fieldSize-1) || j == (fieldSize-1) || (i%2 == 0 && j%2 == 0)) {
                field[i][j] = WALL;
            } else {
                field[i][j] = NONE;
            }
        }
    }

    return field;
}

//var x = 5;
//var y = 5;
//if (field[x][y] !== WALL) {
//    field[x-1][y] = NONE;
//    field[x][y] = BOMBERMAN;
//    x++;
//}

function random (low, high) {
    return Math.random() * (high - low) + low;
}

var fieldToString = function (field) {
    var result = '';
    for(var i in field) {
        for(var j in field[i]) {
            result += field[i][j];
        }
    }

    return result;
};

var barricadeCount = 100;
var addBarricade = function(field) {
    if (barricadeCount < 1) {
        return field;
    }

    var x = parseInt(random(0, fieldSize-1));
    var y = parseInt(random(0, fieldSize-1));
    if (field[x][y] == NONE) {
        field[x][y] = DESTROY_WALL;
        barricadeCount --;
    }

    return addBarricade(field);
};

var mobsCount = 6;
var addMobs = function(field){
    if (mobsCount < 1) {
        return field;
    }

    var x = parseInt(random(0, fieldSize-1));
    var y = parseInt(random(0, fieldSize-1));
    if (field[x][y] == NONE) {
        field[x][y] = MEAT_CHOPPER;
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
        if (field[mobX][mobY] == MEAT_CHOPPER) {
            if ((mobX-1 > 0) && field[mobX-1][mobY] == NONE) {
                posibleStep.push('left');
            }
            if (((mobX + 1) < fieldSize) && field[mobX+1][mobY] == NONE) {
                posibleStep.push('right');
            }
            if ((mobY-1 > 0) && field[mobX][mobY-1] == NONE) {
                posibleStep.push('top');
            }
            if (((mobY + 1) < fieldSize) && field[mobX][mobY+1] == NONE) {
                posibleStep.push('bottom');
            }

            // No free space
            if (!posibleStep.length) {
                continue;
            }

            var goTo = parseInt(random(0, posibleStep.length));
            //console.log(goTo, posibleStep);

            field[mobX][mobY] = NONE;
            switch (posibleStep[goTo]) {
                case 'left':
                    field[mobX-1][mobY] = MEAT_CHOPPER;
                    mobs[index].x = mobX-1;
                    break;
                case 'right':
                    field[mobX+1][mobY] = MEAT_CHOPPER;
                    mobs[index].x = mobX+1;
                    break;
                case 'top':
                    field[mobX][mobY-1] = MEAT_CHOPPER;
                    mobs[index].y = mobY-1;
                    break;
                case 'bottom':
                    field[mobX][mobY+1] = MEAT_CHOPPER;
                    mobs[index].y = mobY+1;
                    break;
            }
        }
    }

    return field;
};

// Init game data
var field = initFields();
field = addBarricade(field);
field = addMobs(field);

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
    field = moveMob(field);
    var fieldString = fieldToString(field);
    for (var key in clients) {
        clients[key].send(fieldString);
    }
}, 1000);