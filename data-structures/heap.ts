export function parent(i: number) {
    return Math.floor(i / 2);
}

export function left(i: number) {
    return 2 * i + 1;
}

export function right(i: number) {
    return 2 * i + 2;
}

type Heap = {
    list: number[];
    heapSize: number;
};

function maxHeapify(arr: Heap, i = 0): Heap {
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    let largest;

    if (l < arr.heapSize && arr.list[l] > arr.list[i]) {
        largest = l;
    } else {
        largest = i;
    }

    if (r < arr.heapSize && arr.list[r] > arr.list[largest]) {
        largest = r;
    }

    if (largest !== i) {
        [arr.list[i], arr.list[largest]] = [arr.list[largest], arr.list[i]];

        return maxHeapify(arr, largest);
    }

    return arr;
}

export function buildMaxHeap(arr: Heap, heapSize?: number) {
    arr.heapSize = heapSize || arr.list.length;

    for (let i = Math.floor(arr.list.length / 2); i > -1; i--) {
        maxHeapify(arr, i);
    }

    return arr;
}
// console.log(
//     buildMaxHeap({
//         list: [4, 1, 3, 2, 16, 9, 10, 14, 8, 7],
//         heapSize: 4,
//     })
// );
