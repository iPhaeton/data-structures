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

    private _reconsile(): void {
        if (this._head === null || this._tail === null) {
            this._head = null;
            this._tail = null;
        }
    }

    private _getNodeAt(index: number): IDoublyLinkedNode<Value> | null {
        if (index < 0 || index >= this.length) {
            return null;
        }

        if (index <= this.length - index) {
            let node = this._head;
            for (let i = 0; i < index; i++) {
                node = node?.next || null;
            };
            return node;
        } else {
            let node = this._tail;
            for (let i = this.length - 1; i > index; i--) {
                node = node?.prev || null;
            };
            return node;
        }
    }

    push(value: Value): DoublyLinkedList<Value> {
        const node = new this._Node(value);
        if (!this._tail) {
            this._head = node;
            this._tail = node;
        } else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        this._length++;
        return this;
    };

    pop(): Value | undefined {
        const node = this._tail;
        this._tail = node?.prev || null;
        if (this._tail) {
            this._tail.next = null;
        }
        this._length = Math.max(this._length - 1, 0);
        this._reconsile();
        return node?.value;
    };

    unshift(value: Value): ILinkedList<Value> {
        const node = new this._Node(value);
        node.next = this._head;
        this._head = node;
        if (!this._tail) {
            this._tail = this._head;
        }
        this._length++;
        return this;
    };

    shift(): Value | undefined {
        const node = this._head;
        if (node) {
            this._head = node?.next;
            if (this._head) {
                this._head.prev = null;
            }
        }
        this._length = Math.max(this._length - 1, 0);
        this._reconsile();
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
    };

    insert(index: number, value: Value): boolean {
        if (index === this.length) {
            this.push(value);
            return true;
        } else if (index === 0) {
            this.unshift(value);
            return true;
        } else {
            const node = this._getNodeAt(index);
            const newNode = new this._Node(value);
            if (node) {
                newNode.prev = node.prev;
                if (node.prev) {
                    node.prev.next = newNode;
                }
                newNode.next = node;
                node.prev = newNode;

                this._length++;
                return true;
            } else {
                return false;
            };
        };
    };

    remove(index: number): Value | undefined {
        if (index < 0 || index >= this.length) {
            return;
        } else if (index === 0) {
            return this.shift();
        } else if (index === this.length - 1) {
            return this.pop();
        } else {
            const node = this._getNodeAt(index) as IDoublyLinkedNode<Value>;
            if (node.prev) {
                node.prev.next = node.next;
            }
            if (node.next) {
                node.next.prev = node.prev;
            }
            this._length = Math.max(this._length - 1, 0);
            return node.value;
        }
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