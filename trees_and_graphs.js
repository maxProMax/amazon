import { createList } from './data-structures/list';
// Binary Search Tree
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

const isValidBST = function (root) {
    // function validate(node, low = -Infinity, high = Infinity) {
    //     if (!node) {
    //         return true;
    //     }

    //     if (node.val <= low || node.val >= high) {
    //         return false;
    //     }

    //     return (
    //         validate(node.left, low, node.val) &&
    //         validate(node.right, node.val, high)
    //     );
    // }

    // return validate(root);

    if (!root) {
        return true;
    }

    const stack = [[root, -Infinity, Infinity]];

    while (stack.length) {
        const [node, low, high] = stack.pop();

        if (!node) {
            continue;
        }

        const val = node.val;

        if (val <= low || val >= high) {
            return false;
        }

        stack.push([node.left, low, val]);
        stack.push([node.right, val, high]);
    }
};
// Binary Tree Level Order Traversal
const levelOrderAmazon = function (root) {
    const queue = [];
    const result = [];
    let level = [];

    root && queue.push(root, null);

    while (queue.length) {
        const node = queue.shift();

        if (node) {
            level.push(node.val);
        } else {
            result.push(level);
            level = [];

            if (!queue.length) {
                break;
            }

            queue.push(null);

            continue;
        }

        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
    }

    return result;
};
// /Symmetric Tree
function isMirror(r1, r2) {
    if (!r1 && !r2) {
        return true;
    }

    if (!r1 || !r2) {
        return false;
    }

    return (
        r1.val === r2.val &&
        isMirror(r1.left, r2.right) &&
        isMirror(r1.right, r2.left)
    );
}
const isSymmetric = function (root) {
    return isMirror(root, root);
};

// Binary Tree Zigzag Level Order Traversal
const zigzagLevelOrder = function (root) {
    const queue = [];
    const result = [];
    let level = [];
    let direction = true;

    root && queue.push(root, null);

    while (queue.length) {
        const node = queue.shift();

        if (node) {
            direction ? level.push(node.val) : level.unshift(node.val);
        } else {
            direction = !direction;
            result.push(level);
            level = [];

            if (!queue.length) {
                break;
            }

            queue.push(null);

            continue;
        }

        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
    }

    return result;
};
// Binary Tree Maximum Path Sum
const maxPathSum = function (root) {
    let sum = -Infinity;

    function maxGain(root) {
        if (!root) {
            return 0;
        }

        const leftGain = Math.max(maxGain(root.left), 0);
        const rightGain = Math.max(maxGain(root.right), 0);

        const newPrice = root.val + leftGain + rightGain;

        sum = Math.max(sum, newPrice);

        return root.val + Math.max(leftGain, rightGain);
    }

    maxGain(root);

    return sum;
};

function createTree(arr) {
    let root;

    arr.forEach((val) => {
        if (!root) {
            root = new TreeNode(val);
        } else {
            let next = root;
            while (next) {
                if (val < next.val) {
                    if (!next.left) {
                        next.left = new TreeNode(val);
                        break;
                    } else {
                        next = next.left;
                    }
                } else {
                    if (!next.right) {
                        next.right = new TreeNode(val);
                        break;
                    } else {
                        next = next.right;
                    }
                }
            }
        }
    });

    return root;
}

//  const root = new TreeNode(5);
//  root.left = new TreeNode(4);
// root.right = new TreeNode(6);
// root.right.left = new TreeNode(3);
// root.right.right = new TreeNode(7);

// const root = new TreeNode(3);
// root.left = new TreeNode(1);
// root.right = new TreeNode(5);
// root.left.left = new TreeNode(0);
// root.left.right = new TreeNode(2);
// root.right.left = new TreeNode(4);
// root.right.right = new TreeNode(6);

// const root = new TreeNode(98);
// root.left = new TreeNode(-57);
// root.left.right = new TreeNode(58);
// root.left.right.left = new TreeNode(31);

function PreOrderR(root) {
    if (!root) {
        return;
    }

    console.log(root.val);
    PreOrderR(root.left);
    PreOrderR(root.right);
}

function PreOrder(root) {
    const stack = [];

    while (true) {
        while (root) {
            console.log(root.val);
            stack.push(root);

            root = root.left;
        }

        if (!stack.length) {
            break;
        }
        root = stack.pop();
        root = root.right;
    }
}

function InOrder(root) {
    const stack = [];

    while (true) {
        while (root) {
            stack.push(root);

            root = root.left;
        }

        if (!stack.length) {
            break;
        }
        root = stack.pop();

        console.log(root.val);

        root = root.right;
    }
}

function InOrderR(root) {
    if (!root) {
        return;
    }

    PreOrderR(root.left);
    console.log(root.val);
    PreOrderR(root.right);
}

function PostOrder(root) {
    const stack = [];
    let previous = null;

    do {
        while (root) {
            stack.push(root);

            root = root.left;
        }

        while (!root && stack.length) {
            root = stack.slice(-1)[0];

            if (!root.right || root.right == previous) {
                console.log(root.val);
                stack.pop();
                previous = root;
                root = null;
            } else {
                root = root.right;
            }
        }
    } while (stack.length);
}

function PostOrderR(root) {
    if (!root) {
        return;
    }

    PreOrderR(root.left);
    PreOrderR(root.right);
    console.log(root.val);
}

function LevelOrders(root) {
    const queue = [root];

    while (queue.length) {
        const node = queue.shift();

        console.log(node.val);

        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
    }
}

function findMaxR(root) {
    if (root) {
        const left = findMax(root.left);
        const right = findMax(root.right);

        return Math.max(left, right, root.val);
    }

    return -Infinity;
}

function findMax(root) {
    const queue = [root];
    let max = -Infinity;

    while (queue.length) {
        const node = queue.shift();

        max = Math.max(max, node.val);

        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
    }

    return max;
}

function findMin(root) {
    if (root) {
        const left = findMax(root.left);
        const right = findMax(root.right);

        return Math.min(left, right, root.val);
    }

    return Infinity;
}

function searchR(root, val) {
    if (!root) {
        return false;
    }

    if (root.val === val) {
        return true;
    }

    const left = searchR(root.left, val);
    const right = searchR(root.right, val);

    if (left || right) {
        return left || right;
    }

    return false;
}

function search(root, val) {
    const queue = [root];

    while (queue.length) {
        const node = queue.shift();

        if (node.val === val) {
            return true;
        }

        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
    }

    return false;
}

function sizeOfTreeR(root) {
    if (!root) {
        return 0;
    }

    return sizeOfTree(root.left) + 1 + sizeOfTree(root.right);
}

function sizeOfTreeR_2(root) {
    let count = 0;
    let queue = [root];

    while (queue.length) {
        const node = queue.shift();

        count += 1;
        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
    }

    return count;
}

function revers(root) {
    let queue = [root];
    const stack = [];
    const result = [];

    while (queue.length) {
        const node = queue.shift();

        stack.push(node.val);

        node.right && queue.push(node.right);
        node.left && queue.push(node.left);
    }

    while (stack.length) {
        result.push(stack.pop());
    }

    return result;
}

function heightR(root) {
    if (!root) {
        return 0;
    }
    console.log(root.val);
    const leftH = height(root.left);
    const rightH = height(root.right);

    return Math.max(leftH, rightH) + 1;
}

function height(root) {
    let queue = [root, null];
    let level = 0;

    while (queue.length) {
        const node = queue.shift();

        if (!node) {
            if (queue.length) {
                queue.push(null);
            }

            level += 1;
        }

        node?.left && queue.push(node.left);
        node?.right && queue.push(node.right);
    }

    return level;
}

function deepest(root) {
    let queue = [root];

    let node;

    while (queue.length) {
        node = queue.shift();

        node?.left && queue.push(node.left);
        node?.right && queue.push(node.right);
    }

    return node.val;
}

function areEqual(root1, root2) {
    if (!root1 && !root2) {
        return true;
    }

    if (root1?.val !== root2?.val) {
        return false;
    }

    return (
        areEqual(root1.left, root2.left) && areEqual(root1.right, root2.right)
    );
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

// PreOrder(root);

// Word Ladder
function buildWordsGraph(beginWord, endWord, wordList) {
    class WNode {
        constructor(val, depth, parent) {
            this.val = val;
            this.depth = depth ?? 0;
            this.parent = parent ?? null;
        }
    }

    const queue = [beginWord];

    if (!wordList.includes(endWord)) {
        return 0;
    }

    const wordsMap = {
        [beginWord]: new WNode(beginWord),
        [endWord]: new WNode(endWord),
    };

    const setNodes = new Set();

    while (queue.length) {
        const parentWord = queue.shift();
        const parentNode = wordsMap[parentWord];

        wordList.forEach((word, i) => {
            let diff = 0;

            if (setNodes.has(i)) {
                return;
            }

            for (let k = 0; k < word.length; k++) {
                if (parentWord[k] !== word[k]) {
                    diff += 1;
                }
            }

            if (diff === 1 || !diff) {
                queue.push(word);
                wordsMap[word] = new WNode(
                    word,
                    parentNode.depth + 1,
                    parentNode
                );
                setNodes.add(i);
            }
        }, []);
    }

    return wordsMap[endWord].parent ? wordsMap[endWord].depth + 1 : 0;
}
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
    // function getPath(root, val) {
    //     if (!root) {
    //         return [];
    //     }

    //     if (root.val === val) {
    //         return [root];
    //     }

    //     const left = getPath(root.left, val);
    //     const right = getPath(root.right, val);

    //     if (left.length) {
    //         return [root].concat(left);
    //     }

    //     if (right.length) {
    //         return [root].concat(right);
    //     }

    //     return [];
    // }

    // const pPath = getPath(root, p);
    // const qPath = getPath(root, q);
    // let leastCommon;

    // while (pPath.length || qPath.length) {
    //     const nodeP = pPath.shift();
    //     const nodeQ = qPath.shift();

    //     if (nodeP === nodeQ) {
    //         if (!leastCommon) {
    //             leastCommon = nodeP;
    //         } else if (leastCommon.val > nodeP.val) {
    //             leastCommon = nodeP;
    //         }
    //     }
    // }

    // return leastCommon;

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
const root2 = new TreeNode(3);
root2.left = new TreeNode(5);
root2.right = new TreeNode(1);
root2.left.left = new TreeNode(6);
root2.left.right = new TreeNode(2);
root2.right.left = new TreeNode(0);
root2.right.right = new TreeNode(8);
root2.left.right.left = new TreeNode(7);
root2.left.right.right = new TreeNode(4);
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

// console.log(
//     cutOffTree([
//         [1, 2, 3],
//         [0, 0, 4],
//         [7, 6, 5],
//     ])
// );

// console.log(
//     cutOffTree([
//         [2, 3, 4],
//         [0, 0, 5],
//         [8, 7, 6],
//     ])
// );

// console.log(
//     cutOffTree([
//         [2, 3, 4],
//         [0, 0, 0],
//         [8, 7, 6],
//     ])
// );

// console.log(cutOffTree([[0], [0], [6014]]));

// console.log(
//     cutOffTree([
//         [54581641, 64080174, 24346381, 69107959],
//         [86374198, 61363882, 68783324, 79706116],
//         [668150, 92178815, 89819108, 94701471],
//         [83920491, 22724204, 46281641, 47531096],
//         [89078499, 18904913, 25462145, 60813308],
//     ])
// );

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

// Word Ladder II

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
const findLadders = function (beginWord, endWord, wordList) {
    if (!wordList.includes(endWord)) {
        return [];
    }

    const fullList = [beginWord, ...wordList];
    const queue = [0];
    const graphList = new Map();

    while (queue.length) {
        const idx = queue.shift();
        const parentWord = fullList[idx];

        fullList[idx] = '';

        const words = [];

        for (let j = 0; j < fullList.length; j++) {
            const word = fullList[j];

            if (!word) {
                continue;
            }

            let diff = 0;

            for (let k = 0; k < word.length; k++) {
                diff += parentWord[k] !== word[k] ? 1 : 0;
            }

            if (diff === 1 || !diff) {
                if (!graphList.get(word)) {
                    queue.push(j);
                    word !== parentWord && words.push(word);
                }
            }
        }

        if (words.length && !graphList.get(parentWord)) {
            graphList.set(parentWord, words);
        }
    }

    const cache = new Map();

    function recursion(word) {
        const words = graphList.get(word) || [];
        let results = [];
        let innerMin = Infinity;

        for (const $word of words) {
            if ($word === endWord) {
                return word === beginWord ? [[beginWord, $word]] : [[$word]];
            }
            if ($word !== word) {
                const tail = cache.get($word) || recursion($word);

                cache.set($word, tail);

                for (const item of tail) {
                    const final = [$word].concat(item);

                    if (word === beginWord) {
                        final.unshift(beginWord);
                    }

                    if (innerMin > final.length) {
                        innerMin = final.length;
                        results = [];
                    }

                    if (innerMin === final.length) {
                        results.push(final);
                    }
                }
            }
        }

        return results;
    }

    return recursion(beginWord);
};

// console.log(
//     findLadders('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])
// );

// console.log(
//     findLadders('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'hit', 'log', 'cog'])
// );
