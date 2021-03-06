'use strict'

import {createProgramFromScripts, resizeCanvasToDisplaySize} from "./webgl-utils";

function draw(positions) {
    const canvas = document.querySelector('#canvas');
    const gl = canvas.getContext('webgl');
    if (!gl) {
        alert('Error loading WebGL!');
    }
    
    // setup shaders
    const vertexShaderSource = document.querySelector('#pixel-vertex-shader-2d').textContent;
    const fragmentShaderSource = document.querySelector('#fragment-shader-2d').textContent;

    const program = createProgramFromScripts(gl, vertexShaderSource, fragmentShaderSource);

    let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    let positionBuffer = gl.createBuffer();

    let resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    resizeCanvasToDisplaySize(gl.canvas);

    // setup clip space to screen space relationship
    // map -1, +1 to 0, width, ... etc
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Use the program we made earlier
    gl.useProgram(program);

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

    let primitiveType = gl.TRIANGLES; // every 3 times the shader is run, a triangle will be drawn with the 3 points
    offset = 0;
    let count = positions.length / size; // execute the vertex shader once for every pair of points provided
    gl.drawArrays(primitiveType, offset, count);

}

export default draw;