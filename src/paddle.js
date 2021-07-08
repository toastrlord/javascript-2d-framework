import DrawRectangleComponent from 'graphics/drawComponent';
import {addKeyBind} from './input/key-manager';
import { RectCollider } from './physics/collider';
import GameObject from './game-object';

function createPaddle(x, y, width, height, xVelocity, color) {
    const paddle = new GameObject(x, y);
    const drawComponent = new DrawRectangleComponent(width, height, color, 0);
    paddle.addComponent(drawComponent);
    const colliderComponent = new RectCollider(width, height, false);
    paddle.addComponent(colliderComponent);
    addKeyBind('keydown', 'arrowleft', function() {
        colliderComponent.xVelocity = -xVelocity;
    });
    addKeyBind('keydown', 'arrowright', function() {
        colliderComponent.xVelocity = xVelocity;
    });
    addKeyBind('keyup', 'arrowleft', function() {
        colliderComponent.xVelocity = 0;
    });
    addKeyBind('keyup', 'arrowright', function () {
        colliderComponent.xVelocity = 0;
    });

    return paddle;
}

export default createPaddle;