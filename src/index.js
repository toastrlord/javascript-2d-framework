'use strict'
import createBall from './ball';
import createPaddle from './paddle';
import createWall from './wall';
import { drawPrimitives, setContext, clear } from 'graphics/webgl-core';
import { getGameObjects, addGameObject, removeGameObject } from './game-object-manager';
import { addKeyBind } from 'input/key-manager';
import { checkForCollisions } from './physics/collision-manager';
import { createBrick, BRICK_WIDTH, BRICK_HEIGHT } from './brick';
import { drawText, chomps8by8Font, loadFonts } from './graphics/font-util';
import { loadImageAndCreateTextureInfo, drawImages } from './graphics/webgl-core';

const canvas = document.querySelector('#canvas');
let width = canvas.width;
let height = canvas.height;

function webGLSetup() {
    setContext(canvas);
    canvas.height = 600;
    height = canvas.height;
    canvas.width = 300;
    clear([0, 0, 0, 1]);
}

function resizeCanvas(newWidth, newHeight) {
    canvas.width = newWidth;
    canvas.height = newHeight;
    width = newWidth;
    height = newHeight;
}

function getCanvasWidth() {
    return width;
}

function getCanvasHeight() {
    return height;
}

let score = 0;

function addScore(amount) {
    score += amount;
}

function serveBall() {
    const speed = 150;
    const angle = (35 + Math.random() * 30) * Math.PI / 180;
    const xVelocity = Math.cos(angle) * speed;
    const yVelocity = Math.sin(angle) * speed;
    const newBall = createBall(Math.random() * width, 50, 5, 5, [xVelocity, yVelocity]);
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

let timeStamp = Date.now();

/**
 * Perform game logic
 */
function update() {
    let now = Date.now();
    // convert to milliseconds
    let deltaTime = (now - timeStamp) / 1000;
    getGameObjects().forEach(obj => {
        obj.update(deltaTime);
    });
    checkForCollisions();
    timeStamp = now;
}

let ballsRemaining = 3;
/**
 * Perform rendering
 */
function render() {
    drawPrimitives();
    drawText(`balls remaining ${ballsRemaining}`, 0, height - 8, chomps8by8Font, 1);
    drawText(`score ${score}`, 0, height - 16, chomps8by8Font, 1);
}

/**
 * Main game loop
 */
function loop() {
    update();
    render();
    window.requestAnimationFrame(loop);
}

async function loadAssets() {
    await loadFonts();
}

async function start() {
    webGLSetup();
    await loadAssets();
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
    const col_spacing = (width - (2 * col_margin) - brick_columns * BRICK_WIDTH) / (brick_columns - 1);
    for (let i = 0; i < brick_rows; i++) {
        for (let j = 0; j < brick_columns; j++) {
            const newBrick = createBrick(col_margin + col_spacing * j + BRICK_WIDTH * j, height - distance_from_top - (row_spacing * i) - BRICK_HEIGHT * i, brick_rows - i);
            addGameObject(newBrick);
        }
    }
    loop();
}

start();

export {getCanvasWidth, getCanvasHeight, onBallOut, addScore};