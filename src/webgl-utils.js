'use strict'

/**
 * Compile shader from source
 * @param {WebGLRenderingContext} gl 
 * @param {WebGLRenderingContextBase} type 
 * @param {string} source 
 * @returns {WebGLShader}
 */
function createShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function extractProgramData(gl, program, vertexShaderProgram, fragmentShaderProgram) {
    function processLine(line, container) {
        let splitLine = line.split(' ');
        let name = splitLine[2].split(';')[0];
        let type = splitLine[1];
        //TODO: only works for 'vec' types!!
        let length = Number.parseInt(type.split('vec')[1]);
        container[name] = {type, length};
    }
    let vertexRaw = gl.getShaderSource(vertexShaderProgram).split('\n').map(x => x.trimStart());
    let fragmentRaw = gl.getShaderSource(fragmentShaderProgram).split('\n').map(x => x.trimStart());
    let attributeData = {};
    let uniformData = {};

    vertexRaw.forEach(line => {
        if (line.includes('uniform')) {
            processLine(line, uniformData);
        }
        if (line.includes('attribute')) {
            processLine(line, attributeData);
        }
    });
    fragmentRaw.forEach(line => {
        if (line.includes('uniform')) {
            processLine(line, uniformData);
        }
    });
    return {program, attributeData, uniformData};
}

/** 
 * Create a webGL program 
 * @param {WebGLRenderingContext} gl 
 * @param {WebGLShader} vertexShader 
 * @param {WebGLShader} fragmentShader 
 * @returns {WebGLProgram}
 */
function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    console.log(extractProgramData(gl, program, vertexShader, fragmentShader));
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

/**
 * Compiles GLSL program given the source code for vertex and fragment shaders
 * @param {WebGLRenderingContext} gl 
 * @param {string} vertexSource 
 * @param {string} fragmentSource 
 */
function createProgramFromScripts(gl, vertexSource, fragmentSource) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    return createProgram(gl, vertexShader, fragmentShader);
}

/**
 * Resize the canvas if it is not the same size in pixels
 * @param {HTMLCanvasElement} canvas 
 */
function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
   
    // Check if the canvas is not the same size.
    const needResize = canvas.width  !== displayWidth ||
                       canvas.height !== displayHeight;
   
    if (needResize) {
      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
   
    return needResize;
}

export {createProgramFromScripts, resizeCanvasToDisplaySize};