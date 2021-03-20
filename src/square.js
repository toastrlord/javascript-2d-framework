import GameObject from './game-object';
import {drawRectangle} from './graphics/primitive-shapes';

// simple square that can be rendered, and have velocity applied to it
class Square extends GameObject {
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
     * @param {Number} depth Draw depth of the square
     */
    constructor(x, y, xVelocity, yVelocity, xBounds, yBounds, dimension, color, depth) {
        super();
        this.x = x;
        this.y = y;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.xBounds = xBounds;
        this.yBounds = yBounds;
        this.dimension = dimension;
        this.color = color;
        this.depth = depth;
    }

    update(deltaTime) {
        this.x += this.xVelocity * deltaTime;
        this.y += this.yVelocity * deltaTime;
        drawRectangle(this.x, this.y, this.x + this.dimension, this.y + this.dimension, this.color, this.depth);
    }
}

export default Square;