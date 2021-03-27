'use strict'
import createBall from './ball';
import createPaddle from './paddle';
import {drawPrimitives, setContext, clear} from 'graphics/webgl-core';
import {getGameObjects, addGameObject, removeGameObject} from './game-object-manager';
import {addKeyBind} from 'input/key-manager';

const canvas = document.querySelector('#canvas');
let width = canvas.width;
let height = canvas.height;

function webGLSetup() {
    setContext(canvas);
    canvas.height = 600;
    height = canvas.height;
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
    timeStamp = now;
}

/**
 * Perform rendering
 */
function render() {
    drawPrimitives();
}

/**
 * Main game loop
 */
function loop() {
    update();
    render();
    window.requestAnimationFrame(loop);
}

function start() {
    webGLSetup();
    let controllable = createPaddle(0, 0, 75, 15, 60, [1, 0, 1, 1]);
    addGameObject(controllable);
    console.log(controllable);
    //let ball = new BouncingSquare(0, 100, 50, -50, 5, 0);
    //addGameObject(ball);
    loop();
}

start();

export {getCanvasWidth, getCanvasHeight};