'use strict'
import draw from './webgl-test'

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

let yellow = [
    1,
    1,
    0,
    1,
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
draw(triforce, randomColor(triforce));