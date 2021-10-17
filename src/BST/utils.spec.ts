import { BST } from "./BST";
import { BSTNode } from "./BSTNode";
import { IBST, IBSTNode } from "./types";
import { traverseBST } from "./utils";

describe('BST utils', () => {
    describe('traverseBST', () => {
        let node1: IBSTNode<number>;
        let node2: IBSTNode<number>;
        let node3: IBSTNode<number>;
        let node4: IBSTNode<number>;
        let node5: IBSTNode<number>;
        let tree: IBST<number>;
        beforeEach(() => {
            node1 = new BSTNode<number>(10);
            node2 = new BSTNode<number>(5);
            node3 = new BSTNode<number>(15);
            node4 = new BSTNode<number>(2);
            node5 = new BSTNode<number>(7);

            tree = new BST<number>();
            tree.insert(10);
            tree.insert(5);
            tree.insert(15);
            tree.insert(2);
            tree.insert(7);
        });

        it('should traverse the tree nodes in the pre-order way', () => {
            const visitedValues = [];
            for (const node of traverseBST(tree, 'pre')) {
                visitedValues.push(node.value);
            };
            expect(visitedValues).toEqual([
                node1.value,
                node2.value,
                node4.value,
                node5.value,
                node3.value,
            ]);
        });

        it('should traverse the tree nodes in the in-order way', () => {
            const visitedValues = [];
            for (const node of traverseBST(tree, 'in')) {
                visitedValues.push(node.value);
            };
            expect(visitedValues).toEqual([
                node1.value,
                node2.value,
                node3.value,
                node4.value,
                node5.value,
            ].sort((a, b) => a - b));
        });

        it('should traverse the tree nodes in the post-order way', () => {
            const visitedValues = [];
            for (const node of traverseBST(tree, 'post')) {
                visitedValues.push(node.value);
            };
            expect(visitedValues).toEqual([
                node4.value,
                node5.value,
                node2.value,
                node3.value,
                node1.value,
            ]);
        });
    });
});