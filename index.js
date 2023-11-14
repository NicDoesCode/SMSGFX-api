const express = require('express');
const bodyParser = require('body-parser');

const PORT_HTTP = 8080;
const PORT_HTTPS = 8443;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/palette', (request, response) => {
    response.contentType = 'application/json';
    response.send([{
        title: 'Palette',
        colours: [
            { r: 255, g: 255, b: 255 },
            { r: 255, g: 0, b: 0 },
            { r: 0, g: 255, b: 0 },
            { r: 0, g: 0, b: 255 },
            { r: 0, g: 0, b: 0 }
        ]
    }]);
});

// app.post('/palette', (request, response) => {
//     request.body.
// });

app.listen(PORT_HTTP, () => {
    console.log(`Server running on port ${PORT_HTTP}`);
});
