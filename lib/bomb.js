"use strict";
var g = require('./g');
var Base = require('./base');
var Boom = require('./boom');

var Bomb = class extends Base {
    constructor(x, y) {
        super(x, y);
        this.ticks = 5;
        this.type = 'bomb';
    }

    getCode() {
        switch (this.ticks) {
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
                return g.BOOM;
        }
    }

    next() {
        this.ticks--;
        global.field.setPosition(this.positionX, this.positionY, this.getCode());

        if (this.ticks == 0) {
            var boom = new Boom(this.positionX, this.positionY);
            global.field.boom.push(boom);
            global.field.setPosition(this.positionX, this.positionY, boom);
            this.remove();
        }
    }
};

module.exports = Bomb;
