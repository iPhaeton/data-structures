import { LinkedListConstructor } from "../types";

export const createLinkedListTests = (
    name: 'SinglyLinkedList' | 'DoublyLinkedList',
    Constructor: LinkedListConstructor<number>,
    testInvariant: (list: any) => void,
): any => {
    return describe(name, () => {
        let list: any;
        beforeEach(() => {
            list = new Constructor();
        })

        it('should be iterable', () => {
            list.push(1);
            list.push(2);
            list.push(3);
            expect([...list]).toEqual([1, 2, 3]);
        });

        describe('push', () => {
            it('should push a node', () => {
                let updatedList = list.push(1);
                updatedList = list.push(2);
                expect(list.length).toBe(2);
                expect(updatedList).toBe(list);
                expect(list.head).toBe(1);
                expect(list.tail).toBe(2);
                expect(() => testInvariant(updatedList)).not.toThrow();
            });
        });

        describe('pop', () => {
            it('should pop a node', () => {
                list.push(1);
                list.push(2);
                const poppedValue = list.pop();
                expect(poppedValue).toBe(2);
                expect(list.tail).toBe(1);
                expect(list.length).toBe(1);
                expect(() => testInvariant(list)).not.toThrow();
            });

            it('should handle popping a node when the list has a single node', () => {
                list.push(1);
                const poppedValue = list.pop();
                expect(list.head).toBe(undefined);
                expect(list.tail).toBe(undefined);
                expect(poppedValue).toBe(1);
                expect(list.length).toBe(0);
            });

            it('should handle popping a node when the list is empty', () => {
                const poppedNode = list.pop();
                expect(poppedNode).toBe(undefined);
                expect(list.length).toBe(0);
            });
        });

        describe('unshift', () => {
            it('should unshift a node', () => {
                let updatedList = list.unshift(1);
                updatedList = list.unshift(2);
                expect(list.length).toBe(2);
                expect(updatedList).toBe(list);
            });
        });

        describe('shift', () => {
            it('should shift a node', () => {
                list.unshift(1);
                list.unshift(2);
                const shiftedValue = list.shift();
                expect(shiftedValue).toBe(2);
                expect(list.head).toBe(1);
                expect(list.length).toBe(1);
                expect(() => testInvariant(list)).not.toThrow();
            });

            it('should handle shifting a node when the list has a single node', () => {
                list.unshift(1);
                const shiftedValue = list.shift();
                expect(list.head).toBe(undefined);
                expect(list.tail).toBe(undefined);
                expect(shiftedValue).toBe(1);
                expect(list.length).toBe(0);
            });

            it('should handle shifting a node when the list empty', () => {
                const shiftedNode = list.shift();
                expect(shiftedNode).toBe(undefined);
                expect(list.length).toBe(0);
            });
        });

        describe('head/tail', () => {
            it('should return head/tail node respectively', () => {
                list.push(1);
                list.push(2);
                expect(list.head).toBe(1);
                expect(list.tail).toBe(2);
            });

            it('if the list has a single node, this node should be both head and tail', () => {
                list.push(1);
                expect(list.head).toBe(1);
                expect(list.tail).toBe(1);
            });
        });

        describe('get', () => {
            it('should return a value at index', () => {
                list.push(1);
                list.push(2);
                expect(list.get(0)).toBe(1);
                expect(list.get(1)).toBe(2);
                expect(list.get(2)).toBe(undefined);
            });

            it('should return undefined, if index is negative', () => {
                list.push(1);
                expect(list.get(-1)).toBe(undefined);
            });

            it('should return undefined, if the list is empty', () => {
                expect(list.get(0)).toBe(undefined);
            });
        });

        describe('set', () => {
            it('should update a value at a given index and return true', () => {
                list.push(1);
                list.push(2);
                const isSet = list.set(0, 3);
                expect(isSet).toBe(true);
                expect(list.get(0)).toBe(3);
                expect(list.get(1)).toBe(2);
                expect(list.length).toBe(2);
                expect(() => testInvariant(list)).not.toThrow();
            });

            it('should return false, if the index is put of range', () => {
                list.push(1);
                list.push(2);
                const isSet = list.set(3, 3);
                expect(isSet).toBe(false);
                expect(list.get(0)).toBe(1);
                expect(list.get(1)).toBe(2);
                expect(list.length).toBe(2);
                expect(() => testInvariant(list)).not.toThrow();
            });

            it('should return false, if called on an empty list', () => {
                const isSet = list.set(0, 3);
                expect(isSet).toBe(false);
                expect(list.head).toBe(undefined);
                expect(list.tail).toBe(undefined);
                expect(list.length).toBe(0);
            });
        });

        describe('insert', () => {
            it('should insert a value into the list', () => {
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
                const inserted = list.insert(0, 1);
                expect(inserted).toBe(true);
                expect(list.length).toBe(1);
                expect(list.head).toBe(1);
                expect(list.tail).toBe(1);
            });

            it('should insert a value into the beginning a single node list', () => {
                list.push(1);
                const inserted = list.insert(0, 0.5);
                expect(inserted).toBe(true);
                expect(list.length).toBe(2);
                expect(list.head).toBe(0.5);
                expect(list.tail).toBe(1);
            });

            it('should insert a value into the beginning of the list', () => {
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
                list.push(1);
                list.insert(10, 2);
                expect(list.length).toBe(1);
                expect(list.head).toBe(1);
                expect(list.tail).toBe(1);
            });

            it('should return false, if the index is negative', () => {
                list.push(1);
                list.insert(-1, 2);
                expect(list.length).toBe(1);
                expect(list.head).toBe(1);
                expect(list.tail).toBe(1);
            });
        });

        describe('remove', () => {
            it('should remove a value from the list and return it', () => {
                list.push(1);
                list.push(2);
                list.push(3);
                const removedValue = list.remove(1);
                expect(removedValue).toBe(2);
                expect(list.length).toBe(2);
                expect(list.head).toBe(1);
                expect(list.tail).toBe(3);
            });

            it('should return undefined, if trying to remove a value from an empty list', () => {
                const removedValue = list.remove(0);
                expect(removedValue).toBe(undefined);
                expect(list.length).toBe(0);
            });

            it('should remove a value from a single node list', () => {
                list.push(1);
                const removedValue = list.remove(0);
                expect(removedValue).toBe(1);
                expect(list.length).toBe(0);
                expect(list.head).toBe(undefined);
                expect(list.tail).toBe(undefined);
            });

            it('should remove a value from the beginning of the list', () => {
                list.push(1);
                list.push(2);
                const removedValue = list.remove(0);
                expect(removedValue).toBe(1);
                expect(list.length).toBe(1);
                expect(list.head).toBe(2);
                expect(list.tail).toBe(2);
            });

            it('should remove a value from the end of the list', () => {
                list.push(1);
                list.push(2);
                const removedValue = list.remove(list.length - 1);
                expect(removedValue).toBe(2);
                expect(list.length).toBe(1);
                expect(list.head).toBe(1);
                expect(list.tail).toBe(1);
            });

            it('should return undefined, if the index is out of range', () => {
                list.push(1);
                const removedValue = list.remove(10);
                expect(removedValue).toBe(undefined);
                expect(list.length).toBe(1);
            });

            it('should return undefined, if the index is negative', () => {
                list.push(1);
                const removedValue = list.remove(-1);
                expect(removedValue).toBe(undefined);
                expect(list.length).toBe(1);
            });
        });

        describe('reverse', () => {
            it('should reverse a list in place', () => {
                list.push(1);
                list.push(2);
                list.push(3);
                list.reverse();
                expect(list.head).toBe(3);
                expect(list.get(1)).toBe(2);
                expect(list.tail).toBe(1);
            });

            it('should reverse a two element list', () => {
                list.push(1);
                list.push(2);
                list.reverse();
                expect(list.head).toBe(2);
                expect(list.tail).toBe(1);
            });

            it('should do nothing with a single alement list', () => {
                list.push(1);
                list.reverse();
                expect(list.head).toBe(1);
                expect(list.tail).toBe(1);
            });

            it('should do nothing with an empty list', () => {
                list.reverse();
                expect(list.head).toBe(undefined);
                expect(list.tail).toBe(undefined);
            });
        });

        describe('print', () => {
            it(`should print ${name}(1,2,3)`, () => {
                list.push(1);
                list.push(2);
                list.push(3);
                expect(list.print()).toBe(`${name}(1,2,3)`);
            });
            it(`should print ${name}()`, () => {
                expect(list.print()).toBe(`${name}()`);
            });
        });
    })
};