'use strict'
import {loadImageAndCreateTextureInfo, draw, drawImage, setContext, makeProgram, useProgramData, clear} from './webgl-test';
import { matrix4, matrix3 } from './matrix-util';

const canvas = document.querySelector('#canvas');
const width = canvas.width;
const height = canvas.height;
let points = [
    0, 0,
    150, 0,
    150, 75,
    150, 75,
    300, 75,
    300, 150,
    150, 0,
    300, 0,
    300, 75,
];

let triforce = [
    0, 0,
    150, 0,
    75, 75,
    150, 0,
    225, 75,
    300, 0,
    75, 75,
    225, 75,
    150, 150,
];

let clearColor = [
    0,
    0,
    0,
    0
]

let yellow = [
    1,
    1,
    0,
    1
];

function sameColor(positions, color) {
    let result = [];
    for (let i = 0; i < positions.length; i += 2) {
        result.push(...color);
    }
    return result;
}

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
function randomColor(positions) {
    let result = [];
    for (let i = 0; i < positions.length; i += 2) {
        let r = Math.random();
        let g = Math.random();
        let b = Math.random();
        result.push(...[r, g, b, 1]);
    }
    return result;
}

function generateRandomTriangle() {
    let result = [];
    for (let i = 0; i < 3; i++) {
        let x = Math.random() * width;
        let y = Math.random() * height;
        result.push(x, y);
    }

    return result;
}

function webGLSetup() {
    setContext(canvas);
    const basicProgramData = makeProgram(document.querySelector('#pixel-vertex-shader-2d').textContent, document.querySelector('#color-fragment-shader-2d').textContent)
    useProgramData(basicProgramData);

    const imageVertexSource = document.querySelector('#image-vertex-shader-2d').textContent;
    const imageFragmentSource = document.querySelector('#image-fragment-shader-2d').textContent;
    const imageProgramData = makeProgram(imageVertexSource, imageFragmentSource);
    let imgData = generateImageData();
    let x = 0;
    let y = 0;
    let speed = 2;
    let angle = Math.random() * Math.PI * 2;
    let xVelocity = Math.cos(angle) * speed;
    let yVelocity = Math.sin(angle) * speed;
    window.setInterval(() => {
        x += xVelocity;
        y += yVelocity;
        if (x + 64 > width || x < 0) {
            xVelocity = - xVelocity;
        }
        if (y + 64 > height || y < 0) {
            yVelocity = -yVelocity;
        }
        //angle += 1e-2;
        drawImage(imageProgramData, imgData.positions, imgData.texCoords, imgData.textureInfo.texture, imgData.textureInfo.width, imgData.textureInfo.height, Math.floor(x), Math.floor(y), 0);
    }, 20);
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
/*
let geometry = [];
let color = [];
let rectangle = generateRectangle(0, 0, 50, 100);
let rectColors = randomColor(rectangle);
draw({a_position: rectangle, a_color: rectColors, u_resolution: [width, height]});
*/
/*
window.setInterval(function(){
    let newGeometry = generateRandomTriangle();
    let newColor = randomColor(newGeometry);
    geometry.push(...newGeometry);
    color.push(...newColor);
    draw({a_position: geometry, a_color: color, u_resolution: [width, height]});
}, 500);

window.setInterval(function(){
    geometry = [];
    color = [];
    clear(clearColor);
}, 10000);*/