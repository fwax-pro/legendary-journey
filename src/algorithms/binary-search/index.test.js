const assert = require('chai').assert;
const binarySearch = require('./index');

const list = [1,3,5,7,9];

describe('Algo: Binary Search', function () {
  it('we search 3 and we should return index 1', function () {
    const resultat = binarySearch(list, 3);
    assert.strictEqual(resultat, 1);
  });
  it('we search -1 and we should return null', function () {
    const resultat = binarySearch(list, -1);
    assert.strictEqual(resultat, null);
  });
});
