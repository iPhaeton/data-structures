import { DoublyLinkedNodeConstructor, IDoublyLinkedNode, ILinkedList } from "./types";

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

export class DoublyLinkedList<Value = any> implements ILinkedList<Value> {
    private _Node: DoublyLinkedNodeConstructor<Value>;
    private _length: number;
    private _head: IDoublyLinkedNode<Value> | null;
    private _tail: IDoublyLinkedNode<Value> | null;

    constructor(Node: DoublyLinkedNodeConstructor<Value> = DoublyLinkedNode) {
        this._Node = Node;
        this._length = 0;
        this._head = null;
        this._tail = null;
    }

    get length(): number {
        return this._length;
    }

    get head(): Value | undefined {
        return this._head?.value;
    };

    get tail(): Value | undefined {
        return this._tail?.value;
    };

    push(value: Value): ILinkedList<Value> {
        return this;
    };

    pop(): Value | undefined {
        return;
    };

    unshift(value: Value): ILinkedList<Value> {
        return this;
    };

    shift(): Value | undefined {
        return;
    };

    get(index: number): Value | undefined {
        return;
    };

    set(index: number, value: Value): boolean {
        return true;
    };

    insert(index: number, value: Value): boolean {
        return true;
    };

    remove(index: number): Value | undefined {
        return;
    };

    reverse(): ILinkedList<Value> {
        return this;
    };

    print(): string {
        return '';
    };

    [Symbol.iterator](): Iterator<Value, Value> {
        return {
            next(): IteratorResult<Value, Value> {
                return {
                    value: 1 as any,
                    done: true,
                }
            }
        }
    }
}