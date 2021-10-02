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

describe('SinglyLinkedList', () => {
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

    describe('unshift', () => {
        it('should unshift a node', () => {
            const list = new SinglyLinkedList<number>();
            let updatedList = list.unshift(1);
            updatedList = list.unshift(2);
            expect(list.length).toBe(2);
            expect(updatedList).toBe(list);
        });
    });

    describe('shift', () => {
        it('should shift a node', () => {
            const list = new SinglyLinkedList<number>();
            list.unshift(1);
            list.unshift(2);
            const shiftedValue = list.shift();
            expect(shiftedValue).toBe(2);
            expect(list.head).toBe(1);
            expect(list.length).toBe(1);
        });

        it('should handle shifting a node when the list has a single node', () => {
            const list = new SinglyLinkedList<number>();
            list.unshift(1);
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

    describe('set', () => {
        it('should update a value at a given index and return true', () => {
            const list = new SinglyLinkedList();
            list.push(1);
            list.push(2);
            const isSet = list.set(0, 3);
            expect(isSet).toBe(true);
            expect(list.get(0)).toBe(3);
            expect(list.get(1)).toBe(2);
            expect(list.length).toBe(2);
        });

        it('should return false, if the index is put of range', () => {
            const list = new SinglyLinkedList();
            list.push(1);
            list.push(2);
            const isSet = list.set(3, 3);
            expect(isSet).toBe(false);
            expect(list.get(0)).toBe(1);
            expect(list.get(1)).toBe(2);
            expect(list.length).toBe(2);
        });

        it('should return false, if called on an empty list', () => {
            const list = new SinglyLinkedList();
            const isSet = list.set(0, 3);
            expect(isSet).toBe(false);
            expect(list.head).toBe(undefined);
            expect(list.tail).toBe(undefined);
            expect(list.length).toBe(0);
        });
    });

    describe('insert', () => {
        it('should insert a value into the list', () => {
            const list = new SinglyLinkedList();
            list.push(1);
            list.push(2);
            const inserted = list.insert(1, 1.5);
            expect(inserted).toBe(true);
            expect(list.length).toBe(3);
            expect(list.head).toBe(1);
            expect(list.get(1)).toBe(1.5);
            expect(list.tail).toBe(2);
        });

        it('should insert a value into an empty list', () => {
            const list = new SinglyLinkedList();
            const inserted = list.insert(0, 1);
            expect(inserted).toBe(true);
            expect(list.length).toBe(1);
            expect(list.head).toBe(1);
            expect(list.tail).toBe(1);
        });

        it('should insert a value into the beginning a single node list', () => {
            const list = new SinglyLinkedList();
            list.push(1);
            const inserted = list.insert(0, 0.5);
            expect(inserted).toBe(true);
            expect(list.length).toBe(2);
            expect(list.head).toBe(0.5);
            expect(list.tail).toBe(1);
        });

        it('should insert a value into the beginning of the list', () => {
            const list = new SinglyLinkedList();
            list.push(1);
            list.push(2);
            const inserted = list.insert(0, 0.5);
            expect(inserted).toBe(true);
            expect(list.length).toBe(3);
            expect(list.head).toBe(0.5);
            expect(list.get(1)).toBe(1);
            expect(list.tail).toBe(2);
        });

        it('should insert a value into the end of the list', () => {
            const list = new SinglyLinkedList();
            list.push(1);
            list.push(2);
            const inserted = list.insert(list.length, 2.5);
            expect(inserted).toBe(true);
            expect(list.length).toBe(3);
            expect(list.head).toBe(1);
            expect(list.get(1)).toBe(2);
            expect(list.tail).toBe(2.5);
        });

        it('should return false, if the index is out of range', () => {
            const list = new SinglyLinkedList();
            list.push(1);
            list.insert(10, 2);
            expect(list.length).toBe(1);
            expect(list.head).toBe(1);
            expect(list.tail).toBe(1);
        });

        it('should return false, if the index is < 0', () => {
            const list = new SinglyLinkedList();
            list.push(1);
            list.insert(10, 2);
            expect(list.length).toBe(1);
            expect(list.head).toBe(1);
            expect(list.tail).toBe(1);
        });
    });
});