'use strict'
import BouncingSquare from './bouncing-square';
import {drawPrimitives, setContext} from 'graphics/webgl-core';
import {getGameObjects, addGameObject, removeGameObject} from './game-object-manager';
import {drawRectangle} from 'graphics/primitive-shapes';

const canvas = document.querySelector('#canvas');
const width = canvas.width;
const height = canvas.height;

function webGLSetup() {
    setContext(canvas);
}

function update() {
    let now = Date.now();
    // convert to milliseconds
    let deltaTime = (now - timeStamp) / 1000;
    getGameObjects().forEach(obj => {
        obj.update(deltaTime);
    });
    timeStamp = now;
}

function render() {
    // test some stuff real quick
    drawRectangle(0, 0, 100, 200, [0, 1, 0, 1], 0);
    drawRectangle(100, 0, 200, 200, [1, 1, 0, 1], 3);
    drawPrimitives();
}

let timeStamp = Date.now();

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
    loop();
}

start();
