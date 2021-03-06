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

draw(triforce, yellow);