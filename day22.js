/*
--- Day 22: Wizard Simulator 20XX ---

Little Henry Case decides that defeating bosses with swords and stuff is boring. Now he's playing the game with a wizard. Of course, he gets stuck on another boss and needs your help again.

In this version, combat still proceeds with the player and the boss taking alternating turns. The player still goes first. Now, however, you don't get any equipment; instead, you must choose one of your spells to cast. The first character at or below 0 hit points loses.

Since you're a wizard, you don't get to wear armor, and you can't attack normally. However, since you do magic damage, your opponent's armor is ignored, and so the boss effectively has zero armor as well. As before, if armor (from a spell, in this case) would reduce damage below 1, it becomes 1 instead - that is, the boss' attacks always deal at least 1 damage.

On each of your turns, you must select one of your spells to cast. If you cannot afford to cast any spell, you lose. Spells cost mana; you start with 500 mana, but have no maximum limit. You must have enough mana to cast a spell, and its cost is immediately deducted when you cast it. Your spells are Magic Missile, Drain, Shield, Poison, and Recharge.

Magic Missile costs 53 mana. It instantly does 4 damage.
Drain costs 73 mana. It instantly does 2 damage and heals you for 2 hit points.
Shield costs 113 mana. It starts an effect that lasts for 6 turns. While it is active, your armor is increased by 7.
Poison costs 173 mana. It starts an effect that lasts for 6 turns. At the start of each turn while it is active, it deals the boss 3 damage.
Recharge costs 229 mana. It starts an effect that lasts for 5 turns. At the start of each turn while it is active, it gives you 101 new mana.
Effects all work the same way. Effects apply at the start of both the player's turns and the boss' turns. Effects are created with a timer (the number of turns they last); at the start of each turn, after they apply any effect they have, their timer is decreased by one. If this decreases the timer to zero, the effect ends. You cannot cast a spell that would start an effect which is already active. However, effects can be started on the same turn they end.

For example, suppose the player has 10 hit points and 250 mana, and that the boss has 13 hit points and 8 damage:

-- Player turn --
- Player has 10 hit points, 0 armor, 250 mana
- Boss has 13 hit points
Player casts Poison.

-- Boss turn --
- Player has 10 hit points, 0 armor, 77 mana
- Boss has 13 hit points
Poison deals 3 damage; its timer is now 5.
Boss attacks for 8 damage.

-- Player turn --
- Player has 2 hit points, 0 armor, 77 mana
- Boss has 10 hit points
Poison deals 3 damage; its timer is now 4.
Player casts Magic Missile, dealing 4 damage.

-- Boss turn --
- Player has 2 hit points, 0 armor, 24 mana
- Boss has 3 hit points
Poison deals 3 damage. This kills the boss, and the player wins.
Now, suppose the same initial conditions, except that the boss has 14 hit points instead:

-- Player turn --
- Player has 10 hit points, 0 armor, 250 mana
- Boss has 14 hit points
Player casts Recharge.

-- Boss turn --
- Player has 10 hit points, 0 armor, 21 mana
- Boss has 14 hit points
Recharge provides 101 mana; its timer is now 4.
Boss attacks for 8 damage!

-- Player turn --
- Player has 2 hit points, 0 armor, 122 mana
- Boss has 14 hit points
Recharge provides 101 mana; its timer is now 3.
Player casts Shield, increasing armor by 7.

-- Boss turn --
- Player has 2 hit points, 7 armor, 110 mana
- Boss has 14 hit points
Shield's timer is now 5.
Recharge provides 101 mana; its timer is now 2.
Boss attacks for 8 - 7 = 1 damage!

-- Player turn --
- Player has 1 hit point, 7 armor, 211 mana
- Boss has 14 hit points
Shield's timer is now 4.
Recharge provides 101 mana; its timer is now 1.
Player casts Drain, dealing 2 damage, and healing 2 hit points.

-- Boss turn --
- Player has 3 hit points, 7 armor, 239 mana
- Boss has 12 hit points
Shield's timer is now 3.
Recharge provides 101 mana; its timer is now 0.
Recharge wears off.
Boss attacks for 8 - 7 = 1 damage!

-- Player turn --
- Player has 2 hit points, 7 armor, 340 mana
- Boss has 12 hit points
Shield's timer is now 2.
Player casts Poison.

-- Boss turn --
- Player has 2 hit points, 7 armor, 167 mana
- Boss has 12 hit points
Shield's timer is now 1.
Poison deals 3 damage; its timer is now 5.
Boss attacks for 8 - 7 = 1 damage!

-- Player turn --
- Player has 1 hit point, 7 armor, 167 mana
- Boss has 9 hit points
Shield's timer is now 0.
Shield wears off, decreasing armor by 7.
Poison deals 3 damage; its timer is now 4.
Player casts Magic Missile, dealing 4 damage.

-- Boss turn --
- Player has 1 hit point, 0 armor, 114 mana
- Boss has 2 hit points
Poison deals 3 damage. This kills the boss, and the player wins.
You start with 50 hit points and 500 mana points. The boss's actual stats are in your puzzle input. What is the least amount of mana you can spend and still win the fight? (Do not include mana recharge effects as "spending" negative mana.)

Your puzzle answer was 953.

--- Part Two ---

On the next run through the game, you increase the difficulty to hard.

At the start of each player turn (before any other effects apply), you lose 1 hit point. If this brings you to or below 0 hit points, you lose.

With the same starting stats for you and the boss, what is the least amount of mana you can spend and still win the fight?

Your puzzle answer was 1289.
*/

const assert = require('assert');

const boss = {
  hitPoints: 55,
  damage: 8
}

const player = {
  hitPoints: 50,
  armor: 0,
  manaPoints: 500
}

const spells = [
  {name: 'magic missile', cost: 53, damage: 4, heal: 0},
  {name: 'drain', cost: 73, damage: 2, heal: 2},
  {name: 'shield', cost: 113, damage: 0, armor: 7, mana: 0, duration: 6},
  {name: 'poison', cost: 173, damage: 3, armor: 0, mana: 0, duration: 6},
  {name: 'recharge', cost: 229, damage: 0, armor: 0, mana: 101, duration: 5}
];

function fight(player, boss, hardMode = false) {
  player = Object.assign({}, player);
  boss = Object.assign({}, boss);

  let manaSpent = 0;
  let inEffect = [];

  while (true) {
    if (hardMode) {
      player.hitPoints -= 1;
    }
    if (player.hitPoints <= 0) {
      return -1;
    }

    // effects
    player.armor = 0;
    inEffect.forEach((inEffectSpell) => {
      boss.hitPoints -= inEffectSpell.damage;
      player.armor += inEffectSpell.armor;
      player.manaPoints += inEffectSpell.mana;
      inEffectSpell.duration -= 1;
    });
    inEffect = inEffect.filter((inEffectSpell) => {
      return inEffectSpell.duration > 0;
    });

    // cast spell
    let castableSpells = spells.filter((spell) => {
      return !inEffect.some((inEffectSpell) => spell.name == inEffectSpell.name);
    }).filter((spell) => {
      return spell.cost <= player.manaPoints;
    });
    if (castableSpells.length == 0) {
      return -1;
    }
    let spell = castableSpells[Math.floor(Math.random()*castableSpells.length)];
    player.manaPoints -= spell.cost;
    manaSpent += spell.cost;
    if (spell.hasOwnProperty('duration')) {
      inEffect.push(Object.assign({}, spell));
    } else {
      boss.hitPoints -= spell.damage;
      player.hitPoints += spell.heal;
    }
    if (boss.hitPoints <= 0) {
      return manaSpent;
    }

    // effects
    player.armor = 0;
    inEffect.forEach((inEffectSpell) => {
      boss.hitPoints -= inEffectSpell.damage;
      player.armor += inEffectSpell.armor;
      player.manaPoints += inEffectSpell.mana;
      inEffectSpell.duration -= 1;
    });
    inEffect = inEffect.filter((inEffectSpell) => {
      return inEffectSpell.duration > 0;
    });
    if (boss.hitPoints <= 0) {
      return manaSpent;
    }

    // boss attacks
    let bossAttack = (boss.damage - player.armor > 0) ? boss.damage - player.armor : 1;
    player.hitPoints -= bossAttack;
    if (player.hitPoints <= 0) {
      return -1;
    }
  }
}

function fightNTimes(player, boss, hardMode, times) {
  let bestFightMana = Infinity;
  let i = 0;
  while (i < times) {
    let result = fight(player, boss, hardMode);
    if (result != -1) {
      bestFightMana = Math.min(bestFightMana, result);
      i += 1;
    }
  }
  return bestFightMana;
}

assert.equal(fightNTimes({
  hitPoints: 10,
  armor: 0,
  manaPoints: 250
}, {
  hitPoints: 13,
  damage: 8
}, false, 25), 173 + 53);

assert.equal(fightNTimes({
  hitPoints: 10,
  armor: 0,
  manaPoints: 250
}, {
  hitPoints: 14,
  damage: 8
}, false, 25), 229 + 113 + 73 + 173 + 53);

console.log(fightNTimes(player, boss, false, 1000));
console.log(fightNTimes(player, boss, true, 1000));
