import { BST } from "./BST";
import { BSTNode } from "./BSTNode";

describe('BST', () => {
    let bst: BST<number>;
    beforeEach(() => {
        bst = new BST();
    });

    describe('insert', () => {
        it('should insert nodes correctly', () => {
            bst.insert(10);
            bst.insert(5);
            bst.insert(15);
            bst.insert(2);
            const val = bst.insert(7);

            bst._checkRI();
            expect(bst.size).toBe(5);
            expect(val).toBe(7);
        });
    });

    describe('_checkRI', () => {
        it('should return null, if RI holds', () => {
            const checkRISpy = jest.fn();
            class Node extends BSTNode<number> {
                _checkRI() {
                    checkRISpy();
                    return null;
                }
            }
            const bst = new BST(Node);
            bst.insert(10);

            const res = bst._checkRI();

            expect(res).toBe(null);
            expect(checkRISpy).toBeCalledTimes(1);
        });

        it('should throw, if root parent is not null', () => {
            const bst = new BST();
            bst['_root'] = new BSTNode(10);
            bst['_root'].parent = new BSTNode(1);

            expect(bst._checkRI).toThrow();
        });

        it('should throw, if root is null and size > 0', () => {
            const bst = new BST();
            bst['_root'] = null;
            bst['_size'] = 1;

            expect(bst._checkRI).toThrow();
        });

        it('should throw, if root is not null and size === 0', () => {
            const bst = new BST();
            bst['_root'] = new BSTNode(10);
            bst['_size'] = 0;

            expect(bst._checkRI).toThrow();
        });

        it('should throw, if the root _checkRI throws', () => {
            class Node extends BSTNode<number> {
                _checkRI() {
                    throw new Error();
                    return null;
                }
            }

            const bst = new BST();
            bst['_root'] = new Node(1);
            bst['_size'] = 1;

            expect(bst._checkRI).toThrow();
        });
    })
})