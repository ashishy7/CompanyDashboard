function parkingExit(arr) {
  const NoOfRows = arr.length - 1;
  const NoOfCols = arr[0].length - 1;
  const myPos = findMyPos(arr);
  const routes = [];
  //console.log("MYPOS", myPos.join(), "TARGET : ", `${NoOfRows},${NoOfCols}`);
  if (myPos.join() == `${NoOfRows},${NoOfCols}`) return routes;
  while (myPos.join() != `${NoOfRows},${NoOfCols}`) {
    if (myPos[0] == NoOfRows) {
      routes.push(`R${NoOfCols - myPos[1]}`);
      return routes;
    }
    findNextStair(arr[myPos[0]], myPos, routes);
    let stairs = 0;
    while (arr[myPos[0]][myPos[1]] == 1) {
      stairs++;
      myPos[0]++;
    }
    routes.push(`D${stairs}`);
  }
  return routes;
}
function findNextStair(arr, myPos, routes) {
  const idx = arr.findIndex((val) => val == 1);
  const diff = idx - myPos[1];
  myPos[1] = idx;
  routes.push(diff < 0 ? `L${diff * -1}` : `R${diff}`);
}

function findMyPos(arr) {
  let pos;
  arr.forEach((subarr, rowidx) => {
    const colidx = subarr.findIndex((val) => val == 2);
    if (colidx != -1) pos = [rowidx, colidx];
  });
  return pos;
}
// val = parkingExit([
//   [2, 0, 0, 1, 0],
//   [0, 0, 0, 1, 0],
//   [0, 0, 0, 0, 0],
// ]);
// console.log(val);
/////////////////////////////////////////////////////////////////////////////

/* Persistence */

function additivePersistence(n) {
  return (function additivePersistenceHelper(n, iteration) {
    const strN = "" + n;
    if (strN.length == 1) return iteration;
    n = strN.split("").reduce((sum, currVal) => sum + +currVal, 0);
    return additivePersistenceHelper(n, ++iteration);
  })(n, 0);
}
// console.log("Result : ", additivePersistence(1679583));
function multiplicativePersistence(n) {
  const strN = "" + n;
  if (strN.length == 1) return iteration;
  n = strN.split("").reduce((sum, currVal) => sum * +currVal, 1);
  return multiplicativePersistence(n, ++iteration);
}
// console.log("Result : ", multiplicativePersistence(77));

/////////////////////////////////////////////////////////////////////////////

function sumDigProd(...numbers) {
  let sum = numbers.reduce((sum, number) => sum + number);
  while (("" + sum).length > 1) {
    sum = "" + [...("" + sum)].reduce((sum, number) => sum * +number, 1);
  }
  return +sum;
}
console.log(sumDigProd(16, 28));
