/*
--- Day 23: Opening the Turing Lock ---

Little Jane Marie just got her very first computer for Christmas from some unknown benefactor. It comes with instructions and an example program, but the computer itself seems to be malfunctioning. She's curious what the program does, and would like you to help her run it.

The manual explains that the computer supports two registers and six instructions (truly, it goes on to remind the reader, a state-of-the-art technology). The registers are named a and b, can hold any non-negative integer, and begin with a value of 0. The instructions are as follows:

hlf r sets register r to half its current value, then continues with the next instruction.
tpl r sets register r to triple its current value, then continues with the next instruction.
inc r increments register r, adding 1 to it, then continues with the next instruction.
jmp offset is a jump; it continues with the instruction offset away relative to itself.
jie r, offset is like jmp, but only jumps if register r is even ("jump if even").
jio r, offset is like jmp, but only jumps if register r is 1 ("jump if one", not odd).
All three jump instructions work with an offset relative to that instruction. The offset is always written with a prefix + or - to indicate the direction of the jump (forward or backward, respectively). For example, jmp +1 would simply continue with the next instruction, while jmp +0 would continuously jump back to itself forever.

The program exits when it tries to run an instruction beyond the ones defined.

For example, this program sets a to 2, because the jio instruction causes it to skip the tpl instruction:

inc a
jio a, +2
tpl a
inc a
What is the value in register b when the program in your puzzle input is finished executing?

Your puzzle answer was 184.

--- Part Two ---

The unknown benefactor is very thankful for releasi-- er, helping little Jane Marie with her computer. Definitely not to distract you, what is the value in register b after the program is finished executing if register a starts as 1 instead?

Your puzzle answer was 231.
*/

const input = `jio a, +19
inc a
tpl a
inc a
tpl a
inc a
tpl a
tpl a
inc a
inc a
tpl a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
jmp +23
tpl a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
inc a
tpl a
inc a
tpl a
inc a
tpl a
inc a
inc a
tpl a
inc a
inc a
tpl a
tpl a
inc a
jio a, +8
inc b
jie a, +4
tpl a
inc a
jmp +2
hlf a
jmp -7`;

function runInstructions(register, input) {
  const instructions = input.split("\n");
  let idx = 0;
  while (idx < instructions.length) {
    const instruction = instructions[idx];
    const match = (/^(\w{3}) (\+?\-?\w+)(?:, (\+?\-?\w+))?$/).exec(instruction);
    if (match[1] == 'hlf') {
      /*hlf r sets register r to half its current value, then continues with the next instruction.*/
      const letter = match[2];
      register[letter] /= 2;
      idx += 1;
    } else if (match[1] == 'tpl') {
      /*tpl r sets register r to triple its current value, then continues with the next instruction.*/
      const letter = match[2];
      register[letter] *= 3;
      idx += 1;
    } else if (match[1] == 'inc') {
      /*inc r increments register r, adding 1 to it, then continues with the next instruction.*/
      const letter = match[2];
      register[letter] += 1;
      idx += 1;
    } else if (match[1] == 'jmp') {
      /*jmp offset is a jump; it continues with the instruction offset away relative to itself.*/
      idx += Number(match[2]);
    } else if (match[1] == 'jie') {
      /*jie r, offset is like jmp, but only jumps if register r is even ("jump if even").*/
      const letter = match[2];
      if (register[letter] % 2 == 0) {
        idx += Number(match[3]);
      } else {
        idx += 1;
      }
    } else if (match[1] == 'jio') {
      /*jio r, offset is like jmp, but only jumps if register r is 1 ("jump if one", not odd).*/
      const letter = match[2];
      if (register[letter] == 1) {
        idx += Number(match[3]);
      } else {
        idx += 1;
      }
    }
  }
  return register;
}

const result1 = runInstructions({
  a: 0,
  b: 0
}, input);
console.log(result1.b);
const result2 = runInstructions({
  a: 1,
  b: 0
}, input);
console.log(result2.b);
