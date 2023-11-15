const express = require('express');
const bodyParser = require('body-parser');


const PORT_HTTP = 8080;
const PORT_HTTPS = 8443;


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./src/router/paletteRouter').configure(app);

app.listen(PORT_HTTP, () => {
    console.log(`Server running on port ${PORT_HTTP}`);
});
