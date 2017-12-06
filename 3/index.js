function getRingNumber(value) {
  // Take the sqrt of the value to get the "ring" that it's in.
  //
  // The first ring includes all the numbers up to 1^2, the second ring
  // includes all the numbers up to 3^2, the 3rd ring includes all the 
  // numbers up to 5^2, and so on.
  // 
  // Returns a 0-indexed number for the ring.

  var squareRoot = Math.sqrt(value);
  var ringNumber = Math.ceil((squareRoot - 1) / 2);

  return ringNumber;
}

//var getRingNumberTests = { 1: 0, 2: 1, 9: 1, 10: 2, 25: 2, 26: 3 };
//for (var key in getRingNumberTests) {
//  console.log("getRingNumber: " + key + " s/b " + getRingNumberTests[key] + ", is " + getRingNumber(key));
//}

function getRingPositionDistance(value, ringNumber) {
  // Find the manhatten distance to get from the values position on the ring
  // to one of the centers of the sides. The numbers that are at the 12, 3, 6
  // and 9 o'clock positions have a value of zero, as they can move directly
  // to the center from there, but other values must first move a number of
  // cells to one of these positions before moving inwards. The values at the
  // corners are the furthest.
  //
  // For a given ring, the final value is equal to ((ringNumber * 2) + 1) ^ 2
  // and is always located in the bottom right corner. For the 1st ring
  // (ringNumber = 1), the last value is 9 and the distance to a center on
  // the ring is 1. For the 2nd ring, the last value is 25 and the distance to
  // the cetner is 2.

  // Special case: None of this math makes sense for the first ring
  if (ringNumber == 0) {
    return 0;
  }
  
  var sideLength = ((ringNumber * 2) + 1);

  var finalValueOnRing = Math.pow(sideLength, 2);

  // number of positions back from the bottom right position going around the
  // ring going counter clockwise
  var positionOnRing = finalValueOnRing - value;

  // first determine the number of positions we are away from the next corner
  // going counter clockwise
  var distanceFromCorner = positionOnRing % (sideLength - 1);

  if (distanceFromCorner < (sideLength / 2)) {
    return Math.floor(sideLength / 2) - distanceFromCorner;
  } else {
    return distanceFromCorner - Math.floor(sideLength / 2);
  }
}

//var getRingPositionDistanceTests = { 1: 0, 2: 0, 3: 1, 8: 0, 9: 1,
//                                     10: 1, 11: 0, 12: 1, 13: 2, 25: 2, 18: 1, 19: 0 }
//for (var key in getRingPositionDistanceTests) {
//  console.log("getRingPositionDistanceTests: " + key + " s/b " +
//              getRingPositionDistanceTests[key] + ", is " +
//              getRingPositionDistance(key, getRingNumber(key)));;
//}

function getSpiralDistance(value) {
  var ringNumber = getRingNumber(value);
  var ringPositionDistance = getRingPositionDistance(value, ringNumber);
  return ringNumber + ringPositionDistance;
}

//var getSpiralDistanceTests = { 1: 0, 12: 3, 23: 2, 1024: 31, 325489: "?" };
//for (var key in getSpiralDistanceTests) {
//  console.log("getSpiralDistanceTests: " + key + " s/b " +
//              getSpiralDistanceTests[key] + ", is " +
//              getSpiralDistance(key));;
//}

// Part 2

function getIndexForIndexOnRing(indexOnRing, ring) {
  // indexOnRing is defined as the 0th position being the lowest value on 
  // the ring (one spot above the highest value at the bottom right corner)

  if (ring == 0) {
    return 0;
  }

  var ringStartIndex = Math.pow(((ring - 1) * 2) + 1, 2);
  return ringStartIndex + indexOnRing;
}

//var getIndexForIndexOnRingTests = [[0, 0, 0], [0, 1, 1], [1, 1, 1], [0, 2, 9], [1, 2, 10]]
//for (var key in getIndexForIndexOnRingTests) {
//  var test = getIndexForIndexOnRingTests[key]
//  console.log("getIndexForIndexOnRingTests: " + test + ", is " +
//              getIndexForIndexOnRing(test[0], test[1]));
//}

function getIndexOnRing(index) {
  if (index == 0) {
    return 0;
  }

  var ring = getRingNumber(index + 1);
  var ringStartIndex = Math.pow(((ring - 1) * 2) + 1, 2);
  return index - ringStartIndex;
}

//var getIndexOnRingTests = [[0, 0], [1, 0], [2, 1], [9, 0], [10, 1]];
//for (var key in getIndexOnRingTests) {
//  var test = getIndexOnRingTests[key]
//  console.log("getIndexOnRingTests: " + test + ", is " +
//              getIndexOnRing(test[0]));
//}

function calculateValueForIndex(values, index) {
  if (index == 0) {
    return 1;
  }

  var ring = getRingNumber(index + 1);
  var indexOnRing = getIndexOnRing(index);
  var sideLength = (ring * 2); // Only count one corner

  if (indexOnRing == 0) {
    // First value on the ring, only thing to include is the first and last
    // values on the previous ring.

    // Last value
    var result = getValueForIndex(values, index - 1);
    // First value (only include for rings where the first and last aren't the same)
    if (ring > 1) {
      result += getValueForIndex(values, getIndexForIndexOnRing(0, ring - 1));
    }

    return result;
  }

  var result = getValueForIndex(values, index - 1);

  // If we're coming off a corner, we include two previous values on the ring
  // Note on on indexOnRing == 1 we'll underflow into the previous ring, and
  // that's intended.
  if (index > 1 && (indexOnRing % sideLength == 0 || indexOnRing == 1)) {
    result += getValueForIndex(values, index - 2);
  }
 
  // And now, add the values that are diagonally infront, to the side, and
  // diaganolly behind on the previous ring

  var side = Math.floor(indexOnRing / sideLength);
  var indexOnSide = indexOnRing % sideLength;

  var previousRingStartIndex = Math.pow(((ring - 2) * 2) + 1, 2);
  var previousRingSideLength = (ring - 1) * 2;
  var previousRingStartIndexOfSide = previousRingStartIndex + (previousRingSideLength * side);

  if (indexOnSide > 0 && indexOnRing > 1) {
    result += getValueForIndex(values, previousRingStartIndexOfSide + indexOnSide - 2)
  }
  if (indexOnSide < sideLength - 1) {
    result += getValueForIndex(values, previousRingStartIndexOfSide + indexOnSide - 1)
  }
  if (indexOnSide < sideLength - 2) {
    result += getValueForIndex(values, previousRingStartIndexOfSide + indexOnSide)
  }

  // If we're wrapping up the ring, we start including the first number in the
  // ring again.
  var startIndexOnRing = Math.pow(((ring - 1) * 2) + 1, 2);
  var lastIndexOnRing = Math.pow((ring * 2) + 1, 2) - 1;
  if (index > lastIndexOnRing - 2) {
    result += getValueForIndex(values, startIndexOnRing);
  }

  return result;
}

function getValueForIndex(values, index) {
  if (values[index] !== undefined) {
    // Already calculated it
    return values[index];
  }

  // Welp, gotta calculate it now
  var result = calculateValueForIndex(values, index);

  // Save it, return it
  values[index] = result;
  return result;
}

var values = [];
for (var i = 0; ; i++) {
  console.log(i);
  var result = getValueForIndex(values, i);
  if (result > 325489) {
    console.log(result);
    break;
  }
}
//console.log(values);