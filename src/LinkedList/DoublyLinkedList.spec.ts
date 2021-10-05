import { DoublyLinkedList, DoublyLinkedNode } from "./DoublyLinkedList";
import { IDoublyLinkedNode } from "./types";

describe('DoublyLinkedNode', () => {
    const value = 111;
    let node: IDoublyLinkedNode<number>;
    beforeEach(() => {
        node = new DoublyLinkedNode<number>(value);
    });

    it('should have a value', () => {
        expect(node.value).toBe(value);
    });

    it('should allow for changing the value', () => {
        const anoterValue = value + 1;
        node.value = anoterValue;
        expect(node.value).toBe(anoterValue);
    });

    it('should have pointer to the next node', () => {
        expect(node.next).toBe(null);
    });

    it('should allow for setting the next property to a node', () => {
        const nextNode = new DoublyLinkedNode(12);
        node.next = nextNode;
        expect(node.next).toBe(nextNode);
    });

    it('should allow for setting the next property to null', () => {
        const nextNode = new DoublyLinkedNode(12);
        node.next = nextNode;
        node.next = null;
        expect(node.next).toBe(null);
    });

    it('should have pointer to the previous node', () => {
        expect(node.prev).toBe(null);
    });

    it('should allow for setting the prev property to a node', () => {
        const prevNode = new DoublyLinkedNode(12);
        node.prev = prevNode;
        expect(node.prev).toBe(prevNode);
    });

    it('should allow for setting the prev property to null', () => {
        const prevNode = new DoublyLinkedNode(12);
        node.prev = prevNode;
        node.prev = null;
        expect(node.prev).toBe(null);
    });
});

describe('DoublyLinkedList', () => {
    let list: DoublyLinkedList<number>;
    beforeEach(() => {
        list = new DoublyLinkedList();
    });
});
