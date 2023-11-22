const { ID_THAT_DOES_EXIST, ID_THAT_DOES_NOT_EXIST, MOCK_PALETTE_LIST } = require('../../../test/consts')

const mockReadAll = jest.fn(async () => {
    return MOCK_PALETTE_LIST;
});

const mockSingleById = jest.fn(async (paletteId) => {
    if (paletteId === ID_THAT_DOES_EXIST) {
        return createRandomisedFilledPalette();
    } else {
        return null;
    }
});

const mock = jest.fn().mockImplementation(() => {
    return {
        readAll: mockReadAll,
        singleById: mockSingleById
    }
})

module.exports = {
    default: mock,
    mockReadAll,
    mockSingleById,
    ID_THAT_DOES_EXIST, 
    ID_THAT_DOES_NOT_EXIST, 
    MOCK_PALETTE_LIST
};