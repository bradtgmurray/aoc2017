var sampleInput = [ 0, 3, 0, 1, -3 ];

function countStepsInMaze(maze) {
  var stepCount = 0;
  var position = 0;
  while (position >= 0 && position < maze.length) {
    var newPosition = position + maze[position];
    maze[position]++;
    position = newPosition;
    stepCount++;
  }
  return stepCount;
}

function countStepsInMazePart2(maze) {
  var stepCount = 0;
  var position = 0;
  while (position >= 0 && position < maze.length) {
    var newPosition = position + maze[position];
    if (maze[position] >= 3) {
      maze[position]--;
    } else {
      maze[position]++;
    }
    position = newPosition;
    stepCount++;
  }
  return stepCount;
}

console.log(countStepsInMazePart2(sampleInput));

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

var testInput = [];
lineReader.on('line', function (line) {
  testInput.push(parseInt(line));
});

lineReader.on('close', function () {
  console.log(countStepsInMazePart2(testInput));
});
