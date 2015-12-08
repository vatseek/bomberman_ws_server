var mob = function(x, y) {

    var positionX = x;
    var positionY = y;

    console.log(global.test);

    return {
        create: function () {
            return x;
        },
        move: function () {
            var posibleStep = [];
            console.log(field);
            if (field[positionX][positionY] == MEAT_CHOPPER) {
                if ((positionX-1 > 0) && field[positionX-1][positionY] == NONE) {
                    posibleStep.push('left');
                }
                if (((positionX + 1) < fieldSize) && field[positionX+1][positionY] == NONE) {
                    posibleStep.push('right');
                }
                if ((positionY-1 > 0) && field[positionX][positionY-1] == NONE) {
                    posibleStep.push('top');
                }
                if (((positionY + 1) < fieldSize) && field[positionX][positionY+1] == NONE) {
                    posibleStep.push('bottom');
                }
            }
            // No free space
            if (!posibleStep.length) {
                return;
            }

            var goTo = parseInt(random(0, posibleStep.length));
            field[positionX][positionY] = NONE;
            switch (posibleStep[goTo]) {
                case 'left':
                    field[positionX-1][positionY] = MEAT_CHOPPER;
                    positionX = positionX-1;
                    break;
                case 'right':
                    field[positionX+1][positionY] = MEAT_CHOPPER;
                    positionX = positionX+1;
                    break;
                case 'top':
                    field[positionX][positionY-1] = MEAT_CHOPPER;
                    positionY = positionY-1;
                    break;
                case 'bottom':
                    field[positionX][positionY+1] = MEAT_CHOPPER;
                    positionY = positionY+1;
                    break;
            }
        }
    };
};

module.exports = mob;
