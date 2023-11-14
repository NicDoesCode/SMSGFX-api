const index = require('./index');

test('sum adds correctly', () => {
    expect(index.sum(4, 12)).toBe(16);
});