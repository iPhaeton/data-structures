import { ISinglyLonkedNode, ILinkedList } from "./types";

export class SinglyLinkedNode<Value = any> implements ISinglyLonkedNode<Value> {
    private _value: Value;
    private _next: ISinglyLonkedNode<Value> | null;

    constructor(value: Value) {
        this._value = value;
        this._next = null;
    };

    get value(): Value {
        return this._value;
    }

    get next(): ISinglyLonkedNode<Value> | null {
        return this._next;
    }

    set next(next: ISinglyLonkedNode<Value> | null) {
        this._next = next;
    }
};

export class SinglyLinkedList<Value> implements ILinkedList<ISinglyLonkedNode<Value>> {
    private _length: number = 0;
    private _head: ISinglyLonkedNode<Value> | null;
    private _tail: ISinglyLonkedNode<Value> | null;

    constructor() {
        this._length = 0;
        this._head = null;
        this._tail = null;
    }

    get length(): number {
        return this._length;
    }

    push(node: ISinglyLonkedNode<Value>): void {
        return;
    };

    pop(): ISinglyLonkedNode<Value> | null {
        return null;
    };

    insert(node: ISinglyLonkedNode<Value>): void {
        return;
    };

    shift(): ISinglyLonkedNode<Value> | null {
        return null;
    };

    get(index: number): ISinglyLonkedNode<Value> | null {
        return null;
    };

    head(): ISinglyLonkedNode<Value> | null {
        return null;
    };

    tail(): ISinglyLonkedNode<Value> | null {
        return null;
    };
}