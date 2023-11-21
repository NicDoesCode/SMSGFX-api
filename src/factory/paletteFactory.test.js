const PaletteFactory = require('./paletteFactory');
const { createBlankPalette, createFilledPalette } = require('./../test/testPaletteUtility');

test('create palette returns a result with no argument', () => {
    const expected = createBlankPalette();
    const actual = PaletteFactory.create();
    expect(actual).toEqual(expected);
});

test('create palette returns a result with invalid argument', () => {
    const expected = createBlankPalette();
    const actual = PaletteFactory.create('this string is an invalid argument');
    expect(actual).toEqual(expected);
});

test('create palette returns a result with null argument', () => {
    const expected = createBlankPalette();
    const actual = PaletteFactory.create(null);
    expect(actual).toEqual(expected);
});

test('create palette returns a result with undefined argument', () => {
    const expected = createBlankPalette();
    const actual = PaletteFactory.create(undefined);
    expect(actual).toEqual(expected);
});

test('create palette returns expected result with fully fleshed out initial values', () => {
    const expected = createFilledPalette();
    const actual = PaletteFactory.create(createFilledPalette());
    expect(actual).toEqual(expected);
});

test('create palette returns result which is not same instance of object as initial values object', () => {
    const initialValues = createFilledPalette();
    const createdPalette = PaletteFactory.create(createFilledPalette());
    expect(createdPalette).not.toBe(initialValues);
});

test(`clone palette to return something`, () => {
    expect.assertions(4);
    const initialValues = createFilledPalette();
    const clonedPalette = PaletteFactory.clone(initialValues);
    expect(clonedPalette).toBeInstanceOf(Object);
    expect(clonedPalette).not.toBeNull();
    expect(clonedPalette).not.toBeUndefined();
    expect(clonedPalette).not.toBeNaN();
});


test(`clone palette to throw when no value passed`, () => {
    expect(() => PaletteFactory.clone()).toThrow();
});

test(`clone palette to throw when bad value passed`, () => {
    const badValues = [null, 'a string', 42, undefined, false];

    expect.assertions(badValues.length);

    for (const badValue of badValues) {
        expect(() => PaletteFactory.clone(badValue)).toThrow();
    }
});

test(`clone palette to return deeply cloned palette`, () => {
    const initialValues = createFilledPalette();
    const clonedPalette = PaletteFactory.clone(initialValues);

    let assertionCount = 4 + (initialValues.colours.length * 4);
    expect.assertions(assertionCount);

    expect(clonedPalette.paletteId).toEqual(initialValues.paletteId);
    expect(clonedPalette.system).toEqual(initialValues.system);
    expect(clonedPalette.title).toEqual(initialValues.title);
    expect(clonedPalette.colours).not.toBe(initialValues.colours);

    for (let i = 0; i < clonedPalette.colours.length; i++) {
        const initialColour = initialValues.colours[i];
        const cloneColour = clonedPalette.colours[i];
        expect(cloneColour).not.toBe(initialColour);
        expect(cloneColour.r).toEqual(initialColour.r);
        expect(cloneColour.g).toEqual(initialColour.g);
        expect(cloneColour.b).toEqual(initialColour.b);
    }
});
