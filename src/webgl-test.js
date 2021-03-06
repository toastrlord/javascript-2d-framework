'use strict'

import {createProgramFromScripts, resizeCanvasToDisplaySize} from './webgl-utils';

let gl;
let currentProgram;

/** 
 * Setup the WebGL render context
 * @param {HTMLCanvasElement} canvas 
 */
function setContext(canvas) {
    /**{WebGLRenderingContext} */
    gl = canvas.getContext('webgl');
    if (!gl) {
        alert('Error loading WebGL!');
    }
}

/**
 * Compile a webGL program using the given shader sources. Requires WebGL render context to be set
 * @param {string} vertexSource 
 * @param {string} shaderSource
 * @returns {WebGLProgram} 
 */
function makeProgram(vertexSource, shaderSource) {
    if (!gl) {
        alert('WebGL context must be initialized before calling makeProgram!');
    }
    return createProgramFromScripts(gl, vertexSource, shaderSource);
}

/**
 * Set this to be the current active program
 * @param {WebGLProgram} program 
 */
function useProgram(program) {
    currentProgram = program;
    gl.useProgram(program); 
}

/**
 * Clears the current canvas
 * @param {Number[]} color
 */
function clear(color) {
    gl.clearColor(...color);
    gl.clear(gl.COLOR_BUFFER_BIT);
}


/**
 * Draw the given vertices using the given colors. Fails if webGL is not initialized and a program is not loaded
 * @param {*} positions 
 * @param {*} colors 
 */
function draw(positions, colors) {
    /**{HTMLCanvasElement} */
    if (!gl) {
        alert('WebGL context must be initialized before calling draw!');
    }

    let positionAttributeLocation = gl.getAttribLocation(currentProgram, 'a_position');
    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    let resolutionUniformLocation = gl.getUniformLocation(currentProgram, 'u_resolution');

    let colorBuffer = gl.createBuffer();
    let colorAttributeLocation = gl.getAttribLocation(currentProgram, 'a_color');
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    
    resizeCanvasToDisplaySize(gl.canvas);

    // setup clip space to screen space relationship
    // map -1, +1 to 0, width, ... etc
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // set the resolution uniform
    gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

    // Tell the attribute how to get data out of positionBuffer
    let size = 2 // 2 components per iteration
    let type = gl.FLOAT // data is 32 bit floats
    let normalize = false; // don't normalize the data
    let stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
    );

    gl.enableVertexAttribArray(colorAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    gl.vertexAttribPointer(
        colorAttributeLocation,
        4,
        gl.FLOAT,
        normalize,
        stride,
        offset
    );
    

    let primitiveType = gl.TRIANGLES; // every 3 times the shader is run, a triangle will be drawn with the 3 points
    offset = 0;
    let count = positions.length / size; // execute the vertex shader once for every pair of points provided
    gl.drawArrays(primitiveType, offset, count);

}

export {setContext, makeProgram, useProgram, draw, clear};