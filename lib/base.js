"use strict";
var g = require('./g');

var Base = class {
    constructor(x, y) {
        this.positionX = x;
        this.positionY = y;
    }

    getCode() {
        return g.NONE;
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
