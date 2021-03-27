const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    resolve: {
        alias: {
            graphics: path.resolve(__dirname, '/src/graphics/'),
            math: path.resolve(__dirname, '/src/math/'),
            input: path.resolve(__dirname, '/src/input'),
            physics: path.resolve(__dirname, '/src/physics'),
        },
    },
}