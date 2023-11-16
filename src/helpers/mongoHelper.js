const MONGO_SERVER_ADDRESS = process.env.MONGO_SERVER_ADDRESS || 'localhost';
const MONGO_SERVER_PORT = process.env.MONGO_SERVER_PORT || 27017;
const MONGO_SERVER_USERNAME = process.env.MONGO_SERVER_USERNAME || null;
const MONGO_SERVER_PASSWORD = process.env.MONGO_SERVER_PASSWORD || null;


class MongoHelper {

    static getConnectionString() {
        return `mongodb://${usernamePasswordPart()}${MONGO_SERVER_ADDRESS}:${MONGO_SERVER_PORT}/`;
    }

    // static ensureDataaa

}


const usernamePasswordPart = () => {
    if (MONGO_SERVER_USERNAME && MONGO_SERVER_PASSWORD) {
        return `${mongoEscape(MONGO_SERVER_USERNAME)}:${mongoEscape(MONGO_SERVER_PASSWORD)}@`;
    } else if (MONGO_SERVER_USERNAME) {
        return `${mongoEscape(MONGO_SERVER_USERNAME)}@`;
    }
    return '';
}

/**
 * Escapes a valuye for use in a MongoDB connection string.
 * @param {string?} value - Value to escape.
 * @returns {string?}
 */
const mongoEscape = (value) => {
    if (!value) return null;

    const charsToEscape = ['$', ':', '/', '?', '#', '[', ']', '@', ' '];
    let result = value;
    charsToEscape.forEach((char) => { result = result.replace(char, encodeURIComponent(char)) });
    return result;
}


module.exports = MongoHelper;