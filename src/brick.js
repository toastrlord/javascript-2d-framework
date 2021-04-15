import GameObject from './game-object';
import DrawRectangleComponent from './graphics/drawComponent';
import { RectCollider } from './physics/collider';
import {removeGameObject} from './game-object-manager';

const RED = [1, 0, 0, 1];
const GREEN = [0, 1, 0, 1];
const YELLOW = [1, 1, 0, 1];
const ORANGE = [1, 0.5, 0, 1];
const BRICK_WIDTH = 20;
const BRICK_HEIGHT = 10;

const getColor = function(health) {
    switch(health) {
        case 4:
            return RED;
        case 3:
            return ORANGE;
        case 2:
            return YELLOW;
        case 1:
            return GREEN;
        default:
            return RED;
    }
}

class BrickComponent {
    constructor(health, renderComponent) {
        this.health = health;
        this.render = renderComponent;

        this.onHit = this.onHit.bind(this);
    }

    onHit() {
        this.health -= 1;
        if (this.health <= 0) {
            removeGameObject(this.parent);
        } else {
            this.render.color = getColor(this.health);
            console.log(this.render);
        }
        console.log(`Health: ${this.health}`);
    }

    update() {

    }

    onCreate(parent) {
        this.parent = parent;
    }
}

const createBrick = function(x, y, startHealth) {
    const brickObject = new GameObject(x, y);
    const render = new DrawRectangleComponent(BRICK_WIDTH, BRICK_HEIGHT, getColor(startHealth), 1);
    brickObject.addComponent(render);
    const brick = new BrickComponent(startHealth, render);
    brickObject.addComponent(brick);
    const rect = new RectCollider(BRICK_WIDTH, BRICK_HEIGHT, false);
    rect.addImpactListener(brick.onHit);
    brickObject.addComponent(rect);

    return brickObject;
}

export default createBrick;