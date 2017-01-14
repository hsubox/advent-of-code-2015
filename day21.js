/*
--- Day 21: RPG Simulator 20XX ---

Little Henry Case got a new video game for Christmas. It's an RPG, and he's stuck on a boss. He needs to know what equipment to buy at the shop. He hands you the controller.

In this game, the player (you) and the enemy (the boss) take turns attacking. The player always goes first. Each attack reduces the opponent's hit points by at least 1. The first character at or below 0 hit points loses.

Damage dealt by an attacker each turn is equal to the attacker's damage score minus the defender's armor score. An attacker always does at least 1 damage. So, if the attacker has a damage score of 8, and the defender has an armor score of 3, the defender loses 5 hit points. If the defender had an armor score of 300, the defender would still lose 1 hit point.

Your damage score and armor score both start at zero. They can be increased by buying items in exchange for gold. You start with no items and have as much gold as you need. Your total damage or armor is equal to the sum of those stats from all of your items. You have 100 hit points.

Here is what the item shop is selling:

Weapons:    Cost  Damage  Armor
Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0

Armor:      Cost  Damage  Armor
Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5

Rings:      Cost  Damage  Armor
Damage +1    25     1       0
Damage +2    50     2       0
Damage +3   100     3       0
Defense +1   20     0       1
Defense +2   40     0       2
Defense +3   80     0       3
You must buy exactly one weapon; no dual-wielding. Armor is optional, but you can't use more than one. You can buy 0-2 rings (at most one for each hand). You must use any items you buy. The shop only has one of each item, so you can't buy, for example, two rings of Damage +3.

For example, suppose you have 8 hit points, 5 damage, and 5 armor, and that the boss has 12 hit points, 7 damage, and 2 armor:

The player deals 5-2 = 3 damage; the boss goes down to 9 hit points.
The boss deals 7-5 = 2 damage; the player goes down to 6 hit points.
The player deals 5-2 = 3 damage; the boss goes down to 6 hit points.
The boss deals 7-5 = 2 damage; the player goes down to 4 hit points.
The player deals 5-2 = 3 damage; the boss goes down to 3 hit points.
The boss deals 7-5 = 2 damage; the player goes down to 2 hit points.
The player deals 5-2 = 3 damage; the boss goes down to 0 hit points.
In this scenario, the player wins! (Barely.)

You have 100 hit points. The boss's actual stats are in your puzzle input. What is the least amount of gold you can spend and still win the fight?

Your puzzle answer was 78.

--- Part Two ---

Turns out the shopkeeper is working with the boss, and can persuade you to buy whatever items he wants. The other rules still apply, and he still only has one of each item.

What is the most amount of gold you can spend and still lose the fight?

Your puzzle answer was 148.
*/

const assert = require('assert');

const weapons = [
  { name: 'dagger', cost: 8, damage: 4, armor: 0 },
  { name: 'shortsword', cost: 10, damage: 5, armor: 0 },
  { name: 'warhammer', cost: 25, damage: 6, armor: 0 },
  { name: 'longsword', cost: 40, damage: 7, armor: 0 },
  { name: 'greataxe', cost: 74, damage: 8, armor: 0 }
];

const armors = [
  { name: 'no armor', cost: 0, damage: 0, armor: 0 },
  { name: 'leather', cost: 13, damage: 0, armor: 1 },
  { name: 'chainmail', cost: 31, damage: 0, armor: 2 },
  { name: 'splitmail', cost: 53, damage: 0, armor: 3 },
  { name: 'bandedmail', cost: 75, damage: 0, armor: 4 },
  { name: 'platemail', cost: 102, damage: 0, armor: 5 }
];

const rings = [
  { name: 'no ring', cost: 0, damage: 0, armor: 0 },
  { name: 'no ring', cost: 0, damage: 0, armor: 0 },
  { name: 'damage +1', cost: 25, damage: 1, armor: 0 },
  { name: 'damage +2', cost: 50, damage: 2, armor: 0 },
  { name: 'damage +3', cost: 100, damage: 3, armor: 0 },
  { name: 'defense +1', cost: 20, damage: 0, armor: 1 },
  { name: 'defense +2', cost: 40, damage: 0, armor: 2 },
  { name: 'defense +3', cost: 80, damage: 0, armor: 3 }
];

const boss = {
  hitPoints: 104,
  damage: 8,
  armor: 1
};

const player = {
  hitPoints: 100,
  damage: 0,
  armor: 0
};

function fight(player, boss) {
  player = Object.assign({}, player);
  boss = Object.assign({}, boss);
  let playerAttack = (player.damage - boss.armor > 0) ? player.damage - boss.armor : 1;
  let bossAttack = (boss.damage - player.armor > 0) ? boss.damage - player.armor : 1;
  while (true) {
    boss.hitPoints -= playerAttack;
    if (boss.hitPoints <= 0) {
      return 'player';
    }
    player.hitPoints -= bossAttack;
    if (player.hitPoints <= 0) {
      return 'boss';
    }
  }
}

assert.equal(fight({
  hitPoints: 8,
  damage: 5,
  armor: 5
}, {
  hitPoints: 12,
  damage: 7,
  armor: 2
}), 'player');

function equipPlayer(player, weapon, armor, ring1, ring2) {
  return [{
    hitPoints: player.hitPoints,
    damage: player.damage + weapon.damage + armor.damage + ring1.damage + ring2.damage,
    armor: player.armor + weapon.armor + armor.armor + ring1.armor + ring2.armor
  }, weapon.cost + armor.cost + ring1.cost + ring2.cost];
}

function tryItems(player) {
  let minCostToWin = Infinity;
  let maxCostToLose = -Infinity;
  for (let i = 0; i < weapons.length; i++) {
    for (let j = 0; j < armors.length; j++) {
      for (let k = 0; k < rings.length - 1; k++) {
        for (let l = k + 1; l < rings.length; l++) {
          const [equipedPlayer, cost] = equipPlayer(player, weapons[i], armors[j], rings[k], rings[l]);
          const winner = fight(equipedPlayer, boss);
          if (winner == 'player') {
            minCostToWin = Math.min(minCostToWin, cost);
          } else {
            maxCostToLose = Math.max(maxCostToLose, cost);
          }
        }
      }
    }
  }
  return [minCostToWin, maxCostToLose];
}

const [minCostToWin, maxCostToLose] = tryItems(player);
console.log(minCostToWin, maxCostToLose);
