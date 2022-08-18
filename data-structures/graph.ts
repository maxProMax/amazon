import { ListNode } from './list';

export enum COLOR {
    'WHITE' = 'WHITE',
    'GREY' = 'GREY',
    'BLACK' = 'BLACK',
}

export class Vertex extends ListNode {
    next: Vertex | null;
    color: COLOR;
    depth: number;
    parent: Vertex | null;

    constructor(val: number, parent?: Vertex, depth?: number) {
        super(val);

        this.color = COLOR.WHITE;
        this.depth = depth ?? 0;
        this.parent = parent ?? null;
        this.next = null;
    }
}
