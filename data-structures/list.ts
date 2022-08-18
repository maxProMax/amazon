export class ListNode {
    next: ListNode | null = null;
    val: number;

    constructor(val: number) {
        this.val = val ?? 0;
    }
}

export function createList<T extends ListNode>(
    array: number[],
    NewNode: new (val: number) => T
): T | null {
    let head: ListNode | null = null;
    let tail: ListNode;

    array.forEach((val) => {
        if (!head) {
            head = new NewNode(val);
            tail = head;
        } else {
            tail.next = new NewNode(val);

            tail = tail.next;
        }
    });

    return head;
}
