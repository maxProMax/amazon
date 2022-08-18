// 1. Integer to English Words
// 2. First Unique Character in a String
// 3. Number of Islands
// 4. Kth Largest Element in an Array
// 5. Best Time to Buy and Sell Stock
// 6. LRU Cache
// 7. Prison Cells After N Days

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
