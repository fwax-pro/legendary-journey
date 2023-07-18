const assert = require('chai').assert;
const helloWorld = require('.');

describe('Hello World', function () {
  it('should return "Hello, World!"', function () {
    const resultat = helloWorld();
    assert.strictEqual(resultat, 'Hello, World!');
  });
});
