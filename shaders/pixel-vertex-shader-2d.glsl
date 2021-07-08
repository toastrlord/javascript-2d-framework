// vertex shader that expects positions in pixel-vertex-shader-2d, uses bottom-left origin
attribute vec2 a_position;
attribute vec4 a_color;

varying vec4 v_color;

uniform vec2 u_resolution;

void main() {
    // pixel value (x or y) => clipspace value
    // 0 => -1
    // res/2 => 0
    // res => 1
    // take pixel value, divide by resolution (mapping from 0 to 1)
    // then, subtract 0.5 and multiply by 2, to go from a 0->1 mapping to -1->1
    vec2 zeroToOne = a_position / u_resolution; //range: [0, 1]
    vec2 minusPointFive = zeroToOne - 0.5; //range: [-.5, .5]
    vec2 clipSpace = minusPointFive * 2.0; //range: [-1, 1]
    gl_Position = vec4(clipSpace, 0, 1);
    v_color = a_color;
}