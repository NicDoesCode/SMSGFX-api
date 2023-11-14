const express = require('express');
const bodyParser = require('body-parser');

const paletteFactory = require('./src/paletteFactory');


const PORT_HTTP = 8080;
const PORT_HTTPS = 8443;


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// List palettes 
app.get('/palettes', (request, response) => {
    response.contentType = 'application/json';
    const result = paletteFactory.list();
    response.send(result);
});

// Get palette by ID
app.get('/palettes/:paletteId', (request, response) => {
    const paletteId = parseInt(request.params.paletteId);

    if (isNaN(paletteId)) {
        response.status(400).send('Bad request: malformed palette ID.');
        return;
    }

    const result = paletteFactory.get(paletteId);
    if (result) {
        response.send(result);
    } else {
        response.status(404).send('Not found: no palette with the given ID exists.');
    }
});

// Save a palette
app.post('/palettes', (request, response) => {
    /** @type {import('./src/paletteFactory').Palette} */
    const palette = request.body;
    if (isNaN(Number(palette.paletteId))) {
        response.status(400).send('Bad request: malformed palette ID.');
        return;
    }
    if (paletteFactory.exists(palette.paletteId)) {
        response.status(400).send('Bad request: palette with this ID already exists.');
        return;
    }

    const saved = paletteFactory.put(palette);
    response.status(201).send(saved);
});

// Put a palette by ID
app.put('/palettes/:paletteId', (request, response) => {
    const paletteId = Number(request.params.paletteId);
    if (isNaN(paletteId)) {
        response.status(400).send('Bad request: malformed palette ID.');
        return;
    }

    /** @type {import('./src/paletteFactory').Palette} */
    const palette = request.body;
    if (palette.paletteId !== undefined && palette.paletteId !== null && palette.paletteId !== paletteId) {
        response.status(400).send('Bad request: palette ID id body doesn\'t match URL.');
        return;
    }

    palette.paletteId = paletteId;
  
    const alreadyExists = paletteFactory.exists(paletteId);
    const saved = paletteFactory.put(palette);
  
    response.status(alreadyExists ? 200 : 201).send(saved);
});

// Delete a palette by ID
app.delete('/palettes/:paletteId', (request, response) => {
    const paletteId = Number(request.params.paletteId);
    if (isNaN(paletteId)) {
        response.status(400).send('Bad request: malformed palette ID.');
        return;
    }

    const wasDeleted = paletteFactory.deleteById(paletteId);
    if (wasDeleted) {
        response.status(204).send();
    } else {
        response.status(404).send('Bad request: no palette with the given ID exists.');
    }
});


app.listen(PORT_HTTP, () => {
    console.log(`Server running on port ${PORT_HTTP}`);
});
