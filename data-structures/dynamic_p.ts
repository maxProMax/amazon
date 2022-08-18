function cutPod(p: number[], n: number) {
    if (n === 0) {
        return 0;
    }

    let q = -Infinity;

    for (let i = 0; i <= n; i++) {
        q = Math.max(q, p[i] + cutPod(p, n - i - 1));
    }

    return q;
}

// console.log(cutPod([1, 5, 8, 9, 10, 17, 30], 6));
