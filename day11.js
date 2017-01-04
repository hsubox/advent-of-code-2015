/*
--- Day 11: Corporate Policy ---

Santa's previous password expired, and he needs help choosing a new one.

To help him remember his new password after the old one expires, Santa has devised a method of coming up with a password based on the previous one. Corporate policy dictates that passwords must be exactly eight lowercase letters (for security reasons), so he finds his new password by incrementing his old password string repeatedly until it is valid.

Incrementing is just like counting with numbers: xx, xy, xz, ya, yb, and so on. Increase the rightmost letter one step; if it was z, it wraps around to a, and repeat with the next letter to the left until one doesn't wrap around.

Unfortunately for Santa, a new Security-Elf recently started, and he has imposed some additional password requirements:

Passwords must include one increasing straight of at least three letters, like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd doesn't count.
Passwords may not contain the letters i, o, or l, as these letters can be mistaken for other characters and are therefore confusing.
Passwords must contain at least two different, non-overlapping pairs of letters, like aa, bb, or zz.
For example:

hijklmmn meets the first requirement (because it contains the straight hij) but fails the second requirement requirement (because it contains i and l).
abbceffg meets the third requirement (because it repeats bb and ff) but fails the first requirement.
abbcegjk fails the third requirement, because it only has one double letter (bb).
The next password after abcdefgh is abcdffaa.
The next password after ghijklmn is ghjaabcc, because you eventually skip all the passwords that start with ghi..., since i is not allowed.
Given Santa's current password (your puzzle input), what should his next password be?

Your puzzle answer was hepxxyzz.

--- Part Two ---

Santa's password expired again. What's the next one?

Your puzzle answer was heqaabcc.
*/

const input = 'hepxcrrq';

const assert = require('assert');

function isValidPassword(pwd) {
  if (pwd.indexOf('i') != -1 || pwd.indexOf('o') != -1 || pwd.indexOf('l') != -1) {
    return false;
  }
  if (!(/abc|bcd|cde|def|efg|fgh|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/).test(pwd)) {
    return false;
  }
  const uniquePairs = new Set(pwd.match(/([a-z])\1/g));
  if (uniquePairs.size < 2) {
    return false;
  }
  return true;
}
assert.equal(isValidPassword('hijklmmn'), false);
assert.equal(isValidPassword('abbceffg'), false);
assert.equal(isValidPassword('abbcegjk'), false);
assert.equal(isValidPassword('abcdffaa'), true);
assert.equal(isValidPassword('ghjaabcc'), true);

function incrementPassword(pwd) {
  pwd = pwd.split('');
  for (let i = pwd.length - 1; i >= 0; i--) {
    if (pwd[i] == 'z') {
      pwd[i] = 'a';
    } else {
      pwd[i] = String.fromCharCode(pwd[i].charCodeAt(0) + 1);
      break;
    }
  }
  pwd = pwd.join('');
  return pwd;
}
assert.equal(incrementPassword('abcdefgh'), 'abcdefgi');
assert.equal(incrementPassword('xz'), 'ya');

function nextValidPassword(pwd) {
  pwd = incrementPassword(pwd);
  while (!isValidPassword(pwd)) {
    pwd = incrementPassword(pwd);
  }
  return pwd;
}
assert.equal(nextValidPassword('abcdefgh'), 'abcdffaa');
assert.equal(nextValidPassword('ghijklmn'), 'ghjaabcc');
const pwd1 = nextValidPassword(input);
const pwd2 = nextValidPassword(pwd1);
console.log(pwd1, pwd2);
