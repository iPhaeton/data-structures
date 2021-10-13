import { DoublyLinkedNode } from "src/LinkedList/DoublyLinkedList";
import { DoublyLinkedNodeConstructor } from "src/LinkedList/types";
import { BSTNode } from "./BSTNode";
import { IBST, IBSTNode, IBSTNodeConstructor } from "./types";

export class BST<Value> implements IBST<Value> {
    // private _Node: DoublyLinkedNodeConstructor<Value>;
    private _root: IBSTNode<Value> | null;
    private _size: number;

    constructor(private readonly _Node: IBSTNodeConstructor<Value> = BSTNode) {
        this._root = null;
        this._size = 0;
    }

    get size(): number {
        return this._size;
    }

    insert(value: Value): Value {
        let parent = null;
        let node = this._root;
        let direction: 'left' | 'right' | null = null;
        while (node !== null) {
            parent = node;
            if (value < node.value) {
                node = node.left;
                direction = 'left';
            } else {
                node = node.right;
                direction = 'right';
            };
        };

        const newNode = new this._Node(value);
        if (parent && direction) {
            parent[direction] = newNode;
        } else {
            this._root = newNode;
        }
        newNode.parent = parent;
        this._size++;
        return value;
    }

    _checkRI(): null {
        if (this._root && this._root.parent !== null) {
            throw new Error('The root node should not have a parent');
        }
        if (this.size && !this._root) {
            throw new Error('A tree with size > 0 should have a root');
        }
        return this._root?._checkRI() || null;
    }
}