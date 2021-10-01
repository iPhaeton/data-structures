import { ISinglyLinkedNode, ILinkedList, SinglyLinkedNodeConstructor } from "./types";

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

export class SinglyLinkedList<Value> implements ILinkedList<Value> {
    private _Node: SinglyLinkedNodeConstructor<Value>;
    private _length: number;
    private _head: ISinglyLinkedNode<Value> | null;
    private _tail: ISinglyLinkedNode<Value> | null;

    constructor(Node: SinglyLinkedNodeConstructor<Value> = SinglyLinkedNode) {
        this._Node = Node;
        this._length = 0;
        this._head = null;
        this._tail = null;
    }

    get length(): number {
        return this._length;
    }

    push(value: Value): SinglyLinkedList<Value> {
        const node = new this._Node(value)
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

    pop(): Value | undefined {
        const nodeToReturn = this._tail;

        let node = this._head;
        while (node?.next?.next) {
            node = node.next;
        }

        if (node) {
            node.next = null;
            this._tail = node;
            this._length--;
        }

        return nodeToReturn?.value;
    };

    insert(node: Value): void {
        return;
    };

    shift(): Value | undefined {
        return;
    };

    get(index: number): Value | undefined {
        return;
    };

    get head(): Value | undefined {
        return this._head?.value;
    };

    get tail(): Value | undefined {
        return this._tail?.value;
    };
}