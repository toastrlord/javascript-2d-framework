'use strict'
import {loadImageAndCreateTextureInfo, draw, drawImage, setContext, makeProgram, useProgramData, clear, drawPrimitives} from './webgl-core';
import {drawRectangle, drawCircle, drawTriangle} from './primitive-shapes';
import { matrix4, matrix3 } from './matrix-util';

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
    update: function() {
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
        square.x += square.xVelocity;
        square.y += square.yVelocity;
        drawRectangle(square.x, square.y, square.x + dimension, square.y + dimension, square.color);
    }};
    return square;
}

function webGLSetup() {
    setContext(canvas);
    drawCircle(75, 75, 50, 64, [1, 0, 0, 1]);
    drawPrimitives();
}

function generateImageData() {
    // unit quad
    let positions = [
        0, 0,
        0, 1,
        1, 0,
        1, 0,
        0, 1,
        1, 1,
    ];
    // also a unit quad
    let texCoords = [
        0, 0,
        0, 1,
        1, 0,
        1, 0,
        0, 1,
        1, 1,
    ];
    let textureInfo = loadImageAndCreateTextureInfo('assets/test.png');
    return {positions, texCoords, textureInfo};
}

webGLSetup();