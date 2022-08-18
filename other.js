// Reverse Integer

/**
 * @param {number} x
 * @return {number}
 */
const reverse = function (x) {
    let result = 0;
    const sign = x < 0 ? -1 : 1;

    x = x * sign;

    while (x) {
        result = result * 10 + (x % 10);
        x = Math.floor(x / 10);
    }

    if (-1 * Math.pow(2, 31) >= result || result >= Math.pow(2, 31) - 1) {
        return 0;
    }

    return sign * result;
};

// console.log(reverse(321));

// Input: x = 123
// Output: 321

// Input: x = -123
// Output: -321

// Input: x = 120
// Output: 21

// Second Highest Salary
// # Write your MySQL query statement below
// SELECT
//     IFNULL(
//         (
//             SELECT DISTINCT salary
//             FROM Employee
//             ORDER BY Salary DESC
//             LIMIT 1 OFFSET 1
//         ),
//         NULL
//     ) AS SecondHighestSalary;

// Partition Labels

/**
 * @param {string} s
 * @return {number[]}
 */
const partitionLabels = function (s) {
    const map = new Map();

    for (let i = 0; i < s.length; i++) {
        const [start] = map.get(s[i]) || [i];

        map.set(s[i], [start, i]);
    }

    return Array.from(map.values())
        .sort((a, b) => a[0] - b[0])
        .reduce((memo, interval) => {
            const [last] = memo.slice(-1) || interval;

            if (!last) {
                memo.push(interval);
                return memo;
            }

            const [_, e0] = last;
            const [s1, e1] = interval;

            if (s1 > e0) {
                memo.push(interval);
            } else {
                last[1] = Math.max(e0, e1);
            }

            return memo;
        }, [])
        .map((a) => a[1] - a[0] + 1);
};

const partitionLabels2 = function (s) {
    const last = new Map();

    for (let i = 0; i < s.length; i++) {
        last.set(s[i], i);
    }

    let j = 0;
    let anchor = 0;
    const ans = [];

    for (let i = 0; i < s.length; i++) {
        j = Math.max(j, last.get(s[i]));

        if (i === j) {
            ans.push(i - anchor + 1);
            anchor = i + 1;
        }
    }

    return ans;
};

// console.log(partitionLabels2('ababcbacadefegdehijhklij'));
// console.log(partitionLabels('eccbbbbdec'));

// Input: s = "ababcbacadefegdehijhklij"
// Output: [9,7,8]
// Explanation:
// The partition is "ababcbaca", "defegde", "hijhklij".
// This is a partition so that each letter appears in at most one part.
// A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.

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

// Input: cells = [0,1,0,1,1,0,0,1], n = 7
// Output: [0,0,1,1,0,0,0,0]
// Explanation: The following table summarizes the state of the prison on each day:
// Day 0: [0, 1, 0, 1, 1, 0, 0, 1]
// Day 1: [0, 1, 1, 0, 0, 0, 0, 0]
// Day 2: [0, 0, 0, 0, 1, 1, 1, 0]
// Day 3: [0, 1, 1, 0, 0, 1, 0, 0]
// Day 4: [0, 0, 0, 0, 0, 1, 0, 0]
// Day 5: [0, 1, 1, 1, 0, 1, 0, 0]
// Day 6: [0, 0, 1, 0, 1, 1, 0, 0]
// Day 7: [0, 0, 1, 1, 0, 0, 0, 0]
