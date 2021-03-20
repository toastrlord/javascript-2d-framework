import Square from './square';
import {addKeyBind} from './input/key-manager';

class ControllableSquare extends Square {
    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} xVelocity 
     * @param {*} yVelocity 
     * @param {*} xBounds 
     * @param {*} yBounds 
     * @param {*} dimension 
     * @param {*} color 
     * @param {*} depth 
     */
    constructor(x, y, xVelocity, yVelocity, xBounds, yBounds, dimension, color, depth) {
        super(x, y, 0, 0, xBounds, yBounds, dimension, color, depth);
        this.currentVelocity = [0, 0];
        let square = this;
        addKeyBind('keydown', 'arrowleft', function() {
            square.currentVelocity[0] = -xVelocity;
        });
        addKeyBind('keydown', 'arrowright', function() {
            square.currentVelocity[0] = xVelocity;
        });
        addKeyBind('keyup', 'arrowright', function() {
            square.currentVelocity[0] = 0;
        });
        addKeyBind('keyup', 'arrowleft', function() {
            square.currentVelocity[0] = 0;
        })
    }

    update(deltaTime) {
        this.x += this.currentVelocity[0] * deltaTime;
        this.y += this.currentVelocity[1] * deltaTime;
        Square.prototype.update.call(this, [deltaTime]);
    }
}

export default ControllableSquare;