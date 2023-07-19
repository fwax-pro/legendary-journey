const assert = require('chai').assert;
const selectionSort = require('./index');

const list = [5,3,6,2,10];

describe('Algo: Selection Sort', function () {
  it('we sort the array [5,3,6,2,10] and we should return [2,3,5,6,10]', function () {
    const resultat = selectionSort(list);
    const expect = [2,3,5,6,10];
    assert.strictEqual(JSON.stringify(resultat), JSON.stringify(expect));
  });
});
