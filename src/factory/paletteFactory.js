class PaletteFactory {


    /**
     * Creates a new palette.
     * @param {import("../models/palette").Palette} initialValues - Initial values to populate.
     * @returns {import("../models/palette").Palette}
     */
    static create(initialValues) {
        return {
            paletteId: initialValues?.paletteId ?? null, 
            system: initialValues?.system ?? null,
            title: initialValues?.title ?? null,
            colours: initialValues?.colours ?? []
        }
    }

    /**
     * Deep clones a palette object.
     * @param {import("../models/palette").Palette} paletteToClone - Initial values to populate.
     * @throws When the palette to clone is not supplied or is invalid.
     * @returns {import("../models/palette").Palette}
     */
    static clone(paletteToClone) {
        if (paletteToClone === undefined || paletteToClone === null || !paletteToClone instanceof Object) {
            throw new Error('Invalid palette to clone.');
        }
        return {
            paletteId: paletteToClone?.paletteId ?? null, 
            system: paletteToClone?.system ?? null,
            title: paletteToClone?.title ?? null,
            colours: paletteToClone?.colours.map((c) => { return { r: c.r, g: c.g, b: c.b }}) ?? []
        }
    }


}

module.exports = PaletteFactory;