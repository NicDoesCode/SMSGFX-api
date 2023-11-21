const { createRandomisedFilledPalette } = require('./../test/testPaletteUtility');
const PaletteRepository = require('./paletteRepo');
const PaletteDAO = require('./../dataAccess/paletteDAO');


const PALETTE_ID_THAT_DOES_EXIST = 'DOES_EXIST';
const PALETTE_ID_THAT_DOESNT_EXIST = 'DOES_NOT_EXIST';

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


// Mock setup

jest.mock('./../dataAccess/paletteDAO');

const daoReadAllMock = jest.spyOn(PaletteDAO.prototype, 'readAll')
    .mockImplementation(async () => MOCK_PALETTE_LIST);

const singleByIdMock = jest.spyOn(PaletteDAO.prototype, 'singleById')
    .mockImplementation(async (paletteId) => {
        if (paletteId === PALETTE_ID_THAT_DOES_EXIST) {
            return createRandomisedFilledPalette();
        } else {
            return null;
        }
    });


// Test lifecycle 

beforeEach(() => {
    PaletteDAO.mockClear();
    daoReadAllMock.mockClear();
    singleByIdMock.mockClear();
});


// Constructor

test(`palette repository constructor throws with blank, null or undefined argument`, () => {
    expect.assertions(3);

    expect(() => new PaletteRepository()).toThrow();
    expect(() => new PaletteRepository(undefined)).toThrow();
    expect(() => new PaletteRepository(null)).toThrow();
});

test(`palette repository constructor throws with non DAO argument`, () => {
    const badValues = [null, undefined, 'a string', 12345, true, new Date()];

    expect.assertions(badValues.length);

    for (const badValue of badValues) {
        expect(() => new PaletteRepository(badValue)).toThrow();
    }
});

test(`palette repository constructor doesn't throw with DAO argument`, () => {
    expect.assertions(1);

    const dao = new PaletteDAO();
    expect(() => new PaletteRepository(dao)).not.toThrow();
});


// Exists by ID 

test(`palette repository, exists by id, expect that DAO single by ID to be called`, async () => {
    expect.assertions(1);

    const dao = new PaletteDAO();
    const repo = new PaletteRepository(dao);

    const result = await repo.existsById(PALETTE_ID_THAT_DOES_EXIST);

    expect(singleByIdMock).toHaveBeenCalledTimes(1);
});

test(`palette repository, exists by id, expect that DAO single by ID to be passed the correct argument`, async () => {
    const args = [PALETTE_ID_THAT_DOES_EXIST, PALETTE_ID_THAT_DOESNT_EXIST];

    expect.assertions(args.length);

    const dao = new PaletteDAO();
    const repo = new PaletteRepository(dao);

    for (const arg of args) {
        singleByIdMock.mockReset();
        const result = await repo.existsById(arg);
        let passedArgument = singleByIdMock.calls[0][0];

        expect(passedArgument).toEqual(arg);
    }
});

test(`palette repository, exists by id, expect true when palette ID exists`, async () => {
    expect.assertions(1);

    const dao = new PaletteDAO();
    const repo = new PaletteRepository(dao);

    const result = await repo.existsById(PALETTE_ID_THAT_DOES_EXIST);

    expect(result).toEqual(true);
});

test(`palette repository, exists by id, expect false when palette ID doesn't exist`, async () => {
    expect.assertions(1);

    const dao = new PaletteDAO();
    const repo = new PaletteRepository(dao);

    const result = await repo.existsById(PALETTE_ID_THAT_DOESNT_EXIST);

    expect(result).toEqual(false);
});

test(`palette repository, exists by id, expect false when passing no palette ID`, async () => {
    expect.assertions(1);

    const dao = new PaletteDAO();
    const repo = new PaletteRepository(dao);

    const result = await repo.existsById();

    expect(result).toEqual(false);
});

test(`palette repository, exists by id, expect false when passing bad palette ID`, async () => {
    const badPaletteIds = [undefined, null, 12345, new Date()]

    expect.assertions(badPaletteIds);

    const dao = new PaletteDAO();
    const repo = new PaletteRepository(dao);

    for (const badPaletteId of badPaletteIds) {
        const result = await repo.existsById(badPaletteId);
        expect(result).toEqual(false);
    }
});


// Read all 

test(`palette repository, read all, calls the DAO read all function?`, async () => {
    expect.assertions(1);

    const dao = new PaletteDAO();
    const repo = new PaletteRepository(dao);

    await repo.readAll();

    expect(daoReadAllMock).toHaveBeenCalled();
});

test(`palette repository, read all, received expected result`, async () => {
    expect.assertions(1);

    const dao = new PaletteDAO();
    const repo = new PaletteRepository(dao);

    const result = await repo.readAll();

    expect(result.length).toEqual(MOCK_PALETTE_LIST.length);
});