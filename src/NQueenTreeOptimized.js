var NQueenTree = function(n) {
  this.solutions = [];
  this.n = n;
  this.nodeQueue = [];
  this.topNode = new QNode(n, null, null);
  if (n === 0) {
    this.solutionsCount = 1;
  } else if (n === 1) {
    this.solutionsCount = 1;
  } else {
    this.solutionsCount = 0;
  }

  // this.buildTree();
};

NQueenTree.prototype.buildTree = function() {
  // fill out the first row with nodes in every square
  this.addParentChildren();

  while (this.nodeQueue.length) {
    // pop one node out from nodeQueue
    var currentNode = this.nodeQueue.pop();
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

NQueenTree.prototype.addParentChildren = function() {
  for (var i = 0; i < this.n; i++) {
    var newNode = new QNode(this.n, 0, i);
    this.nodeQueue.push(newNode);
    this.topNode.children.push(newNode);
  }
};

NQueenTree.prototype.dps = function() {
  var nodes = [this.topNode];
  var nodePoss = [];

  while (nodes.length > 0) {
    var checked = nodes.shift();
    nodePoss.push([checked.row, checked.col]);
    for (var i = checked.children.length-1; i >= 0; i--) {
      nodes.unshift(checked.children[i]);
    }
  }
  return nodePoss;
};

var QNode = function(n, row, column, validCols, validMDs, validmDs) {
  this.n = n;
  this.row = row;
  this.col = column;
  this.MD = this.col - this.row;
  this.mD = (n-1) - this.col - this.row;
  this._parent;
  this.children = [];
  this.validMDs = validMDs || {};
  if (!validMDs) {
    for (var i = -n + 1; i < n; i++) {
      this.validMDs[i] = true;
    }
  }
  this.validmDs = validmDs || {};
  if (!validmDs) {
    for (var j = -n + 1; j < n; j++) {
      this.validmDs[j] = true;
    }
  }
  this.validCols = validCols || {};
  if (!validCols) {
    for (var k = 0; k < n; k++) {
      this.validCols[k] = true;
    }
  }
  this.nodes = [];
};

QNode.prototype.addChildren = function() {
  // don't add any children if you are on the edge of the board
  if (this.row === (this.n-1)) {
    return [];
  }

  this.validCols[this.col] = false;
  this.validMDs[this.MD] = false;
  this.validmDs[this.mD] = false;

  for (var i = 0; i < this.n; i++) {
    var MD = i - (this.row + 1);
    var mD = (this.n-1) - i - (this.row+1);
    if(this.validMDs[MD] && this.validmDs[mD] && this.validCols[i]) { //in valid MD and mD
      var newChild = new QNode(this.n,
                              this.row + 1,
                              i,
                              this.validCols,
                              this.validMDs,
                              this.validmDs);
      newChild._parent = this;
      this.children.push(newChild);
    }
  }

  return this.children;
};

NQueenTree.prototype.findASolution = function() {
  // make storage array
  var storage = [];
  // place node on first row
  var newNode = new QNode(this.n, 0, 0);
  // keep adding 1 child to node
  while (newNode !== undefined) {
    // push newNode's position into storage array
    storage.push([newNode.row, newNode.col]);
    newNode = newNode.addChildren()[0];
  }
  // return storage array
  return storage;
};

var startDate = new Date().getTime();
var tree = new NQueenTree(10);
tree.buildTree();
console.log(new Date().getTime() - startDate);
console.log(tree.solutionsCount);
