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

describe('SinglyLinkedList', () => {
    describe('push', () => {
        it('should push a node', () => { });
    });

    describe('pop', () => {
        it('should pop a node', () => { });

        it('should handle popping a node when the list is empty', () => { });
    });

    describe('insert', () => {
        it('should insert a node', () => { });
    });

    describe('shift', () => {
        it('should shift a node', () => { });

        it('should handle shifting a node when the list empty', () => { });
    });

    describe('get', () => {
        it('should get a node', () => { });

        it('should return null, if index is out of range', () => { });
    })
});