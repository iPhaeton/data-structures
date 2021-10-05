import { SinglyLinkedList } from "./SinglyLinkedList";
import { createLinkedListTests } from "./test_utils/LinkedListTestUtils";

const testInvariant = (list: SinglyLinkedList<number>): void => {
    const nodes = [];
    let node = list['_head'];
    while (node !== null) {
        nodes.push(node);
        node = node.next;
    };

    const lastIndex = nodes.length - 1;
    if (nodes[lastIndex] !== list['_tail']) {
        throw new Error(`Invariant is broken at node [${lastIndex}]. Not the tail.`);
    }
};

createLinkedListTests('SinglyLinkedList', SinglyLinkedList, testInvariant);