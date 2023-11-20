const PaletteDAO = require('./../dataAccess/paletteDAO');

/**
 * Gets the data access object as configured by the project environment.
 * @returns {PaletteDAO}
 */
const getDataAccessObject = () => {
    const DAO_TYPE = process.env.DAO_TYPE;
    switch (DAO_TYPE) {
        case 'mongo':
            const MongoHelper = require('./mongoHelper');
            const connectionString = MongoHelper.getConnectionString();
            const database = process.env.MONGO_DATABASE;
            const PaletteMongoDAO = require('./../dataAccess/paletteMongoDAO');
            return new PaletteMongoDAO(connectionString, database);
        case 'firestore':
            const firestoreProjectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
            const firestoreKeyFilename = path.resolve(process.env.GOOGLE_CLOUD_KEY_FILENAME);
            const PaletteFirestoreDAO = require('./../dataAccess/paletteFirestoreDAO');
            return new PaletteFirestoreDAO(firestoreProjectId, firestoreKeyFilename);
        default:
            const PaletteLocalDAO = require('./../dataAccess/paletteLocalDAO');
            return new PaletteLocalDAO();
    }
}

module.exports = {
    getDataAccessObject
}