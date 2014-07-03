
/* @author Tayllan Búrigo 2014 */

(function() {
  var AdjacencyList;

  AdjacencyList = (function() {
    function AdjacencyList(directed) {
      this.directed = directed != null ? directed : true;
      this.vertices = [];
      this.edges = {};
      this.amountOfVertices = 0;
      this.amountOfEdges = 0;
    }

    AdjacencyList.prototype.addVertex = function(vertex) {
      this.vertices.push(vertex);
      this.edges[vertex] = {};
      return this.amountOfVertices += 1;
    };

    AdjacencyList.prototype.addEdge = function(source, target, weight) {
      if (weight == null) {
        weight = 1;
      }
      if (this.edges[source] === void 0) {
        this.addVertex(source);
      }
      if (this.edges[target] === void 0) {
        this.addVertex(target);
      }
      this.edges[source][target] = weight;
      this.amountOfEdges += 1;
      if (!this.directed) {
        this.edges[target][source] = weight;
        return this.amountOfEdges += 1;
      }
    };

    AdjacencyList.prototype.deleteEdge = function(source, target) {
      if (this.edges[source] !== void 0) {
        delete this.edges[source][target];
        this.amountOfEdges -= 1;
        if (!this.directed && this.edges[target] !== void 0) {
          delete this.edges[target][source];
          return this.amountOfEdges -= 1;
        }
      }
    };

    AdjacencyList.prototype.getEdgeWeight = function(source, target) {
      return this.edges[source][target];
    };

    AdjacencyList.prototype.getRoommates = function(vertex) {
      return this.edges[vertex];
    };

    AdjacencyList.prototype.toString = function() {
      return 'AdjacencyList with ' + this.amountOfVertices + ' vertices and ' + this.amountOfEdges + ' edges.';
    };

    return AdjacencyList;

  })();

  this.algCoffee = this.algCoffee ? this.algCoffee : {};

  this.algCoffee.AdjacencyList = AdjacencyList;

}).call(this);
;
/* @author Bruno Roberto Búrigo 2014 */

(function() {
  var BinarySearchTree;

  BinarySearchTree = (function() {
    function BinarySearchTree(value, parent) {
      if (parent == null) {
        parent = null;
      }
      this.value = value;
      this.parent = parent;
      this.left = null;
      this.right = null;
    }

    BinarySearchTree.prototype.insert = function(value) {
      if (value < this.value) {
        if (this.left === null) {
          this.left = new BinarySearchTree(value, this);
          return this.left;
        } else {
          return this.left.insert(value);
        }
      } else {
        if (this.right === null) {
          this.right = new BinarySearchTree(value, this.root);
          return this.right;
        } else {
          return this.right.insert(value);
        }
      }
    };

    BinarySearchTree.prototype["delete"] = function() {
      var minimum;
      if (this.left === null && this.right === null) {
        if (this.isLeftNodeOfParent()) {
          this.parent.left = null;
        } else if (this.isRightNodeOfParent()) {
          this.parent.right = null;
        }
        return this.value = this.left = this.right = this.parent = null;
      } else if (this.left === null) {
        if (this.isLeftNodeOfParent()) {
          this.parent.left = this.right;
        } else if (this.isRightNodeOfParent()) {
          this.parent.right = this.right;
        }
        this.right.parent = this.parent;
        return this.value = this.left = this.right = this.parent = null;
      } else if (this.right === null) {
        if (this.isLeftNodeOfParent()) {
          this.parent.left = this.left;
        } else if (this.isRightNodeOfParent()) {
          this.parent.right = this.left;
        }
        this.left.parent = this.parent;
        return this.value = this.left = this.right = this.parent = null;
      } else {
        minimum = this.findMinimum;
        this.value = minium.value;
        return minimum["delete"]();
      }
    };

    BinarySearchTree.prototype.findMinimum = function() {
      if (this.left === null) {
        return this;
      } else {
        return this.left.findMinimum();
      }
    };

    BinarySearchTree.prototype.findMaximum = function() {
      if (this.right === null) {
        return this;
      } else {
        return this.right.findMaximum();
      }
    };

    BinarySearchTree.prototype.findByValue = function(value) {
      if (value === this.value) {
        return this;
      } else if (value < this.value) {
        if (this.left !== null) {
          return this.left.findByValue(value);
        } else {
          return null;
        }
      } else {
        if (this.right !== null) {
          return this.right.findByValue(value);
        } else {
          return null;
        }
      }
    };

    BinarySearchTree.prototype.isLeftNodeOfParent = function() {
      return this.parent !== null && this.parent.left !== null && this.parent.left.value === this.value;
    };

    BinarySearchTree.prototype.isRightNodeOfParent = function() {
      return this.parent !== null && this.parent.right !== null && this.parent.right.value === this.value;
    };

    return BinarySearchTree;

  })();

  this.algCoffee = this.algCoffee ? this.algCoffee : {};

  this.algCoffee.BinarySearchTree = BinarySearchTree;

}).call(this);
;
/* @author Tayllan Búrigo 2014 */

(function() {
  var DisjointSet;

  DisjointSet = (function() {
    function DisjointSet(arrayOfKeys) {
      var key, _i, _len;
      if (arrayOfKeys == null) {
        arrayOfKeys = [];
      }
      this.parents = {};
      this.ranks = {};
      for (_i = 0, _len = arrayOfKeys.length; _i < _len; _i++) {
        key = arrayOfKeys[_i];
        this.parents[key] = key;
        this.ranks[key] = 0;
      }
    }

    DisjointSet.prototype.find = function(key) {
      if (this.parents[key] !== key) {
        this.parents[key] = this.find(this.parents[key]);
      }
      return this.parents[key];
    };

    DisjointSet.prototype.union = function(x, y) {
      var xRoot, yRoot;
      xRoot = this.find(x);
      yRoot = this.find(y);
      if (xRoot !== yRoot) {
        if (this.ranks[xRoot] < this.ranks[yRoot]) {
          return this.parents[xRoot] = yRoot;
        } else if (this.ranks[xRoot] > this.ranks[yRoot]) {
          return this.parents[yRoot] = xRoot;
        } else {
          this.parents[yRoot] = xRoot;
          return this.ranks[xRoot] += 1;
        }
      }
    };

    return DisjointSet;

  })();

  this.algCoffee = this.algCoffee ? this.algCoffee : {};

  this.algCoffee.DisjointSet = DisjointSet;

}).call(this);
;
/* @author Bruno Roberto Búrigo 2014 */

(function() {
  var Heap;

  Heap = (function() {
    function Heap(array) {
      if (array == null) {
        array = [];
      }
      this.array = array;
    }

    Heap.prototype.buildMaxHeap = function() {
      var arrayLength, i, start, _i, _results;
      arrayLength = this.array.length;
      start = Math.floor(arrayLength / 2);
      _results = [];
      for (i = _i = start; _i >= 0; i = _i += -1) {
        _results.push(this.maxHeapfy(i, arrayLength));
      }
      return _results;
    };

    Heap.prototype.buildMinHeap = function() {
      var arrayLength, i, start, _i, _results;
      arrayLength = this.array.length;
      start = Math.floor(arrayLength / 2);
      _results = [];
      for (i = _i = start; _i >= 0; i = _i += -1) {
        _results.push(this.minHeapfy(i, arrayLength));
      }
      return _results;
    };

    Heap.prototype.maxHeapfy = function(pos, arrayLength) {
      var isGreaterThan;
      isGreaterThan = function(first, second) {
        return first > second;
      };
      return this.heapfy(pos, arrayLength, isGreaterThan);
    };

    Heap.prototype.minHeapfy = function(pos, arrayLength) {
      var isLessThan;
      isLessThan = function(first, second) {
        return first < second;
      };
      return this.heapfy(pos, arrayLength, isLessThan);
    };

    Heap.prototype.heapfy = function(pos, arrayLength, compare) {
      var largestPos, leftPos, rightPos, _ref;
      leftPos = 2 * pos + 1;
      rightPos = 2 * (pos + 1);
      largestPos = pos;
      if (leftPos < arrayLength && compare(this.array[leftPos], this.array[largestPos])) {
        largestPos = leftPos;
      }
      if (rightPos < arrayLength && compare(this.array[rightPos], this.array[largestPos])) {
        largestPos = rightPos;
      }
      if (largestPos !== pos) {
        _ref = [this.array[largestPos], this.array[pos]], this.array[pos] = _ref[0], this.array[largestPos] = _ref[1];
        return this.maxHeapfy(largestPos, arrayLength);
      }
    };

    return Heap;

  })();

  this.algCoffee = this.algCoffee ? this.algCoffee : {};

  this.algCoffee.Heap = Heap;

}).call(this);
;
/* @author Tayllan Búrigo 2014 */

(function() {
  var bellmanFord;

  bellmanFord = function(graph, startVertex) {
    var i, minimumDistances, source, sourceDistance, target, targetDistance, value, vertex, weight, _i, _j, _len, _ref, _ref1, _ref2, _ref3;
    minimumDistances = {};
    _ref = graph.vertices;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vertex = _ref[_i];
      minimumDistances[vertex] = Infinity;
    }
    minimumDistances[startVertex] = 0.0;
    for (i = _j = 0, _ref1 = graph.amountOfVertices - 1; _j < _ref1; i = _j += 1) {
      _ref2 = graph.edges;
      for (source in _ref2) {
        value = _ref2[source];
        for (target in value) {
          weight = value[target];
          sourceDistance = minimumDistances[source] + weight;
          targetDistance = minimumDistances[target];
          if (sourceDistance < targetDistance) {
            minimumDistances[target] = sourceDistance;
          }
        }
      }
    }
    _ref3 = graph.edges;
    for (source in _ref3) {
      value = _ref3[source];
      for (target in value) {
        weight = value[target];
        sourceDistance = minimumDistances[source] + weight;
        targetDistance = minimumDistances[target];
        if (sourceDistance < targetDistance) {
          return {
            distance: {}
          };
        }
      }
    }
    return {
      distance: minimumDistances
    };
  };

  this.algCoffee = this.algCoffee ? this.algCoffee : {};

  this.algCoffee.bellmanFord = bellmanFord;

}).call(this);
;
/* @author Tayllan Búrigo 2014 */

(function() {
  var depthFirstSearch;

  depthFirstSearch = function(graph) {
    var dfs, finishingTimes, time, vertex, visitedVertices, _i, _len, _ref;
    time = 0;
    visitedVertices = {};
    finishingTimes = {};
    dfs = function(vertex) {
      var roommate, weight, _ref;
      visitedVertices[vertex] = true;
      _ref = graph.getRoommates(vertex);
      for (roommate in _ref) {
        weight = _ref[roommate];
        if (visitedVertices[roommate] === void 0) {
          dfs(roommate);
        }
      }
      finishingTimes[vertex] = time;
      return time += 1;
    };
    _ref = graph.vertices;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vertex = _ref[_i];
      if (visitedVertices[vertex] === void 0) {
        dfs(vertex);
      }
    }
    return finishingTimes;
  };

  this.algCoffee = this.algCoffee ? this.algCoffee : {};

  this.algCoffee.depthFirstSearch = depthFirstSearch;

}).call(this);
;
/* @author Tayllan Búrigo 2014 */

(function() {
  var AdjacencyList, fordFulkerson;

  if (typeof module !== 'undefined') {
    AdjacencyList = require('./../data-structures/adjacency-list').algCoffee.AdjacencyList;
  } else {
    AdjacencyList = algCoffee.AdjacencyList;
  }

  fordFulkerson = function(initialGraph, sourceVertex, sinkVertex) {
    var aux, cloneGraph, eliminateAntiParallelEdges, findAugmentingPath, graph, maximumFlow;
    sourceVertex += '';
    sinkVertex += '';
    cloneGraph = function() {
      var graph, source, target, value, weight, _ref;
      graph = new AdjacencyList;
      _ref = initialGraph.edges;
      for (source in _ref) {
        value = _ref[source];
        for (target in value) {
          weight = value[target];
          graph.addEdge(source, target, weight);
        }
      }
      return graph;
    };
    eliminateAntiParallelEdges = function() {
      var newVertex, source, target, value, weight, _ref, _results;
      _ref = graph.edges;
      _results = [];
      for (source in _ref) {
        value = _ref[source];
        _results.push((function() {
          var _results1;
          _results1 = [];
          for (target in value) {
            weight = value[target];
            if (graph.edges[target][source] !== void 0) {
              newVertex = parseInt(Math.random() * graph.amountOfVertices * 10);
              while (graph.edges[newVertex] !== void 0) {
                newVertex = parseInt(Math.random() * graph.amountOfVertices * 10);
              }
              graph.addEdge(source, newVertex, weight);
              graph.addEdge(newVertex, target, weight);
              _results1.push(graph.deleteEdge(source, target));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        })());
      }
      return _results;
    };
    findAugmentingPath = function(sourceVertex, sinkVertex) {
      var currentVertex, currentVertexRoommates, maximumFlowThroughPath, parent, parents, queue, target, v, visitedVertices, weight;
      parents = {};
      maximumFlowThroughPath = {};
      visitedVertices = {};
      queue = [];
      visitedVertices[sourceVertex] = true;
      queue.push(sourceVertex);
      while (queue.length > 0) {
        currentVertex = queue.shift();
        if (currentVertex === sinkVertex) {
          v = sinkVertex;
          parent = parents[v];
          while (parent !== void 0) {
            graph.edges[parent][v] -= maximumFlowThroughPath[sinkVertex];
            if (graph.edges[parent][v] === 0) {
              graph.deleteEdge(parent, v);
            }
            v = parent;
            parent = parents[parent];
          }
          return maximumFlowThroughPath[sinkVertex];
        }
        currentVertexRoommates = graph.getRoommates(currentVertex);
        for (target in currentVertexRoommates) {
          weight = currentVertexRoommates[target];
          if (visitedVertices[target] === void 0) {
            parents[target] = currentVertex;
            if (maximumFlowThroughPath[currentVertex] === void 0) {
              maximumFlowThroughPath[target] = weight;
            } else {
              maximumFlowThroughPath[target] = Math.min(maximumFlowThroughPath[currentVertex], weight);
            }
            visitedVertices[target] = true;
            queue.push(target);
          }
        }
      }
      return void 0;
    };
    graph = cloneGraph();
    eliminateAntiParallelEdges();
    maximumFlow = 0;
    aux = 0;
    while ((aux = findAugmentingPath(sourceVertex, sinkVertex)) !== void 0) {
      maximumFlow += aux;
    }
    return maximumFlow;
  };

  this.algCoffee = this.algCoffee ? this.algCoffee : {};

  this.algCoffee.fordFulkerson = fordFulkerson;

}).call(this);
;
/* @author Tayllan Búrigo 2014 */

(function() {
  var AdjacencyList, depthFirstSearch, kosaraju;

  if (typeof module !== 'undefined') {
    depthFirstSearch = require('./depth-first-search').algCoffee.depthFirstSearch;
    AdjacencyList = require('./../data-structures/adjacency-list').algCoffee.AdjacencyList;
  } else {
    depthFirstSearch = algCoffee.depthFirstSearch;
    AdjacencyList = algCoffee.AdjacencyList;
  }

  kosaraju = function(graph) {
    var connectedComponents, finishingTime, finishingTimes, mappingComponents, revertGraph, sortedFinishingTimes, vertex, vertexArray, visitedVertices, _i, _len;
    revertGraph = function() {
      var reverseGraph, source, target, value, vertex, weight, _i, _len, _ref, _ref1;
      reverseGraph = new AdjacencyList(graph.directed);
      _ref = graph.vertices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        vertex = _ref[_i];
        reverseGraph.addVertex(vertex);
      }
      _ref1 = graph.edges;
      for (source in _ref1) {
        value = _ref1[source];
        for (target in value) {
          weight = value[target];
          reverseGraph.addEdge(target, source, weight);
        }
      }
      return graph = reverseGraph;
    };
    mappingComponents = function(vertex) {
      var currentVertex, localComponent, stack, weight, _ref;
      stack = [];
      localComponent = [];
      stack.push(vertex);
      while (stack.length > 0) {
        currentVertex = stack.pop();
        visitedVertices[currentVertex] = true;
        localComponent.push(currentVertex);
        _ref = graph.getRoommates(currentVertex);
        for (vertex in _ref) {
          weight = _ref[vertex];
          if (visitedVertices[vertex] === void 0) {
            stack.push(vertex);
          }
        }
      }
      return localComponent;
    };
    finishingTimes = depthFirstSearch(graph);
    sortedFinishingTimes = [];
    for (vertex in finishingTimes) {
      finishingTime = finishingTimes[vertex];
      sortedFinishingTimes.push([vertex, finishingTime]);
    }
    sortedFinishingTimes.sort(function(a, b) {
      return b[1] - a[1];
    });
    connectedComponents = [];
    visitedVertices = {};
    revertGraph();
    for (_i = 0, _len = sortedFinishingTimes.length; _i < _len; _i++) {
      vertexArray = sortedFinishingTimes[_i];
      vertex = vertexArray[0];
      if (visitedVertices[vertex] === void 0) {
        connectedComponents.push(mappingComponents(vertex));
      }
    }
    return connectedComponents;
  };

  this.algCoffee = this.algCoffee ? this.algCoffee : {};

  this.algCoffee.kosaraju = kosaraju;

}).call(this);
;
/* @author Tayllan Búrigo 2014 */

(function() {
  var DisjointSet, kruskal;

  if (typeof module !== 'undefined') {
    DisjointSet = require('./../data-structures/disjoint-set').algCoffee.DisjointSet;
  } else {
    DisjointSet = algCoffee.DisjointSet;
  }

  kruskal = function(graph) {
    var edge, minimumSpanningTree, set, sortedEdges, source, target, value, weight, _i, _len, _ref;
    minimumSpanningTree = 0.0;
    set = new DisjointSet(graph.vertices);
    sortedEdges = [];
    _ref = graph.edges;
    for (source in _ref) {
      value = _ref[source];
      for (target in value) {
        weight = value[target];
        sortedEdges.push([source, target, weight]);
      }
    }
    sortedEdges.sort(function(a, b) {
      return a[2] - b[2];
    });
    for (_i = 0, _len = sortedEdges.length; _i < _len; _i++) {
      edge = sortedEdges[_i];
      if (set.find(edge[0]) !== set.find(edge[1])) {
        minimumSpanningTree += edge[2];
        set.union(edge[0], edge[1]);
      }
    }
    return minimumSpanningTree;
  };

  this.algCoffee = this.algCoffee ? this.algCoffee : {};

  this.algCoffee.kruskal = kruskal;

}).call(this);
;
/* @author Tayllan Búrigo 2014 */

(function() {
  var karatsubaMultiplication;

  karatsubaMultiplication = function(numberA, numberB) {
    var aOne, aTwo, amountOfDigits, amountOfDigitsInA, amountOfDigitsInB, bOne, bTwo, base, result, z0, z1, z2;
    amountOfDigits = function(number) {
      var counter;
      if (number === 0) {
        return 1;
      }
      counter = 0;
      while (parseInt(number) > 0) {
        number /= 10;
        counter += 1;
      }
      while (parseInt(number) < 0) {
        number /= 10;
        counter += 1;
      }
      return counter;
    };
    amountOfDigitsInA = amountOfDigits(numberA);
    amountOfDigitsInB = amountOfDigits(numberB);
    base = parseInt(Math.pow(10, (amountOfDigitsInA <= amountOfDigitsInB ? amountOfDigitsInA : amountOfDigitsInB)) - 1);
    aOne = Math.floor(numberA / base);
    aTwo = parseInt(numberA % base);
    bOne = Math.floor(numberB / base);
    bTwo = parseInt(numberB % base);
    z0 = parseInt(aTwo * bTwo);
    z2 = parseInt(aOne * bOne);
    z1 = parseInt((aOne + aTwo) * (bOne + bTwo) - z0 - z2);
    result = parseInt((z2 * base * base) + (z1 * base) + z0);
    return result;
  };

  this.algCoffee = this.algCoffee ? this.algCoffee : {};

  this.algCoffee.karatsubaMultiplication = karatsubaMultiplication;

}).call(this);
;
/* @author Bruno Roberto Búrigo 2014 */

(function() {
  var insertionSort;

  insertionSort = function(array) {
    var aux, i, j, _i, _ref;
    for (i = _i = 1, _ref = array.length; _i < _ref; i = _i += 1) {
      aux = array[i];
      j = i;
      while (j > 0 && aux < array[j - 1]) {
        array[j] = array[j - 1];
        j -= 1;
      }
      array[j] = aux;
    }
    return array;
  };

  this.algCoffee = this.algCoffee ? this.algCoffee : {};

  this.algCoffee.insertionSort = insertionSort;

}).call(this);
;
/* @author Bruno Roberto Búrigo 2014 */

(function() {
  var mergeSort;

  mergeSort = function(array) {
    var divide, merge;
    divide = function(array) {
      var halfLength, left, leftPart, right, rigthPart;
      if (array.length === 1) {
        return array;
      } else {
        halfLength = Math.floor(array.length / 2);
        leftPart = array.slice(0, halfLength);
        rigthPart = array.slice(halfLength, array.length);
        left = divide(leftPart);
        right = divide(rigthPart);
        return merge(left, right);
      }
    };
    merge = function(leftArray, rightArray) {
      var i, j, leftLength, orderedArray, rigthLength;
      leftLength = leftArray.length;
      rigthLength = rightArray.length;
      orderedArray = [];
      i = 0;
      j = 0;
      while (i < leftLength || j < rigthLength) {
        if (i === leftLength) {
          orderedArray.push(rightArray[j]);
          j += 1;
        } else if (j === rigthLength) {
          orderedArray.push(leftArray[i]);
          i += 1;
        } else if (leftArray[i] <= rightArray[j]) {
          orderedArray.push(leftArray[i]);
          i += 1;
        } else if (rightArray[j] < leftArray[i]) {
          orderedArray.push(rightArray[j]);
          j += 1;
        }
      }
      return orderedArray;
    };
    return divide(array);
  };

  this.algCoffee = this.algCoffee ? this.algCoffee : {};

  this.algCoffee.mergeSort = mergeSort;

}).call(this);
;
/* @author Bruno Roberto Búrigo 2014 */

(function() {
  var radixSort;

  radixSort = function(array) {
    var auxArray, digit, dividedBy, dividedValue, index, l, list, maxNumberOfDigits, maxValue, value, x, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m;
    maxValue = array[0];
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      value = array[_i];
      if (value > maxValue) {
        maxValue = value;
      }
    }
    maxNumberOfDigits = 0;
    while (maxValue !== 0) {
      maxNumberOfDigits += 1;
      maxValue = Math.floor(maxValue / 10);
    }
    dividedBy = 1;
    for (x = _j = 0; 0 <= maxNumberOfDigits ? _j < maxNumberOfDigits : _j > maxNumberOfDigits; x = 0 <= maxNumberOfDigits ? ++_j : --_j) {
      auxArray = (function() {
        var _k, _results;
        _results = [];
        for (l = _k = 0; _k < 10; l = ++_k) {
          _results.push([]);
        }
        return _results;
      })();
      for (_k = 0, _len1 = array.length; _k < _len1; _k++) {
        value = array[_k];
        dividedValue = Math.floor(value / dividedBy);
        digit = dividedValue % 10;
        auxArray[digit].push(value);
      }
      index = 0;
      for (_l = 0, _len2 = auxArray.length; _l < _len2; _l++) {
        list = auxArray[_l];
        for (_m = 0, _len3 = list.length; _m < _len3; _m++) {
          value = list[_m];
          array[index] = value;
          index += 1;
        }
      }
      dividedBy *= 10;
    }
    return array;
  };

  this.algCoffee = this.algCoffee ? this.algCoffee : {};

  this.algCoffee.radixSort = radixSort;

}).call(this);
;
/* @author Tayllan Búrigo 2014 */


/*
    @param{Array} the first sequence (of chars or ints)
    @param{Array} the second sequence (of chars or ints)
    @param{Boolean, optional}
    @return{String or Integer}
        if the Boolean parameter is TRUE
            returns the Longest Common Subsequence in a String
            e.g.: 'abc'
        else
            returns the size of the LCS
            e.g.: 3
 */

(function() {
  var longestCommonSubsequence;

  longestCommonSubsequence = function(firstSequence, secondSequence, reconstructSubsequence) {
    var firstLength, lcsSize, reconstructLcs, secondLength;
    if (reconstructSubsequence == null) {
      reconstructSubsequence = false;
    }
    firstLength = firstSequence.length;
    secondLength = secondSequence.length;
    lcsSize = function() {
      var charFirstSequence, i, previousLine, previousValue, _i, _j, _k, _len, _ref;
      previousLine = [];
      for (i = _i = 0; _i <= secondLength; i = _i += 1) {
        previousLine[i] = 0;
      }
      for (_j = 0, _len = firstSequence.length; _j < _len; _j++) {
        charFirstSequence = firstSequence[_j];
        previousValue = 0;
        for (i = _k = 1; _k <= secondLength; i = _k += 1) {
          if (charFirstSequence === secondSequence[i - 1]) {
            _ref = [previousValue + 1, previousLine[i]], previousLine[i] = _ref[0], previousValue = _ref[1];
          } else {
            previousValue = previousLine[i];
            previousLine[i] = Math.max(previousLine[i - 1], previousLine[i]);
          }
        }
      }
      return previousLine[secondLength];
    };
    reconstructLcs = function() {
      var dynamicTable, i, j, subsequence, _i, _j, _k, _l;
      dynamicTable = [];
      for (i = _i = 0; _i <= firstLength; i = _i += 1) {
        dynamicTable.push([]);
        for (j = _j = 0; _j <= secondLength; j = _j += 1) {
          dynamicTable[i].push(0);
        }
      }
      for (i = _k = 1; _k <= firstLength; i = _k += 1) {
        for (j = _l = 1; _l <= secondLength; j = _l += 1) {
          if (firstSequence[i - 1] === secondSequence[j - 1]) {
            dynamicTable[i][j] = dynamicTable[i - 1][j - 1] + 1;
          } else {
            dynamicTable[i][j] = Math.max(dynamicTable[i - 1][j], dynamicTable[i][j - 1]);
          }
        }
      }
      subsequence = [];
      i = firstLength;
      j = secondLength;
      while (i > 0 && j > 0) {
        if (firstSequence[i - 1] === secondSequence[j - 1]) {
          subsequence.push(firstSequence[i - 1]);
          i -= 1;
          j -= 1;
        } else {
          if (dynamicTable[i - 1][j] >= dynamicTable[i][j - 1]) {
            i -= 1;
          } else {
            j -= 1;
          }
        }
      }
      return subsequence.reverse().join('');
    };
    if (reconstructSubsequence) {
      return reconstructLcs();
    } else {
      return lcsSize();
    }
  };

  this.algCoffee = this.algCoffee ? this.algCoffee : {};

  this.algCoffee.longestCommonSubsequence = longestCommonSubsequence;

}).call(this);
