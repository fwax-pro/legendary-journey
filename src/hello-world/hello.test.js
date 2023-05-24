const assert = require('chai').assert;
const helloWorld = require('./hello');

describe('Hello World', function () {
  it('devrait retourner la chaîne "Hello, World!"', function () {
    const resultat = helloWorld();
    assert.strictEqual(resultat, 'Hello, World!');
  });
});
