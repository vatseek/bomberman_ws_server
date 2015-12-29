var g = require('./g');

var mob = function(x, y) {
    var id = 0;
    var positionX = x;
    var positionY = y;
    var ticks = 5;

    return {
        getCode: function () {
            switch (ticks) {
                case 5:
                    return g.BOMB_TIMER_5;
                    break;
                case 4:
                    return g.BOMB_TIMER_4;
                    break;
                case 3:
                    return g.BOMB_TIMER_3;
                    break;
                case 2:
                    return g.BOMB_TIMER_2;
                    break;
                case 1:
                    return g.BOMB_TIMER_1;
                    break;
                default:
                    return g.MEAT_CHOPPER;
            }
        },
        setPosition: function(x, y) {
            positionX = x;
            positionY = y;
        },
        getPosition: function() {
            return [positionX, positionY];
        },
        next: function() {
            ticks--;
            global.field.setPosition(positionX, positionY, this.getCode());
            if (!ticks) {
                console.log('boom');
            }
        }
    };
};
module.exports = mob;
