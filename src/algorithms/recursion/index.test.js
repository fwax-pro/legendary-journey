const assert = require('chai').assert;
const { countdown, factorial } = require('./index');

describe('Algo: Recursion', function () {
    it('we log an countdown from 3 to 0', function () {
        const expect = '3 2 1 0';
        const result = countdown(3);
        assert.strictEqual(result, expect);
    });

    it('we factorial 3, we expect 6', function () {
        const expect = 3 * 2 * 1;
        const result = factorial(3);
        assert.strictEqual(result, expect);
    });
});