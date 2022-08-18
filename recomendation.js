// 1. array and strings
// 2. First Unique Character in a String
// 3. Number of Islands
// 4. Cut Off Trees for Golf Event
// 5. Flood Fill
// 6. Lowest Common Ancestor of a Binary Tree
// 7. Diameter of Binary Tree
// 8. Flood Fill
// 9. Kth Largest Element in an Array
// 10. Best Time to Buy and Sell Stock
// 11. LRU Cache
// 12. Prison Cells After N Days

// array and strings
// Integer to English Words
const numberToWords = function (num) {
    const numsMap = {
        1: 'One',
        2: 'Two',
        3: 'Three',
        4: 'Four',
        5: 'Five',
        6: 'Six',
        7: 'Seven',
        8: 'Eight',
        9: 'Nine',
        10: 'Ten',
        11: 'Eleven',
        12: 'Twelve',
        13: 'Thirteen',
        14: 'Fourteen',
        15: 'Fifteen',
        16: 'Sixteen',
        17: 'Seventeen',
        18: 'Eighteen',
        19: 'Nineteen',
        20: 'Twenty',
        30: 'Thirty',
        40: 'Forty',
        50: 'Fifty',
        60: 'Sixty',
        70: 'Seventy',
        80: 'Eighty',
        90: 'Ninety',
    };

    const getNumBefore1000 = (num) => {
        let rest = num;
        let div = Math.floor(rest / 100);
        let result = '';

        if (div > 0) {
            rest = rest % 100;
            result += ` ${numsMap[div]} Hundred`;
        }

        div = Math.floor(rest / 10);

        if (div > 0) {
            if (div === 1) {
                result += ` ${numsMap[rest]}`;
                return result;
            } else {
                rest = rest % 10;
                result += ` ${numsMap[div * 10]}`;
            }
        }

        return rest ? `${result} ${numsMap[rest]}` : result;
    };

    let result = '';
    let rest = num;
    let div;

    [
        [1000000000, 'Billion'],
        [1000000, 'Million'],
        [1000, 'Thousand'],
    ].forEach(([number, name]) => {
        div = Math.floor(rest / number);

        if (div > 0) {
            result += `${getNumBefore1000(div)} ${name}`;

            rest = rest % number;
        }
    });

    return rest
        ? `${result}${getNumBefore1000(rest)}`.trim()
        : result.trim() || 'Zero';
};

// First Unique Character in a String
//Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.
const firstUniqChar = function (s) {
    const hashMap = new Map();

    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        hashMap.set(c, (hashMap.get(c) ?? 0) + 1);
    }

    for (let i = 0; i < s.length; i++) {
        if (hashMap.get(s[i]) === 1) {
            return i;
        }
    }

    return -1;
};
// Input: s = "leetcode"
// Output: 0

// Tree graphs

// Number of Islands

const numIslands = function (grid) {
    let islands = 0;
    function dfs(i, j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
            return;
        }

        if (grid[i][j] === '1') {
            grid[i][j] = '0';

            dfs(i + 1, j);
            dfs(i - 1, j);
            dfs(i, j + 1);
            dfs(i, j - 1);
        }
    }

    if (!grid || !grid.length) {
        return 0;
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '1') {
                islands++;
                dfs(i, j);
            }
        }
    }

    return islands;
};

// numIslands([
//     ['1', '1', '0', '0', '0'],
//     ['1', '1', '0', '0', '0'],
//     ['0', '0', '1', '0', '0'],
//     ['0', '0', '0', '1', '1'],
// ]);

// Lowest Common Ancestor of a Binary Tree
const lowestCommonAncestor = function (root, p, q) {
    const stack = [root];
    const parent = new WeakMap();

    parent.set(root, null);

    while (!parent.has(p) || !parent.has(q)) {
        const node = stack.pop();

        if (node.left) {
            parent.set(node.left, node);
            stack.push(node.left);
        }

        if (node.right) {
            parent.set(node.right, node);
            stack.push(node.right);
        }
    }

    const ancestors = new Set();

    while (p) {
        ancestors.add(p);
        p = parent.get(p);
    }

    while (!ancestors.has(q)) {
        q = parent.get(q);
    }

    return q;
};
// const root2 = new TreeNode(3);
// root2.left = new TreeNode(5);
// root2.right = new TreeNode(1);
// root2.left.left = new TreeNode(6);
// root2.left.right = new TreeNode(2);
// root2.right.left = new TreeNode(0);
// root2.right.right = new TreeNode(8);
// root2.left.right.left = new TreeNode(7);
// root2.left.right.right = new TreeNode(4);
// lowestCommonAncestor(root2, root2.left, root2.right);

// Diameter of Binary Tree
// Given the root of a binary tree, return the length of the diameter of the tree.

// The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

// The length of a path between two nodes is represented by the number of edges between them.
const diameterOfBinaryTree = function (root) {
    function height(root) {
        if (!root) {
            return 0;
        }

        const leftH = height(root.left);
        const rightH = height(root.right);

        return 1 + Math.max(leftH, rightH);
    }

    if (!root) {
        return 0;
    }

    const leftH = height(root.left);
    const rightH = height(root.right);

    const leftD = diameterOfBinaryTree(root.left);
    const rightD = diameterOfBinaryTree(root.right);

    // if needs nodes count , uncomment
    // return Math.max(1 + leftH + rightH, Math.max(leftD, rightD));
    // count of edges
    return Math.max(leftH + rightH, Math.max(leftD, rightD));
};

const root3 = new TreeNode(1);
root3.left = new TreeNode(2);
root3.right = new TreeNode(3);
root3.left.left = new TreeNode(4);
root3.left.right = new TreeNode(5);

// console.log(diameterOfBinaryTree(root3));

//  Cut Off Trees for Golf Event
const cutOffTree = function (forest) {
    // forest[0][0] = 0;
    // const cellsWithTrees = forest.reduce(
    //     (cells, row) =>
    //         cells +
    //         row.reduce(
    //             (cellsIRow, cell) => (cell > 0 ? cellsIRow + 1 : cellsIRow),
    //             0
    //         ),
    //     0
    // );
    // let x = 0;
    // let y = 0;
    // let stepCount = 0;
    // while (forest[y]?.[x] !== undefined) {
    //     const n = y + 1;
    //     const s = y - 1;
    //     const w = x - 1;
    //     const e = x + 1;
    //     const steps = [
    //         [y, e],
    //         [s, x],
    //         [n, x],
    //         [y, w],
    //     ];
    //     let nextStep = [Infinity, null];
    //     // let openStep = null;
    //     for (const [y, x] of steps) {
    //         if (!forest[y]?.[x]) {
    //             continue;
    //         }
    //         if (forest[y][x] === 1) {
    //             continue;
    //         }
    //         // if (forest[y][x] === 1) {
    //         //     openStep = [y, x];
    //         //     continue;
    //         // }
    //         if (forest[y][x] < nextStep[0]) {
    //             nextStep = [forest[y][x], [y, x]];
    //             stepCount += 1;
    //         }
    //     }
    //     if (!nextStep[1]) {
    //         break;
    //     }
    //     [y, x] = nextStep[1];
    //     forest[y][x] = 1;
    // }
    // if (stepCount !== cellsWithTrees) {
    //     return -1;
    // }
    // return cellsWithTrees;

    // def cutOffTree(self, forest):
    //     trees = sorted((v, r, c) for r, row in enumerate(forest)
    //                 for c, v in enumerate(row) if v > 1)
    //     sr = sc = ans = 0
    //     for _, tr, tc in trees:
    //         d = dist(forest, sr, sc, tr, tc)
    //         if d < 0: return -1
    //         ans += d
    //         sr, sc = tr, tc
    //     return ans

    let trees = [];

    for (let r = 0; r < forest.length; r++) {
        for (let c = 0; c < forest[0].length; c++) {
            const v = forest[r][c];
            if (v > 1) {
                trees.push([v, r, c]);
            }
        }
    }

    trees = trees.sort((a, b) => a[0] - b[0]);

    let sr = 0;
    let sc = 0;
    let ans = 0;

    for (const [, tr, tc] of trees) {
        const a = sr - tr;
        const b = sc - tc;

        const d = Math.sqrt(a * a + b * b);

        if (d < 0) {
            return -1;
        }

        ans += d;

        [sr, sc] = [tr, tc];
    }

    return ans;
};

// Flood Fill
const floodFill = function (image, sr, sc, color) {
    const R = image.length;
    const C = image[0].length;
    const oldColor = image[sr][sc];

    if (color === oldColor) {
        return image;
    }

    function dfs(r, c) {
        if (image[r][c] === oldColor) {
            image[r][c] = color;
            r >= 1 && dfs(r - 1, c);
            r + 1 < R && dfs(r + 1, c);
            c >= 1 && dfs(r, c - 1);
            c + 1 < C && dfs(r, c + 1);
        }
    }

    dfs(sr, sc);
    return image;
};

// Sorting and Search
// Kth Largest Element in an Array
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest = function (nums, k) {
    return nums.sort((a, b) => a - b)[nums.length - 1 - k];
};

// console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));
// console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
// Dynamic programming
// Best Time to Buy and Sell Stock
/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices) {
    let i = 0;
    let j = 1;
    let max = 0;

    while (j < prices.length) {
        if (prices[i] > prices[j]) {
            i = j;
            j = i + 1;
            continue;
        }

        max = Math.max(max, prices[j] - prices[i]);

        j++;
    }

    return max;
};

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

// Prison Cells After N Days

/**
 * @param {number[]} cells
 * @param {number} n
 * @return {number[]}
 */
const prisonAfterNDays = function (cells, n) {
    let k = 0;
    const set = new Set();

    while (k < n) {
        let prev;

        if (k === 14 + (n % 14)) {
            break;
        }

        for (let i = 1; i < cells.length - 1; i++) {
            const n1 = prev ?? cells[i - 1];
            const n2 = cells[i + 1];

            prev = cells[i];
            cells[i] = n1 === n2 ? 1 : 0;
        }

        if (!k) {
            cells[0] = 0;
            cells[cells.length - 1] = 0;
        }

        set.add(cells + '');

        k++;
    }
    // console.log(set);
    return cells;
};

// console.log(prisonAfterNDays([1, 0, 0, 1, 0, 0, 1, 0], 1000000000));
