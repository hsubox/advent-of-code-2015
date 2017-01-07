/*
--- Day 14: Reindeer Olympics ---

This year is the Reindeer Olympics! Reindeer can fly at high speeds, but must rest occasionally to recover their energy. Santa would like to know which of his reindeer is fastest, and so he has them race.

Reindeer can only either be flying (always at their top speed) or resting (not moving at all), and always spend whole seconds in either state.

For example, suppose you have the following Reindeer:

Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.
After one second, Comet has gone 14 km, while Dancer has gone 16 km. After ten seconds, Comet has gone 140 km, while Dancer has gone 160 km. On the eleventh second, Comet begins resting (staying at 140 km), and Dancer continues on for a total distance of 176 km. On the 12th second, both reindeer are resting. They continue to rest until the 138th second, when Comet flies for another ten seconds. On the 174th second, Dancer flies for another 11 seconds.

In this example, after the 1000th second, both reindeer are resting, and Comet is in the lead at 1120 km (poor Dancer has only gotten 1056 km by that point). So, in this situation, Comet would win (if the race ended at 1000 seconds).

Given the descriptions of each reindeer (in your puzzle input), after exactly 2503 seconds, what distance has the winning reindeer traveled?

Your puzzle answer was 2660.

--- Part Two ---

Seeing how reindeer move in bursts, Santa decides he's not pleased with the old scoring system.

Instead, at the end of each second, he awards one point to the reindeer currently in the lead. (If there are multiple reindeer tied for the lead, they each get one point.) He keeps the traditional 2503 second time limit, of course, as doing otherwise would be entirely ridiculous.

Given the example reindeer from above, after the first second, Dancer is in the lead and gets one point. He stays in the lead until several seconds into Comet's second burst: after the 140th second, Comet pulls into the lead and gets his first point. Of course, since Dancer had been in the lead for the 139 seconds before that, he has accumulated 139 points by the 140th second.

After the 1000th second, Dancer has accumulated 689 points, while poor Comet, our old champion, only has 312. So, with the new scoring system, Dancer would win (if the race ended at 1000 seconds).

Again given the descriptions of each reindeer (in your puzzle input), after exactly 2503 seconds, how many points does the winning reindeer have?

Your puzzle answer was 1256.
*/

const input = `Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds.
Rudolph can fly 3 km/s for 15 seconds, but then must rest for 28 seconds.
Donner can fly 19 km/s for 9 seconds, but then must rest for 164 seconds.
Blitzen can fly 19 km/s for 9 seconds, but then must rest for 158 seconds.
Comet can fly 13 km/s for 7 seconds, but then must rest for 82 seconds.
Cupid can fly 25 km/s for 6 seconds, but then must rest for 145 seconds.
Dasher can fly 14 km/s for 3 seconds, but then must rest for 38 seconds.
Dancer can fly 3 km/s for 16 seconds, but then must rest for 37 seconds.
Prancer can fly 25 km/s for 6 seconds, but then must rest for 143 seconds.`;
const time = 2503;

const assert = require('assert');

function getReindeers(input) {
  return input.split('\n').map((row) => {
    let [name, speed, run, rest] = (/(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./).exec(row).slice(1, 5);
    speed = Number(speed);
    run = Number(run);
    rest = Number(rest);
    return { name, speed, run, rest };
  });
}

function getReindeerDistancesAtTime(reindeers, time) {
  return reindeers.map((reindeer) => {
    const interval = reindeer.run + reindeer.rest;
    let distance = Math.floor(time / interval) * (reindeer.speed * reindeer.run);
    const remainder = time % interval;
    if (remainder <= reindeer.run) {
      distance += reindeer.speed * remainder;
    } else {
      distance += reindeer.speed * reindeer.run;
    }
    return { name: reindeer.name, distance };
  }).sort((a, b) => {
    return b.distance - a.distance;
  });
}

function getRacePoints(reindeers, time) {
  let winners = {};
  reindeers.forEach((reindeer) => {
    winners[reindeer.name] = 0;
  });
  for (let i = 1; i < time + 1; i++) {
    const raceResults = getReindeerDistancesAtTime(reindeers, i);
    highestDistance = raceResults[0].distance;
    raceResults.filter((reindeer) => reindeer.distance == highestDistance).forEach((reindeer) => {
      winners[reindeer.name] += 1;
    });
  }
  return Object.keys(winners).map((winner) => {
    return { name: winner, points: winners[winner] };
  }).sort((a, b) => {
    return b.points - a.points;
  }).map((reindeer) => {
    return reindeer.points;
  });
}

const sampleReindeers = getReindeers(`Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`);
assert.deepEqual(getReindeerDistancesAtTime(sampleReindeers, 1000)[0].distance, 1120);
assert.deepEqual(getRacePoints(sampleReindeers, 140), [139, 1]);
assert.deepEqual(getRacePoints(sampleReindeers, 1000), [689, 312]);

const reindeers = getReindeers(input);
const distanceWinner = getReindeerDistancesAtTime(reindeers, time)[0].distance;
console.log(distanceWinner);
const pointsWinner = getRacePoints(reindeers, time)[0];
console.log(pointsWinner);
