import { BSTTraverseOrder, IBST, IBSTNode } from "./types";

function* traverseBSTNodeInOrder<Value>(node: IBSTNode<Value>, order: BSTTraverseOrder): Generator<IBSTNode<Value>, undefined, undefined> {
    if (order === 'pre') yield node;
    if (node.left) yield* traverseBSTNodeInOrder(node.left, order)
    if (order === 'in') yield node;
    if (node.right) yield* traverseBSTNodeInOrder(node.right, order);
    if (order === 'post') yield node;
    return;
}

export function* traverseBST<Value>(tree: IBST<Value>, order: BSTTraverseOrder): Generator<IBSTNode<Value>, undefined, undefined> {
    if (tree.root) {
        yield* traverseBSTNodeInOrder(tree.root, order);
    }
    return;
}