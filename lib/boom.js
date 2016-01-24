"use strict";
var g = require('./g');
var Base = require('./base');

var Boom = class extends Base {
    constructor(x, y) {
        super(x, y);
        this.code = g.BOOM;
        this.boomSize = 4;
        this.type = 'boom';
        this.removeExplode = false;

        var startX = this.positionX - this.boomSize;
        var endX = this.positionX + this.boomSize;
        var startY = this.positionY - this.boomSize;
        var endY = this.positionY + this.boomSize;

        if (startX < 1) {
            startX = 1;
        }
        if (endX > (global.field.size - 1)) {
            endX = global.field.size - 1;
        }
        if (startY < 1) {
            startY = 1;
        }
        if (endY > (global.field.size - 1)) {
            endY = global.field.size - 1;
        }

        this.canExplode(this.positionX, this.positionY)
        for (var cx = this.positionX + 1; cx < endX; cx++) {
            if (!this.canExplode(cx, this.positionY)) {
                break;
            }
            global.field.setPosition(cx, this.positionY, this.getCode());
        }
        for (cx = this.positionX - 1; cx > startX; cx--) {
            if (!this.canExplode(cx, this.positionY)) {
                break;
            }
            global.field.setPosition(cx, this.positionY, this.getCode());
        }
        for (var cy = this.positionY + 1; cy < endY; cy++) {
            if (!this.canExplode(this.positionX, cy)) {
                break;
            }
            global.field.setPosition(this.positionX, cy, this.getCode());
        }
        for (cy = this.positionY - 1; cy > startY; cy--) {
            if (!this.canExplode(this.positionX, cy)) {
                break;
            }
            global.field.setPosition(this.positionX, cy, this.getCode());
        }
    }

    canExplode(x, y) {
        var itemCode = global.field.getPosition(x, y, true);
        if (itemCode == g.WALL) {
            return false;
        }

        if (itemCode == g.DESTROY_WALL) {
            global.field.setPosition(x, y, this.getCode());
            return false;
        }

        if (itemCode != g.NONE) {
            // TODO: destroy element
            global.field.setPosition(x, y, this.getCode());
        }

        return true;
    }

    next() {
        var startX = this.positionX - this.boomSize;
        var endX = this.positionX + this.boomSize;
        var startY = this.positionY - this.boomSize;
        var endY = this.positionY + this.boomSize;

        if (startX < 1) {
            startX = 1;
        }
        if (endX > (global.field.size - 1)) {
            endX = global.field.size - 1;
        }
        if (startY < 1) {
            startY = 1;
        }
        if (endY > (global.field.size - 1)) {
            endY = global.field.size - 1;
        }


        if (this.removeExplode) {
            for (var x = startX; x < endX ; x++) {
                for (var y = startY; y < endY ; y++) {
                    //if (global.field.getCode(x, y, true) == this.getCode()) {
                    //    global.field.setPosition(x, y, g.NONE);
                    //}
                }
            }
        }

        this.removeExplode = true;
    }
};

module.exports = Boom;
