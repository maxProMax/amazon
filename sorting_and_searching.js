// Median of Two Sorted Arrays

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = function (nums1, nums2) {
    const mergedLeng = nums1.length + nums2.length;
    let indexes = [];

    if (mergedLeng % 2 === 0) {
        const mid = mergedLeng / 2;

        indexes = [mid - 1, mid];
    } else {
        indexes = [Math.floor(mergedLeng / 2)];
    }

    const results = [];
    const [lastIndex] = indexes.slice(-1);

    while (nums1.length || nums2.length) {
        if (lastIndex + 1 === results.length) {
            break;
        }

        if (!nums1.length) {
            results.push(nums2.shift());
            continue;
        }
        if (!nums2.length) {
            results.push(nums1.shift());
            continue;
        }

        if (nums1[0] > nums2[0]) {
            results.push(nums2.shift());
        } else {
            results.push(nums1.shift());
        }
    }

    return indexes.reduce((a, b) => a + results[b], 0) / indexes.length;
};

// Input: nums1 = [1,3], nums2 = [2]
// Output: 2.00000
// Explanation: merged array = [1,2,3] and median is 2.

// console.log(findMedianSortedArrays([1, 3], [2]));

// Input: nums1 = [1,2], nums2 = [3,4]
// Output: 2.50000
// Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

// console.log(findMedianSortedArrays([1, 2], [3, 4]));
// console.log(findMedianSortedArrays([], [1]));

// Merge Intervals
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = function (intervals) {
    intervals = intervals.sort((a, b) => a[0] - b[0]);

    let i = 0;

    while (i < intervals.length - 1) {
        const [a0, a1] = intervals[i];
        const [b0, b1] = intervals[i + 1];

        if ((a0 <= b0 && b0 <= a1) || (a0 <= b1 && b1 <= a1)) {
            intervals[i] = [Math.min(a0, b0), Math.max(a1, b1)];

            intervals.splice(i + 1, 1);
            continue;
        }
        i++;
    }

    return intervals;
};

// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

// console.log(
//     merge([
//         [1, 3],
//         [2, 6],
//         [8, 10],
//         [15, 18],
//     ])
// );

// console.log(
//     merge([
//         [1, 4],
//         [4, 5],
//     ])
// );

// console.log(
//     merge([
//         [1, 4],
//         [0, 4],
//     ])
// );

// console.log(
//     merge([
//         [1, 4],
//         [0, 0],
//     ])
// );

// console.log(
//     merge([
//         [1, 4],
//         [0, 1],
//     ])
// );

// console.log(
//     merge([
//         [2, 3],
//         [4, 5],
//         [6, 7],
//         [8, 9],
//         [1, 10],
//     ])
// );

// console.log(
//     merge([
//         [2, 3],
//         [2, 2],
//         [3, 3],
//         [1, 3],
//         [5, 7],
//         [2, 2],
//         [4, 6],
//     ])
// );

// console.log(
//     merge([
//         [2, 3],
//         [4, 6],
//         [5, 7],
//         [3, 4],
//     ])
// );

// console.log(
//     merge([
//         [5, 7],
//         [5, 5],
//         [1, 1],
//         [0, 0],
//         [3, 3],
//         [4, 5],
//         [1, 1],
//         [3, 4],
//     ])
// );

// console.log(
//     merge([
//         [3, 5],
//         [0, 0],
//         [4, 4],
//         [0, 2],
//         [5, 6],
//         [4, 5],
//         [3, 5],
//         [1, 3],
//         [4, 6],
//         [4, 6],
//         [3, 4],
//     ])
// );

// Two Sum II - Input array is sorted
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (numbers, target) {
    let i = 0;
    let j = numbers.length - 1;

    while (i < j) {
        const remainder = target - numbers[i];

        if (numbers[i] + numbers[j] === target) {
            return [i + 1, j + 1];
        }

        if (remainder < numbers[j]) {
            j--;
        } else {
            i++;
        }
    }

    return [];
};

// console.log(twoSum([2, 7, 11, 15], 9));
// console.log(twoSum([-1, 0], -1));

// console.log(twoSum([2, 7, 11, 15, 20, 33, 45, 66, 78], 44));
// console.log(twoSum([-3, 3, 4, 90], 0));

// Input: numbers = [2,7,11,15], target = 9
// Output: [1,2]
// Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].

// Kth Largest Element in an Array
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest = function (nums, k) {
    return nums.sort((a, b) => a - b)[nums.length - 1 - k];
};

// console.log(findKthLargest([3, 2, 1, 5, 6, 4], 6));
// console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
// console.log(findKthLargest([-1, 2, 0], 2));

//Meeting Rooms II
/**
 * @param {number[][]} intervals
 * @return {number}
 */
const minMeetingRooms = function (intervals) {
    intervals = intervals.sort((a, b) => a[0] - b[0]);

    let rooms = 0;

    while (intervals.length) {
        let current = intervals.shift();
        let i = 0;

        rooms += 1;

        while (intervals[i]) {
            const next = intervals[i];

            if (current[1] <= next[0]) {
                [current] = intervals.splice(i, 1);
            } else {
                i++;
            }
        }
    }

    return rooms;
};

// console.log(
//     minMeetingRooms([
//         [0, 30],
//         [5, 10],
//         [15, 20],
//     ])
// );

// console.log(
//     minMeetingRooms([
//         [7, 10],
//         [2, 4],
//     ])
// );

// console.log(
//     minMeetingRooms([
//         [1, 5],
//         [8, 9],
//         [8, 9],
//     ])
// );

// console.log(
//     minMeetingRooms([
//         [15, 16],
//         [10, 15],
//         [16, 25],
//     ])
// );

// Input: intervals = [[0,30],[5,10],[15,20]]
// Output: 2

// Top K Frequent Elements

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent = function (nums, k) {
    const map = new Map();

    for (const num of nums) {
        map.set(num, (map.get(num) ?? 0) + 1);
    }

    const values = Array.from(map).sort((a, b) => b[1] - a[1]);
    const result = [];

    for (let i = 0; i < k; i++) {
        result.push(values[i][0]);
    }

    return result;
};

// console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));
// console.log(topKFrequent([4, 1, -1, 2, -1, 2, 3], 2));
// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]

// K Closest Points to Origin

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
const kClosest = function (points, k) {
    const getDistance = ([x, y]) => x ** 2 + y ** 2;

    return points.sort((a, b) => getDistance(a) - getDistance(b)).slice(0, k);
};

// console.log(
//     kClosest(
//         [
//             [1, 3],
//             [-2, 2],
//         ],
//         1
//     )
// );

// Input: points = [[1,3],[-2,2]], k = 1
// Output: [[-2,2]]
// Explanation:
// The distance between (1, 3) and the origin is sqrt(10).
// The distance between (-2, 2) and the origin is sqrt(8).
// Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
// We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
