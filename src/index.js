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
    for (let i = 0; i < 6; i++) {
        const speed = Math.random() * 50 + 50;
        let newSquare = BouncingSquare.generateRandomSquare(width, height, 50, speed);
        addGameObject(newSquare);
    }
    loop();
}

start();
