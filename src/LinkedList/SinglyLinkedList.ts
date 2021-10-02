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

    private _getNodeAt(index: number): ISinglyLinkedNode<Value> | null {
        if (index < 0) {
            return null;
        }

        let node = this._head;
        for (let i = 0; i < index && i < this.length && node !== null; i++) {
            node = node?.next || null;
        };
        return node;
    }

    private _reconsile(): void {
        if (this._head === null || this._tail === null) {
            this._head = null;
            this._tail = null;
        }
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

        const node = this._getNodeAt(this.length - 2);
        this._tail = node;
        if (this._tail) {
            this._tail.next = null;
        }
        this._reconsile();
        this._length = Math.max(0, this._length - 1);

        return nodeToReturn?.value;
    };

    unshift(value: Value): SinglyLinkedList<Value> {
        const node = new this._Node(value)
        if (!this._head) {
            this._head = node;
            this._tail = node;
        } else {
            node.next = this._head;
            this._head = node;
        }
        this._length++;
        return this;
    };

    shift(): Value | undefined {
        const node = this._head;
        if (node) {
            this._head = node.next;
        }
        this._reconsile();
        this._length = Math.max(0, this._length - 1);
        return node?.value;
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