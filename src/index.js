'use strict'
import BouncingSquare from './bouncing-square';
import ControllableSquare from './controllable-square';
import {drawPrimitives, setContext, clear} from 'graphics/webgl-core';
import {getGameObjects, addGameObject, removeGameObject} from './game-object-manager';
import {addKeyBind} from 'input/key-manager';

const canvas = document.querySelector('#canvas');
const width = canvas.width;
const height = canvas.height;

function webGLSetup() {
    setContext(canvas);
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
    for (let i = 0; i < 50; i++) {
        const speed = (Math.random() * 80) + 20;
        let newSquare = BouncingSquare.generateRandomSquare(width, height, 10, speed, 2);
        addGameObject(newSquare);
    }
    let controllable = new ControllableSquare(0, 0, 25, 25, width, height, 100, [1, 0, 1, 1], 0);
    addGameObject(controllable);
    loop();
}

start();
