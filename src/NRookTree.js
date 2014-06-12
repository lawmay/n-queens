var NRookTree = function(n) {
  this.solutions = [];
  this.n = n;
  this.nodeQueue = [];
  this.topNode = new Node(n, null, null, []);
  this.solutionsCount = 0;

  this.buildTree();
  // this.searchChildren(topNode);
};

NRookTree.prototype.buildTree = function() {
  this.addParentChildren();
  while (this.nodeQueue.length) {
    var currentNode = this.nodeQueue.shift();
    var currentChildren = currentNode.addChildren();
    for (var i = 0; i < currentChildren.length; i++) {
      if (currentChildren[i].row === (this.n - 1)) {
        this.solutionsCount++;
      }
    }
    this.nodeQueue = this.nodeQueue.concat(currentChildren);
  }
};

NRookTree.prototype.addParentChildren = function() {
  for (var i = 0; i < this.n; i++) {
    var newNode = new Node(this.n, 0, i, []);
    this.nodeQueue.push(newNode);
    this.topNode.children.push(newNode);
  }
};

NRookTree.prototype.dps = function() {
  var nodes = [this.topNode];
  var nodePoss = [];

  while (nodes.length > 0) {
    var checked = nodes.shift();
    nodePoss.push([checked.row, checked.col]);
    for (var i = 0; i < checked.children.length; i++) {
      nodes.unshift(checked.children[i]);
    }
  }
  return nodePoss;
};

var Node = function(n, row, column, prevCols) {
  this.n = n;
  this.row = row;
  this.col = column;
  this._parent;
  this.children = [];
  // this.addParentChildren();
  this.previousCols = prevCols;
  this.nodes = [];
};

Node.prototype.addChildren = function() {
  // don't add any children if you are on the edge of the board
  if (this.row === (this.n-1)) {
    return [];
  }

  // iterate through the next row, if the column hasn't been used before, it's a valid move
  for (var column = 0; column < this.n; column++) {
    // it's a valid move...
    // if the column hasn't been used in a previous move or on this current move
    if (this.previousCols.indexOf(column) === -1 && column !== this.col) {
      var newPrevCols = this.previousCols.concat(this.col);
      var newChild = new Node(this.n, this.row + 1, column, newPrevCols);
      newChild._parent = this;
      this.children.push(newChild);
    }
  }
  return this.children;
};

var newTree = new NRookTree(3);
console.log(newTree.dps());

newTree.solutionsCount


