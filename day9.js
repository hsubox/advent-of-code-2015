/*
--- Day 9: All in a Single Night ---

Every year, Santa manages to deliver all of his presents in a single night.

This year, however, he has some new locations to visit; his elves have provided him the distances between every pair of locations. He can start and end at any two (different) locations he wants, but he must visit each location exactly once. What is the shortest distance he can travel to achieve this?

For example, given the following distances:

London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141
The possible routes are therefore:

Dublin -> London -> Belfast = 982
London -> Dublin -> Belfast = 605
London -> Belfast -> Dublin = 659
Dublin -> Belfast -> London = 659
Belfast -> Dublin -> London = 605
Belfast -> London -> Dublin = 982
The shortest of these is London -> Dublin -> Belfast = 605, and so the answer is 605 in this example.

What is the distance of the shortest route?

Your puzzle answer was 141.

--- Part Two ---

The next year, just to show off, Santa decides to take the route with the longest distance instead.

He can still start and end at any two (different) locations he wants, and he still must visit each location exactly once.

For example, given the distances above, the longest route would be 982 via (for example) Dublin -> London -> Belfast.

What is the distance of the longest route?

Your puzzle answer was 736.
*/

const input = `AlphaCentauri to Snowdin = 66
AlphaCentauri to Tambi = 28
AlphaCentauri to Faerun = 60
AlphaCentauri to Norrath = 34
AlphaCentauri to Straylight = 34
AlphaCentauri to Tristram = 3
AlphaCentauri to Arbre = 108
Snowdin to Tambi = 22
Snowdin to Faerun = 12
Snowdin to Norrath = 91
Snowdin to Straylight = 121
Snowdin to Tristram = 111
Snowdin to Arbre = 71
Tambi to Faerun = 39
Tambi to Norrath = 113
Tambi to Straylight = 130
Tambi to Tristram = 35
Tambi to Arbre = 40
Faerun to Norrath = 63
Faerun to Straylight = 21
Faerun to Tristram = 57
Faerun to Arbre = 83
Norrath to Straylight = 9
Norrath to Tristram = 50
Norrath to Arbre = 60
Straylight to Tristram = 27
Straylight to Arbre = 81
Tristram to Arbre = 90`;

const assert = require('assert');

function createCityGraph(input) {
  let cityGraph = {};
  input.split('\n').forEach((line) => {
    let [city1, city2, distance] = line.match(/(\w+) to (\w+) = (\d+)/).slice(1, 4);
    distance = Number(distance);
    if (!cityGraph.hasOwnProperty(city1)) {
      cityGraph[city1] = {};
    }
    if (!cityGraph.hasOwnProperty(city2)) {
      cityGraph[city2] = {};
    }
    cityGraph[city1][city2] = distance;
    cityGraph[city2][city1] = distance;
  });
  return cityGraph;
}

function permutator(graph) {
  const items = Object.keys(graph);
  let permutations = [];
  function permute(arr, memo = []) {
    for (let i = 0; i < arr.length; i++) {
      let cur = arr.splice(i, 1);
      if (arr.length == 0) {
        permutations.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }
    return permutations;
  }
  return permute(items);
}

function findRouteDistances(permutations, graph) {
  return permutations.map((permutation) => {
    let distance = 0;
    for (let i = 0; i < permutation.length - 1; i++) {
      distance += graph[permutation[i]][permutation[i + 1]];
    }
    return distance;
  });
}

function findShortestAndLongestRoutes(input) {
  const cityGraph = createCityGraph(input);
  const permutations = permutator(cityGraph);
  const distances = findRouteDistances(permutations, cityGraph);
  const shortest = Math.min(...distances);
  const longest = Math.max(...distances);
  return [shortest, longest];
}

assert.deepEqual(findShortestAndLongestRoutes(`London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`), [605, 982]);
const [shortest, longest] = findShortestAndLongestRoutes(input);
console.log("Shortest:", shortest, "Longest:", longest);
