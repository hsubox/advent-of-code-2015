const input = `43
3
4
10
21
44
4
6
47
41
34
17
17
44
36
31
46
9
27
38`;
const liters = 150;

const assert = require('assert');

function combinator(arr) {
  function combine(active, rest, combinations) {
    if (rest.length == 0) {
      combinations.push(active);
    } else {
      combine(active.concat(rest[0]), rest.slice(1), combinations);
      combine(active, rest.slice(1), combinations);
    }
    return combinations;
  }
  return combine([], arr, []);
}

function countCombinations(containers, volume) {
  const combinations = combinator(containers);
  const validCombinations = combinations.filter((combination) => {
    return combination.reduce((a, b) => a + b, 0) == volume;
  });
  const minContainers = Math.min(...validCombinations.map((combination) => combination.length));
  const minContainersValidCombinations = validCombinations.filter((combination) => {
    return combination.length == minContainers;
  });
  return [validCombinations.length, minContainersValidCombinations.length];
}

assert.deepEqual(countCombinations([20, 15, 10, 5, 5], 25), [4, 3]);
const containers = input.split('\n').map(Number);
const combinations = combinator(containers);
console.log(countCombinations(containers, liters));
