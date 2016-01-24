"use strict";
var g = require('./g');

var Base = class {
    constructor(x, y) {
        this.positionX = x;
        this.positionY = y;
        this.code = g.NONE;
        this.id = this.gUid();
        this.type = 'base';
    }

    getCode() {
        return this.code;
    }

    setPosition(x, y) {
        this.positionX = x;
        this.positionY = y;
    }

    getPosition() {
        return [this.positionX, this.positionY];
    }

    gUid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    getId() {
        return this.id;
    }

    remove() {
        for(var i = global.field[this.type].length - 1; i >= 0; i--) {
            if(global.field[this.type][i].getId() === this.getId()) {
                global.field[this.type].splice(i, 1);
                break;
            }
        }
    }

    next() {
        
    }
};

module.exports = Base;
