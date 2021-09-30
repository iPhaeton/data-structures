import { Node, SinglyLinkedList } from "./SinglyLinkedList";

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
        it('should push a node', () => {
            const list = new SinglyLinkedList<number>();
            const node1 = new Node(1);
            const node2 = new Node(2);
            list.push(node1);
            list.push(node2);
            expect(list.length).toBe(2);
            expect(list.get(0)).toBe(node1);
            expect(list.get(1)).toBe(node2);
            expect(list.get(2)).toBe(null);
        });
    });

    describe('pop', () => {
        it('should pop a node', () => {
            const list = new SinglyLinkedList<number>();
            const node1 = new Node(1);
            const node2 = new Node(2);
            list.push(node1);
            list.push(node2);
            const poppedNode = list.pop();
            expect(poppedNode).toBe(node2);
            expect(list.length).toBe(1);
        });

        it('should handle popping a node when the list is empty', () => {
            const list = new SinglyLinkedList<number>();
            const poppedNode = list.pop();
            expect(poppedNode).toBe(null);
            expect(list.length).toBe(0);
        });
    });

    describe('insert', () => {
        it('should insert a node', () => {
            const list = new SinglyLinkedList<number>();
            const node1 = new Node(1);
            const node2 = new Node(2);
            list.insert(node1);
            list.insert(node2);
            expect(list.length).toBe(2);
            expect(list.get(0)).toBe(node2);
            expect(list.get(1)).toBe(node1);
            expect(list.get(2)).toBe(null);
        });
    });

    describe('shift', () => {
        it('should shift a node', () => {
            const list = new SinglyLinkedList<number>();
            const node1 = new Node(1);
            const node2 = new Node(2);
            list.insert(node1);
            list.insert(node2);
            const shiftedNode = list.shift();
            expect(shiftedNode).toBe(node2);
            expect(list.length).toBe(1);
        });

        it('should handle shifting a node when the list empty', () => {
            const list = new SinglyLinkedList<number>();
            const shiftedNode = list.shift();
            expect(shiftedNode).toBe(null);
            expect(list.length).toBe(0);
        });
    });

    describe('head/tail', () => {
        it('should return head/tail node respectively', () => {
            const list = new SinglyLinkedList<number>();
            const node1 = new Node(1);
            const node2 = new Node(2);
            list.push(node1);
            list.push(node2);
            expect(list.head()).toBe(node1);
            expect(list.tail()).toBe(node2);
            expect(list.length).toBe(2);
        });
    });
});