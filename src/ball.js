import GameObject from './game-object';
import DrawRectangleComponent from './graphics/drawComponent';
import Trigger from './trigger';
import { RectCollider } from './physics/collider';
import { removeGameObject } from './game-object-manager';
import { onBallOut } from './breakout-game';

const WHITE = [1, 1, 1, 1];

function createBall(x, y, width, height, startingVelocity) {
    const ball = new GameObject(x, y);
    const collider = new RectCollider(width, height, true);
    collider.xVelocity = startingVelocity[0];
    collider.yVelocity = startingVelocity[1];
    ball.addComponent(collider);
    const render = new DrawRectangleComponent(width, height, WHITE, 0);
    ball.addComponent(render);
    const ballLostTrigger = new Trigger(() => {
        const y = ball.y;
        return y < 0;
    }, () => {
        onBallOut();
        removeGameObject(ball);
    });
    ball.addComponent(ballLostTrigger);


    return ball;
}

export default createBall;