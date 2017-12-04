function passphraseIsValid(passphrase) {
  var words = passphrase.split(" ");

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
//  console.log("passphraseIsValid: <" + key + "> s/b " + passphraseIsValidTests[key] + ", is " + passphraseIsValid(key));
//}

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

var validPassphraseCount = 0;
lineReader.on('line', function (line) {
  if (passphraseIsValid(line)) {
    validPassphraseCount++;
  }
});

lineReader.on('close', function () {
  console.log(validPassphraseCount);
});


