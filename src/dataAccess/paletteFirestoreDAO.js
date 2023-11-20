const { Firestore, DocumentSnapshot } = require('@google-cloud/firestore');
const firestore = new Firestore();


/**
 * Google Firestore palette data access object.
 */
class PaletteFirestoreDAO {


    /**
     * Initialises a new instance of the class.
     * @param {string} projectId - Name of the GCloud project associated with the application.
     * @param {string} keyFilename - Path to the key file for the services account that will access the data storage.
     */
    constructor(projectId, keyFilename) {
        firestore.settings({
            projectId: projectId,
            keyFilename: keyFilename
        });
        console.debug('Google Firestore palette data access object initalised.');
    }


    /**
     * Gets a list of palettes.
     * @returns {import('../models/palette').Palette[]}
     */
    async readAll() {
        const query = firestore.collection('palettes');
        const querySnapshot = await query.get();
        return querySnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
    }

    /**
     * Gets a single palette or null if not found.
     * @param {string} paletteId - Unique ID of the palette.
     * @returns {import('../models/palette').Palette?}
     */
    async singleById(paletteId) {
        const document = firestore.doc(`palettes/${paletteId}`);
        const documentSnapshot = await document.get();
        return documentSnapshot?.data() ?? null;
    }

    /**
     * Creates a palette record, returns inserted record, throws if a palette with the same ID already exists.
     * @param {import('../models/palette').Palette} palette - Palette object to put.
     * @throws Palette with same Palette ID already exists.
     * @returns {import('../models/palette').Palette}
     */
    async create(palette) {
        const existing = await this.singleById(palette.paletteId);
        if (existing) throw new Error('A palette with the given ID already exists.');

        const document = firestore.doc(`palettes/${palette.paletteId}`);
        const writeResult = await document.set(palette);
        if (writeResult.writeTime !== null) {
            const result = await document.get();
            return result.data();
        } else {
            throw new Error('A palette with the given ID already exists.');
        }
    }

    /**
     * Replaces a palette record same palette ID, returns boolean indicating success, throws if the palette doesn't exist.
     * @param {import('../models/palette').Palette} palette - Palette object to put.
     * @throws Palette with same Palette ID doesn't exist.
     * @returns {boolean}
     */
    async replace(palette) {
        const existing = await this.singleById(palette.paletteId);
        if (!existing) throw new Error('No palette with the given ID exists.');

        const document = firestore.doc(`palettes/${palette.paletteId}`);
        const writeResult = await document.update(palette);
        return writeResult.writeTime !== null;
    }

    /**
     * Deletes a palette by ID, returns true if deleted, otherwise false.
     * @param {string} paletteId - Unique ID of the palette to delete.
     * @returns {boolean}
     */
    async deleteById(paletteId) {
        const existing = await this.singleById(paletteId);
        if (!existing) throw new Error('No palette with the given ID exists.');

        const document = firestore.doc(`palettes/${paletteId}`);
        const writeResult = await document.delete();
        return writeResult.writeTime !== null;
    }


}

module.exports = PaletteFirestoreDAO;