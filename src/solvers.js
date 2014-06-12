/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var board = [];
  for (var row = 0; row < n; row++) {
    board.push([]);
    for (var col = 0; col < n; col++) {
      board[row].push(0);
    }
  }

  // make new NRookTree
  var newTree = new NRookTree(n);
  // call find single solution, returning array of solutions positions
  var solutionPoss = newTree.findASolution();

  // iterate through solution array and use togglePiece method to create solution
  for (var i = 0; i < solutionPoss.length; i++) {
    board[solutionPoss[i][0]][solutionPoss[i][1]] = 1;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var newTree = new NRookTree(n);
  newTree.buildTree();
  console.log('Number of solutions for ' + n + ' rooks:', newTree.solutionsCount);
  return newTree.solutionsCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
