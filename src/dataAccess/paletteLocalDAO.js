const PaletteDAO = require('./paletteDAO');


/**
 * Local, memory resident, non persistent palette data access object.
 */
class PaletteLocalDAO extends PaletteDAO {


    /**
     * Initialises a new instance of the class.
     */
    constructor() {
        console.debug('Local palette data access object initalised.');
    }


    /**
     * Gets a list of palettes.
     * @returns {import('../models/palette').Palette[]}
     */
    async readAll() {
        return palettes;
    }

    /**
     * Gets a single palette or null if not found.
     * @param {string} paletteId - Unique ID of the palette.
     * @returns {import('../models/palette').Palette?}
     */
    async singleById(paletteId) {
        if (typeof paletteId === 'string' && paletteId !== '') {
            const found = palettes.filter((p) => p.paletteId === paletteId);
            return found[0] ?? null;
        } else {
            return null;
        }
    }

    /**
     * Creates a palette record, returns inserted record, throws if a palette with the same ID already exists.
     * @param {import('../models/palette').Palette} palette - Palette object to put.
     * @throws Palette with same Palette ID already exists.
     * @returns {import('../models/palette').Palette}
     */
    async create(palette) {
        if (typeof palette.paletteId === 'string' && palette.paletteId !== '') {
            const existing = await this.singleById(palette.paletteId);
            if (existing) throw new Error('Palette with given ID already exists.');
        }

        if (typeof palette.paletteId !== 'string' || palette.paletteId === '') {
            palette.paletteId = Date.now().toString();
        }

        palettes.push(palette);

        return palette;
    }

    /**
     * Replaces a palette record same palette ID, returns boolean indicating success, throws if the palette doesn't exist.
     * @param {import('../models/palette').Palette} palette - Palette object to put.
     * @throws Palette with same Palette ID doesn't exist.
     * @returns {boolean}
     */
    async replace(palette) {
        if (typeof palette.paletteId !== 'string' || paletteId === '') {
            throw new Error('Invalid palette ID.');
        }

        const index = palettes.findIndex((p) => p.paletteId === palette.paletteId);

        if (index === -1) {
            throw new Error('Palette doesn\'t exist.');
        }

        palettes[index] = palette;

        return true;
    }

    /**
     * Deletes a palette by ID, returns true if deleted, otherwise false.
     * @param {string} paletteId - Unique ID of the palette to delete.
     * @returns {boolean}
     */
    async deleteById(paletteId) {
        if (typeof paletteId !== 'string' || paletteId === '') {
            throw new Error('Invalid palette ID.');
        }

        const index = palettes.findIndex((p) => p.paletteId === paletteId);
        if (index >= 0) {
            palettes.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }


}

module.exports = PaletteLocalDAO;


/** @type {import('../models/palette').Palette[]} */
const palettes = [
    // {
    //     paletteId: 0,
    //     title: 'PaletteSMS',
    //     system: 'sms',
    //     colours: [
    //         { r: 255, g: 255, b: 255 },
    //         { r: 255, g: 0, b: 0 },
    //         { r: 0, g: 255, b: 0 },
    //         { r: 0, g: 0, b: 255 },
    //         { r: 0, g: 0, b: 0 }
    //     ]
    // },
    // {
    //     paletteId: 1,
    //     title: 'PaletteGG',
    //     system: 'gg',
    //     colours: [
    //         { r: 255, g: 255, b: 255 },
    //         { r: 255, g: 0, b: 0 },
    //         { r: 0, g: 255, b: 0 },
    //         { r: 0, g: 0, b: 255 },
    //         { r: 0, g: 0, b: 0 }
    //     ]
    // }
];
