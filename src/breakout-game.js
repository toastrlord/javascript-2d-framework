import { getCanvasWidth, getCanvasHeight } from './index';
import createBall from './ball';
import createPaddle from './paddle';
import createWall from './wall';
import { createBrick, BRICK_WIDTH ,BRICK_HEIGHT } from './brick';
import { addGameObject } from './game-object-manager';

let score = 0;
let ballsRemaining = 3;

function addScore(amount) {
    score += amount;
}

function serveBall() {
    const speed = 150;
    const angle = (35 + Math.random() * 30) * Math.PI / 180;
    const xVelocity = Math.cos(angle) * speed;
    const yVelocity = Math.sin(angle) * speed;
    const newBall = createBall(Math.random() * (getCanvasWidth() - 5), 50, 5, 5, [xVelocity, yVelocity]);
    addGameObject(newBall);
}

function onBallOut() {
    if (ballsRemaining === 0) {
        console.log('Game Over!');
    } else {
        ballsRemaining --;
        serveBall();
    }
}

function setupGame() {
    const controllable = createPaddle(0, 0, 75, 15, 180, [1, 0, 1, 1]);
    addGameObject(controllable);
    serveBall();
    const leftWall = createWall(-20, 0, 20, getCanvasHeight());
    addGameObject(leftWall);
    const rightWall = createWall(getCanvasWidth(), 0, 20, getCanvasHeight());
    addGameObject(rightWall);
    const topWall = createWall(0, getCanvasHeight(), getCanvasWidth(), 20);
    addGameObject(topWall);

    const brick_rows = 10;
    const brick_columns = 8;
    const col_margin = 10;
    const distance_from_top = 50;
    const row_spacing = 10;
    const col_spacing = (getCanvasWidth() - (2 * col_margin) - brick_columns * BRICK_WIDTH) / (brick_columns - 1);
    for (let i = 0; i < brick_rows; i++) {
        for (let j = 0; j < brick_columns; j++) {
            const newBrick = createBrick(col_margin + col_spacing * j + BRICK_WIDTH * j, getCanvasHeight() - distance_from_top - (row_spacing * i) - BRICK_HEIGHT * i, brick_rows - i);
            addGameObject(newBrick);
        }
    }
}

export { setupGame, onBallOut, addScore, ballsRemaining, score };