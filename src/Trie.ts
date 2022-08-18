type Trie = Record<string, Record<string, string> | string>;

export function createTrie(words: string[]) {
    const WORD_KEY = '$';
    const trie: Trie = {};

    for (const word of words) {
        let node = trie;

        for (const letter of word.split('')) {
            node[letter] = node[letter] || {};
            node = node[letter] as Trie;
        }

        node[WORD_KEY] = word;
    }

    return trie;
}
