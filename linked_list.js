// Add Two Numbers

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

function createList(array, Node = ListNode) {
    let head;
    let tail;

    array.forEach((val) => {
        if (!head) {
            head = new Node(val);
            tail = head;
        } else {
            tail.next = new Node(val);
            tail = tail.next;
        }
    });

    return head;
}

var addTwoNumbers = function (l1, l2) {
    let head;
    let tail;
    let carry = 0;

    while (l1 || l2) {
        const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
        carry = Math.floor(sum / 10);

        if (!head) {
            head = new ListNode(sum % 10);
            tail = head;
        } else {
            tail.next = new ListNode(sum % 10);
            tail = tail.next;
        }

        l1 = l1?.next;
        l2 = l2?.next;
    }

    if (carry) {
        tail.next = new ListNode(carry);
    }

    return head;
};
// ---------------------------------------
//  Merge Two Sorted Lists
var mergeTwoLists = function (list1, list2) {
    let head = new ListNode();
    let tail = head;

    if (!list1 || !list2) {
        return list1 || list2;
    }

    while (list1 || list2) {
        if (!list1 || !list2) {
            tail.next = list1 || list2;
            break;
        }

        if (list1.val < list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }

        tail = tail.next;
    }

    return head.next;
};
// ------------------------------
// Reverse Nodes in k-Group
function reverseLinkedList(head, k) {
    let new_head = null;
    let ptr = head;

    while (k) {
        let next_node = ptr.next;

        ptr.next = new_head;
        new_head = ptr;

        ptr = next_node;

        k -= 1;
    }

    return new_head;
}

function reverseKGroup(head, k) {
    let ptr = head;
    let ktail = null;
    let new_head = null;

    while (ptr) {
        count = 0;
        ptr = head;

        while (count < k && ptr) {
            ptr = ptr.next;
            count += 1;
        }

        if (count == k) {
            let revHead = reverseLinkedList(head, k);

            if (!new_head) {
                new_head = revHead;
            }

            if (ktail) {
                ktail.next = revHead;
            }

            ktail = head;
            head = ptr;
        }
    }

    if (ktail) {
        ktail.next = head;
    }

    return new_head || head;
}
// -----------------------------
// Copy List with Random Pointer
function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
}

var copyRandomList = function (head) {
    let newHead;
    let tail;
    const hashMap = new Map();

    const cloneNode = (node) => {
        if (!node) {
            return null;
        }

        if (hashMap.get(node)) {
            return hashMap.get(node);
        }

        const newNode = new Node(node.val);
        hashMap.set(node, newNode);
        return newNode;
    };

    while (head) {
        const node = cloneNode(head);
        node.random = cloneNode(head.random);

        if (!newHead) {
            newHead = node;
            tail = newHead;
        } else {
            tail.next = node;
            tail = tail.next;
        }

        head = head.next;
    }

    return newHead;
};
// -----------------------------------
// Reverse Linked List
var reverseList = function (head) {
    let newHead = null;

    while (head) {
        const temp = newHead;

        newHead = new ListNode(head.val);

        newHead.next = temp;

        head = head.next;
    }

    return newHead;
};

// ------------
//Merge k Sorted Lists

var mergeKLists = function (lists) {
    let array = [];

    lists.forEach((list) => {
        while (list) {
            array.push(list.val);
            list = list.next;
        }
    });

    array = array.sort((a, b) => a - b);

    const head = new ListNode();
    let tail = head;

    array.forEach((val) => {
        tail.next = new ListNode(val);
        tail = tail.next;
    });

    return head.next;
};
