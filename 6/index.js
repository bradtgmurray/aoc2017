function findLargestBank(banks) {
  var highestValue = 0;
  var highestIndex = 0;
  for (var i in banks) {
    if (banks[i] > highestValue) {
      highestValue = banks[i];
      highestIndex = i;
    }
  }
  return parseInt(highestIndex);
}

function nextBank(banks, currentBank) {
  return (currentBank + 1) % banks.length;
}

function doCycle(banks) {
  var largestBank = findLargestBank(banks);

  var blocksToRedistribute = banks[largestBank];
  banks[largestBank] = 0;

  var bankIndex = nextBank(banks, largestBank);
  for (; blocksToRedistribute > 0; blocksToRedistribute--) {
    banks[bankIndex]++;
    bankIndex = nextBank(banks, bankIndex);
  }
}

function statesAreEqual(state1, state2) {
  for (var i in state1) {
    if (state1[i] != state2[i]) {
      return false;
    }
  }
  return true;
}

function checkStateExisted(previousStates, state) {
  for (var i in previousStates) {
    if (statesAreEqual(previousStates[i], state)) {
      return true;
    }
  }
  return false;
}

function countCycles(banks) {
  var previousStates = [];

  while (!checkStateExisted(previousStates, banks)) {
    previousStates.push(banks.slice());
    doCycle(banks);
  }
  
  return previousStates.length;
}

function countCyclesPart2(banks) {
  var previousStates = [];

  while (!checkStateExisted(previousStates, banks)) {
    previousStates.push(banks.slice());
    doCycle(banks);
  }

  previousStates = [];
  while (!checkStateExisted(previousStates, banks)) {
    previousStates.push(banks.slice());
    doCycle(banks);
  }
  
  return previousStates.length;
}

var sampleInput = [ 0, 2, 7, 0 ];
console.log(countCyclesPart2(sampleInput));

var testInput = [0, 5, 10, 0, 11, 14, 13, 4, 11, 8, 8, 7, 1, 4, 12, 11];
console.log(countCyclesPart2(testInput));