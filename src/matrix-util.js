'use strict'
const M00 = 0;
const M01 = 1;
const M02 = 2;
const M03 = 3;
const M10 = 4;
const M11 = 5;
const M12 = 6;
const M13 = 7;
const M20 = 8;
const M21 = 9;
const M22 = 10;
const M23 = 11;
const M30 = 12;
const M31 = 13;
const M32 = 14;
const M33 = 15;
const matrix4 = {
    orthographic,
    translate,
    scale,
    multiply,
    prettyPrint,
    identity: function matrix4Identity() {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
    },
};

function matrix2Identity() {
    return [
        1, 0,
        0, 1,
    ];
}

function matrix3Identity() {
    return [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
    ];
}

function orthographic(left, right, bottom, top, near, far) {
    let matrix = [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ];
    matrix[M00] = 2/(right-left);
    matrix[M03] = -(right+left)/(right-left);
    matrix[M11] = 2/(top-bottom);
    matrix[M13] = -(top+bottom)/(top-bottom);
    matrix[M22] = -2/(far-near);
    matrix[M23] = -(far+near)/(far-near);
    matrix[M33] = 1;

    return matrix;
}

function translate(matrix, tx, ty, tz) {
    let translationMatrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        tx, ty, tz, 1,
    ];

    return multiply(matrix, translationMatrix);
}

function scale(matrix, sx, sy, sz) {
    let scaleMatrix = [
        sx, 0,  0, 0,
        0, sy,  0, 0,
        0,  0, sz, 0,
        0,  0,  0, 1,
    ];

    return multiply(matrix, scaleMatrix);
}

function multiply(matrix1, matrix2) {
    function dotProduct(mat1Row, mat2Col) {
        let product = 0;
        for (let i = 0; i < 4; i++) {
            product += (matrix1[i + mat1Row * 4] * matrix2[i * 4 + mat2Col]);
        }
        return product;
    }
    //assume matrix1 is always a 4x4, but matrix2 could be a 4x4 or a vec4
    
    if (matrix2.length === 16) {
        let newMatrix = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ];
        // TODO: make this more succinct in a for loop?
        newMatrix[0] = dotProduct(0, 0);
        newMatrix[1] = dotProduct(0, 1);
        newMatrix[2] = dotProduct(0, 2);
        newMatrix[3] = dotProduct(0, 3);

        newMatrix[4] = dotProduct(1, 0);
        newMatrix[5] = dotProduct(1, 1);
        newMatrix[6] = dotProduct(1, 2);
        newMatrix[7] = dotProduct(1, 3);

        newMatrix[8] = dotProduct(2, 0);
        newMatrix[9] = dotProduct(2, 1);
        newMatrix[10] = dotProduct(2, 2);
        newMatrix[11] = dotProduct(2, 3);

        newMatrix[12] = dotProduct(3, 0);
        newMatrix[13] = dotProduct(3, 1);
        newMatrix[14] = dotProduct(3, 2);
        newMatrix[15] = dotProduct(3, 3);
        return newMatrix;
    }
    else if (matrix2.length === 4) {
        let newVector = [0, 0, 0, 0];
        for (let index = 0; index < newVector.length; index += 1) {
            let product = 0;
            for (let i = 0; i < 4; i += 1) {
                product += matrix1[i + 4*index] * matrix2[i];
            }
            newVector[index] = product;
        }
        return newVector
    }
    else {
        console.log('Error! matrix4.multiply: second arg is not a 4x4 or a vec4!');
        console.log(matrix2);
    }
}

function prettyPrint(matrix) {
    for (let i = 0; i < 4; i += 1) {
        let str = '';
        for (let j = 0; j < 4; j++) {
            str += matrix[i*4 + j] + ' ';
        }
        console.log(str);
    }
}

const matrix3 = {
    identity: function() {
        return [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ];
    },
    multiply: function(matrix1, matrix2) {
        function dotProduct(mat1Row, mat2Col) {
            let product = 0;
            for (let i = 0; i < 3; i++) {
                product += (matrix1[i + mat1Row * 3] * matrix2[i * 3 + mat2Col]);
            }
            return product;
        }
        if (matrix2.length === 9) {
            let newMatrix = [
                0, 0, 0,
                0, 0, 0,
                0, 0, 0,
            ];
            newMatrix[0] = dotProduct(0, 0);
            newMatrix[1] = dotProduct(0, 1);
            newMatrix[2] = dotProduct(0, 2);

            newMatrix[3] = dotProduct(1, 0);
            newMatrix[4] = dotProduct(1, 1);
            newMatrix[5] = dotProduct(1, 2);

            newMatrix[6] = dotProduct(2, 0);
            newMatrix[7] = dotProduct(2, 1);
            newMatrix[8] = dotProduct(2, 2);

            return newMatrix;
        } else if (matrix2.length === 3) {
            let newVector = [0, 0, 0];
            for (let index = 0; index < newVector.length; index += 1) {
                let product = 0;
                for (let i = 0; i < 3; i += 1) {
                    product += matrix1[i + 3 * index] * matrix2[i];
                }
                newVector[index] = product;
            }
            return newVector;
        } else {
            console.log('Error- matrix3.multiply- second arg is neither a 3x3 or a vec3!');
        }
    },
    scale: function(matrix, sx, sy) {
        let scaleMatrix = [
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1,
        ];
        return matrix3.multiply(matrix, scaleMatrix);
    },
    translate: function(matrix, tx, ty) {
        let translationMatrix = [
            1, 0, 0,
            0, 1, 0,
            tx, ty, 1,
        ];
        return matrix3.multiply(matrix, translationMatrix);
    },
    rotate: function(matrix, angleInRadians) {
        const cos = Math.cos(angle);
        const sin = Math.cos(angle);
        let rotationMatrix = [
            cos, -sin, 0,
            sin, cos, 0,
            0, 0, 1,
        ];
        return matrix3.multiply(matrix, rotationMatrix);
    },
};

export {matrix4, matrix3};