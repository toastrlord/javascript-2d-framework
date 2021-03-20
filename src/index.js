'use strict'
import BouncingSquare from './bouncing-square';
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
    addKeyBind('arrowleft', () => {
        console.log('left arrow press!');
    });
    loop();
}

start();
