class PaletteDAO {


    /**
     * Gets a list of palettes.
     * @returns {import('../models/palette').Palette[]}
     */
    async readAll() {
        throw new Error('Not implemented.');
    }

    /**
     * Gets a single palette or null if not found.
     * @param {string} paletteId - Unique ID of the palette.
     * @returns {import('../models/palette').Palette?}
     */
    async singleById(paletteId) {
        throw new Error('Not implemented.');
    }

    /**
     * Creates a palette record, returns inserted record, throws if a palette with the same ID already exists.
     * @param {import('../models/palette').Palette} palette - Palette object to put.
     * @throws Palette with same Palette ID already exists.
     * @returns {import('../models/palette').Palette}
     */
    async create(palette) {
        throw new Error('Not implemented.');
    }

    /**
     * Replaces a palette record same palette ID, returns boolean indicating success, throws if the palette doesn't exist.
     * @param {import('../models/palette').Palette} palette - Palette object to put.
     * @throws Palette with same Palette ID doesn't exist.
     * @returns {boolean}
     */
    async replace(palette) {
        throw new Error('Not implemented.');
    }

    /**
     * Deletes a palette by ID, returns true if deleted, otherwise false.
     * @param {string} paletteId - Unique ID of the palette to delete.
     * @returns {boolean}
     */
    async deleteById(paletteId) {
        throw new Error('Not implemented.');
    }


}

module.exports = PaletteDAO;