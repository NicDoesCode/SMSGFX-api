const { generateRandomString } = require('./../helpers/generalUtility');

/**
 * Creates a palette object will null and empty values.
 * @returns {import('../models/palette').Palette}
 */
const createBlankPalette = () => {
    return {
        paletteId: null,
        system: null,
        title: null,
        colours: []
    }
};

/**
 * Creates a palette object filled with consistent data.
 * @returns {import('../models/palette').Palette}
 */
const createFilledPalette = () => {
    return {
        paletteId: '_paletteId',
        system: '_system',
        title: '_title',
        colours: [
            { r: 1, g: 2, b: 3 },
            { r: 4, g: 5, b: 6 }
        ]
    };
};

/**
 * Creates a palette object filled with randomised data.
 * @returns {import('../models/palette').Palette}
 */
const createRandomisedFilledPalette = () => {
    const colourArray = new Array(Math.round(16 * Math.random()));
    for (let i = 0; i < colourArray.length; i++) {
        colourArray[i] = { r: Math.round(255 * Math.random()), g: Math.round(255 * Math.random()), b: Math.round(255 * Math.random()) };
    }
    return {
        paletteId: `${generateRandomString(16)}`,
        system: `${generateRandomString(8)}`,
        title: `${generateRandomString(24)}`,
        colours: colourArray
    };
};


module.exports = {
    createBlankPalette, 
    createFilledPalette,
    createRandomisedFilledPalette
};