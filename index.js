const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

require('dotenv').config();


const PORT_HTTP = process.env.SERVER_HTTP_PORT;
const PORT_HTTPS = process.env.SERVER_HTTPS_PORT;


// require('./src/canvas').makeImage();


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./src/router/paletteRouter').configure(app);

app.listen(PORT_HTTP, () => {
    console.log(`HTTP server running on port ${PORT_HTTP} (https://localhost:${PORT_HTTP})`);
});

const useHttps = process.env.SERVER_HTTPS_ENABLE === 'true';
const certFilesExist = fs.existsSync('./cert/server.key') && fs.existsSync('./cert/server.cert');
if (useHttps && certFilesExist) {
    https.createServer({
        key: fs.readFileSync('./cert/server.key'),
        cert: fs.readFileSync('./cert/server.cert')
    }, app).listen(PORT_HTTPS, () => {
        console.log(`HTTPS server running on port ${PORT_HTTPS} (https://localhost:${PORT_HTTPS})`);
    })
} else if (useHttps) {
    console.warn(`HTTPS server can not be enabled because the certificate and key files didn't exist at './cert/server.cert' and './cert/server.key'.`);
}
