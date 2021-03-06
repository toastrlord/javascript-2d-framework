'use strict'

import {createProgramFromScripts, resizeCanvasToDisplaySize} from './webgl-utils';
/** @type {WebGLRenderingContext} */
let gl;
let currentProgramData;

/** 
 * Setup the WebGL render context
 * @param {HTMLCanvasElement} canvas 
 */
function setContext(canvas) {
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
 * Set this to be the current active program data (object containing WebGL program and attribute/uniform info)
 * @param {*} programData 
 */
function useProgramData(programData) {
    currentProgramData = programData;
    gl.useProgram(currentProgramData.program); 
}

/**
 * Clears the current canvas
 * @param {Number[]} color Color in [r, g, b, a] format
 */
function clear(color) {
    gl.clearColor(...color);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function setupAttribBuffer(attribData, values, usage) {
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), usage);
    gl.enableVertexAttribArray(attribData.location);
    gl.vertexAttribPointer(attribData.location, attribData.size, attribData.type, false, 0 , 0);
}

/**
 * Draw using the supplied values. Fails if webGL is not initialized and a program is not loaded, or if values do not match the attributes/uniforms
 */
function draw(values) {
    /**{HTMLCanvasElement} */
    if (!gl) {
        alert('WebGL context must be initialized before calling draw!');
    }

    /* for every attribute:
    *  -get the attribute location from the program (using a string)
    *  -create the buffer
    *  -bind the buffer
    *  -call bufferdata with the input
    *  -call vertexAttribPointer with the necessary information
    */
   // iterate over each attribute, and extract the data from values
   // presumes values has a field for each attribute name
    Object.keys(currentProgramData.attributeData).forEach(attributeName => {
        setupAttribBuffer(currentProgramData.attributeData[attributeName], values[attributeName], gl.STATIC_DRAW);
    });

    /* for uniforms:
    *  -get the uniform location
    *  -set the uniform
    */
    

    let resolutionUniformLocation = gl.getUniformLocation(currentProgramData.program, 'u_resolution');
    
    resizeCanvasToDisplaySize(gl.canvas);

    // setup clip space to screen space relationship
    // map -1, +1 to 0, width, ... etc
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // set the resolution uniform
    gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

    /*
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
    );*/

    let primitiveType = gl.TRIANGLES; // every 3 times the shader is run, a triangle will be drawn with the 3 points
    let offset = 0;
    let count = values['a_position'].length / 2; // execute the vertex shader once for every pair of points provided
    gl.drawArrays(primitiveType, offset, count);
}

export {setContext, makeProgram, useProgramData, draw, clear};