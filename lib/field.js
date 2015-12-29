var g = require('./g');
var Mob = require('./mob');
var Bomb = require('./bomb');

var field = function(fieldSize, barricadesCount) {
    var field = {};
    var mobsList = [];
    var bombsList = [];
    var size = fieldSize;
    if (!barricadesCount) {
        barricadesCount = 50;
    }

    var setRandomPosition = function(value) {
        var x = g.random(1, size - 1);
        var y = g.random(1, size - 1);
        if ((((x + y)%2 != 0) || (x%2) !=0 || (y%2) !=0 ) && field[x][y] == g.NONE) {
            if (typeof(value) == 'object') {
                value.setPosition(x, y);
            }
            return field[x][y] = value;
        } else {
            return setRandomPosition(value);
        }
    };

    var init = function(){
        field = { };
        for (var i = 0; i < size; i++) {
            if (!field[i]) {
                field[i] = { };
            }
            for (var j = 0; j < size; j++) {
                if (i == 0 || j == 0 || i == (size-1) || j == (size-1) || (i%2 == 0 && j%2 == 0)) {
                    field[i][j] = g.WALL;
                } else {
                    field[i][j] = g.NONE;
                }
            }
        }

        for(i = 0; i < barricadesCount; i++) {
            setRandomPosition(g.DESTROY_WALL);
        }

        return field;
    };
    field = init();

    return {
        setMobs: function(mobsCount) {
            for (var i = 0; i < mobsCount; i++) {
                var mob = new Mob();
                var position = this.getFreePosition();
                mob.setPosition(position[0], position[1]);
                this.setPosition(position[0], position[1], mob.getCode());
                mobsList.push(mob);
            }


            var position = this.getFreePosition();
            var bomb = new Bomb(position[0], position[1]);
            bombsList.push(bomb);
            this.setPosition(position[0], position[1], bomb.getCode());


        },
        getField: function() {
            return field;
        },
        getFieldString: function() {
            var string = '';
            for (var i in field) {
                for (var j in field) {
                    if (typeof(field[i][j]) == 'object') {
                        string += field[i][j].getCode();
                    } else {
                        string += field[i][j];
                    }
                }
            }

            return string;
        },
        getPosition: function(x, y, asCode) {
            if (asCode) {
                if (field[x][y] == 'object') {
                    return field[x][y].getCode();
                }

                return field[x][y];
            }

            return field[x][y];
        },
        setPosition: function(x, y, value) {
            field[x][y] = value;
        },
        getFreePosition: function() {
            var x = g.random(1, size - 1);
            var y = g.random(1, size - 1);

            if ((((x + y)%2 != 0) || (x%2) !=0 || (y%2) !=0 ) && field[x][y] == g.NONE) {
                return [x, y];
            } else {
                return this.getFreePosition();
            }
        },
        next: function() {
            //Move mobs
            for (var item in mobsList) {
                var mobPos = mobsList[item].getPosition();
                this.setPosition(mobPos[0], mobPos[1], g.NONE);
                mobsList[item].next();
                mobPos = mobsList[item].getPosition();
                this.setPosition(mobPos[0], mobPos[1], g.MEAT_CHOPPER);
            }

            for (item in bombsList) {
                bombsList[item].next();
            }
        }
    }
};

module.exports = field;