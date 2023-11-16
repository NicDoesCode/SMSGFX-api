const express = require('express');

const PaletteRepo = require('./../respository/paletteRepo');
// const PaletteDAO = require('./../dataAccess/paletteLocalDAO');
const PaletteDAO = require('./../dataAccess/paletteMongoDAO');
const MongoHelper = require('./../helpers/mongoHelper');


/**
 * @param {express} app - Express application.
 */
const configure = (app) => {


    const connectionString = MongoHelper.getConnectionString();
    const database = process.env.MONGO_DATABASE;
    const repo = new PaletteRepo(new PaletteDAO(connectionString, database));


    // List palettes 
    app.get('/palettes', async (request, response) => {
        response.contentType = 'application/json';
        const result = await repo.readAll();
        response.send(result);
    });

    // Get palette by ID
    app.get('/palettes/:paletteId', async (request, response) => {
        const paletteId = request.params.paletteId;
        if (!paletteId || typeof paletteId !== 'string') {
            response.status(400).send('Bad request: malformed palette ID.');
            return;
        }

        const result = await repo.singleById(paletteId);
        if (result) {
            response.send(result);
        } else {
            response.status(404).send('Not found: no palette with the given ID exists.');
        }
    });

    // Save a palette
    app.post('/palettes', async (request, response) => {
        /** @type {import('./src/paletteDataAccess').Palette} */
        const palette = request.body;
        if (palette.paletteId && typeof palette.paletteId !== 'string') {
            response.status(400).send('Bad request: malformed palette ID.');
            return;
        }
        if (await repo.existsById(palette.paletteId)) {
            response.status(400).send('Bad request: palette with this ID already exists.');
            return;
        }

        const saved = await repo.createOrReplace(palette);
        response.status(201).send(saved);
    });

    // Put a palette by ID
    app.put('/palettes/:paletteId', async (request, response) => {
        const paletteId = request.params.paletteId;
        if (!paletteId || typeof paletteId !== 'string') {
            response.status(400).send('Bad request: malformed palette ID.');
            return;
        }

        /** @type {import('./src/paletteDataAccess').Palette} */
        const palette = request.body;
        if (palette.paletteId !== undefined && palette.paletteId !== null && palette.paletteId !== paletteId) {
            response.status(400).send('Bad request: palette ID id body doesn\'t match URL.');
            return;
        }

        palette.paletteId = paletteId;

        const existing = await repo.singleById(paletteId);
        const saved = await repo.createOrReplace(palette);

        response.status(existing ? 200 : 201).send(saved);
    });

    // Delete a palette by ID
    app.delete('/palettes/:paletteId', async (request, response) => {
        const paletteId = request.params.paletteId;
        if (!paletteId || typeof paletteId !== 'string') {
            response.status(400).send('Bad request: malformed palette ID.');
            return;
        }

        const wasDeleted = await repo.deleteById(paletteId);
        if (wasDeleted) {
            response.status(204).send();
        } else {
            response.status(404).send('Bad request: no palette with the given ID exists.');
        }
    });


};

module.exports = { configure };
