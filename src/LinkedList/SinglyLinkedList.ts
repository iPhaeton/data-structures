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

    set value(newValue: Value) {
        this._value = newValue;
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
        if (index < 0 || index > this.length) {
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
        const node = this._getNodeAt(0);
        if (node) {
            this._head = node.next;
        }
        this._reconsile();
        this._length = Math.max(0, this._length - 1);
        return node?.value;
    };

    get(index: number): Value | undefined {
        return this._getNodeAt(index)?.value;
    };

    set(index: number, value: Value): boolean {
        const node = this._getNodeAt(index);

        if (node) {
            node.value = value;
            return true;
        } else {
            return false;
        }
    }

    insert(index: number, value: Value): boolean {
        if (index === 0) {
            this.unshift(value);
            return true;
        } else if (index === this.length) {
            this.push(value);
            return true;
        } else {
            const previous = this._getNodeAt(index - 1);
            if (previous) {
                const node = new SinglyLinkedNode(value);
                node.next = previous.next;
                previous.next = node;
                this._length++;
                return true;
            } else {
                return false;
            }
        }
    }

    remove(index: number): Value | undefined {
        if (index === 0) {
            return this.shift();
        } else if (index === this.length - 1) {
            return this.pop();
        } else {
            const parent = this._getNodeAt(index - 1);
            const node = parent?.next;

            if (node) {
                parent.next = node.next;
                this._length--;
            }
            return node?.value;
        }
    }

    reverse(): SinglyLinkedList<Value> {
        let prevNode = null;
        let node = this._head;
        let nextNode = node?.next || null;
        while (node !== null) {
            node.next = prevNode;
            prevNode = node;
            node = nextNode;
            nextNode = nextNode?.next || null;
        }
        [this._head, this._tail] = [this._tail, this._head];
        return this;
    }

    private _toString(cb: (v: Value) => string): string {
        return `${[...this].map(cb).join(',')}`;
    }

    print(cb: (v: Value) => string = v => `${v}`): string {
        return `SinglyLinkedList(${this._toString(cb)})`;
    }

    get head(): Value | undefined {
        return this._head?.value;
    };

    get tail(): Value | undefined {
        return this._tail?.value;
    };

    [Symbol.iterator](): Iterator<Value, Value> {
        let currentNode = this._head;

        return {
            next(): IteratorResult<Value, Value> {
                const returnValue = {
                    value: currentNode?.value,
                    done: currentNode === null,
                }
                currentNode = currentNode?.next || null;
                return returnValue as IteratorResult<Value, Value>;
            }
        }
    }
}