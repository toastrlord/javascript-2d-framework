const fontInfo = {
    letterHeight: 8,
    letterWidth: 8,
    spaceBetween: 0,
    textureWidth: 64,
    textureHeight: 40,
}

/**
 * Generate a glyphInfo object, with the positions of all the given glyphs
 * @param {[String]} glyphs 
 * @param {Number} letterWidth 
 * @param {Number} letterHeight 
 * @param {Number} textureWidth 
 * @param {Number} textureHeight 
 * @returns 
 */
const generateGlyphInfo = function(glyphs, letterWidth, letterHeight, textureWidth, textureHeight) {
    const glyphInfo = {letterWidth, letterHeight, textureWidth, textureHeight};
    let x = 0;
    let y = 0;
    for (let i = 0; i < glyphs.length; i++) {
        glyphInfo[glyphs[i]] = {x, y};
        x += letterWidth;
        if (letterWidth >= textureWidth) {
            x = 0;
            y += letterHeight;
        }
    }
    console.log(glyphs);
    return glyphInfo;
}

const testGlyphInfo = generateGlyphInfo(
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 
    'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 
    'y', 'z', '0', '1', '2', '3', '4', '5', 
    '6', '7', '8', '9', '-', '*', '!', '?'], 
    fontInfo.letterWidth, fontInfo.letterHeight, 
    fontInfo.textureWidth, fontInfo.textureHeight);

const generateTextCoords = function(glyphInfo, [xStart, yStart], text) {
    const {letterWidth, letterHeight, textureWidth, textureHeight} = glyphInfo;
    let positions = [];
    let texCoords = [];
    console.log(glyphInfo);
    console.log(text);
    for (let i = 0; i < text.length; i++) {
        const currentChar = text[i];
        const currentGlyphInfo = glyphInfo[currentChar];
        if (currentGlyphInfo) {
            const x1 = xStart + i * letterWidth;
            const x2 = xStart + (i + 1) * letterWidth;

            const y1 = yStart;
            const y2 = yStart + letterHeight;

            const u1 = x1 / textureWidth;
            const u2 = x2 / textureWidth;

            const v1 = y1 / textureHeight;
            const v2 = y2 / textureHeight;

            const pos1 = [x1, y1];
            const pos2 = [x2, y1];
            const pos3 = [x1, y2];
            const pos4 = [x2, y2];
            positions.push(...pos1, ...pos2, ...pos3, ...pos4);

            const tex1 = [u1, v1];
            const tex2 = [u2, v1];
            const tex3 = [u1, v2];
            const tex4 = [u2, v2];
            texCoords.push(...tex1, ...tex2, ...tex3, ...tex4);
        }
    }

    return {positions, texCoords}
}

export {testGlyphInfo, generateTextCoords};