import { removeGameObject } from './game-object-manager';
import Square from './square';

const WHITE = [1, 1, 1, 1];

class BouncingSquare extends Square {
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} xVelocity 
     * @param {Number} yVelocity 
     * @param {Number} xBounds 
     * @param {Number} yBounds 
     * @param {Number} dimension 
     * @param {Number} depth Draw depth of the square
     */
    constructor(x, y, xVelocity, yVelocity, dimension, depth) {
        super(x, y, xVelocity, yVelocity, dimension, dimension, WHITE, depth);
    }

    update(deltaTime) {
        if (this.x < 0) {
            this.x = 0;
            this.xVelocity = -this.xVelocity;
            this.applyFriction();
        }
        if (this.x + this.dimension > this.xBounds) {
            this.x = this.xBounds - this.dimension;
            this.xVelocity = -this.xVelocity;
            this.applyFriction();
        }
        if (this.y < 0) {
            // need to account for missed ball
            removeGameObject(this);
        }
        if (this.y + this.dimension > this.yBounds) {
            this.y = this.yBounds - this.dimension;
            this.yVelocity = -this.yVelocity;
            this.applyFriction();
        }
        Square.prototype.update.call(this, [deltaTime]);
    }

    /**
     * 
     * @param {Number} xBound 
     * @param {Number} yBound 
     * @param {Number} dimension  Size of the square in pixels
     * @param {Number} speed Speed of the square in pixels/second
     */
    static generateRandomSquare(xBound, yBound, dimension, speed, depth) {
        let x = Math.random() * xBound;
        let y = Math.random() * yBound;
        let angle = Math.random() * Math.PI * 2;
        let xVelocity = Math.cos(angle) * speed;
        let yVelocity = Math.sin(angle) * speed;
        let color = generateColorFromSpeed(speed);
        return new BouncingSquare(x, y, xVelocity, yVelocity, xBound, yBound, dimension, color, depth);
    }
}

export default BouncingSquare;