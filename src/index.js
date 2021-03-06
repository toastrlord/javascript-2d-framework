'use strict'
import {draw, setContext, makeProgram, useProgramData, clear} from './webgl-test';

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
}

webGLSetup();
let geometry = [];
let color = [];

window.setInterval(function(){
    let newGeometry = generateRandomTriangle();
    let newColor = randomColor(newGeometry);
    geometry.push(...newGeometry);
    color.push(...newColor);
    draw({a_position: geometry, a_color: color});
}, 500);

window.setInterval(function(){
    geometry = [];
    color = [];
    clear(clearColor);
}, 10000);