const PaletteDAO = require('./../dataAccess/paletteDAO');


/**
 * Business layer for palette data access operations.
 */
class PaletteRepository {


    /** @type {PaletteDAO} */
    #dao;


    /**
     * Initalises a new instance of the Palette repository class.
     * @param {PaletteDAO} paletteDAO - Palette data access object.
     */
    constructor(paletteDAO) {
        if (paletteDAO === null || paletteDAO === undefined || paletteDAO instanceof PaletteDAO === false) {
            throw new Error('Invalid palette data access object.');
        }
        this.#dao = paletteDAO;
    }


    /**
     * Returns 'true' if a palette with the given ID exists, otherwise 'false'.
     * @param {string} paletteId - Unique ID of the palette to find.
     * @returns {boolean}
     */
    async existsById(paletteId) {
        const result = await this.#dao.singleById(paletteId);
        console.log(`result was`, result);
        return result !== null;
    }

    /**
     * Gets a list of palettes.
     * @returns {import('../models/palette').Palette[]}
     */
    async readAll() {
        return await this.#dao.readAll();
    }

    /**
     * Gets a single palette or null if not found.
     * @param {string} paletteId - Unique ID of the palette.
     * @returns {import('../models/palette').Palette?}
     */
    async singleById(paletteId) {
        return await this.#dao.singleById(paletteId);
    }

    /**
     * Creates a palette record, returns inserted record, throws if a palette with the same ID already exists.
     * @param {import('../models/palette').Palette} palette - Palette object to put.
     * @throws Palette with same Palette ID already exists.
     * @returns {import('../models/palette').Palette}
     */
    async create(palette) {
        return await this.#dao.create(palette);
    }

    /**
     * Replaces a palette record same palette ID, returns boolean indicating success, throws if the palette doesn't exist.
     * @param {import('../models/palette').Palette} palette - Palette object to put.
     * @throws Palette with same Palette ID doesn't exist.
     * @returns {boolean}
     */
    async replace(palette) {
        return await this.#dao.replace(palette);
    }

    /**
     * Replaces a palette record same palette ID, returns boolean indicating success, throws if the palette doesn't exist.
     * @param {import('../models/palette').Palette} palette - Palette object to put.
     * @throws Palette with same Palette ID doesn't exist.
     * @returns {import('../models/palette').Palette}
     */
    async createOrReplace(palette) {
        const existing = await this.#dao.singleById(palette.paletteId);
        if (existing) {
            await this.replace(palette);
            return palette;
        } else {
            return await this.create(palette);
        }
    }


    /**
     * Deletes a palette by ID, returns true if deleted, otherwise false.
     * @param {string} paletteId - Unique ID of the palette to delete.
     * @returns {boolean}
     */
    async deleteById(paletteId) {
        return await this.#dao.deleteById(paletteId);
    }


}

module.exports = PaletteRepository;
