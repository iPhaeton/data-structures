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

    it('should have pointer to the left node', () => {
        expect(node.left).toBe(null);
    });

    it('should allow for setting the left property to a node', () => {
        const nextNode = new BSTNode(12);
        node.left = nextNode;
        expect(node.left).toBe(nextNode);
    });

    it('should allow for setting the left property to null', () => {
        const nextNode = new BSTNode(12);
        node.left = nextNode;
        node.left = null;
        expect(node.left).toBe(null);
    });

    it('should have pointer to the right node', () => {
        expect(node.right).toBe(null);
    });

    it('should allow for setting the right property to a node', () => {
        const prevNode = new BSTNode(12);
        node.right = prevNode;
        expect(node.right).toBe(prevNode);
    });

    it('should allow for setting the right property to null', () => {
        const prevNode = new BSTNode(12);
        node.right = prevNode;
        node.right = null;
        expect(node.right).toBe(null);
    });
});