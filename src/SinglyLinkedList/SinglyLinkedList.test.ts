import { Node } from "./SinglyLinkedList";

describe('Node', () => {
    const value = 111;
    let node: Node<number>;
    beforeEach(() => {
        node = new Node<number>(value);
    });

    it('should have a value', () => {
        expect(node.value).toBe(value);
    });

    it('should have pointer to the next node', () => {
        expect(node.next).toBe(null);
    });

    it('should allow for setting the next property to a node', () => {
        const nextNode = new Node(12);
        node.next = nextNode;
        expect(node.next).toBe(nextNode);
    });

    it('should allow for setting the next property to null', () => {
        const nextNode = new Node(12);
        node.next = nextNode;
        node.next = null;
        expect(node.next).toBe(null);
    })
});