import { ISinglyLinkedNode, ILinkedList } from "./types";

export class SinglyLinkedNode<Value = any> implements ISinglyLinkedNode<Value> {
    private _value: Value;
    private _next: ISinglyLinkedNode<Value> | null;

    constructor(value: Value) {
        this._value = value;
        this._next = null;
    };

    get value(): Value {
        return this._value;
    }

    get next(): ISinglyLinkedNode<Value> | null {
        return this._next;
    }

    set next(next: ISinglyLinkedNode<Value> | null) {
        this._next = next;
    }
};

export class SinglyLinkedList<Value> implements ILinkedList<ISinglyLinkedNode<Value>> {
    private _length: number = 0;
    private _head: ISinglyLinkedNode<Value> | null;
    private _tail: ISinglyLinkedNode<Value> | null;

    constructor() {
        this._length = 0;
        this._head = null;
        this._tail = null;
    }

    get length(): number {
        return this._length;
    }

    push(node: ISinglyLinkedNode<Value>): SinglyLinkedList<Value> {
        if (!this._tail) {
            this._head = node;
            this._tail = node;
        } else {
            this._tail.next = node;
            this._tail = node;
        }
        this._length++;
        return this;
    };

    pop(): ISinglyLinkedNode<Value> | null {
        return null;
    };

    insert(node: ISinglyLinkedNode<Value>): void {
        return;
    };

    shift(): ISinglyLinkedNode<Value> | null {
        return null;
    };

    get(index: number): ISinglyLinkedNode<Value> | null {
        return null;
    };

    head(): ISinglyLinkedNode<Value> | null {
        return null;
    };

    tail(): ISinglyLinkedNode<Value> | null {
        return null;
    };
}