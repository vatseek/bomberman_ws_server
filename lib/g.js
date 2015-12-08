module.exports = Object.freeze({
    fieldSize: 33,
    BOMBERMAN             : 'b', // this is what he usually looks like
    BOMB_BOMBERMAN        : 'o', // this is if he is sitting on own bomb
    DEAD_BOMBERMAN        : 'd', // oops, your Bomberman is dead (don't worry, he will appear
    OTHER_BOMBERMAN       : 'a', // this is what other Bombermans looks like
    OTHER_BOMB_BOMBERMAN  : 'c', // this is if player just set the bomb
    OTHER_DEAD_BOMBERMAN  : 'k', // enemy corpse (it will disappear shortly, right on the next move)
    BOMB_TIMER_5          : '5', // after bomberman set the bomb, the timer starts (5 tacts)
    BOMB_TIMER_4          : '4', // this will blow up after 4 tacts
    BOMB_TIMER_3          : '3', // this after 3
    BOMB_TIMER_2          : '2', // two
    BOMB_TIMER_1          : '1', // one
    BOOM                  : 'w', // Boom! this is what is bomb does, everything that is destroyable
    WALL                  : '*', // indestructible wall - it will not fall from bomb
    DESTROY_WALL          : '#', // this wall could be blowed up
    DESTROYED_WALL        : 'H', // this is how broken wall looks like, it will dissapear on next move
    MEAT_CHOPPER          : '&', // this guys runs over the board randomly and gets in the way all the time
    DEAD_MEAT_CHOPPER     : 'x', // this is chopper corpse
    NONE                  : ' ',  // this is the only place where you can move your Bomberman
    random: function(low, high) {
        if (!low) {
            low = 0;
        }
        if (!high) {
            high = 32;
        }
        return Math.round(Math.random() * (high - low) + low);
    }
});