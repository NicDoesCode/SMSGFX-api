const { MongoClient, Db, Collection } = require('mongodb');
const PaletteDAO = require('./paletteDAO');


class paletteMongoDAO extends PaletteDAO {


    /** @type {MongoClient} */
    #client;
    /** @type {Db} */
    #database;
    /** @type {Collection<Document>} */
    #palettes;
    #firstConnection = true;


    constructor(connectionString, database) {
        super();
        this.#client = new MongoClient(connectionString);
        this.#database = this.#client.db(database);
        this.#palettes = this.#database.collection('palettes');
    }


    /**
     * Gets a list of palettes.
     * @returns {import('../models/palette').Palette[]}
     */
    async readAll() {
        await this.#checkConnection();
        const cursor = this.#palettes.find();
        const results = await cursor.toArray();
        return results.map((p) => fromDbPalette(p));
    }

    /**
     * Gets a single palette or null if not found.
     * @param {string} paletteId - Unique ID of the palette.
     * @returns {import('../models/palette').Palette?}
     */
    async singleById(paletteId) {
        await this.#checkConnection();
        if (typeof paletteId === 'string' && paletteId !== '') {
            const query = { _id: paletteId };
            const result = await this.#palettes.findOne(query);
            return result ? fromDbPalette(result) : null;
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

        const dbPalette = toDbPalette(palette);
        const result = await this.#palettes.insertOne(dbPalette);

        return await this.singleById(result.insertedId);
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

        const existing = await this.singleById(palette.paletteId);
        if (!existing) {
            throw new Error('Palette doesn\'t exist.');
        }

        const dbPalette = toDbPalette(palette);
        const result = await this.#palettes.replaceOne(dbPalette);

        return result.modifiedCount > 0;
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

        const query = { _id: paletteId };
        const result = await this.#palettes.deleteOne(query);

        return result.deletedCount > 0;
    }


    async #checkConnection() {
        await this.#client.connect();
        if (this.#firstConnection) {
            this.#firstConnection = false;
        }
    };


}

module.exports = paletteMongoDAO;


/**
 * Toggles the '_id' field from Mongo to 'paletteId' and vice versa.
 * @param {import('../models/palette').Palette} dbPalette - Palette to toggle.
 * @returns {import('../models/palette').Palette}
 */
function fromDbPalette(dbPalette) {
    return {
        paletteId: dbPalette._id ?? null,
        system: dbPalette.system ?? null,
        title: dbPalette.title ?? null,
        colours: dbPalette.colours?.slice() ?? [],
    }
}

/**
 * Toggles the '_id' field from Mongo to 'paletteId' and vice versa.
 * @param {import('../models/palette').Palette} palette - Palette to toggle.
 * @returns {import('../models/palette').Palette}
 */
function toDbPalette(palette) {
    return {
        _id: palette.paletteId ?? null,
        system: palette.system ?? null,
        title: palette.title ?? null,
        colours: palette.colours?.slice() ?? [],
    }
}
