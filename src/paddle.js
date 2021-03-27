import Square from './square';
import {addKeyBind} from './input/key-manager';
import {removeGameObject} from './game-object-manager';
import { getCanvasWidth } from './index';

class Paddle extends Square {
    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} xVelocity 
     * @param {*} yVelocity 
     * @param {*} dimension 
     * @param {*} color 
     * @param {*} depth 
     */
    constructor(x, y, xVelocity, yVelocity, width, height, color, depth) {
        super(x, y, 0, 0, width, height, color, depth);
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
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x + this.width > getCanvasWidth()) {
            this.x = getCanvasWidth() - this.width;
        }
        Square.prototype.update.call(this, [deltaTime]);
    }
}

export default Paddle;