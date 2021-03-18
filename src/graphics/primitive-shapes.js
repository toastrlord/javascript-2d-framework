// contains functions for drawing basic primitives using a simple GLSL program that takes only positions and colors
import {addPrimitiveDrawingData} from './webgl-core';
/**
 * 
 * @param {*} points 
 * @param {*} color a color in RGBA format color 
 */
function applyColor(points, color) {
    let result = [];
    for (let i = 0; i < points.length; i+=2) {
        result.push(...color);
    }
    return result;
}

function drawRectangle(leftX, bottomY, rightX, topY, color, depth = 0) {
    let points = [
        leftX, bottomY,
        rightX, bottomY,
        leftX, topY,
        rightX, bottomY,
        leftX, topY,
        rightX, topY,
    ];
    let colors = applyColor(points, color);
    addPrimitiveDrawingData(points, colors, depth);
}  

function drawTriangle(points, color, depth = 0) {
    addPrimitiveDrawingData(points, applyColor(points, color), depth);
}

function drawCircle(centerX, centerY, radius, divisions, color, depth = 0) {
    let points = [];
    let dTheta = 2 * Math.PI / divisions;
    let center = [centerX, centerY];
    let prevX = centerX;
    let prevY = centerY + radius;
    for (let i = 0; i <= divisions; i++) {
        points.push(...center);
        points.push(...[prevX, prevY]);
        prevX = centerX + radius * Math.cos(dTheta * (i + 1));
        prevY = centerY + radius * Math.sin(dTheta * (i + 1));
        points.push(...[prevX, prevY]);
    }
    let colors = applyColor(points, color);
    addPrimitiveDrawingData(points, colors, depth);
}

export {drawRectangle, drawTriangle, drawCircle}