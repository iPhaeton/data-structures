import { DoublyLinkedList } from "./DoublyLinkedList";
import { createLinkedListTests } from "./test_utils/LinkedListTestUtils";

const testInvariant = (list: DoublyLinkedList<number>): void => {
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
    
    for (let i = 0; i < list.length; i++) {
        if (nodes[i].prev !== nodes[i-1] && nodes[i].prev !== null) {
            throw new Error(`Invariant is broken at node [${i}]. Wrong previous node.`);
        }
    }
};

createLinkedListTests('DoublyLinkedList', DoublyLinkedList, testInvariant);

describe('DoublyLinkedList. Specific', () => {
    describe('get', () => {
        it('should get a correct node', () => {
            const list = new DoublyLinkedList<number>();
            list.push(1);
            list.push(2);
            list.push(3);
            list.push(4);
            expect(list.get(0)).toBe(1);
            expect(list.get(1)).toBe(2);
            expect(list.get(2)).toBe(3);
            expect(list.get(3)).toBe(4);
        });
    });
});