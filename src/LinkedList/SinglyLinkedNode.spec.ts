import { SinglyLinkedNode } from "./SinglyLinkedList";

describe('SinglyLinkedNode', () => {
    const value = 111;
    let node: SinglyLinkedNode<number>;
    beforeEach(() => {
        node = new SinglyLinkedNode<number>(value);
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
        const nextNode = new SinglyLinkedNode(12);
        node.next = nextNode;
        expect(node.next).toBe(nextNode);
    });

    it('should allow for setting the next property to null', () => {
        const nextNode = new SinglyLinkedNode(12);
        node.next = nextNode;
        node.next = null;
        expect(node.next).toBe(null);
    })
});