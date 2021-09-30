import { INode, ISinglyLinkedList } from "./types";

export class Node<Value = any> implements INode<Value> {
    private _value: Value;
    private _next: INode<Value> | null;

    constructor(value: Value) {
        this._value = value;
        this._next = null;
    };

    get value(): Value {
        return this._value;
    }

    get next(): INode<Value> | null {
        return this._next;
    }

    set next(next: INode<Value> | null) {
        this._next = next;
    }
};

export class SinglyLinkedList<Value = any> implements ISinglyLinkedList<Value> {
    private _length: number = 0;
    private _head: INode<Value> | null;
    private _tail: INode<Value> | null;

    constructor() {
        this._length = 0;
        this._head = null;
        this._tail = null;
    }

    get length(): number {
        return this._length;
    }

    push(node: INode<Value>): void {
        return;
    };

    pop(): INode<Value> | null {
        return null;
    };

    insert(node: INode<Value>): void {
        return;
    };

    shift(): INode<Value> | null {
        return null;
    };

    get(index: number): INode<Value> | null {
        return null;
    };

    head(): INode<Value> | null {
        return null;
    };

    tail(): INode<Value> | null {
        return null;
    };
}