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

function webGLSetup() {
    setContext(canvas);
    drawRectangle(0, 0, 120, 120, [1, 0, 0, 1]);
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