// LRU Cache
// Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

// Implement the LRUCache class:

// LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
// int get(int key) Return the value of the key if the key exists, otherwise return -1.
// void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
//  The functions get and put must each run in O(1) average time complexity.
/**
 * @param {number} capacity
 */
const LRUCache = function (capacity) {
    this.capacity = capacity;

    this.hasMap = new Map();
    this.head = null;
    this.tail = null;
};

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    const node = this.hasMap.get(key);

    if (node === this.tail) {
        const head = this.tail;
        const tail = this.tail.prev;

        if (!tail) {
            return this.head.value;
        }

        head.next = this.head;
        head.prev = null;

        this.head.prev = head;
        this.head = head;

        tail.next = null;
        this.tail = tail;
    } else if (node && node !== this.head) {
        node.prev.next = node.next;
        node.next.prev = node.prev;

        const head = node;
        head.next = this.head;
        head.prev = null;

        this.head.prev = head;
        this.head = head;
    }

    return !node ? -1 : this.head.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    if (!this.head) {
        const node = new Node(key, value);
        this.head = node;
        this.tail = node;

        this.hasMap.set(key, node);

        this.capacity--;
    } else {
        let node = this.hasMap.get(key);

        if (node) {
            node.value = value;
        }

        if (node === this.tail) {
            const head = this.tail;
            const tail = this.tail.prev;

            if (!tail) {
                return this.head.value;
            }

            head.next = this.head;
            this.head.prev = head;
            head.prev = null;

            this.head = head;
            this.tail = tail;
        } else if (node && node !== this.head) {
            node.prev.next = node.next;
            node.next.prev = node.prev;

            const head = node;
            head.next = this.head;
            head.prev = null;

            this.head.prev = head;
            this.head = head;
        } else if (!node) {
            node = new Node(key, value);

            this.head.prev = node;
            node.next = this.head;
            this.head = node;

            this.hasMap.set(key, node);

            if (!this.capacity) {
                this.hasMap.delete(this.tail.key);
                this.tail = this.tail.prev;
                this.tail.next = null;
            } else {
                this.capacity--;
            }
        }
    }

    return null;
};

/**
 * Your LRUCache object will be instantiated and called as such:
 */
// const obj = new LRUCache(2);
// const param_1 = obj.get(1);
// obj.put(1, 1);

// console.log(obj);
// console.log(obj.get(2));

// const a = [
//     'LRUCache',
//     'put',
//     'put',
//     'put',
//     'put',
//     'get',
//     'get',
//     'get',
//     'get',
//     'put',
//     'get',
//     'get',
//     'get',
//     'get',
//     'get',
// ];
// const b = [
//     [3],
//     [1, 1],
//     [2, 2],
//     [3, 3],
//     [4, 4],
//     [4],
//     [3],
//     [2],
//     [1],
//     [5, 5],
//     [1],
//     [2],
//     [3],
//     [4],
//     [5],
// ];

// const a = ['LRUCache', 'get', 'put', 'get', 'put', 'put', 'get', 'get'];

// const b = [[2], [2], [2, 6], [1], [1, 5], [1, 2], [1], [2]];

// let obj;

// a.forEach((operation, i) => {
//     if (operation === 'LRUCache') {
//         obj = new LRUCache(...b[i]);
//         console.log(obj);
//     } else {
//         console.log(obj[operation](...b[i]));
//     }
// });

//  Input
//  ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
//  [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
//  Output
//  [null, null, null, 1, null, -1, null, -1, 3, 4]

//  Explanation
//  LRUCache lRUCache = new LRUCache(2);
//  lRUCache.put(1, 1); // cache is {1=1}
//  lRUCache.put(2, 2); // cache is {1=1, 2=2}
//  lRUCache.get(1);    // return 1
//  lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
//  lRUCache.get(2);    // returns -1 (not found)
//  lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
//  lRUCache.get(1);    // return -1 (not found)
//  lRUCache.get(3);    // return 3
//  lRUCache.get(4);    // return 4

class Node_2 {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.min = Infinity;
    }
}

// Min Stack
const MinStack = function () {
    this.head = null;
    this.stack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
    // List version also works properly
    // const node = new Node_2(val);

    // if (!this.head) {
    //     this.head = node;
    //     this.head.min = val;
    // } else {
    //     node.min = Math.min(val, this.head.min);
    //     node.next = this.head;
    //     this.head = node;
    // }

    if (!this.stack.length) {
        this.stack.push([val, val]);
    } else {
        const min = Math.min(val, this.stack[0][1]);
        this.stack.unshift([val, min]);
    }

    return null;
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    // this.head = this.head.next;
    this.stack.shift();
    return null;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this.stack[0][0];
    // return this.head.value;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    return this.stack[0][1];
    // return this.head.min;
};

// const a = [
//     'MinStack',
//     'push',
//     'push',
//     'push',
//     'top',
//     'pop',
//     'getMin',
//     'pop',
//     'getMin',
//     'pop',
//     'push',
//     'top',
//     'getMin',
//     'push',
//     'top',
//     'getMin',
//     'pop',
//     'getMin',
// ];
// const b = [
//     [],
//     [2147483646],
//     [2147483646],
//     [2147483647],
//     [],
//     [],
//     [],
//     [],
//     [],
//     [],
//     [2147483647],
//     [],
//     [],
//     [-2147483648],
//     [],
//     [],
//     [],
//     [],
// ];
// [
//     null,
//     null,
//     null,
//     null,
//     2147483647,
//     null,
//     2147483646,
//     null,
//     2147483646,
//     null,
//     null,
//     2147483647,
//     2147483647,
//     null,
//     -2147483648,
//     -2147483648,
//     null,
//     2147483647,
// ];

// let obj;

// a.forEach((operation, i) => {
//     if (operation === 'MinStack') {
//         obj = new MinStack();
//         console.log(obj);
//     } else {
//         console.log(obj[operation](...b[i]));
//     }
// });

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

//  Input
//  ["MinStack","push","push","push","getMin","pop","top","getMin"]
//  [[],[-2],[0],[-3],[],[],[],[]]

//  Output
//  [null,null,null,null,-3,null,0,-2]

//  Explanation
//  MinStack minStack = new MinStack();
//  minStack.push(-2);
//  minStack.push(0);
//  minStack.push(-3);
//  minStack.getMin(); // return -3
//  minStack.pop();
//  minStack.top();    // return 0
//  minStack.getMin(); // return -2

// Find Median from Data Stream

const MedianFinder = function () {
    this.array = [];
    this.median = [0];
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    // this.array = this.array.sort((a, b) => a - b);

    if (!this.array.length) {
        this.array.push(num);
        return null;
    }

    for (let i = 0; i < this.array.length; i++) {
        if (this.array[i] > num) {
            this.array.splice(i, 0, num);
            break;
        }

        if (i + 1 === this.array.length) {
            this.array.push(num);
            break;
        }
    }

    const l = this.array.length;

    if (l === 2) {
        this.median = [0, 1];
    } else if (l > 2) {
        const val = Math.floor(l / 2);

        this.median = l % 2 ? [val] : [val - 1, val];
    }

    return null;
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
    const [a, b] = this.median;
    return this.median.length > 1
        ? (this.array[a] + this.array[b]) / 2
        : this.array[a];
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

// Input
// ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
// [[], [1], [2], [], [3], []]
// Output
// [null, null, null, 1.5, null, 2.0]

// Explanation
// MedianFinder medianFinder = new MedianFinder();
// medianFinder.addNum(1);    // arr = [1]
// medianFinder.addNum(2);    // arr = [1, 2]
// medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
// medianFinder.addNum(3);    // arr[1, 2, 3]
// medianFinder.findMedian(); // return 2.0

// const a = [
//     'MedianFinder',
//     'addNum',
//     'findMedian',
//     'addNum',
//     'findMedian',
//     'addNum',
//     'findMedian',
//     'addNum',
//     'findMedian',
//     'addNum',
//     'findMedian',
//     'addNum',
//     'findMedian',
//     'addNum',
//     'findMedian',
//     'addNum',
//     'findMedian',
//     'addNum',
//     'findMedian',
//     'addNum',
//     'findMedian',
//     'addNum',
//     'findMedian',
// ];

// const b = [
//     [],
//     [6],
//     [],
//     [10],
//     [],
//     [2],
//     [],
//     [6],
//     [],
//     [5],
//     [],
//     [0],
//     [],
//     [6],
//     [],
//     [3],
//     [],
//     [1],
//     [],
//     [0],
//     [],
//     [0],
//     [],
// ];
// let obj;

// a.forEach((operation, i) => {
//     if (operation === 'MedianFinder') {
//         obj = new MedianFinder();
//         console.log(obj);
//     } else {
//         console.log(obj[operation](...b[i]));
//     }
// });

// Serialize and Deserialize Binary Tree
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/*
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
const serialize = function (root) {
    const result = [];

    function recursion(node) {
        if (!node) {
            result.push(null);
            return null;
        }

        result.push(node.val);

        recursion(node.left);
        recursion(node.right);
    }

    recursion(root);

    return result;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */

const deserialize = function (data) {
    function recursion(val) {
        if (val === null) {
            return null;
        }

        const node = new TreeNode(val);
        node.left = recursion(data.shift());
        node.right = recursion(data.shift());
        return node;
    }

    return recursion(data.shift());
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

// const root = new TreeNode(1);
// root.left = new TreeNode(2);
// root.right = new TreeNode(3);
// root.right.left = new TreeNode(4);
// root.right.right = new TreeNode(5);

// console.log(deserialize(serialize(root)));

// Design Tic-Tac-Toe
/**
 * @param {number} n
 */
const TicTacToe = function (n) {
    this.board = Array(n)
        .fill(null)
        .map(() => Array(n).fill(null));

    this.size = n;
    this.rows = Array(n).fill(0);
    this.cols = Array(n).fill(0);
    this.diagonal = 0;
    this.anti_diagonal = 0;
    this.isWinner = null;
};

/**
 * @param {number} row
 * @param {number} col
 * @param {number} player
 * @return {number}
 */
TicTacToe.prototype.move = function (row, col, player) {
    const { board, size, isWinner } = this;

    if (isWinner) {
        return isWinner;
    }

    // if (!board[row][col]) {
    //     if (row === col) {
    //         if (!this.diagonal) {
    //             this.diagonal = { player, steps: size - 1 };
    //         } else if (this.diagonal.player === player) {
    //             let { steps } = this.diagonal || {};

    //             steps--;

    //             this.diagonal = { player, steps };

    //             if (!steps) {
    //                 this.isWinner = player;
    //                 return player;
    //             }
    //         }
    //     }

    //     if (size - row - 1 === col) {
    //         if (!this.anti_diagonal) {
    //             this.anti_diagonal = { player, steps: size - 1 };
    //         } else if (this.anti_diagonal.player === player) {
    //             let { steps } = this.anti_diagonal || {};

    //             steps--;

    //             this.anti_diagonal = { player, steps };

    //             if (!steps) {
    //                 this.isWinner = player;
    //                 return player;
    //             }
    //         }
    //     }

    //     if (!this.rows[row] || this.rows[row].player === player) {
    //         let { steps = size } = this.rows[row] || {};

    //         steps--;

    //         this.rows[row] = { player, steps };

    //         if (!steps) {
    //             this.isWinner = player;
    //             return player;
    //         }
    //     }

    //     if (!this.cols[col] || this.cols[col].player === player) {
    //         let { steps = size } = this.cols[col] || {};

    //         steps--;

    //         this.cols[col] = { player, steps };

    //         if (!steps) {
    //             this.isWinner = player;
    //             return player;
    //         }
    //     }

    //     board[row][col] = player;
    // }

    const isFirst = player === 1;
    this.rows[row] += isFirst ? 1 : -1;
    this.cols[col] += isFirst ? 1 : -1;

    if (row === col) {
        this.diagonal += isFirst ? 1 : -1;
    }

    if (size - row - 1 === col) {
        this.anti_diagonal += isFirst ? 1 : -1;
    }

    if (
        Math.abs(this.rows[row]) === size ||
        Math.abs(this.cols[col]) === size ||
        Math.abs(this.diagonal) === size ||
        Math.abs(this.anti_diagonal) === size
    ) {
        this.isWinner = player;
        return player;
    }

    return 0;
};

/**
 * Your TicTacToe object will be instantiated and called as such:
 * var obj = new TicTacToe(n)
 * var param_1 = obj.move(row,col,player)
 */

//  Input
//  ["TicTacToe", "move", "move", "move", "move", "move", "move", "move"]
//
//  Output
//  [null, 0, 0, 0, 0, 0, 0, 1]

// const a = ['TicTacToe', 'move', 'move', 'move'];

// const b = [[2], [0, 1, 2], [1, 0, 1], [1, 1, 2]];
// let obj;
// a.forEach((operation, i) => {
//     if (operation === 'TicTacToe') {
//         obj = new TicTacToe(...b[i]);
//         console.log(obj);
//     } else {
//         console.log(obj[operation](...b[i]));
//     }
// });

// Design Search Autocomplete System

/**
 * @param {string[]} sentences
 * @param {number[]} times
 */
const AutocompleteSystem = function (sentences, times) {
    this.sentences = sentences;
    this.times = times;
    this.word = '';
    this.prevResult = null;
    this.sortData();
};

AutocompleteSystem.prototype.sortData = function (c) {
    this.data = this.sentences
        .map((item, i) => [item, this.times[i]])
        .sort((a, b) =>
            a[1] === b[1] ? a[0].localeCompare(b[0]) : b[1] - a[1]
        );

    this.sentences = this.data.map((item) => item[0]);
    this.times = this.data.map((item) => item[1]);
    this.prevResult = this.sentences;
};

AutocompleteSystem.prototype.addSentence = function () {
    const index = this.sentences.indexOf(this.word);
    if (index > -1) {
        this.times[index] += 1;
    } else {
        this.sentences.push(this.word);
        this.times.push(1);
    }

    this.word = '';
    this.sortData();
};

/**
 * @param {character} c
 * @return {string[]}
 */
AutocompleteSystem.prototype.input = function (c) {
    if (c === '#') {
        this.addSentence();
        return [];
    }

    this.word += c;

    const result = [];

    for (let i = 0; i < this.prevResult.length; i++) {
        const sentence = this.prevResult[i];

        if (!sentence.indexOf(this.word)) {
            result.push(sentence);
        }
    }

    this.prevResult = result;

    return result.slice(0, 3);
};

/**
 * Your AutocompleteSystem object will be instantiated and called as such:
 * var obj = new AutocompleteSystem(sentences, times)
 * var param_1 = obj.input(c)
 */

//  Input
//  ["AutocompleteSystem", "input", "input", "input", "input"]
//  [[["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]], ["i"], [" "], ["a"], ["#"]]
//  Output
//  [null, ["i love you", "island", "i love leetcode"], ["i love you", "i love leetcode"], [], []]

//  Explanation
//  AutocompleteSystem obj = new AutocompleteSystem(["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]);
//  obj.input("i"); // return ["i love you", "island", "i love leetcode"]. There are four sentences that have prefix "i". Among them, "ironman" and "i love leetcode" have same hot degree. Since ' ' has ASCII code 32 and 'r' has ASCII code 114, "i love leetcode" should be in front of "ironman". Also we only need to output top 3 hot sentences, so "ironman" will be ignored.
//  obj.input(" "); // return ["i love you", "i love leetcode"]. There are only two sentences that have prefix "i ".
//  obj.input("a"); // return []. There are no sentences that have prefix "i a".
//  obj.input("#"); // return []. The user finished the input, the sentence "i a" should be saved as a historical sentence in system. And the following input will be counted as a new search.

// const a = ['AutocompleteSystem', 'input', 'input', 'input', 'input'];
// const b = [
//     [
//         ['i love you', 'island', 'iroman', 'i love leetcode'],
//         [5, 3, 2, 2],
//     ],
//     ['i'],
//     [' '],
//     ['a'],
//     ['#'],
// ];
// let obj;
// a.forEach((operation, i) => {
//     if (operation === 'AutocompleteSystem') {
//         obj = new AutocompleteSystem(...b[i]);
//         console.log(obj);
//     } else {
//         console.log(obj[operation](...b[i]));
//     }
// });

// Maximum Frequency Stack

[
    [5, 1, 1],
    [4, 1, 1],
    [5, 2, 2],
    [7, 1, 2],
    [5, 3, 3],
    [7, 2, 3],
];

const FreqStack = function () {
    this.stack = [];
    this.itemFrequency = {};
    this.frequencyMap = {};
    this.maxFrequency = -Infinity;
};

/**
 * @param {number} val
 * @return {void}
 */
FreqStack.prototype.push = function (val) {
    const frequency = (this.itemFrequency[val] || 0) + 1;
    const maxFrequency = Math.max(this.maxFrequency, frequency);

    this.maxFrequency = maxFrequency;

    this.frequencyMap[frequency] = (this.frequencyMap[frequency] || 0) + 1;

    this.itemFrequency[val] = frequency;
    this.stack.push([val, frequency, maxFrequency]);

    return null;
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function () {
    let resultVal;
    let count = this.frequencyMap[this.maxFrequency];

    count -= 1;

    for (let l = this.stack.length - 1; l >= 0; l--) {
        const [val, frequency, maxFrequency] = this.stack[l];

        if (frequency === maxFrequency) {
            this.stack.splice(l, 1);

            resultVal = val;
            this.itemFrequency[val] -= 1;

            break;
        } else {
            this.stack[l] = [val, frequency, maxFrequency - (!count ? 1 : 0)];
        }
    }

    if (!count) {
        delete this.frequencyMap[this.maxFrequency];
        this.maxFrequency -= 1;
    } else {
        this.frequencyMap[this.maxFrequency] = count;
    }

    return resultVal;
};

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */

// const a = [
//     'FreqStack',
//     'push',
//     'push',
//     'push',
//     'push',
//     'push',
//     'push',
//     'pop',
//     'push',
//     'pop',
//     'push',
//     'pop',
//     'push',
//     'pop',
//     'push',
//     'pop',
//     'pop',
//     'pop',
//     'pop',
//     'pop',
//     'pop',
// ];

// const b = [
//     [],
//     [6],
//     [8],
//     [6],
//     [6],
//     [8],
//     [9],
//     [],
//     [8],
//     [],
//     [9],
//     [],
//     [8],
//     [],
//     [8],
//     [],
//     [],
//     [],
//     [],
//     [],
//     [],
// ];
// let obj;
// a.forEach((operation, i) => {
//     if (operation === 'FreqStack') {
//         obj = new FreqStack(...b[i]);
//         console.log(obj);
//     } else {
//         console.log(obj[operation](...b[i]));
//     }
// });
