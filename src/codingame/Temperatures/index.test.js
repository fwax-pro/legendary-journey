const assert = require('chai').assert;
const { numberPositiveCloserToZero } = require('./index');

describe('CodinGame: Temperatures', function () {
    it('simple data', function () {
        const arr = [ '1', '-2', '-8', '4', '5' ];
        const expect = '1';
        const result = numberPositiveCloserToZero(arr);
        assert.strictEqual(result, expect);
    });

    it('negative temperatures', function () {
        const arr = [  '-12', '-5', '-137' ];
        const expect = '-5';
        const result = numberPositiveCloserToZero(arr);
        assert.strictEqual(result, expect);
    });

    it('no temperatures', function () {
        const arr = [''];
        const expect = 0;
        const result = numberPositiveCloserToZero(arr);
        assert.strictEqual(result, expect);
    });
});