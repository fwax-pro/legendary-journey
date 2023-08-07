const assert = require('chai').assert;
const { numberPositiveCloserToZero } = require('./index');

describe('CodinGame: Temperatures', function () {
    it('simple data', function () {
        const arr = [ '1', '-2', '-8', '4', '5' ];
        const expect = '1';
        const result = numberPositiveCloserToZero(arr);
        assert.strictEqual(result, expect);
    });

    it('simple data', function () {
        const arr = [ '1', '-2', '-8', '4', '5' ];
        const expect = '1';
        const result = numberPositiveCloserToZero(arr);
        assert.strictEqual(result, expect);
    });
});