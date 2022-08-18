function buildWordsGraph(beginWord, endWord, wordList) {
    if (!wordList.includes(endWord)) {
        return [];
    }

    class WNode {
        constructor(val, depth, parent, child) {
            this.val = val;
            this.depth = depth ?? 0;
            this.parent = parent ?? null;
            this.child = child ?? null;
        }
    }

    const queue = [beginWord];

    const wordsMap = {
        [beginWord]: new WNode(beginWord),
        // [endWord]: new WNode(endWord),
    };

    const setNodes = new Set();
    let minLevel = Infinity;
    let lastLevel = [];

    while (queue.length) {
        const parentWord = queue.shift();
        const parentNode = wordsMap[parentWord];

        for (let i = 0; i < wordList.length; i++) {
            const word = wordList[i];

            let diff = 0;

            if (setNodes.has(i)) {
                continue;
            }

            for (let k = 0; k < word.length; k++) {
                if (parentWord[k] !== word[k]) {
                    diff += 1;
                }
            }

            if (diff === 1 || !diff) {
                const level = parentNode.depth + 1;

                if (word === endWord && wordsMap[word]) {
                    if (minLevel === level) {
                        lastLevel.push(new WNode(word, level, parentNode));
                    }
                } else {
                    queue.push(word);
                    wordsMap[word] = new WNode(word, level, parentNode);
                    parentNode.child = wordsMap[word];
                    word !== endWord && setNodes.add(i);

                    if (word === endWord) {
                        if (minLevel > level) {
                            minLevel = level;
                            lastLevel = [wordsMap[word]];
                        } else if (minLevel === level) {
                            lastLevel.push(wordsMap[word]);
                        }
                    }
                }
            }
        }
    }

    const result = [];

    lastLevel.forEach((node) => {
        const row = [];

        if (node.val !== endWord) {
            return;
        }

        while (node) {
            row.unshift(node.val);
            node = node.parent;
        }

        result.push(row);
    });

    return result;
}

console.log(
    buildWordsGraph('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])
);

console.log(buildWordsGraph('a', 'c', ['a', 'b', 'c']));

console.log(buildWordsGraph('hot', 'dog', ['hot', 'dog']));

console.log(buildWordsGraph('hot', 'dot', ['hot', 'dot', 'dog']));
