import { drawImages, loadImageAndCreateTextureInfo } from './webgl-core'; 

const fontInfo = {
    letterHeight: 8,
    letterWidth: 8,
    spaceBetween: 0,
    textureWidth: 64,
    textureHeight: 40,
}

const testGlyphInfo = generateGlyphInfo(
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 
    'y', 'z', '0', '1', '2', '3', '4', '5', 
    '6', '7', '8', '9', '-', '*', '!', '?'], 
    fontInfo.letterWidth, fontInfo.letterHeight, 
    fontInfo.textureWidth, fontInfo.textureHeight);

const chomps8by8Font = createFont(8, 8, './assets/chomps 8x8 font.png', [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 
    'y', 'z', '0', '1', '2', '3', '4', '5', 
    '6', '7', '8', '9', '-', '*', '!', '?']);

/**
 * Create a new font from a spritesheet (all characters must be same size)
 * @param {Integer} letterWidth Width of a single character in pixels
 * @param {Integer} letterHeight Height of a single character in pixels 
 * @param {String} texturePath Path to spritesheet
 * @param {String} characters List of characters in spritesheet, starting from the top left
 */
async function createFont(letterWidth, letterHeight, texturePath, characters) {
    const textureInfo = await loadImageAndCreateTextureInfo(texturePath);
    const glyphInfo = generateGlyphInfo(characters, letterWidth, letterHeight, textureInfo.width, textureInfo.height);

    return {glyphInfo, texture: textureInfo.texture};
}

/**
 * Generate a glyphInfo object, with the positions of all the given glyphs
 * @param {[String]} glyphs List of all the different glyphs in this spritesheet
 * @param {Number} letterWidth Width of a single character in pixels
 * @param {Number} letterHeight Height of a single character in pixels
 * @param {Number} textureWidth Width of the spritesheet in pixels
 * @param {Number} textureHeight Height of the spritesheet in pixels
 * @returns 
 */
function generateGlyphInfo (glyphs, letterWidth, letterHeight, textureWidth, textureHeight) {
    const glyphInfo = {letterWidth, letterHeight, textureWidth, textureHeight};
    let x = 0;
    let y = 0;
    for (let i = 0; i < glyphs.length; i++) {
        glyphInfo[glyphs[i]] = {x, y};
        x += letterWidth;
        if (x >= textureWidth) {
            x = 0;
            y += letterHeight;
        }
    }

    return glyphInfo;
}

function generateTextCoords(glyphInfo, [xStart, yStart], text) {
    const {letterWidth, letterHeight, textureWidth, textureHeight} = glyphInfo;
    let positions = [];
    let texCoords = [];
    for (let i = 0; i < text.length; i++) {
        const currentChar = text[i];
        const currentGlyphInfo = glyphInfo[currentChar];
        if (currentGlyphInfo) {
            const x1 = xStart + i * letterWidth;
            const x2 = xStart + (i + 1) * letterWidth;

            const y1 = yStart;
            const y2 = yStart + letterHeight;

            const u1 = currentGlyphInfo.x / textureWidth;
            const u2 = (currentGlyphInfo.x + letterWidth) / textureWidth;

            const v1 = currentGlyphInfo.y / textureHeight;
            const v2 = (currentGlyphInfo.y + letterHeight) / textureHeight;

            const pos1 = [x1, y1];
            const pos2 = [x2, y1];
            const pos3 = [x1, y2];
            const pos4 = [x2, y2];
            positions.push(...pos1, ...pos2, ...pos3, ...pos2, ...pos3, ...pos4);

            const tex1 = [u1, v2];
            const tex2 = [u2, v2];
            const tex3 = [u1, v1];
            const tex4 = [u2, v1];
            texCoords.push(...tex1, ...tex2, ...tex3, ...tex2, ...tex3, ...tex4);
        }
    }

    return {positions, texCoords}
}

function drawText(text, x, y, font, scale) {
    const textCoords = generateTextCoords(font.glyphInfo, [x ,y], text);
    drawImages(textCoords.positions, textCoords.texCoords, font.texture, [{sX: scale, sY: scale, angle: 0, tX: 0, tY: 0}]);
}

export {testGlyphInfo, generateTextCoords, drawText, chomps8by8Font};