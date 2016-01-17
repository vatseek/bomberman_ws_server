"use strict";
var g = require('./g');

var Base = class {
    constructor(x, y) {
        this.positionX = x;
        this.positionY = y;
        this.code = g.NONE;
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

    next() {
        
    }
};

module.exports = Base;
