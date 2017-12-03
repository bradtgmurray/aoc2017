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

var getSpiralDistanceTests = { 1: 0, 12: 3, 23: 2, 1024: 31, 325489: "?" };
for (var key in getSpiralDistanceTests) {
  console.log("getSpiralDistanceTests: " + key + " s/b " +
              getSpiralDistanceTests[key] + ", is " +
              getSpiralDistance(key));;
}