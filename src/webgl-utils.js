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

/**
 * Extract all attribute and uniforms in this program, and record their locations
 * @param {WebGLRenderingContext} gl 
 * @param {WebGLProgram} program 
 * @param {WebGLShader} vertexShaderProgram 
 * @param {WebGLShader} fragmentShaderProgram 
 */
function extractProgramData(gl, program, vertexShaderProgram, fragmentShaderProgram) {
    /**
     * Process a line of GLSL code into a attribute/uniform data object
     * @param {string} line GLSL Code to be processed
     * @param {*} container Container to place attribute (either attributeData or uniformData)
     * @param {boolean} isAttribute True if attribute, False if uniform
     */
    function processLine(line, container, isAttribute) {
        /**
         * Get the associated WebGL type to be used for buffers later
         * @param {string} type 
         */
        function getGLType(type) {
            //TODO: add in more types
            const glTypes = {
                ivec: gl.SHORT,
                uvec: gl.UNSIGNED_INT,
                vec: gl.FLOAT,
            };
            return glTypes[type];
        }
        function getUniformSetter() {
            //TODO: add in more function mappings
            const createSetter = function(glFunc) {
                return (values) => gl[glFunc](location, ...values);
            }
            const setters = {
                vec2: createSetter('uniform2f'),
                vec3: createSetter('uniform3f'),
                vec4: createSetter('uniform4f'),
            }
            return setters[fullDataType];
        }
        let splitLine = line.split(' ');
        let name = splitLine[2].split(';')[0];
        //TODO: make type line up with proper enum; e.g. gl.FLOAT for vec, gl.DOUBLE for dmat, dvec,... etc.
        let fullDataType = splitLine[1];
        // regex for getting non-numeric portion
        let dataType = fullDataType.match(/\D/g).join('')
        let type = getGLType(dataType);
        // regex for getting numerics only
        let size = Number.parseInt(fullDataType.match(/\d+/g).join(''));
        let location = isAttribute ? gl.getAttribLocation(program, name) : gl.getUniformLocation(program, name);
        if (isAttribute) {
            container[name] = {type, size, location};
        }
        else {
            container[name] = {type, size, location, setter: getUniformSetter()}
        }
        
    }
    let vertexRaw = gl.getShaderSource(vertexShaderProgram).split('\n').map(x => x.trimStart());
    let fragmentRaw = gl.getShaderSource(fragmentShaderProgram).split('\n').map(x => x.trimStart());
    let attributeData = {};
    let uniformData = {};

    vertexRaw.forEach(line => {
        if (line.includes('uniform')) {
            processLine(line, uniformData, false);
        }
        if (line.includes('attribute')) {
            processLine(line, attributeData, true);
        }
    });
    fragmentRaw.forEach(line => {
        if (line.includes('uniform')) {
            // I'm assuming the GLSL compiler checks to make sure that uniforms are named properly so there's no duplicates with different types
            processLine(line, uniformData, false);
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
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return extractProgramData(gl, program, vertexShader, fragmentShader);
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