import { SinglyLinkedList, SinglyLinkedNode } from "./LinkedList/SinglyLinkedList";
import { ISinglyLinkedNode, SinglyLinkedNodeConstructor } from "./LinkedList/types";
import { mapInterface } from './utils/mapInterface';

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
}

interface IQueue<Value> {
    add: (value: Value) => IQueue<Value>;
    remove: (ctx: IQueue<Value>) => Value | undefined;
}

interface QueueConstructor<Value> {
    new(): IQueue<Value>;
}

const Queue: QueueConstructor<number> = mapInterface({
    Constructor: SinglyLinkedList,
    interfaceMap: {
        push: { name: 'add' },
        shift: {
            name: 'remove',
            decorator: (fn: () => number | undefined) => {
                return (ctx) => fn.call(ctx) || null;
            },
        },
        _getNodeAt: { name: '_getNodeAt' },
        _reconsile: { name: '_reconsile' },
    },
    BaseClass: QueueBase,
});

const q = new Queue();
q.add(1);
q.add(2);
q.add(3);
console.log(q.remove(q));
console.log(q.remove(q));
console.log(q.remove(q));
console.log(q.remove(q));