import { IBSTNode } from "./types";

export class BSTNode<Value> implements IBSTNode<Value> {
    private _value: Value;
    private _parent: IBSTNode<Value> | null;
    private _left: IBSTNode<Value> | null;
    private _right: IBSTNode<Value> | null;

    constructor(value: Value) {
        this._value = value;
        this._parent = null;
        this._left = null;
        this._right = null;
    };

    get value(): Value {
        return this._value;
    }

    set value(newValue: Value) {
        this._value = newValue;
    }

    get parent(): IBSTNode<Value> | null {
        return this._parent;
    }

    set parent(node: IBSTNode<Value> | null) {
        this._parent = node;
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

    _checkRI(): null {
        if (this._left) {
            if (this._left.value > this.value) {
                throw new Error(`At [${this.value}]: left node value ${this._left.value} is greater.`);
            }
            this._left._checkRI();
        } else if (this._right) {
            if (this._right.value < this.value) {
                throw new Error(`At [${this.value}]: left node value ${this._right.value} is smaller.`);
            }
            this._right._checkRI();
        }
        return null;
    }
}