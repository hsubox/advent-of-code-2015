const assert = require('assert');

const replacements = `Al => ThF
Al => ThRnFAr
B => BCa
B => TiB
B => TiRnFAr
Ca => CaCa
Ca => PB
Ca => PRnFAr
Ca => SiRnFYFAr
Ca => SiRnMgAr
Ca => SiTh
F => CaF
F => PMg
F => SiAl
H => CRnAlAr
H => CRnFYFYFAr
H => CRnFYMgAr
H => CRnMgYFAr
H => HCa
H => NRnFYFAr
H => NRnMgAr
H => NTh
H => OB
H => ORnFAr
Mg => BF
Mg => TiMg
N => CRnFAr
N => HSi
O => CRnFYFAr
O => CRnMgAr
O => HP
O => NRnFAr
O => OTi
P => CaP
P => PTi
P => SiRnFAr
Si => CaSi
Th => ThCa
Ti => BP
Ti => TiTi
e => HF
e => NAl
e => OMg`
const molecule = `CRnCaSiRnBSiRnFArTiBPTiTiBFArPBCaSiThSiRnTiBPBPMgArCaSiRnTiMgArCaSiThCaSiRnFArRnSiRnFArTiTiBFArCaCaSiRnSiThCaCaSiRnMgArFYSiRnFYCaFArSiThCaSiThPBPTiMgArCaPRnSiAlArPBCaCaSiRnFYSiThCaRnFArArCaCaSiRnPBSiRnFArMgYCaCaCaCaSiThCaCaSiAlArCaCaSiRnPBSiAlArBCaCaCaCaSiThCaPBSiThPBPBCaSiRnFYFArSiThCaSiRnFArBCaCaSiRnFYFArSiThCaPBSiThCaSiRnPMgArRnFArPTiBCaPRnFArCaCaCaCaSiRnCaCaSiRnFYFArFArBCaSiThFArThSiThSiRnTiRnPMgArFArCaSiThCaPBCaSiRnBFArCaCaPRnCaCaPMgArSiRnFYFArCaSiThRnPBPMgAr`;

function findDistinctMolecules(replacements, startingPoint) {
  let distinctMolecules = new Set();
  replacements.split('\n').map((transformation) => {
    return (/(\w+) => (\w+)/).exec(transformation).slice(1, 3);
  }).forEach(([from, to]) => {
    const re = new RegExp(from, 'g');
    let match = re.exec(startingPoint);
    while (match) {
      const resultingMolecule = startingPoint.substring(0, match.index) + to + startingPoint.substring(re.lastIndex);
      distinctMolecules.add(resultingMolecule);
      match = re.exec(startingPoint);
    }
    const resultingMolecule = re.exec(startingPoint);
  });
  return distinctMolecules;
}

assert.equal(findDistinctMolecules(`H => HO
H => OH
O => HH`, 'HOH').size, 4);
console.log(findDistinctMolecules(replacements, molecule).size);

// ..Rn..Ar
let boundedRxns = `Al => ThRnFAr
B => TiRnFAr
Ca => PRnFAr
Ca => SiRnFYFAr
Ca => SiRnMgAr
H => CRnAlAr
H => CRnFYFYFAr
H => CRnFYMgAr
H => CRnMgYFAr
H => NRnFYFAr
H => NRnMgAr
H => ORnFAr
N => CRnFAr
O => CRnFYFAr
O => CRnMgAr
O => NRnFAr
P => SiRnFAr
F => CaRnFAr`; // this last one was missing from set

let simpleRxns = `Al => ThF
B => BCa
B => TiB
Ca => CaCa
Ca => PB
Ca => SiTh
F => CaF
F => PMg
F => SiAl
H => HCa
H => NTh
H => OB
Mg => BF
Mg => TiMg
N => HSi
O => HP
O => OTi
P => CaP
P => PTi
Si => CaSi
Th => ThCa
Ti => BP
Ti => TiTi`;

let firstRxns = `e => HF
e => NAl
e => OMg`;

function findPrecursor(replacements, molecule) {
  var counter = 0;
  var precursor = molecule.replace(/Rn/g, '<').replace(/Ar/g, '>');
  replacements.split('\n').map((transformation) => {
    transformation = transformation.replace(/Rn/g, '<').replace(/Ar/g, '>');
    return (/([\w<>]+) => ([\w<>]+)/).exec(transformation).slice(1, 3);
  }).forEach(([from, to]) => {
    const re = new RegExp(to, 'g');
    let match = re.exec(precursor);
    while (match) {
      precursor = precursor.substring(0, match.index) + from + precursor.substring(re.lastIndex);
      counter += 1;
      match = re.exec(precursor);
    }
  });
  return [precursor, counter];
}

function stepsToSynthsize(molecule) {
  let counter = 0;
  let loopCounter;
  while (loopCounter !== 0) {
    loopCounter = 0;
    let i = 0;
    [molecule, i] = findPrecursor(boundedRxns, molecule);
    loopCounter += i;
    [molecule, i] = findPrecursor(simpleRxns, molecule);
    loopCounter += i;
    counter += loopCounter;
  }
  [molecule, i] = findPrecursor(firstRxns, molecule);
  counter += i;
  return counter;
}
console.log(stepsToSynthsize(molecule));
