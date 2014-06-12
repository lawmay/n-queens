var NRookTree = function(n) {
  this.solutions = [];
  this.n = n;
  this.nodeQueue = [];
  this.topNode = new Node(n, null, null, []);
  if (n === 1) {
    this.solutionsCount = 1;
  } else {
    this.solutionsCount = 0;
  }

  // this.buildTree();
};

NRookTree.prototype.buildTree = function() {
  // fill out the first row with nodes in every square
  this.addParentChildren();

  // nodeQueue holds all nodes that haven't had addChildren called on it
  // when we shift a node out of the nodeQueue, we add all of it's children
  //   into the queue
  while (this.nodeQueue.length) {
    // shift one node out from nodeQueue
    var currentNode = this.nodeQueue.shift();
    // collect that node's children
    var currentChildren = currentNode.addChildren();
    // increment solutionsCount if a node is added and is on the last row
    for (var i = 0; i < currentChildren.length; i++) {
      if (currentChildren[i].row === (this.n - 1)) {
        this.solutionsCount++;
      }
    }
    // add the shifted out node's children back into nodeQueue
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

NRookTree.prototype.findASolution = function() {
  // make storage array
  var storage = [];
  // place node on first row
  var newNode = new Node(this.n, 0, 0, []);
  // keep adding 1 child to node
  while (newNode !== undefined) {
    // push newNode's position into storage array
    storage.push([newNode.row, newNode.col]);
    newNode = newNode.addChildren()[0];
  }
  // return storage array
  return storage;
};










