const truncate = require('../../util/truncate');

describe('UserController Suit Tests', () => {

    beforeEach( async () => {

        await truncate();
    });

    it('shoud user', () => {

        expect(1).toBe(1);
    });
});