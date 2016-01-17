"use strict";
var g = require('./g');
var Base = require('./base');

var Mob = class extends Base {
    constructor(x, y) {
        super(x, y);
        this.id = 0;
        this.code = g.MEAT_CHOPPER;
    }

    next() {
        let posibleStep = [];

        if ((this.positionX - 1 > 0) && global.field.getPosition(this.positionX - 1, this.positionY, true)  == g.NONE) {
            posibleStep.push('left');
        }
        if (((this.positionX + 1) < g.fieldSize) && global.field.getPosition(this.positionX + 1, this.positionY, true) == g.NONE) {
            posibleStep.push('right');
        }
        if ((this.positionY - 1 > 0) && global.field.getPosition(this.positionX, this.positionY - 1) == g.NONE) {
            posibleStep.push('top');
        }
        if (((this.positionY + 1) < g.fieldSize) && global.field.getPosition(this.positionX, this.positionY + 1) == g.NONE) {
            posibleStep.push('bottom');
        }

        // No free space
        let goTo = false;
        if (posibleStep.length < 1) {
            return;
        } else if (posibleStep.length == 1) {
            goTo = 0
        } else {
            goTo = g.random(0, posibleStep.length-1);
        }

        global.field.setPosition(this.positionX, this.positionY, g.NONE);
        switch (posibleStep[goTo]) {
            case 'left':
                this.positionX = this.positionX - 1;
                break;
            case 'right':
                this.positionX = this.positionX + 1;
                break;
            case 'top':
                this.positionY = this.positionY - 1;
                break;
            case 'bottom':
                this.positionY = this.positionY + 1;
                break;
        }
        global.field.setPosition(this.positionX, this.positionY, this);
    }
};

module.exports = Mob;
