'use strict'
import {drawPrimitives, setContext} from 'graphics/webgl-core';
import {drawRectangle} from 'graphics/primitive-shapes';

const gameObjects = [];
const canvas = document.querySelector('#canvas');
const width = canvas.width;
const height = canvas.height;

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 */
function generateRectangle(x, y, width, height) {
    return [
        x, y,
        x + width, y,
        x, y + height,
        x + width, y + height,
        x + width, y,
        x, y + height,
    ]
}

function changeColor(square) {
    square.color = [Math.random(), Math.random(), Math.random(), 1];
}

function createSquare(x, y, dimension, speed, color) {
    let angle = Math.random() * Math.PI * 2;
    let xVelocity = speed * Math.cos(angle);
    let yVelocity = speed * Math.sin(angle);
    let square = {x, y, xVelocity, yVelocity, color, dimension,
    update: function(deltaTime) {
        if (square.x < 0) {
            changeColor(square);
            square.x = 0;
            square.xVelocity = -square.xVelocity;
        }
        if (square.x + square.dimension > width) {
            changeColor(square);
            square.x = width - square.dimension;
            square.xVelocity = -square.xVelocity;
        }
        if (square.y < 0) {
            changeColor(square);
            square.y = 0;
            square.yVelocity = -square.yVelocity;
        }
        if (square.y + square.dimension > height) {
            changeColor(square);
            square.y = height - square.dimension;
            square.yVelocity = -square.yVelocity;
        }
        square.x += square.xVelocity * deltaTime;
        square.y += square.yVelocity * deltaTime;
        drawRectangle(square.x, square.y, square.x + dimension, square.y + dimension, square.color);
    }};
    return square;
}

function webGLSetup() {
    setContext(canvas);
}

function update() {
    let now = Date.now();
    // convert to milliseconds
    let deltaTime = (now - timeStamp) / 1000;
    gameObjects.forEach(obj => {
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
        gameObjects.push(createSquare(
            Math.random() * width, 
            Math.random() * height,
            25,
            50,
            [Math.random(), Math.random(), Math.random(), 1]));
    }
    loop();
}

start();
