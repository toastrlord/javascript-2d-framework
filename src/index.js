'use strict'
import { drawPrimitives, setContext, clear } from 'graphics/webgl-core';
import { getGameObjects } from './game-object-manager';
import { checkForCollisions } from './physics/collision-manager';
import { drawText, chomps8by8Font, loadFonts } from './graphics/font-util';
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

let prevTime;

/**
 * Perform game logic
 */
function update(currentTime) {
    if (!currentTime) {
        // timeStamp returns undefined on start for some reason,but returns a value every other frame
        return;
    }
    let deltaTime = (prevTime ? currentTime - prevTime : currentTime)/ 1000;
    
    getGameObjects().forEach(obj => {
        obj.update(deltaTime);
    });
    checkForCollisions();
    prevTime = currentTime;
}

/**
 * Perform rendering
 */
function render() {
    drawPrimitives();
    drawText(`balls remaining ${ballsRemaining}`, 0, height - 8, chomps8by8Font, 1);
    drawText(`score ${score}`, 0, height - 16, chomps8by8Font, 1);
    if (ballsRemaining === 0) {
        const gameOverMessage = 'game over!';
        drawText('game over!', width / 2 - (gameOverMessage.length * 8 / 2), height / 2, chomps8by8Font, 1);
    }
}

/**
 * Main game loop
 */
function loop(currentTime) {
    update(currentTime);
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