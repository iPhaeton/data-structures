import { SinglyLinkedNode, SinglyLinkedList } from "./SinglyLinkedList";

describe('Node', () => {
    const value = 111;
    let node: SinglyLinkedNode<number>;
    beforeEach(() => {
        node = new SinglyLinkedNode<number>(value);
    });

    it('should have a value', () => {
        expect(node.value).toBe(value);
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

describe('SinglyLinkedList', () => {
    describe('_getNodeAt', () => {
        it('should return a node at index', () => {
            const list = new SinglyLinkedList<number>();
            list.push(1);
            list.push(2);
            const node0 = list['_getNodeAt'](0);
            const node1 = list['_getNodeAt'](1);
            const node2 = list['_getNodeAt'](2);
            expect(node0 instanceof SinglyLinkedNode).toBe(true);
            expect(node1 instanceof SinglyLinkedNode).toBe(true);
            expect(node0?.value).toBe(1);
            expect(node1?.value).toBe(2);
            expect(node2).toBe(null);
        });

        it('should return null, if index is negative', () => {
            const list = new SinglyLinkedList<number>();
            list.push(1);
            expect(list['_getNodeAt'](-1)).toBe(null);
        });

        it('should return null, if the list is empty', () => {
            const list = new SinglyLinkedList<number>();
            expect(list['_getNodeAt'](0)).toBe(null);
        });
    });

    describe('push', () => {
        it('should push a node', () => {
            const list = new SinglyLinkedList<number>();
            let updatedList = list.push(1);
            updatedList = list.push(2);
            expect(list.length).toBe(2);
            expect(updatedList).toBe(list);
        });
    });

    describe('pop', () => {
        it('should pop a node', () => {
            const list = new SinglyLinkedList<number>();
            list.push(1);
            list.push(2);
            const poppedValue = list.pop();
            expect(poppedValue).toBe(2);
            expect(list.tail).toBe(1);
            expect(list.length).toBe(1);
        });

        it('should handle popping a node when the list has a single node', () => {
            const list = new SinglyLinkedList<number>();
            list.push(1);
            const poppedValue = list.pop();
            expect(list.head).toBe(undefined);
            expect(list.tail).toBe(undefined);
            expect(poppedValue).toBe(1);
            expect(list.length).toBe(0);
        });

        it('should handle popping a node when the list is empty', () => {
            const list = new SinglyLinkedList<number>();
            const poppedNode = list.pop();
            expect(poppedNode).toBe(undefined);
            expect(list.length).toBe(0);
        });
    });

    describe('insert', () => {
        it('should insert a node', () => {
            const list = new SinglyLinkedList<number>();
            let updatedList = list.insert(1);
            updatedList = list.insert(2);
            expect(list.length).toBe(2);
            expect(updatedList).toBe(list);
        });
    });

    describe('shift', () => {
        it('should shift a node', () => {
            const list = new SinglyLinkedList<number>();
            list.insert(1);
            list.insert(2);
            const shiftedValue = list.shift();
            expect(shiftedValue).toBe(1);
            expect(list.head).toBe(2);
            expect(list.length).toBe(2);
        });

        it('should handle shifting a node when the list has a single node', () => {
            const list = new SinglyLinkedList<number>();
            list.insert(1);
            const shiftedValue = list.shift();
            expect(list.head).toBe(undefined);
            expect(list.tail).toBe(undefined);
            expect(shiftedValue).toBe(1);
            expect(list.length).toBe(0);
        });

        it('should handle shifting a node when the list empty', () => {
            const list = new SinglyLinkedList<number>();
            const shiftedNode = list.shift();
            expect(shiftedNode).toBe(undefined);
            expect(list.length).toBe(0);
        });
    });

    describe('head/tail', () => {
        it('should return head/tail node respectively', () => {
            const list = new SinglyLinkedList<number>();
            list.push(1);
            list.push(2);
            expect(list.head).toBe(1);
            expect(list.tail).toBe(2);
        });

        it('if the list has a single node, this node should be both head and tail', () => {
            const list = new SinglyLinkedList<number>();
            list.push(1);
            expect(list.head).toBe(1);
            expect(list.tail).toBe(1);
        });
    });

    describe('get', () => {
        it('should return a value at index', () => {
            const list = new SinglyLinkedList<number>();
            list.push(1);
            list.push(2);
            expect(list.get(0)).toBe(1);
            expect(list.get(1)).toBe(2);
            expect(list.get(2)).toBe(undefined);
        });

        it('should return undefined, if index is negative', () => {
            const list = new SinglyLinkedList<number>();
            list.push(1);
            expect(list.get(-1)).toBe(undefined);
        });

        it('should return undefined, if the list is empty', () => {
            const list = new SinglyLinkedList<number>();
            expect(list.get(0)).toBe(undefined);
        });
    });
});