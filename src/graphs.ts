import { Vertex, COLOR } from '../data-structures/graph';

export class ListNode {
    next: ListNode | null = null;
    val: Vertex;

    constructor(val: Vertex) {
        this.val = val;
    }
}
const mapToNode = {
    1: new Vertex(1),
    2: new Vertex(2),
    3: new Vertex(3),
    4: new Vertex(4),
    5: new Vertex(5),
};

export function createList<M extends Record<string, Vertex>>(
    array: (keyof M)[],
    map: M
): ListNode | null {
    let head: ListNode | null = null;
    let tail: ListNode;

    array.forEach((val) => {
        if (!head) {
            head = new ListNode(map[val]);
            tail = head;
        } else {
            tail.next = new ListNode(map[val]);

            tail = tail.next;
        }
    });

    return head;
}

const withMap = (arr: (keyof typeof mapToNode)[]) => createList(arr, mapToNode);

type Graph = Map<Vertex, ListNode | null>;

const graph: Graph = new Map();

graph.set(mapToNode[1], withMap([2, 5]));
graph.set(mapToNode[2], withMap([1, 5, 4, 3]));
graph.set(mapToNode[3], withMap([2, 4]));
graph.set(mapToNode[4], withMap([5, 2, 3]));
graph.set(mapToNode[5], withMap([1, 2, 4]));

// Breadth-first search
function BFS(g: Graph) {
    mapToNode[1].color = COLOR.GREY;
    mapToNode[1].depth = 0;
    mapToNode[1].parent = null;

    const queue: Vertex[] = [mapToNode[1]];

    while (queue.length) {
        const parent = queue.shift();

        if (!parent) {
            break;
        }

        let tail = g.get(parent);

        while (tail) {
            const child = tail.val;
            if (child.color === COLOR.WHITE) {
                child.color = COLOR.GREY;
                child.depth = parent.depth + 1;
                child.parent = parent;

                queue.push(child);
            }
            tail = tail.next;
        }

        parent.color = COLOR.BLACK;
    }

    return g.keys();
}

// console.log(BFS(graph));

const matrix = [
    [0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 0, 1],
    [1, 1, 0, 1, 0],
];

function BFS_2(matrix: number[][]) {
    const mapToNode: Record<number, Vertex> = {
        0: new Vertex(1),
    };

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            const isNode = matrix[i][j];

            if (isNode) {
                const node = mapToNode[j];

                if (!node) {
                    const parent = mapToNode[i];
                    mapToNode[j] = new Vertex(j + 1, parent, parent?.depth + 1);
                }
            }
        }
    }

    return mapToNode;
}

console.log(BFS_2(matrix));

// Depth-first search

function DFS(gMatrix: number[][]) {
    class Node {
        val: number;
        color: COLOR;
        parent: Node | null;
        d: number;
        f: number;

        constructor(val: number) {
            this.val = val;
            this.color = COLOR.WHITE;
            this.parent = null;
            this.d = 0;
            this.f = 0;
        }
    }

    const nodeMap: Record<number, Node> = {};
    const graph = new Map<Node, Node[]>();

    for (let i = 0; i < gMatrix.length; i++) {
        const row = gMatrix[i];
        const children: Node[] = [];

        for (let j = 0; j < row.length; j++) {
            if (row[j]) {
                if (!nodeMap[j]) {
                    nodeMap[j] = new Node(j);
                }

                children.push(nodeMap[j]);
            }
        }

        if (!nodeMap[i]) {
            nodeMap[i] = new Node(i);
        }

        graph.set(nodeMap[i], children);
    }

    let time = 0;

    function DFSVisit(node: Node) {
        const adj = graph.get(node) ?? [];

        time += 1;

        node.d = time;
        node.color = COLOR.GREY;

        for (const child of adj) {
            if (child.color === COLOR.WHITE) {
                child.parent = node;
                DFSVisit(child);
            }
        }
        time += 1;

        node.color = COLOR.BLACK;
        node.f = time;
    }

    for (const node of graph.keys()) {
        if (node.color === COLOR.WHITE) {
            DFSVisit(node);
        }
    }

    return graph;
}

console.log(DFS(matrix));
