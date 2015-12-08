var g = require('./g');

var field = function(fieldSize, barricadesCount) {
    var field = {};
    var size = fieldSize;
    if (!barricadesCount) {
        barricadesCount = 50;
    }

    var setBarricade = function(field) {
        var x = g.random(1, size - 1);
        var y = g.random(1, size - 1);
        if ((((x + y)%2 != 0) || (x%2) !=0 || (y%2) !=0 ) && field[x][y] == g.NONE) {
            field[x][y] = g.DESTROY_WALL;
            return field;
        } else {
            return setBarricade(field);
        }
    };

    var init = function(){
        var field = { };
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
            field = setBarricade(field);
        }

        return field;
    };
    field = init();

    return {
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
                    return field[x][y].getCode()
                }

                return field[x][y]
            }

            return field[x][y];
        },
        setPosition: function(x, y, value) {

        },
        setRandomPosition: function(value) {

        }
    }
};

module.exports = field;