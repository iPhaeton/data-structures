import { BSTNode } from "./BSTNode";
import { IBSTNode } from "./types";

describe('BSTNode', () => {
    const value = 111;
    let node: IBSTNode<number>;
    beforeEach(() => {
        node = new BSTNode<number>(value);
    });

    it('should have a value', () => {
        expect(node.value).toBe(value);
    });

    it('should allow for changing the value', () => {
        const anoterValue = value + 1;
        node.value = anoterValue;
        expect(node.value).toBe(anoterValue);
    });

    it('should have pointer to the parent node', () => {
        expect(node.parent).toBe(null);
    });

    it('should allow for setting the parent property to a node', () => {
        const anotherNode = new BSTNode(12);
        node.parent = anotherNode;
        expect(node.parent).toBe(anotherNode);
    });

    it('should allow for setting the parent property to null', () => {
        const anotherNode = new BSTNode(12);
        node.parent = anotherNode;
        node.parent = null;
        expect(node.parent).toBe(null);
    });

    it('should have pointer to the left node', () => {
        expect(node.left).toBe(null);
    });

    it('should allow for setting the left property to a node', () => {
        const anotherNode = new BSTNode(12);
        node.left = anotherNode;
        expect(node.left).toBe(anotherNode);
    });

    it('should allow for setting the left property to null', () => {
        const anotherNode = new BSTNode(12);
        node.left = anotherNode;
        node.left = null;
        expect(node.left).toBe(null);
    });

    it('should have pointer to the right node', () => {
        expect(node.right).toBe(null);
    });

    it('should allow for setting the right property to a node', () => {
        const anotherNode = new BSTNode(12);
        node.right = anotherNode;
        expect(node.right).toBe(anotherNode);
    });

    it('should allow for setting the right property to null', () => {
        const anotherNode = new BSTNode(12);
        node.right = anotherNode;
        node.right = null;
        expect(node.right).toBe(null);
    });

    describe('_checkRI', () => {
        it('should return null, if RI holds', () => {
            node.left = new BSTNode(value - 1);
            node.right = new BSTNode(value + 1);

            expect(node._checkRI()).toBe(null);
        });

        it('should throw, if RI does not hold on the left', () => {
            node.left = new BSTNode(value + 1);
            node.right = new BSTNode(value + 1);

            expect(node._checkRI).toThrow();
        });

        it('should throw, if RI does not hold on the right', () => {
            node.left = new BSTNode(value - 1);
            node.right = new BSTNode(value - 1);

            expect(node._checkRI).toThrow();
        });
    });
});