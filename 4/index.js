function passphraseIsValid(words) {
  var wordSet = new Set();

  for (var i in words) {
    if (wordSet.has(words[i])) {
      return false;
    }
    wordSet.add(words[i]);
  }

  return true;
}

//var passphraseIsValidTests = { "a b c": true, "a b a": false, "aa bb cc": true };
//for (var key in passphraseIsValidTests) {
//  console.log("passphraseIsValid: <" + key + "> s/b " + passphraseIsValidTests[key] + ", is " + passphraseIsValid(key.split(" ")));
//}

function passphraseIsValidPart2(words) {
  var wordSet = new Set();

  for (var i in words) {
    var wordChars = words[i].split("");
    var sortedWord = wordChars.sort().join("");

    if (wordSet.has(sortedWord)) {
      return false;
    }
    wordSet.add(sortedWord);
  }

  return true;
}

//var passphraseIsValidPart2Tests = { "aa bb cc": true, "ac ca": false };
//for (var key in passphraseIsValidPart2Tests) {
//  console.log("passphraseIsValidPart2: <" + key + "> s/b " + passphraseIsValidPart2Tests[key] + ", is " + passphraseIsValidPart2(key.split(" ")));
//}

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

var validPassphraseCount = 0;
lineReader.on('line', function (line) {
  if (passphraseIsValidPart2(line.split(" "))) {
    validPassphraseCount++;
  }
});

lineReader.on('close', function () {
  console.log(validPassphraseCount);
});


