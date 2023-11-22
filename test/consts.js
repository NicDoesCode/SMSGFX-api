const { createRandomisedFilledPalette } = require('./helpers/paletteTestHelper');

const ID_THAT_DOES_EXIST = 'DOES_EXIST';
const ID_THAT_DOES_NOT_EXIST = 'DOES_NOT_EXIST';

const MOCK_PALETTE_LIST = [
    createRandomisedFilledPalette(),
    createRandomisedFilledPalette(),
    createRandomisedFilledPalette(),
    createRandomisedFilledPalette(),
    createRandomisedFilledPalette(),
    createRandomisedFilledPalette(),
    createRandomisedFilledPalette(),
    createRandomisedFilledPalette(),
    createRandomisedFilledPalette(),
    createRandomisedFilledPalette()
];

module.exports = {
    ID_THAT_DOES_EXIST, 
    ID_THAT_DOES_NOT_EXIST, 
    MOCK_PALETTE_LIST
};