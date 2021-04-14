import GameObject from './game-object';
import {RectCollider} from './physics/collider';

function createWall(x, y, width, height) {
    const wall = new GameObject(x, y);
    const collider = new RectCollider(width, height, false);
    wall.addComponent(collider);

    return wall;
}

export default createWall;