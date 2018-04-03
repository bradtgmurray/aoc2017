class Node {
  constructor(name, weight, children) {
    this.name = name;
    this.weight = weight;
    this.children_names = children;
  }

  children(nodes) {
    return this.children_names.map(function(name) {
      return nodes.find(function (node) {
        return node.name == name; 
      });
    });
  }

  totalWeight(nodes) {
    var childrenWeight = this.children(nodes).map(child => child.totalWeight(nodes))
                                             .reduce((x, y) => x + y, 0);
    return this.weight + childrenWeight;
  }
}

function parseLine(line) {
  var matches = line.match(/(\S+) \((\d+)\)(?: -> (.+))?/);
  var children = []
  if (matches[3] !== undefined) {
    children = matches[3].split(', ');
  }
  return new Node(matches[1], parseInt(matches[2]), children);
}

//var parseLineTests = [ "tknk (41) -> ugml, padx, fwft", "jptl (61)" ];
//parseLineTests.forEach(function(test) {
//  console.log(parseLine(test));
//});

function findRoot(nodes) {
  var currentNode = nodes[0];
  var updated = false;

  while (true) {
    nodes.forEach(function(node) {
      if (node.children_names.includes(currentNode.name)) {
        currentNode = node;
        updated = true;
      }
    });

    if (!updated) {
      break;
    }
    updated = false;
  }

  return currentNode;
}

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('7/input.txt')
});

var nodes = []
lineReader.on('line', function (line) {
  nodes.push(parseLine(line));
});

lineReader.on('close', function () {
  var rootNode = findRoot(nodes);

  function findUnevenChild(nodes, currentNode, expectedWeight) {
    var children = currentNode.children(nodes);
    if (children.length == 0) {
      return;
    }

    var childWeights = children.map(c => c.totalWeight(nodes));

    var unevenChild;
    var correctWeight;

    if (expectedWeight == 0) {
      children.forEach(function (child, index) {
        var weightFrequency = childWeights.reduce(function (count, child_weight) {
          if (child_weight == childWeights[index]) {
            return count + 1; 
          } else {
            return count;
          }
        }, 0);

        if (weightFrequency == 1) {
          unevenChild = child;
        } else {
          correctWeight = childWeights[index];
        }
      });
    } else {
      correctWeight = (expectedWeight - currentNode.weight) / children.length;
      children.forEach(function (child) {
        if (child.totalWeight(nodes) != correctWeight) {
          unevenChild = child;
        }
      });
    }

    console.log(unevenChild);
    console.log(unevenChild.totalWeight(nodes));
    console.log(correctWeight);

    findUnevenChild(nodes, unevenChild, correctWeight);
  }

  findUnevenChild(nodes, rootNode, 0);
});