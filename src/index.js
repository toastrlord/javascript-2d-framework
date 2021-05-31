'use strict'
import createBall from './ball';
import { drawPrimitives, setContext, clear } from 'graphics/webgl-core';
import { getGameObjects, addGameObject, removeGameObject } from './game-object-manager';
import { addKeyBind } from 'input/key-manager';
import { checkForCollisions } from './physics/collision-manager';
import { createBrick, BRICK_WIDTH, BRICK_HEIGHT } from './brick';
import { drawText, chomps8by8Font, loadFonts } from './graphics/font-util';
import { loadImageAndCreateTextureInfo, drawImages } from './graphics/webgl-core';
import { setupGame, ballsRemaining, score } from './breakout-game';

const canvas = document.querySelector('#canvas');
let width = canvas.width;
let height = canvas.height;

async function webGLSetup() {
    await setContext(canvas);
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
    await webGLSetup();
    await loadAssets();
    setupGame();
    loop();
}

start();

export {getCanvasWidth, getCanvasHeight};