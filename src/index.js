'use strict'
import createBall from './ball';
import createPaddle from './paddle';
import createWall from './wall';
import {drawPrimitives, setContext, clear} from 'graphics/webgl-core';
import {getGameObjects, addGameObject, removeGameObject} from './game-object-manager';
import {addKeyBind} from 'input/key-manager';
import { checkForCollisions } from './physics/collision-manager';
import createBrick from './brick';
import {generateTextCoords, testGlyphInfo} from './graphics/font-util';
import { loadImageAndCreateTextureInfo, drawImages } from './graphics/webgl-core';

const canvas = document.querySelector('#canvas');
let width = canvas.width;
let height = canvas.height;

function webGLSetup() {
    setContext(canvas);
    canvas.height = 600;
    height = canvas.height;
    clear([0, 0, 0, 1]);
}

function resizeCanvas(newWidth, newHeight) {
    canvas.width = newWidth;
    canvas.height = newHeight;
    width = newWidth;
    height = newHeight;
}

function getCanvasWidth() {
    return width;
}

function getCanvasHeight() {
    return height;
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
    checkForCollisions();
    timeStamp = now;
}

let fontSheet;
let fontInfo;
/**
 * Perform rendering
 */
function render() {
    drawPrimitives();
    drawImages(fontInfo.positions, fontInfo.texCoords, fontSheet.texture, [{sX: 1, sY: 1, angle: 0, tX: 0, tY: 0}]);
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
    //console.log(generateTextCoords(testGlyphInfo, [0, 0], 'hello world!'));
    webGLSetup();
    fontSheet = loadImageAndCreateTextureInfo('./assets/chomps 8x8 font.png');
    fontInfo = generateTextCoords(testGlyphInfo, [0, height - 8], 'hello world!');
    const controllable = createPaddle(0, 0, 75, 15, 60, [1, 0, 1, 1]);
    addGameObject(controllable);
    const ball = createBall(50, 200, 5, 5, [0, -100]);
    addGameObject(ball);
    const leftWall = createWall(-20, 0, 20, getCanvasHeight());
    addGameObject(leftWall);
    const rightWall = createWall(getCanvasWidth(), 0, 20, getCanvasHeight());
    addGameObject(rightWall);
    const topWall = createWall(0, getCanvasHeight(), getCanvasWidth(), 20);
    addGameObject(topWall);
    for (let i = 0; i < 6; i++) {
        const newBrick = createBrick(50 + 25 * i, 350, 4);
        addGameObject(newBrick);
    }

    loop();
}

start();

export {getCanvasWidth, getCanvasHeight};