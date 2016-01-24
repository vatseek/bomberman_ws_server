"use strict";
var g = require('./g');
var Mob = require('./mob');
var Bomb = require('./bomb');

var Field = class {
    constructor(fieldSize, barricadesCount) {
        this.field = { };
        this.mob = [];
        this.bomb = [];
        this.boom = [];
        this.size = fieldSize;

        this.barricadesCount = barricadesCount;
        if (!barricadesCount) {
            this.barricadesCount = 50;
        }

        this.init();
    }

    init() {
        for (var i = 0; i < this.size; i++) {
            if (!this.field[i]) {
                this.field[i] = { };
            }
            for (var j = 0; j < this.size; j++) {
                if (i == 0 || j == 0 || i == (this.size - 1) || j == (this.size - 1) || (i % 2 == 0 && j % 2 == 0)) {
                    this.field[i][j] = g.WALL;
                } else {
                    this.field[i][j] = g.NONE;
                }
            }
        }

        for(i = 0; i < this.barricadesCount; i++) {
            this.setRandomPosition(g.DESTROY_WALL);
        }
    }

    setRandomPosition(value) {
        var x = g.random(1, this.size - 1);
        var y = g.random(1, this.size - 1);
        if ((((x + y) % 2 != 0) || (x % 2) != 0 || (y % 2) != 0 ) && this.field[x][y] == g.NONE) {
            if (typeof(value) == 'object') {
                value.setPosition(x, y);
            }
            return this.field[x][y] = value;
        } else {
            return this.setRandomPosition(value);
        }
    }

    setMobs(mobsCount) {
        for (var i = 0; i < mobsCount; i++) {
            var mob = new Mob();
            var position = this.getFreePosition();
            mob.setPosition(position[0], position[1]);
            this.setPosition(position[0], position[1], mob.getCode());
            this.mob.push(mob);
        }

        position = this.getFreePosition();
        var bomb = new Bomb(position[0], position[1]);
        this.bomb.push(bomb);
        this.setPosition(position[0], position[1], bomb.getCode());
    }

    getFieldString() {
        let string = '';
        for (var i in this.field) {
            for (var j in this.field) {
                if (typeof(this.field[i][j]) == 'object') {
                    string += this.field[i][j].getCode();
                } else {
                    string += this.field[i][j];
                }
            }
        }

        return string;
    }

    getPosition(x, y, asCode) {
        if (asCode) {
            if (this.field[x][y] == 'object') {
                return this.field[x][y].getCode();
            }

            return this.field[x][y];
        }

        return this.field[x][y];
    }

    setPosition(x, y, value) {
        this.field[x][y] = value;
    }

    getFreePosition() {
        let x = g.random(1, this.size - 1);
        let y = g.random(1, this.size - 1);

        if ((((x + y) % 2 != 0) || (x % 2) != 0 || (y % 2) != 0 ) && this.field[x][y] == g.NONE) {
            return [x, y];
        } else {
            return this.getFreePosition();
        }
    }

    next() {
        //Move mobs
        for (var item in this.mob) {
            var mobPos = this.mob[item].getPosition();
            this.setPosition(mobPos[0], mobPos[1], g.NONE);
            this.mob[item].next();
            mobPos = this.mob[item].getPosition();
            this.setPosition(mobPos[0], mobPos[1], g.MEAT_CHOPPER);
        }

        for (item in this.bomb) {
            this.bomb[item].next();
        }

        for (item in this.boom) {
            this.boom[item].next();
        }
    }
};

module.exports = Field;