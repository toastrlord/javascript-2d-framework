const matrix4 = {
    orthographic,
    translate,

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

function matrix4Identity() {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
}

function orthographic(left, right, bottom, top, near, far) {
    let matrix = [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ];
    matrix[0] = 2/(right-left);
    matrix[3] = -(right+left)/(right-left);
    matrix[5] = 2/(top+bottom);
    matrix[7] = -(top+bottom)/(top-bottm);
    matrix[10] = -2/(far-near);
    matrix[11] = -(far+near)/(far-near);
    matrix[15] = 1;

    return matrix;
}

function translate(matrix, tx, ty, tz) {
    let translationMatrix = [
        1, 0, 0, tx,
        0, 1, 0, ty,
        0, 0, 1, tz,
        0, 0, 0, 1,
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
    let newMatrix = [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ];
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

export default matrix4;