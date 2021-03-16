import GameObject from './game-object';
import {drawRectangle} from 'graphics/primitive-shapes';

const TOLERANCE = 0.1; // min speed until we round down to zero
const FRICTION = 0.95; // percentage of initial speed remaining after an impact, 
// < 1, speed is lost with each impact
// = 1, no speed lost
// > 1, speed is gained on each impact
const MAX_SPEED = 100; // pixels/second, used for calculating the color
const MIN_COLOR = [0, 0, 1, 1];
const MAX_COLOR = [1, 0, 0, 1];

function generateColorFromSpeed(speed) {
    let ratio = speed / MAX_SPEED;
    if (ratio > 1) {
        ratio = 1;
    }
    let color = [];
    for (let i = 0; i < 3; i++) {
        let diff = MAX_COLOR[i] - MIN_COLOR[i];
        color.push(diff * ratio + MIN_COLOR[i]);
    }
    color.push(1); // alpha value

    return color;
}

class BouncingSquare extends GameObject {
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} xVelocity 
     * @param {Number} yVelocity 
     * @param {Number} xBounds 
     * @param {Number} yBounds 
     * @param {Number} dimension 
     * @param {[Number]} color 
     */
    constructor(x, y, xVelocity, yVelocity, xBounds, yBounds, dimension, color) {
        super();
        this.x = x;
        this.y = y;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.xBounds = xBounds;
        this.yBounds = yBounds;
        this.dimension = dimension;
        this.color = color;
    }

    applyFriction() {
        this.xVelocity *= FRICTION;
        this.yVelocity *= FRICTION;
        if (Math.abs(this.xVelocity) <= TOLERANCE) {
            this.xVelocity = 0;
        }
        if (Math.abs(this.yVelocity) <= TOLERANCE) {
            this.yVelocity = 0;
        }
        this.color = generateColorFromSpeed(Math.sqrt(this.xVelocity ** 2 + this.yVelocity ** 2));
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
            this.y = 0;
            this.yVelocity = -this.yVelocity;
            this.applyFriction();
        }
        if (this.y + this.dimension > this.yBounds) {
            this.y = this.yBounds - this.dimension;
            this.yVelocity = -this.yVelocity;
            this.applyFriction();
        }
        this.x += this.xVelocity * deltaTime;
        this.y += this.yVelocity * deltaTime;
        drawRectangle(this.x, this.y, this.x + this.dimension, this.y + this.dimension, this.color);
    }

    /**
     * 
     * @param {Number} xBound 
     * @param {Number} yBound 
     * @param {Number} dimension  Size of the square in pixels
     * @param {Number} speed Speed of the square in pixels/second
     */
    static generateRandomSquare(xBound, yBound, dimension, speed) {
        let x = Math.random() * xBound;
        let y = Math.random() * yBound;
        let angle = Math.random() * Math.PI * 2;
        let xVelocity = Math.cos(angle) * speed;
        let yVelocity = Math.sin(angle) * speed;
        let color = generateColorFromSpeed(speed);
        return new BouncingSquare(x, y, xVelocity, yVelocity, xBound, yBound, dimension, color);
    }
}

export default BouncingSquare;