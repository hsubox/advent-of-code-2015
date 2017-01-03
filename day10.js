/*
--- Day 10: Elves Look, Elves Say ---

Today, the Elves are playing a game called look-and-say. They take turns making sequences by reading aloud the previous sequence and using that reading as the next sequence. For example, 211 is read as "one two, two ones", which becomes 1221 (1 2, 2 1s).

Look-and-say sequences are generated iteratively, using the previous value as input for the next step. For each step, take the previous value, and replace each run of digits (like 111) with the number of digits (3) followed by the digit itself (1).

For example:

1 becomes 11 (1 copy of digit 1).
11 becomes 21 (2 copies of digit 1).
21 becomes 1211 (one 2 followed by one 1).
1211 becomes 111221 (one 1, one 2, and two 1s).
111221 becomes 312211 (three 1s, two 2s, and one 1).
Starting with the digits in your puzzle input, apply this process 40 times. What is the length of the result?

Your puzzle answer was 360154.

--- Part Two ---

Neat, right? You might also enjoy hearing John Conway talking about this sequence (that's Conway of Conway's Game of Life fame).

Now, starting again with the digits in your puzzle input, apply this process 50 times. What is the length of the new result?

Your puzzle answer was 5103798.
*/

const assert = require('assert');

const input = '1113122113';

function lookAndSay(sequenceIn) {
  if (sequenceIn.length == 1) {
    return "1" + sequenceIn;
  }
  let subsequenceStart = 0;
  let sequenceOut = "";
  for (let i = 1; i <= sequenceIn.length; i++) {
    if (i == sequenceIn.length || sequenceIn[i] != sequenceIn[i-1]) {
      sequenceOut += i - subsequenceStart;
      sequenceOut += sequenceIn[i - 1];
      subsequenceStart = i;
    }
  }
  return sequenceOut;
}
assert.equal(lookAndSay('1'), '11');
assert.equal(lookAndSay('11'), '21');
assert.equal(lookAndSay('21'), '1211');
assert.equal(lookAndSay('1211'), '111221');
assert.equal(lookAndSay('111221'), '312211');

function repeat(times, func, input) {
  for (let i = 0; i < times; i++) {
    input = func(input);
  }
  return input;
}
assert.equal(repeat(5, lookAndSay, '1'), '312211');
console.log("Repeated 40 times:", repeat(40, lookAndSay, input).length);
console.log("Repeated 50 times:", repeat(50, lookAndSay, input).length);
