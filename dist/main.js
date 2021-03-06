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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _webgl_test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webgl-test */ \"./src/webgl-test.js\");\n\n;\n\nconst canvas = document.querySelector('#canvas');\nconst width = canvas.width;\nconst height = canvas.height;\nlet points = [\n    0, 0,\n    150, 0,\n    150, 75,\n    150, 75,\n    300, 75,\n    300, 150,\n    150, 0,\n    300, 0,\n    300, 75,\n];\n\nlet triforce = [\n    0, 0,\n    150, 0,\n    75, 75,\n    150, 0,\n    225, 75,\n    300, 0,\n    75, 75,\n    225, 75,\n    150, 150,\n];\n\nlet clearColor = [\n    0,\n    0,\n    0,\n    0\n]\n\nlet yellow = [\n    1,\n    1,\n    0,\n    1\n];\n\nfunction sameColor(positions, color) {\n    let result = [];\n    for (let i = 0; i < positions.length; i += 2) {\n        result.push(...color);\n    }\n    return result;\n}\nfunction randomColor(positions) {\n    let result = [];\n    for (let i = 0; i < positions.length; i += 2) {\n        let r = Math.random();\n        let g = Math.random();\n        let b = Math.random();\n        result.push(...[r, g, b, 1]);\n    }\n    return result;\n}\n\nfunction generateRandomTriangle() {\n    let result = [];\n    for (let i = 0; i < 3; i++) {\n        let x = Math.random() * width;\n        let y = Math.random() * height;\n        result.push(x, y);\n    }\n\n    return result;\n}\n\nfunction webGLSetup() {\n    (0,_webgl_test__WEBPACK_IMPORTED_MODULE_0__.setContext)(canvas);\n    const basicProgramData = (0,_webgl_test__WEBPACK_IMPORTED_MODULE_0__.makeProgram)(document.querySelector('#pixel-vertex-shader-2d').textContent, document.querySelector('#color-fragment-shader-2d').textContent)\n    ;(0,_webgl_test__WEBPACK_IMPORTED_MODULE_0__.useProgramData)(basicProgramData);\n}\n\nwebGLSetup();\nlet geometry = [];\nlet color = [];\n\nwindow.setInterval(function(){\n    let newGeometry = generateRandomTriangle();\n    let newColor = randomColor(newGeometry);\n    geometry.push(...newGeometry);\n    color.push(...newColor);\n    (0,_webgl_test__WEBPACK_IMPORTED_MODULE_0__.draw)({a_position: geometry, a_color: color});\n}, 500);\n\nwindow.setInterval(function(){\n    geometry = [];\n    color = [];\n    (0,_webgl_test__WEBPACK_IMPORTED_MODULE_0__.clear)(clearColor);\n}, 10000);\n\n//# sourceURL=webpack://js-framework/./src/index.js?");

/***/ }),

/***/ "./src/webgl-test.js":
/*!***************************!*\
  !*** ./src/webgl-test.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setContext\": () => (/* binding */ setContext),\n/* harmony export */   \"makeProgram\": () => (/* binding */ makeProgram),\n/* harmony export */   \"useProgramData\": () => (/* binding */ useProgramData),\n/* harmony export */   \"draw\": () => (/* binding */ draw),\n/* harmony export */   \"clear\": () => (/* binding */ clear)\n/* harmony export */ });\n/* harmony import */ var _webgl_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webgl-utils */ \"./src/webgl-utils.js\");\n\n\n;\n/** @type {WebGLRenderingContext} */\nlet gl;\nlet currentProgramData;\n\n/** \n * Setup the WebGL render context\n * @param {HTMLCanvasElement} canvas \n */\nfunction setContext(canvas) {\n    gl = canvas.getContext('webgl');\n    if (!gl) {\n        alert('Error loading WebGL!');\n    }\n}\n\n/**\n * Compile a webGL program using the given shader sources. Requires WebGL render context to be set\n * @param {string} vertexSource \n * @param {string} shaderSource\n * @returns {WebGLProgram} \n */\nfunction makeProgram(vertexSource, shaderSource) {\n    if (!gl) {\n        alert('WebGL context must be initialized before calling makeProgram!');\n    }\n    return (0,_webgl_utils__WEBPACK_IMPORTED_MODULE_0__.createProgramFromScripts)(gl, vertexSource, shaderSource);\n}\n\n/**\n * Set this to be the current active program data (object containing WebGL program and attribute/uniform info)\n * @param {*} programData \n */\nfunction useProgramData(programData) {\n    currentProgramData = programData;\n    gl.useProgram(currentProgramData.program); \n}\n\n/**\n * Clears the current canvas\n * @param {Number[]} color Color in [r, g, b, a] format\n */\nfunction clear(color) {\n    gl.clearColor(...color);\n    gl.clear(gl.COLOR_BUFFER_BIT);\n}\n\nfunction setupAttribBuffer(attribData, values, usage) {\n    let buffer = gl.createBuffer();\n    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);\n    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), usage);\n    gl.enableVertexAttribArray(attribData.location);\n    gl.vertexAttribPointer(attribData.location, attribData.size, attribData.type, false, 0 , 0);\n}\n\n/**\n * Draw using the supplied values. Fails if webGL is not initialized and a program is not loaded, or if values do not match the attributes/uniforms\n */\nfunction draw(values) {\n    /**{HTMLCanvasElement} */\n    if (!gl) {\n        alert('WebGL context must be initialized before calling draw!');\n    }\n\n    /* for every attribute:\n    *  -get the attribute location from the program (using a string)\n    *  -create the buffer\n    *  -bind the buffer\n    *  -call bufferdata with the input\n    *  -call vertexAttribPointer with the necessary information\n    */\n   // iterate over each attribute, and extract the data from values\n   // presumes values has a field for each attribute name\n    Object.keys(currentProgramData.attributeData).forEach(attributeName => {\n        setupAttribBuffer(currentProgramData.attributeData[attributeName], values[attributeName], gl.STATIC_DRAW);\n    });\n\n    /* for uniforms:\n    *  -get the uniform location\n    *  -set the uniform\n    */\n    \n\n    let resolutionUniformLocation = gl.getUniformLocation(currentProgramData.program, 'u_resolution');\n    \n    (0,_webgl_utils__WEBPACK_IMPORTED_MODULE_0__.resizeCanvasToDisplaySize)(gl.canvas);\n\n    // setup clip space to screen space relationship\n    // map -1, +1 to 0, width, ... etc\n    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);\n\n    // set the resolution uniform\n    gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);\n\n    /*\n    // Tell the attribute how to get data out of positionBuffer\n    let size = 2 // 2 components per iteration\n    let type = gl.FLOAT // data is 32 bit floats\n    let normalize = false; // don't normalize the data\n    let stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position\n    let offset = 0; // start at the beginning of the buffer\n    gl.vertexAttribPointer(\n        positionAttributeLocation,\n        size,\n        type,\n        normalize,\n        stride,\n        offset\n    );*/\n\n    let primitiveType = gl.TRIANGLES; // every 3 times the shader is run, a triangle will be drawn with the 3 points\n    let offset = 0;\n    let count = values['a_position'].length / 2; // execute the vertex shader once for every pair of points provided\n    gl.drawArrays(primitiveType, offset, count);\n}\n\n\n\n//# sourceURL=webpack://js-framework/./src/webgl-test.js?");

/***/ }),

/***/ "./src/webgl-utils.js":
/*!****************************!*\
  !*** ./src/webgl-utils.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createProgramFromScripts\": () => (/* binding */ createProgramFromScripts),\n/* harmony export */   \"resizeCanvasToDisplaySize\": () => (/* binding */ resizeCanvasToDisplaySize)\n/* harmony export */ });\n\n\n/**\n * Compile shader from source\n * @param {WebGLRenderingContext} gl \n * @param {WebGLRenderingContextBase} type \n * @param {string} source \n * @returns {WebGLShader}\n */\nfunction createShader(gl, type, source) {\n    let shader = gl.createShader(type);\n    gl.shaderSource(shader, source);\n    gl.compileShader(shader);\n    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);\n    if (success) {\n        return shader;\n    }\n\n    console.log(gl.getShaderInfoLog(shader));\n    gl.deleteShader(shader);\n}\n\n/**\n * Extract all attribute and uniforms in this program, and record their locations\n * @param {WebGLRenderingContext} gl \n * @param {WebGLProgram} program \n * @param {WebGLShader} vertexShaderProgram \n * @param {WebGLShader} fragmentShaderProgram \n */\nfunction extractProgramData(gl, program, vertexShaderProgram, fragmentShaderProgram) {\n    /**\n     * Process a line of GLSL code into a attribute/uniform data object\n     * @param {string} line GLSL Code to be processed\n     * @param {*} container Container to place attribute (either attributeData or uniformData)\n     * @param {boolean} isAttribute True if attribute, False if uniform\n     */\n    function processLine(line, container, isAttribute) {\n        /**\n         * Get the associated WebGL type to be used for buffers later\n         * @param {string} type \n         */\n        function getGLType(type) {\n            //TODO: add in more types\n            const glTypes = {\n                ivec: gl.SHORT,\n                uvec: gl.UNSIGNED_INT,\n                vec: gl.FLOAT,\n            };\n            return glTypes[type];\n        }\n        let splitLine = line.split(' ');\n        let name = splitLine[2].split(';')[0];\n        //TODO: make type line up with proper enum; e.g. gl.FLOAT for vec, gl.DOUBLE for dmat, dvec,... etc.\n        // regex for getting non-numeric portion\n        let dataType = splitLine[1].match(/\\D/g).join('')\n        let type = getGLType(dataType);\n        // regex for getting numerics only\n        let size = Number.parseInt(splitLine[1].match(/\\d+/g).join(''));\n        let location = isAttribute ? gl.getAttribLocation(program, name) : gl.getUniformLocation(program, name);\n        container[name] = {type, size, location};\n    }\n    let vertexRaw = gl.getShaderSource(vertexShaderProgram).split('\\n').map(x => x.trimStart());\n    let fragmentRaw = gl.getShaderSource(fragmentShaderProgram).split('\\n').map(x => x.trimStart());\n    let attributeData = {};\n    let uniformData = {};\n\n    vertexRaw.forEach(line => {\n        if (line.includes('uniform')) {\n            processLine(line, uniformData, false);\n        }\n        if (line.includes('attribute')) {\n            processLine(line, attributeData, true);\n        }\n    });\n    fragmentRaw.forEach(line => {\n        if (line.includes('uniform')) {\n            // I'm assuming the GLSL compiler checks to make sure that uniforms are named properly so there's no duplicates with different types\n            processLine(line, uniformData, false);\n        }\n    });\n    return {program, attributeData, uniformData};\n}\n\n/** \n * Create a webGL program \n * @param {WebGLRenderingContext} gl \n * @param {WebGLShader} vertexShader \n * @param {WebGLShader} fragmentShader \n * @returns {WebGLProgram}\n */\nfunction createProgram(gl, vertexShader, fragmentShader) {\n    let program = gl.createProgram();\n    gl.attachShader(program, vertexShader);\n    gl.attachShader(program, fragmentShader);\n    gl.linkProgram(program);\n    let success = gl.getProgramParameter(program, gl.LINK_STATUS);\n    if (success) {\n        return extractProgramData(gl, program, vertexShader, fragmentShader);\n    }\n\n    console.log(gl.getProgramInfoLog(program));\n    gl.deleteProgram(program);\n}\n\n/**\n * Compiles GLSL program given the source code for vertex and fragment shaders\n * @param {WebGLRenderingContext} gl \n * @param {string} vertexSource \n * @param {string} fragmentSource \n */\nfunction createProgramFromScripts(gl, vertexSource, fragmentSource) {\n    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);\n    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);\n    return createProgram(gl, vertexShader, fragmentShader);\n}\n\n/**\n * Resize the canvas if it is not the same size in pixels\n * @param {HTMLCanvasElement} canvas \n */\nfunction resizeCanvasToDisplaySize(canvas) {\n    // Lookup the size the browser is displaying the canvas in CSS pixels.\n    const displayWidth  = canvas.clientWidth;\n    const displayHeight = canvas.clientHeight;\n   \n    // Check if the canvas is not the same size.\n    const needResize = canvas.width  !== displayWidth ||\n                       canvas.height !== displayHeight;\n   \n    if (needResize) {\n      // Make the canvas the same size\n      canvas.width  = displayWidth;\n      canvas.height = displayHeight;\n    }\n   \n    return needResize;\n}\n\n\n\n//# sourceURL=webpack://js-framework/./src/webgl-utils.js?");

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