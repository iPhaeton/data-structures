import { IBST, IBSTNode } from "./types";

export class BST<Value> implements IBST<Value> {
    private _root: IBSTNode<Value> | null;
    private _size: number;

    constructor() {
        this._root = null;
        this._size = 0;
    }

    get size(): number {
        return this._size;
    }

    insert(value: Value): BST<Value> {
        return this;
    }

    _checkRI(): null {
        return this._root?._checkRI() || null;
    }
}