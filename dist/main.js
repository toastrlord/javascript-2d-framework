/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/webgl-test.js":
/*!***************************!*\
  !*** ./src/webgl-test.js ***!
  \***************************/
/***/ (() => {

eval("\n\nfunction createShader(gl, type, source) {\n    let shader = gl.createShader(type);\n    gl.shaderSource(shader, source);\n    gl.compileShader(shader);\n    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);\n    if (success) {\n        return shader;\n    }\n\n    console.log(gl.getShaderInfoLog(shader));\n    gl.deleteShader(shader);\n}\n\n// link both shaders to a program\nfunction createProgram(gl, vertexShader, fragmentShader) {\n    let program = gl.createProgram();\n    gl.attachShader(program, vertexShader);\n    gl.attachShader(program, fragmentShader);\n    gl.linkProgram(program);\n    let success = gl.getProgramParameter(program, gl.LINK_STATUS);\n    if (success) {\n        return program;\n    }\n\n    console.log(gl.getProgramInfoLog(program));\n    gl.deleteProgram(program);\n}\n\nfunction resizeCanvasToDisplaySize(canvas) {\n    // Lookup the size the browser is displaying the canvas in CSS pixels.\n    const displayWidth  = canvas.clientWidth;\n    const displayHeight = canvas.clientHeight;\n   \n    // Check if the canvas is not the same size.\n    const needResize = canvas.width  !== displayWidth ||\n                       canvas.height !== displayHeight;\n   \n    if (needResize) {\n      // Make the canvas the same size\n      canvas.width  = displayWidth;\n      canvas.height = displayHeight;\n    }\n   \n    return needResize;\n  }\n\nfunction main() {\n    const canvas = document.querySelector('#canvas');\n    console.log(canvas);\n    const gl = canvas.getContext('webgl');\n    if (!gl) {\n        alert('Error loading WebGL!');\n    }\n    // setup shaders\n    const vertexShaderSource = document.querySelector('#vertex-shader-2d').textContent;\n    const fragmentShaderSource = document.querySelector('#fragment-shader-2d').textContent;\n    console.log(vertexShaderSource);\n    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);\n    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);\n    let program = createProgram(gl, vertexShader, fragmentShader);\n\n    let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');\n    let positionBuffer = gl.createBuffer();\n\n    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);\n\n    // three 2d points, in clip space\n    let positions = [\n        0, 0,\n        1, 0,\n        1, 1,\n    ];\n    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);\n    resizeCanvasToDisplaySize(gl.canvas);\n\n    // setup clip space to screen space relationship\n    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);\n\n    // Clear the canvas\n    gl.clearColor(0, 0, 0, 0);\n    gl.clear(gl.COLOR_BUFFER_BIT);\n\n    // Use the program we made earlier\n    gl.useProgram(program);\n\n    gl.enableVertexAttribArray(positionAttributeLocation);\n\n    // Bind the position buffer\n    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);\n\n    // Tell the attribute how to get data out of positionBuffer\n    let size = 2 // 2 components per iteration\n    let type = gl.FLOAT // data is 32 bit floats\n    let normalize = false; // don't normalize the data\n    let stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position\n    let offset = 0; // start at the beginning of the buffer\n    gl.vertexAttribPointer(\n        positionAttributeLocation,\n        size,\n        type,\n        normalize,\n        stride,\n        offset\n    );\n\n    let primitiveType = gl.TRIANGLES; // every 3 times the shader is run, a triangle will be drawn with the 3 points\n    //let offset = 0;\n    let count = 3; // execute the vertex shader 3 times\n    gl.drawArrays(primitiveType, offset, count);\n\n}\n\nmain();\n\n//# sourceURL=webpack://js-framework/./src/webgl-test.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/webgl-test.js"]();
/******/ 	
/******/ })()
;