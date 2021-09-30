export class Node<Value = any> {
    private _value: Value;
    private _next: Node<Value> | null;

    constructor(value: Value) {
        this._value = value;
        this._next = null;
    };

    get value() {
        return this._value;
    }

    get next() {
        return this._next;
    }

    set next(next: Node<Value> | null) {
        this._next = next
    }
};