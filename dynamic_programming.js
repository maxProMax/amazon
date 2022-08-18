//  Longest Palindromic Substring

/**
 * @param {string} s
 * @return {string}
 */
const longestPalindrome = function (s) {
    if (s.length < 2) {
        return s;
    }
    let start = 0;
    let end = 0;

    function expandAroundCenter(s, left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }

    for (let i = 0; i < s.length; i++) {
        const len1 = expandAroundCenter(s, i, i);
        const len2 = expandAroundCenter(s, i, i + 1);
        const len = Math.max(len1, len2);

        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }

    return s.substring(start, end + 1);
};

// console.log(longestPalindrome('babad'));
// console.log(longestPalindrome('cbbd'));
// console.log(longestPalindrome('easdffdsat'));

// Input: s = "cbbd"
// Output: "bb"

//Maximum Subarray
/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = function (nums) {
    let current = nums[0];
    let max = current;

    for (let i = 1; i < nums.length; i++) {
        current = Math.max(nums[i], current + nums[i]);
        max = Math.max(max, current);
    }

    return max;
};

// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// console.log(maxSubArray([-2, -2, -1, 0, -5]));

// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: [4,-1,2,1] has the largest sum = 6.

//Best Time to Buy and Sell Stock

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

// console.log(maxProfit([7, 1, 5, 3, 6, 4]));
// console.log(maxProfit([7, 6, 4, 3, 1]));
// console.log(maxProfit([2, 1, 4]));

// Word Break

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak = function (s, wordDict) {
    // Using Breadth-First-Search
    // const wordsSet = new Set(wordDict);
    // const q = [];
    // const visited = new Set();

    // q.push(0);

    // while (q.length) {
    //     const start = q.shift();

    //     if (visited.has(start)) {
    //         continue;
    //     } else {
    //         for (let end = start + 1; end < s.length + 1; end++) {
    //             if (wordsSet.has(s.substring(start, end))) {
    //                 q.push(end);

    //                 if (end === s.length) {
    //                     return true;
    //                 }
    //             }
    //         }
    //     }
    // }

    // return false;

    const wordsSet = new Set(wordDict);
    const dp = Array(s.length + 1).fill(false);

    dp[0] = true;

    for (let i = 1; i < s.length + 1; i++) {
        for (let j = 0; j < i; j++) {
            const sub = s.substring(j, i);
            if (dp[j] && wordsSet.has(sub)) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.length];
};

// console.log(wordBreak('leetcode', ['leet', 'code']));
// console.log(wordBreak('applepenapple', ['apple', 'pen']));
// console.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']));
// console.log(wordBreak('cars', ['car', 'ca', 'rs']));
// console.log(wordBreak('abcd', ['a', 'abc', 'b', 'cd']));
// console.log(wordBreak('aaaaaaa', ['aaaa', 'aa']));
// console.log(wordBreak('bb', ['a', 'b', 'bbb', 'bbbb']));
// console.log(
//     wordBreak(
//         'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab',
//         [
//             ('a',
//             'aa',
//             'aaa',
//             'aaaa',
//             'aaaaa',
//             'aaaaaa',
//             'aaaaaaa',
//             'aaaaaaaa',
//             'aaaaaaaaa',
//             'aaaaaaaaaa'),
//         ]
//     )
// );

// Input: s = "leetcode", wordDict = ["leet","code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".

// Coin Change
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = function (coins, amount) {
    // const map = new Map();

    // function recursion(localAmount) {
    //     let minChanges = Infinity;

    //     if (!localAmount) {
    //         return 0;
    //     }

    //     if (map.has(localAmount)) {
    //         return map.get(localAmount);
    //     }

    //     if (localAmount < 0) {
    //         return Infinity;
    //     }

    //     for (const coin of coins) {
    //         const changes = recursion(localAmount - coin);

    //         minChanges = Math.min(minChanges, changes + 1); // 1 - current
    //     }

    //     map.set(localAmount, minChanges);

    //     return minChanges;
    // }

    // const result = recursion(amount);

    // return result === Infinity ? -1 : result;

    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (const coin of coins) {
        for (let i = coin; i < amount + 1; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }

    return dp[amount] !== Infinity ? dp[amount] : -1;
};

// console.log(coinChange([1, 2, 5], 11));
// console.log(coinChange([2], 3));
// console.log(coinChange([1], 0));

// console.log(coinChange([186, 419, 83, 408], 6249));

// Input: coins = [1,2,5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1
