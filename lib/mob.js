var g = require('./g');

var mob = function(x, y) {
    var id = 0;
    var positionX = x;
    var positionY = y;

    return {
        getCode: function () {
            return g.MEAT_CHOPPER;
        },
        setPosition: function(x, y) {
            positionX = x;
            positionY = y;
        },
        getPosition: function() {
            return [positionX, positionY];
        },
        next: function () {
            var posibleStep = [];

            if ((positionX - 1 > 0) && global.field.getPosition(positionX - 1, positionY, true)  == g.NONE) {
                posibleStep.push('left');
            }
            if (((positionX + 1) < g.fieldSize) && global.field.getPosition(positionX + 1, positionY, true) == g.NONE) {
                posibleStep.push('right');
            }
            if ((positionY - 1 > 0) && global.field.getPosition(positionX, positionY - 1) == g.NONE) {
                posibleStep.push('top');
            }
            if (((positionY + 1) < g.fieldSize) && global.field.getPosition(positionX, positionY + 1) == g.NONE) {
                posibleStep.push('bottom');
            }

            // No free space
            var goTo = false;
            if (posibleStep.length < 1) {
                return;
            } else if (posibleStep.length == 1) {
                goTo = 0
            } else {
                goTo = g.random(0, posibleStep.length-1);
            }

            global.field.setPosition(positionX, positionY, g.NONE);
            switch (posibleStep[goTo]) {
                case 'left':
                    positionX = positionX - 1;
                    break;
                case 'right':
                    positionX = positionX + 1;
                    break;
                case 'top':
                    positionY = positionY - 1;
                    break;
                case 'bottom':
                    positionY = positionY + 1;
                    break;
            }
            global.field.setPosition(positionX, positionY, this);
        }
    };
};
module.exports = mob;
