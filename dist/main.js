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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _webgl_test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webgl-test */ \"./src/webgl-test.js\");\n\n;\n\nlet points = [\n    0, 0,\n    150, 0,\n    150, 75,\n    150, 75,\n    300, 75,\n    300, 150,\n    150, 0,\n    300, 0,\n    300, 75,\n];\n\nlet triforce = [\n    0, 0,\n    150, 0,\n    75, 75,\n    150, 0,\n    225, 75,\n    300, 0,\n    75, 75,\n    225, 75,\n    150, 150,\n];\n\nlet yellow = [\n    1,\n    1,\n    0,\n    1,\n];\n\nfunction sameColor(positions, color) {\n    let result = [];\n    for (let i = 0; i < positions.length; i += 2) {\n        result.push(...color);\n    }\n    return result;\n}\nfunction randomColor(positions) {\n    let result = [];\n    for (let i = 0; i < positions.length; i += 2) {\n        let r = Math.random();\n        let g = Math.random();\n        let b = Math.random();\n        result.push(...[r, g, b, 1]);\n    }\n    return result;\n}\n(0,_webgl_test__WEBPACK_IMPORTED_MODULE_0__.default)(triforce, randomColor(triforce));\n\n//# sourceURL=webpack://js-framework/./src/index.js?");

/***/ }),

/***/ "./src/webgl-test.js":
/*!***************************!*\
  !*** ./src/webgl-test.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _webgl_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webgl-utils */ \"./src/webgl-utils.js\");\n\n\n;\n\nfunction draw(positions, colors) {\n    /**{HTMLCanvasElement} */\n    const canvas = document.querySelector('#canvas');\n    const gl = canvas.getContext('webgl');\n    if (!gl) {\n        alert('Error loading WebGL!');\n    }\n\n    // setup shaders\n    const vertexShaderSource = document.querySelector('#pixel-vertex-shader-2d').textContent;\n    const fragmentShaderSource = document.querySelector('#color-fragment-shader-2d').textContent;\n\n    const program = (0,_webgl_utils__WEBPACK_IMPORTED_MODULE_0__.createProgramFromScripts)(gl, vertexShaderSource, fragmentShaderSource);\n\n    let positionAttributeLocation = gl.getAttribLocation(program, 'a_position');\n    let positionBuffer = gl.createBuffer();\n    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);\n    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);\n\n    let resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');\n\n    let colorBuffer = gl.createBuffer();\n    let colorAttributeLocation = gl.getAttribLocation(program, 'a_color');\n    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);\n    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);\n    \n    (0,_webgl_utils__WEBPACK_IMPORTED_MODULE_0__.resizeCanvasToDisplaySize)(gl.canvas);\n\n    // setup clip space to screen space relationship\n    // map -1, +1 to 0, width, ... etc\n    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);\n\n    // Clear the canvas\n    gl.clearColor(0, 0, 0, 0);\n    gl.clear(gl.COLOR_BUFFER_BIT);\n\n    // Use the program we made earlier\n    gl.useProgram(program);\n\n    gl.enableVertexAttribArray(positionAttributeLocation);\n\n    // Bind the position buffer\n    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);\n\n    // set the resolution uniform\n    gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);\n\n    // Tell the attribute how to get data out of positionBuffer\n    let size = 2 // 2 components per iteration\n    let type = gl.FLOAT // data is 32 bit floats\n    let normalize = false; // don't normalize the data\n    let stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position\n    let offset = 0; // start at the beginning of the buffer\n    gl.vertexAttribPointer(\n        positionAttributeLocation,\n        size,\n        type,\n        normalize,\n        stride,\n        offset\n    );\n\n    gl.enableVertexAttribArray(colorAttributeLocation);\n    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);\n\n    gl.vertexAttribPointer(\n        colorAttributeLocation,\n        4,\n        gl.FLOAT,\n        normalize,\n        stride,\n        offset\n    );\n    \n\n    let primitiveType = gl.TRIANGLES; // every 3 times the shader is run, a triangle will be drawn with the 3 points\n    offset = 0;\n    let count = positions.length / size; // execute the vertex shader once for every pair of points provided\n    gl.drawArrays(primitiveType, offset, count);\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (draw);\n\n//# sourceURL=webpack://js-framework/./src/webgl-test.js?");

/***/ }),

/***/ "./src/webgl-utils.js":
/*!****************************!*\
  !*** ./src/webgl-utils.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createProgramFromScripts\": () => (/* binding */ createProgramFromScripts),\n/* harmony export */   \"resizeCanvasToDisplaySize\": () => (/* binding */ resizeCanvasToDisplaySize)\n/* harmony export */ });\n\n\n//compile shader from source string\nfunction createShader(gl, type, source) {\n    let shader = gl.createShader(type);\n    gl.shaderSource(shader, source);\n    gl.compileShader(shader);\n    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);\n    if (success) {\n        return shader;\n    }\n\n    console.log(gl.getShaderInfoLog(shader));\n    gl.deleteShader(shader);\n}\n\n// link both shaders to a program\nfunction createProgram(gl, vertexShader, fragmentShader) {\n    let program = gl.createProgram();\n    gl.attachShader(program, vertexShader);\n    gl.attachShader(program, fragmentShader);\n    gl.linkProgram(program);\n    let success = gl.getProgramParameter(program, gl.LINK_STATUS);\n    if (success) {\n        return program;\n    }\n\n    console.log(gl.getProgramInfoLog(program));\n    gl.deleteProgram(program);\n}\n\n/**\n * Compiles GLSL program given the source code for vertex and fragment shaders\n * @param {*} gl \n * @param {string} vertexSource \n * @param {string} fragmentSource \n */\nfunction createProgramFromScripts(gl, vertexSource, fragmentSource) {\n    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);\n    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);\n    return createProgram(gl, vertexShader, fragmentShader);\n}\n\nfunction resizeCanvasToDisplaySize(canvas) {\n    // Lookup the size the browser is displaying the canvas in CSS pixels.\n    const displayWidth  = canvas.clientWidth;\n    const displayHeight = canvas.clientHeight;\n   \n    // Check if the canvas is not the same size.\n    const needResize = canvas.width  !== displayWidth ||\n                       canvas.height !== displayHeight;\n   \n    if (needResize) {\n      // Make the canvas the same size\n      canvas.width  = displayWidth;\n      canvas.height = displayHeight;\n    }\n   \n    return needResize;\n}\n\n\n\n//# sourceURL=webpack://js-framework/./src/webgl-utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;