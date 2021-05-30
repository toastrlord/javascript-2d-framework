'use strict'

import { createProgramFromScripts, resizeCanvasToDisplaySize } from 'graphics/webgl-utils';
import { matrix4, matrix3 } from 'math/matrix-util';

/** @type {WebGLRenderingContext} */
let gl;
let currentProgramData;
const primitiveDrawingData = {a_position: {}, a_color: {}, u_resolution: []};
let primitiveProgramData;
let imageProgramData;
let maxDepth = 0;

/** 
 * Setup the WebGL render context
 * @param {HTMLCanvasElement} canvas 
 */
function setContext(canvas) {
    gl = canvas.getContext('webgl', { alpha: false });
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    primitiveProgramData = makeProgram(document.querySelector('#pixel-vertex-shader-2d').textContent, document.querySelector('#color-fragment-shader-2d').textContent);
    imageProgramData = makeProgram(document.querySelector('#image-vertex-shader-2d').textContent,  document.querySelector('#image-fragment-shader-2d').textContent);
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
 * Clears the current canvas and sets the clear color
 * @param {Number[]} color Color in [r, g, b, a] format
 */
function clear(color) {
    gl.clearColor(...color);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function setupAttribBuffer(attribData, values, usage) {
    /* for every attribute:
    *  -get the attribute location from the program (using a string)
    *  -create the buffer
    *  -bind the buffer
    *  -call bufferdata with the input
    *  -call vertexAttribPointer with the necessary information
    */
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), usage);
    gl.enableVertexAttribArray(attribData.location);
    gl.vertexAttribPointer(attribData.location, attribData.size, attribData.type, false, 0 , 0);
}

function setupUniform(uniformData, values) {
    /* for uniforms:
    *  -get the uniform location
    *  -set the uniform
    *  (both are handled by the provided setter function in uniformData)
    */
    uniformData.setter(values);
}

/**
 * Setup the attributes and uniforms for the currently loaded GLSL program
 * @param {*} values 
 */
function setupShaderVars(values) {
    // iterate over each attribute, and extract the data from values
    // presumes values has a field for each attribute name
    Object.keys(currentProgramData.attributeData).forEach(attributeName => {
        if (values[attributeName] === undefined) {
            console.log(`Values not provided for attribute: ${attributeName}`);
        }
        else {
            setupAttribBuffer(currentProgramData.attributeData[attributeName], values[attributeName], gl.DYNAMIC_DRAW);
        }
    });

    Object.keys(currentProgramData.uniformData).forEach(uniformName => {
        if (values[uniformName] === undefined) {
            console.log(`Values not provided for uniform: ${uniformName}`);
        }
        else {
            setupUniform(currentProgramData.uniformData[uniformName], values[uniformName]);
        }
    });
}

/**
 *  creates texture info { width w: height: h texture: tex}
 *  texture starts with 1x1 pixels and updates when it is loaded
 * @param {*} path Location of the image
 */
function loadImageAndCreateTextureInfo(path, width, height) {
    let tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // fill text with 1x1 blue pixel
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 255, 255]));

    // assume texture is not a power of 2
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    let textureInfo = {
        width,
        height,
        texture: tex,
    };
    
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
            if (textureInfo.width === undefined) {
                textureInfo.width = img.width;
            }
            if (textureInfo.height === undefined) {
                textureInfo.height = img.height;
            }
            gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            console.log('texture info: ');
            console.log(textureInfo);
            console.log(img);
            resolve(textureInfo);
        }
        img.src = path;
        img.onerror = reject;
    });
}

/**
 * 
 * @param {*} transforms 
 */
function createTransformMatrices(transforms) {
    return transforms.map(t => {
        let matrix = matrix3.identity();
        matrix = matrix3.scale(matrix, t.sX, t.sY);
        matrix = matrix3.rotate(matrix, t.angle);
        matrix = matrix3.translate(matrix, t.tX, t.tY);
        
        return matrix;
    });
}


function drawImages(positions, texCoords, texture, transformData) {
    useProgramData(imageProgramData);
    // TODO: right now, only binds a single texture to draw
    // TODO: positions and texCoords are the same pairs right now- will want to use indexing to make this a bit faster, though we'll want to retain
    // the ability to use different texCoords for when we use texture atlases
    let matrices = createTransformMatrices(transformData);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    setupAttribBuffer(currentProgramData.attributeData['a_position'], positions, gl.DYNAMIC_DRAW);
    setupAttribBuffer(currentProgramData.attributeData['a_texcoord'], texCoords, gl.DYNAMIC_DRAW);
    //setupAttribBuffer(currentProgramData.attributeData['a_matrix'], matrices, gl.DYNAMIC_DRAW);

    setupUniform(currentProgramData.uniformData['u_resolution'], [canvas.width, canvas.height]);
    let textureLocation = currentProgramData.uniformData['u_texture'].location;
    gl.uniform1i(textureLocation, 0);

    let matrixLocation = currentProgramData.uniformData['u_matrix'].location;
    // TODO: NEEDS TO BE UPDATED! GLSL CODE NEEDS TO TAKE MATRICES VIA ATTRIBUTE, NOT UNIFORM
    gl.uniformMatrix3fv(matrixLocation, false, matrices[0]);

    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 2);
}

function drawImage(imageProgramData, positions, texcoords, texture, texWidth, texHeight, dstX, dstY, angle, sX, sY) {
    useProgramData(imageProgramData);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    setupAttribBuffer(imageProgramData.attributeData['a_position'], positions, gl.DYNAMIC_DRAW);
    setupAttribBuffer(imageProgramData.attributeData['a_texcoord'], texcoords, gl.DYNAMIC_DRAW);

    setupUniform(imageProgramData.uniformData['u_resolution'], [canvas.width, canvas.height]);

    // matrix will convert from pixels to clipspace
    let matrix = matrix3.identity();

    // this matrix scales our unit quad up to texWidth, texHeight
    matrix = matrix3.scale(matrix, texWidth * sX, texHeight * sY);

    // rotation transform would go here
    matrix = matrix3.rotate(matrix, angle);

    // this matrix will translate the quad to dstX, dstY
    matrix = matrix3.translate(matrix, dstX, dstY);

    let matrixLocation = imageProgramData.uniformData['u_matrix'].location;
    // set the matrix uniform
    gl.uniformMatrix3fv(matrixLocation, false, matrix);

    let textureLocation = imageProgramData.uniformData['u_texture'].location;
    // tell shader to get texture from texture unit 0
    gl.uniform1i(textureLocation, 0);

    // draw the quad (2 triangles, so 6 vertices)
    gl.drawArrays(gl.TRIANGLES, 0 , 6);

}

/**
 * 
 * @param {[Number]} points 
 * @param {[Number]} colors 
 * @param {Number} depth Draw order of this data, lower depth means it is drawn sooner, larger depth means it is drawn later
 */
function addPrimitiveDrawingData(points, colors, depth = 0) {
    if (primitiveDrawingData.a_position[depth] === undefined) {
        if (depth > maxDepth) {
            maxDepth = depth;
        }
        primitiveDrawingData.a_position[depth] = [];
        primitiveDrawingData.a_color[depth] = [];
    }
    primitiveDrawingData.a_position[depth].push(...points);
    primitiveDrawingData.a_color[depth].push(...colors);
}

/**
 * Take all drawing data and unfold it based on depth (e.g. depth = 0 is drawn before depth = 1, etc..) so we can bind it with webgl later
 */
function generatePrimitiveDrawingData() {
    let depth = 0;
    let positions = [];
    let colors = [];
    while (depth <= maxDepth) {
        if (primitiveDrawingData.a_position[depth] === undefined) {
            depth += 1;
            continue;
        }
        positions.push(...primitiveDrawingData.a_position[depth]);
        colors.push(...primitiveDrawingData.a_color[depth]);
        depth += 1;
    }
    primitiveDrawingData.a_position = positions;
    primitiveDrawingData.a_color = colors;
}

/**
 * Draw primitives (i.e. rectangles) using the values supplied in primitiveDrawingData
 */
function drawPrimitives() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    generatePrimitiveDrawingData();
    primitiveDrawingData.u_resolution = [gl.canvas.width, gl.canvas.height];
    useProgramData(primitiveProgramData);
    setupShaderVars(primitiveDrawingData);
    
    resizeCanvasToDisplaySize(gl.canvas);

    // setup clip space to screen space relationship
    // map -1, +1 to 0, width, ... etc
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    let primitiveType = gl.TRIANGLES; // every 3 times the shader is run, a triangle will be drawn with the 3 points
    let offset = 0;
    let count = primitiveDrawingData.a_position.length / 2; // execute the vertex shader once for every pair of points provided
    gl.drawArrays(primitiveType, offset, count);
    Object.keys(primitiveDrawingData).forEach(key => {
        primitiveDrawingData[key] = {};
    })
    maxDepth = 0;
}

export {loadImageAndCreateTextureInfo, drawImages, setContext, makeProgram, useProgramData, drawPrimitives, clear, addPrimitiveDrawingData};