// Two Sum
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order.

// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

var twoSum = function (nums, target) {
    const mapValues = {};

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (mapValues.hasOwnProperty(num)) {
            return [mapValues[num], i];
        }
        mapValues[target - num] = i;
    }
};
// ------------------------------------------------------------------------

// Longest Substring Without Repeating Characters

//Given a string s, find the length of the longest substring without repeating characters.

var lengthOfLongestSubstring = function (s) {
    let longest = 0;
    let tempHashMap = new Map();
    let i = 0;

    while (i < s.length) {
        const l = s[i];

        if (tempHashMap.has(l)) {
            const substringLength = tempHashMap.size;

            longest = Math.max(longest, substringLength);

            i = tempHashMap.get(l) + 1;

            tempHashMap = new Map();
        }

        tempHashMap.set(s[i], i);

        i++;
    }

    return Math.max(longest, tempHashMap.size);
};

// Cool solution
var lengthOfLongestSubstring = function (s) {
    let maxLength = 0,
        currentString = '',
        char,
        pos;

    for (let i = 0; i < s.length; i++) {
        char = s.charAt(i);
        pos = currentString.indexOf(char);

        if (pos !== -1) {
            currentString = currentString.substr(pos + 1);
        }

        currentString += char;
        maxLength = Math.max(maxLength, currentString.length);
    }

    return maxLength;
};
// ------------------------------------------------------------------------
//String to Integer (atoi)
var myAtoi = function (s) {
    let digit = '';
    const max = Math.pow(2, 31) - 1;
    const min = -1 * Math.pow(2, 31);

    if (s.length === 0 || s.length >= 200) {
        return 0;
    }

    let cloneS = s.trim();

    const sign = cloneS[0] === '-' ? -1 : cloneS[0] === '+' ? 1 : undefined;

    cloneS = sign ? cloneS.substr(1) : cloneS;

    for (let i = 0; i < s.length; i++) {
        const c = cloneS.charAt(i);

        if (/\d/.test(c)) {
            if (c === '0' && !digit) {
                continue;
            }

            digit += c;
        } else {
            break;
        }
    }

    const finlaValue = Number(digit) * (sign ?? 1);

    return finlaValue > max ? max : finlaValue < min ? min : finlaValue;
};
// ------------------------------------------------------------------------
//Container With Most Water
var maxArea = function (height) {
    let mostWater = 0;
    let i = 0,
        j = height.length - 1;

    while (i < j) {
        mostWater = Math.max(
            mostWater,
            (j - i) * Math.min(height[i], height[j])
        );

        if (height[i] < height[j]) {
            i += 1;
        } else {
            j -= 1;
        }
    }

    return mostWater;
};

var maxArea = function (height) {
    let mostWater = 0;
    let i = 0,
        j = height.length - 1;

    while (true) {
        if (i === j) {
            break;
        }

        const left = height[i];
        const right = height[j];
        const square = (j - i) * Math.min(left, right);
        mostWater = Math.max(mostWater, square);

        if (left < right) {
            i += 1;
        } else {
            j -= 1;
        }
    }

    return mostWater;
};
// ------------------------------------------------------------------------
// Integer to Roman
var intToRoman = function (num) {
    const numbersMap = [
        [1000, 'M'],
        [900, 'CM'],
        [500, 'D'],
        [400, 'CD'],
        [100, 'C'],
        [90, 'XC'],
        [50, 'L'],
        [40, 'XL'],
        [10, 'X'],
        [9, 'IX'],
        [5, 'V'],
        [4, 'IV'],
        [1, 'I'],
    ];
    let result = '';
    let restNum = num;

    for (let j = 0; j < numbersMap.length; j++) {
        const n = numbersMap[j][0];
        const l = numbersMap[j][1];

        if (restNum >= n) {
            const r = Math.floor(restNum / n);
            restNum %= n;

            result += l.repeat(r);
        }
    }

    return result;
};
// ------------------------------------------------------------------------
// Roman to Integer
var romanToInt = function (s) {
    const numbersMap = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };
    let result = 0;
    let newS = s;

    while (newS) {
        let num = newS.substr(0, 2);

        if (numbersMap[num]) {
            result += numbersMap[num];
            newS = newS.substr(2);
        } else {
            num = newS.substr(0, 1);
            result += numbersMap[num];
            newS = newS.substr(1);
        }
    }

    return result;
};
// ------------------------------------------------------------------------
// 3Sum
var threeSum = function (nums) {
    const hashMap = new Map();
    const result = [];
    const sortedNums = nums.sort((a, b) => (a > b ? 1 : a === b ? 0 : -1));

    for (let i = 0; i < sortedNums.length; i++) {
        if (nums[0] > 0) {
            break;
        }

        if (sortedNums[i] === sortedNums[i - 1]) {
            continue;
        }

        let k = i + 1;
        let p = sortedNums.length - 1;

        while (p > k) {
            const remainSum = 0 - sortedNums[i];
            const sum = sortedNums[k] + sortedNums[p];

            if (sum === remainSum) {
                result.push([sortedNums[i], sortedNums[k], sortedNums[p]]);
                p -= 1;
                k += 1;

                while (nums[k] === nums[k - 1]) {
                    k += 1;
                }
            } else if (sum > remainSum) {
                p -= 1;
            } else {
                k += 1;
            }
        }
    }

    return result;
};
// ------------------------------------------------------------------------
// 3Sum Closest
var threeSumClosest = function (nums, target) {
    let j = 1;
    let k = nums.length - 1;
    let sum = Infinity;

    for (let i = 0; i < nums.target; i++) {
        const a = nums[i];

        while (j < k) {
            const newSum = a + nums[j] + nums[k];
            sum = Math.abs(target - newSum) < sum ? newSum : sum;
        }
    }
};
// ------------------------------------------------------------------------
// implement strStr()
var strStr = function (haystack, needle) {
    if (!needle) {
        return 0;
    }

    let j = 0;

    for (let i = 0; i < haystack.length; i++) {
        if (haystack[i] === needle[j]) {
            while (haystack[i] === needle[j]) {
                if (needle[j + 1] === undefined) {
                    return i - j;
                }
                i += 1;
                j += 1;
            }
            i = i - j;
            j = 0;
        }
    }

    return -1;
};
// ------------------------------------------------------------------------
// Rotate Image

// [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
// ];

// [
//     [7, 4, 1],
//     [8, 5, 2],
//     [9, 6, 3],
// ];
var rotate = function (matrix) {
    const length = matrix.length - 1;
    const deep = Math.floor(matrix.length / 2);
    let level = 0;

    while (level <= deep) {
        const subLength = length - level;

        for (let i = level; i < subLength; i++) {
            let x = level;
            let y = i;
            let prev = matrix[x][y];

            for (let j = 0; j < 4; j++) {
                if (x === level && y === i) {
                    x = i;
                    y = subLength;
                } else if (x === i && y === subLength) {
                    x = subLength;
                    y = length - i;
                } else if (x === subLength && y === length - i) {
                    x = length - i;
                    y = level;
                } else if (x === length - i && y === level) {
                    x = level;
                    y = i;
                }

                const next = matrix[x][y];
                matrix[x][y] = prev;
                prev = next;
            }
        }

        level += 1;
    }

    return matrix;
};
// ------------------------------------------------------------------------
// Group Anagrams
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const keyMap = {};
    const result = [];

    for (let str of strs) {
        const s = str.split('').sort();

        if (keyMap.hasOwnProperty(s)) {
            result[keyMap[s]].push(str);
        } else {
            keyMap[s] = result.push([str]) - 1;
        }
    }

    return result;
};

var minWindow = function (s, t) {
    // let left = 0;
    // let right = 0;
    // let substr = '';
    // let isRight = true;

    // const hasT = (substr) => {
    //     let counter = t;

    //     for (let i = 0; i < t.length; i++) {
    //         if (substr.indexOf(t[i]) >= 0) {
    //             counter = counter.replace(t[i], '');
    //             substr = substr.replace(t[i], '');
    //         }
    //     }

    //     return !counter;
    // };

    // while (s.length > right) {
    //     const c = s[isRight ? right : left];

    //     if (hasT(s.substr(left, right - left + 1))) {
    //         const newStr = s.substr(left, right - left + 1);

    //         substr = !substr || substr.length > newStr.length ? newStr : substr;

    //         left += 1;
    //         isRight = false;
    //     } else {
    //         isRight = true;
    //         right += 1;
    //     }
    // }

    // return substr;

    // let left = 0;
    // let right = 0;
    // let substr = '';

    // const hasMapOrigin = {};
    // let hasMapTemp;
    // let counter = 0;

    // for (let i = 0; i < t.length; i++) {
    //     const c = t[i];

    //     hasMapOrigin[c] = hasMapOrigin[c] ? hasMapOrigin[c] + 1 : 1;
    // }

    // hasMapTemp = { ...hasMapOrigin };

    // while (s.length > right) {
    //     const c = s[right];

    //     if (t.indexOf(c) !== -1 && hasMapTemp[c] > 0) {
    //         hasMapTemp[c] -= 1;
    //         counter += 1;

    //         if (counter === t.length) {
    //             const newStr = s.substr(left, right - left + 1);

    //             substr =
    //                 !substr || substr.length > newStr.length ? newStr : substr;

    //             left += 1;
    //             right = left;

    //             hasMapTemp = { ...hasMapOrigin };
    //             counter = 0;

    //             continue;
    //         }
    //     }

    //     right += 1;
    // }

    // return substr;

    let filtered_S = [];

    for (let i = 0; i < s.length; i++) {
        if (t.includes(s[i])) {
            filtered_S.push([s[i], i]);
        }
    }

    let left = 0;
    let right = 0;
    let isRight = true;

    while (s.length > right) {
        if (right - left >= t.length) {
            let r = t;
            ConstantSourceNode;
            for (let j = 0; j < t.length; j++) {}
        }
    }
};
// ------------------------------------------------------------------------
// Compare Version Numbers
var compareVersion = function (version1, version2) {
    version1 = version1.split('.');
    version2 = version2.split('.');

    while (version1.length > i && version2.length > i) {
        const d_1 = Number(version1[i]) || 0;
        const d_2 = Number(version2[i]) || 0;

        if (d_1 < d_2) {
            return -1;
        } else if (d_1 > d_2) {
            return 1;
        }

        i++;
    }

    return 0;
};
//------------------------------------------------------------------------
//Product of Array Except Self

var productExceptSelf = function (nums) {
    const answer = [];

    let product;
    let counter = 0;

    for (const num of nums) {
        if (num === 0) {
            continue;
        }

        product = !product ? num : product * num;
        counter += 1;
    }

    for (const num of nums) {
        if (nums.length !== counter) {
            if (nums.length - counter >= 2) {
                answer.push(0);
                continue;
            }

            answer.push(num !== 0 ? 0 : product);
            continue;
        }

        answer.push(product / num);
    }

    return answer;
};
//------------------------------------------------------------------------
//Missing Number

var missingNumber = function (nums) {
    // const sorted = nums.sort((a, b) => a - b);
    // if (sorted[0] !== 0) {
    //     return 0;
    // }
    // for (let i = 0; i < sorted.length; i++) {
    //     if (sorted[i + 1] - sorted[i] > 1) {
    //         return sorted[i] + 1;
    //     }
    // }
    // return sorted[sorted.length - 1] + 1;

    const l = nums.length;
    const exp = Math.floor((l * (l + 1)) / 2);
    const act = nums.reduce((a, b) => a + b);

    return exp - act;
};
//------------------------------------------------------------------------
// First Unique Character in a String
var firstUniqChar = function (s) {
    const hashMap = new Map();

    for (let i = 0; i < s.length; i++) {
        if (!hashMap.get(s[i]) && s.substring(i + 1).indexOf(s[i]) === -1) {
            return i;
        }

        hashMap.set(s[i], true);
    }

    return -1;
};
//------------------------------------------------------------------------
// Valid Parentheses
var isValid = function (s) {
    const stack = [];
    const mapP = {
        '}': '{',
        ')': '(',
        ']': '[',
    };

    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        const last = stack.length - 1;

        if (mapP[c] && stack[last] === mapP[c]) {
            stack.pop();
        } else {
            stack.push(c);
        }
    }

    return stack.length === 0;
};
//------------------------------------------------------------------------
// Most Common Word
var mostCommonWord = function (paragraph, banned) {
    const paragraphArray = paragraph.split(/[\s|\!|\?|\'|\,|\;\|.]/);
    const hashMap = new Map();
    let mostCommonWord = ['', -Infinity];

    for (let i = 0; i < paragraphArray.length; i++) {
        const word = paragraphArray[i].toLowerCase();
        const prev = hashMap.get(word) || 0;

        hashMap.set(word, prev + 1);

        if (word && !banned.includes(word)) {
            const current = hashMap.get(word);

            if (mostCommonWord[1] < current) {
                mostCommonWord = [word, current];
            }
        }
    }

    // for (const [word, count] of hashMap) {
    //     if (!word || banned.includes(word)) {
    //         continue;
    //     }

    //     if (mostCommonWord[1] < count) {
    //         mostCommonWord = [word, count];
    //     }
    // }

    return mostCommonWord[0];
};

//------------------------------------------------------------------------
// Reorder Log Files
var reorderLogFiles = function (logs) {
    const getVal = (s) => s.match(/^(\w+)\s(.+)/);
    const isNum = (n) => parseInt(n) >= 0;

    return logs.sort((prev, next) => {
        const [, aName, aVal] = getVal(prev);
        const [, bName, bVal] = getVal(next);

        [a, b] = aVal === bVal ? [aName, bName] : [aVal, bVal];

        if (isNum(aVal)) {
            return 1;
        }

        if (isNum(bVal)) {
            return -1;
        }

        return a.localeCompare(b);
    });
};
//------------------------------------------------------------------------
// Trapping Rain Water

var trap = function (height) {
    // let sum = 0;
    // let i = 0;
    // let highIdx = 0;
    // let potential = 0;
    // let isOpposite = false;
    // let beforeOppositeIdx;

    // while (height.length > i && i >= 0) {
    //     const high = height[highIdx];
    //     const short = height[i];

    //     if (isOpposite && i === beforeOppositeIdx) {
    //         sum += potential;
    //         break;
    //     }

    //     if (short >= high) {
    //         sum += potential;
    //         potential = 0;
    //         highIdx = i;
    //         isOpposite ? i-- : i++;
    //     } else if (i === height.length - 1 && potential) {
    //         isOpposite = true;
    //         beforeOppositeIdx = highIdx;
    //         highIdx = height.length - 1;
    //         i = height.length - 1;
    //         potential = 0;
    //     } else {
    //         potential += high - short;
    //         isOpposite ? i-- : i++;
    //     }
    // }

    // return sum;

    let sum = 0;

    let left = 0;
    let right = height.length - 1;
    let left_max = 0;
    let right_max = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= left_max) {
                left_max = height[left];
            } else {
                sum += left_max - height[left];
            }
            left += 1;
        } else {
            if (height[right] >= right_max) {
                right_max = height[right];
            } else {
                sum += right_max - height[right];
            }
            right -= 1;
        }
    }

    return sum;
};
//------------------------------------------------------------------------
// Integer to English Words
var numberToWords = function (num) {
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

const subIncludesAll = (str, str2) => {
    for (let i = 0; i < str.length; i++) {
        if (str2.indexOf(str[i]) !== -1) {
            str2 = str2.replace(str[i], '');
        }
    }
    return str2.length === 0;
};

const minWindow = (str1 = '', str2 = '') => {
    let shortestString = null;
    for (let i = 0; i < str1.length; i++) {
        for (let j = i; j < str1.length; j++) {
            let testString = str1.substr(i, j - i + 1);
            if (subIncludesAll(testString, str2)) {
                if (
                    shortestString === null ||
                    testString.length < shortestString.length
                ) {
                    shortestString = testString;
                }
            }
        }
    }
    return shortestString;
};
