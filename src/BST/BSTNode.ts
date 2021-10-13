import { IBSTNode } from "./types";

export class BSTNode<Value> implements IBSTNode<Value> {
    private _value: Value;
    private _left: IBSTNode<Value> | null;
    private _right: IBSTNode<Value> | null;

    constructor(value: Value) {
        this._value = value;
        this._left = null;
        this._right = null;
    };

    get value(): Value {
        return this._value;
    }

    set value(newValue: Value) {
        this._value = newValue;
    }

    get left(): IBSTNode<Value> | null {
        return this._left;
    }

    set left(node: IBSTNode<Value> | null) {
        this._left = node;
    }

    get right(): IBSTNode<Value> | null {
        return this._right;
    }

    set right(node: IBSTNode<Value> | null) {
        this._right = node;
    }
}