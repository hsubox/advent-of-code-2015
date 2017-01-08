/*
--- Day 15: Science for Hungry People ---

Today, you set out on the task of perfecting your milk-dunking cookie recipe. All you have to do is find the right balance of ingredients.

Your recipe leaves room for exactly 100 teaspoons of ingredients. You make a list of the remaining ingredients you could use to finish the recipe (your puzzle input) and their properties per teaspoon:

capacity (how well it helps the cookie absorb milk)
durability (how well it keeps the cookie intact when full of milk)
flavor (how tasty it makes the cookie)
texture (how it improves the feel of the cookie)
calories (how many calories it adds to the cookie)
You can only measure ingredients in whole-teaspoon amounts accurately, and you have to be accurate so you can reproduce your results in the future. The total score of a cookie can be found by adding up each of the properties (negative totals become 0) and then multiplying together everything except calories.

For instance, suppose you have these two ingredients:

Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
Then, choosing to use 44 teaspoons of butterscotch and 56 teaspoons of cinnamon (because the amounts of each ingredient must add up to 100) would result in a cookie with the following properties:

A capacity of 44*-1 + 56*2 = 68
A durability of 44*-2 + 56*3 = 80
A flavor of 44*6 + 56*-2 = 152
A texture of 44*3 + 56*-1 = 76
Multiplying these together (68 * 80 * 152 * 76, ignoring calories for now) results in a total score of 62842880, which happens to be the best score possible given these ingredients. If any properties had produced a negative total, it would have instead become zero, causing the whole score to multiply to zero.

Given the ingredients in your kitchen and their properties, what is the total score of the highest-scoring cookie you can make?

Your puzzle answer was 21367368.

--- Part Two ---

Your cookie recipe becomes wildly popular! Someone asks if you can make another recipe that has exactly 500 calories per cookie (so they can use it as a meal replacement). Keep the rest of your award-winning process the same (100 teaspoons, same ingredients, same scoring system).

For example, given the ingredients above, if you had instead selected 40 teaspoons of butterscotch and 60 teaspoons of cinnamon (which still adds to 100), the total calorie count would be 40*8 + 60*3 = 500. The total score would go down, though: only 57600000, the best you can do in such trying circumstances.

Given the ingredients in your kitchen and their properties, what is the total score of the highest-scoring cookie you can make with a calorie total of 500?

Your puzzle answer was 1766400.
*/

const input = `Sprinkles: capacity 2, durability 0, flavor -2, texture 0, calories 3
Butterscotch: capacity 0, durability 5, flavor -3, texture 0, calories 3
Chocolate: capacity 0, durability 0, flavor 5, texture -1, calories 8
Candy: capacity 0, durability -1, flavor 0, texture 5, calories 8`;
const teaspoons = 100;

const assert = require('assert');

function parseIngredients(input) {
  return input.split('\n').map((row) => {
    const [name, capacity, durability, flavor, texture, calories] = /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/.exec(row).slice(1, 7).map((value) => isNaN(Number(value)) ? value : Number(value));
    return { name, capacity, durability, flavor, texture, calories };
  });
}

function makeMixtures(ingredients) {
  function addToMixture(active, rest, combinations) {
    const sumSoFar = active.reduce(sum, 0);
    if (sumSoFar > teaspoons) {
      return;
    }
    if (rest.length == 1) {
      combinations.push(active.concat(teaspoons - sumSoFar));
    } else {
      for (let i = 0; i <= teaspoons; i++) {
        addToMixture(active.concat(i), rest.slice(1), combinations);
      }
    }
    return combinations;
  }
  return addToMixture([], ingredients, []);
}

function sum(a, b) {
  return a + b;
}

function calculateRecipeScore(ingredients, recipe) {
  const capacity = ingredients.map((ingredient, idx) => {
    return ingredient.capacity * recipe[idx];
  }).reduce(sum);
  const durability = ingredients.map((ingredient, idx) => {
    return ingredient.durability * recipe[idx];
  }).reduce(sum);
  const flavor = ingredients.map((ingredient, idx) => {
    return ingredient.flavor * recipe[idx];
  }).reduce(sum);
  const texture = ingredients.map((ingredient, idx) => {
    return ingredient.texture * recipe[idx];
  }).reduce(sum);
  if (capacity <= 0 || durability <= 0 || flavor <= 0 || texture <= 0) {
    return 0;
  }
  return capacity * durability * flavor * texture;
}

function calculateRecipeCal(ingredients, recipe) {
  return ingredients.map((ingredient, idx) => {
    return ingredient.calories * recipe[idx];
  }).reduce(sum);
}

function createOptimalMixture(input, calories) {
  const ingredients = parseIngredients(input);
  let mixtures = makeMixtures(ingredients);
  if (calories) {
    mixtures = mixtures.filter((mixture => {
      return calculateRecipeCal(ingredients, mixture) == calories;
    }));
  }
  const scores = mixtures.map((mixture) => {
    return calculateRecipeScore(ingredients, mixture);
  });
  const highestScore = scores.reduce((max, score) => Math.max(max, score));
  return highestScore;
}

assert.equal(createOptimalMixture(`Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`), 62842880);
console.log(createOptimalMixture(input));
assert.equal(createOptimalMixture(`Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`, 500), 57600000);
console.log(createOptimalMixture(input, 500));
