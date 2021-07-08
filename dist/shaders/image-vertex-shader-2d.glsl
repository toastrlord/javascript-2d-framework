// vertex shader that takes a unit square, and scales it via matrix math
// (faster than uploading sevaral vertices to the GPU)
attribute vec2 a_position;
attribute vec2 a_texcoord;

uniform vec2 u_resolution;
uniform mat3 u_matrix;

varying vec2 v_texcoord;

void main() {
    // Multiply the position by the matrix.
    vec2 position = (u_matrix * vec3(a_position, 1)).xy;

    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = a_position / u_resolution; //range: [0, 1]
    vec2 minusPointFive = zeroToOne - 0.5; //range: [-.5, .5]
    vec2 clipSpace = minusPointFive * 2.0; //range: [-1, 1]

    // convert from 0->1 to 0->2
    //vec2 zeroToTwo = zeroToOne * 2.0;

    // convert from 0->2 to -1->+1 (clipspace)
    //vec2 clipSpace = zeroToTwo - 1.0;

    v_texcoord = a_texcoord;
    gl_Position = vec4(clipSpace, 0, 1);
}