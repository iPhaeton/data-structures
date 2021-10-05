import { IDoublyLinkedNode } from "./types";

export class DoublyLinkedNode<Value = any> implements IDoublyLinkedNode<Value> {
    private _value: Value;
    private _next: IDoublyLinkedNode<Value> | null;
    private _prev: IDoublyLinkedNode<Value> | null;

    constructor(value: Value) {
        this._value = value;
        this._next = null;
        this._prev = null;
    };

    get value(): Value {
        return this._value;
    }

    set value(newValue: Value) {
        this._value = newValue;
    }

    get next(): IDoublyLinkedNode<Value> | null {
        return this._next;
    }

    set next(next: IDoublyLinkedNode<Value> | null) {
        this._next = next;
    }

    get prev(): IDoublyLinkedNode<Value> | null {
        return this._prev;
    }

    set prev(prev: IDoublyLinkedNode<Value> | null) {
        this._prev = prev;
    }
}