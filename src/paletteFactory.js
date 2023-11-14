/**
 * Gets a list of palettes.
 * @returns {Palette[]}
 */
const getList = () => {
    return palettes;
};

/**
 * Gets a single palette or null if not found.
 * @param {number} paletteId - Unique ID of the palette.
 * @returns {Palette?}
 */
const getSingle = (paletteId) => {
    if (typeof paletteId === 'number') {
        const found = palettes.filter((p) => p.paletteId === paletteId);
        return found[0] ?? null;
    } else {
        return null;
    }
};

/**
 * Returns a boolean, true if a palette with the given ID exists, otherwise false.
 * @param {number} paletteId - Unique ID of the palette to find.
 * @returns {boolean}
 */
const paletteExists = (paletteId) => {
    return typeof paletteId === 'number' &&
        palettes.findIndex((p) => p.paletteId === paletteId) >= 0;
}

/**
 * Saves a palette, overwrites any existing palette with the same ID, returns the saved record.
 * @param {Palette} palette - Palette object to put.
 * @returns {Palette}
 */
const putSingle = (palette) => {
    if (paletteExists(palette.paletteId)) {
        const index = palettes.findIndex((p) => p.paletteId === palette.paletteId);
        palettes.splice(index, 1);
    } else if (typeof palette.paletteId !== 'number') {
        palette.paletteId = Date.now();
    }

    palettes.push(palette);

    return palette;
}

/**
 * Deletes a palette by ID, returns true if deleted, otherwise false.
 * @param {number} paletteId - Unique ID of the palette to delete.
 * @returns {boolean}
 */
const deleteById = (paletteId) => {
    if (paletteExists(paletteId)) {
        const index = palettes.findIndex((p) => p.paletteId === paletteId);
        palettes.splice(index, 1);
        return true;
    } else {
        return false;
    }
};


module.exports = {
    list: getList,
    get: getSingle,
    put: putSingle,
    deleteById,
    exists: paletteExists
};


/** @type {Palette[]} */
const palettes = [
    {
        paletteId: 0,
        title: 'PaletteSMS',
        system: 'sms',
        colours: [
            { r: 255, g: 255, b: 255 },
            { r: 255, g: 0, b: 0 },
            { r: 0, g: 255, b: 0 },
            { r: 0, g: 0, b: 255 },
            { r: 0, g: 0, b: 0 }
        ]
    },
    {
        paletteId: 1,
        title: 'PaletteGG',
        system: 'gg',
        colours: [
            { r: 255, g: 255, b: 255 },
            { r: 255, g: 0, b: 0 },
            { r: 0, g: 255, b: 0 },
            { r: 0, g: 0, b: 255 },
            { r: 0, g: 0, b: 0 }
        ]
    }
];

/** 
 * @typedef {Object} Palette
 * @property {number?} paletteId - Unique palette ID.
 * @property {string} title - Friendly title of the palette.
 * @property {string} system - Shortcode for the system the palette is meant for.
 * @property {PaletteColour[]} colours - Array of colours in the palette.
 */
/** 
 * @typedef {Object} PaletteColour
 * @property {number} r - Red value.
 * @property {number} g - Green value.
 * @property {number} b - Blue value.
 */