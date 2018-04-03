var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('8/input.txt')
});

regs = {};

function getRegister(name) {
  if (regs.hasOwnProperty(name)) {
    return regs[name];
  }
  return 0;
}

function setRegister(name, value) {
  regs[name] = value;
}

function getHighestRegister() {
  return Object.values(regs).reduce(function (highestValue, value) {
    if (value > highestValue) {
      return value;
    }
    return highestValue;
  });
}

var highestTemporaryValue = 0;

lineReader.on('line', function (line) {
  var fields = line.split(' ');

  var register = fields[0];
  var operation = fields[1];
  var value = parseInt(fields[2]);

  if (operation === 'dec') {
    value = -value;
  }


  var condRegister = fields[4];
  var condOperation = fields[5];
  var condValue = fields[6];

  var condRegisterValue = getRegister(condRegister);

  if (eval(`${condRegisterValue} ${condOperation} ${condValue}`)) {
    setRegister(register, getRegister(register) + value);
  }

  var currentHighestValue = getHighestRegister();
  if (currentHighestValue > highestTemporaryValue) {
    highestTemporaryValue = currentHighestValue;
  }
});

lineReader.on('close', function () {
  var highestValue = getHighestRegister();
  console.log(highestValue);
  console.log(highestTemporaryValue);
});