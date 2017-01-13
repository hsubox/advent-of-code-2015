/*
--- Day 20: Infinite Elves and Infinite Houses ---

To keep the Elves busy, Santa has them deliver some presents by hand, door-to-door. He sends them down a street with infinite houses numbered sequentially: 1, 2, 3, 4, 5, and so on.

Each Elf is assigned a number, too, and delivers presents to houses based on that number:

The first Elf (number 1) delivers presents to every house: 1, 2, 3, 4, 5, ....
The second Elf (number 2) delivers presents to every second house: 2, 4, 6, 8, 10, ....
Elf number 3 delivers presents to every third house: 3, 6, 9, 12, 15, ....
There are infinitely many Elves, numbered starting with 1. Each Elf delivers presents equal to ten times his or her number at each house.

So, the first nine houses on the street end up like this:

House 1 got 10 presents.
House 2 got 30 presents.
House 3 got 40 presents.
House 4 got 70 presents.
House 5 got 60 presents.
House 6 got 120 presents.
House 7 got 80 presents.
House 8 got 150 presents.
House 9 got 130 presents.
The first house gets 10 presents: it is visited only by Elf 1, which delivers 1 * 10 = 10 presents. The fourth house gets 70 presents, because it is visited by Elves 1, 2, and 4, for a total of 10 + 20 + 40 = 70 presents.

What is the lowest house number of the house to get at least as many presents as the number in your puzzle input?

Your puzzle answer was 831600.

--- Part Two ---

The Elves decide they don't want to visit an infinite number of houses. Instead, each Elf will stop after delivering presents to 50 houses. To make up for it, they decide to deliver presents equal to eleven times their number at each house.

With these changes, what is the new lowest house number of the house to get at least as many presents as the number in your puzzle input?

Your puzzle answer was 884520.
*/

const input = 36000000;

const assert = require('assert');

function presentsReceivedInfinite(houseNumber) {
  let presents = 0;
  for (let i = 1; i <= houseNumber; i++) {
    if (houseNumber % i == 0) {
      presents += i;
    }
  }
  presents *= 10;
  return presents;
}
assert.equal(presentsReceivedInfinite(1), 10);
assert.equal(presentsReceivedInfinite(2), 30);
assert.equal(presentsReceivedInfinite(3), 40);
assert.equal(presentsReceivedInfinite(4), 70);
assert.equal(presentsReceivedInfinite(5), 60);
assert.equal(presentsReceivedInfinite(6), 120);
assert.equal(presentsReceivedInfinite(7), 80);
assert.equal(presentsReceivedInfinite(8), 150);
assert.equal(presentsReceivedInfinite(9), 130);

let houseNumber = 831600;
while (presentsReceivedInfinite(houseNumber) < input) {
  houseNumber += 1;
}
console.log(houseNumber, presentsReceivedInfinite(houseNumber));

function presentsReceivedFinite(houseNumber) {
  let presents = 0;
  for (let i = Math.floor(houseNumber / 50) ; i <= houseNumber; i++) {
    if (houseNumber % i == 0 && houseNumber / i <= 50) {
      presents += i;
    }
  }
  presents *= 11;
  return presents;
}

houseNumber = 884520;
while (presentsReceivedFinite(houseNumber) < input) {
  houseNumber += 1;
}
console.log(houseNumber, presentsReceivedFinite(houseNumber));
