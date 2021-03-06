import { composeClasses } from "../utils/composeClasses";
import { SinglyLinkedList, SinglyLinkedNode } from "./SinglyLinkedList";
import { IQueue, ISinglyLinkedNode, QueueConstructor, SinglyLinkedNodeConstructor } from "./types";

class QueueBase<Value> {
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

    add() { return };
    remove() { return };
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    private _toString(cb: (v: Value) => string) { return };

    print(cb: (v: Value) => string = v => `${v}`) {
        return `Queue(${this._toString(cb)})`
    };
}

QueueBase.prototype.add = SinglyLinkedList.prototype.push as any;
QueueBase.prototype.remove = SinglyLinkedList.prototype.shift;

const Queue = composeClasses<QueueConstructor<any>>({
    BaseClass: QueueBase,
    ComposeWith: SinglyLinkedList,
    methodNames: ['_getNodeAt', '_reconsile', Symbol.iterator, '_toString'],
});

export const getQueueClass = <Value>(): QueueConstructor<Value> => {
    return Queue;
}

export const createQueue = <Value>(): IQueue<Value> => {
    return new Queue()
}