import { composeClasses } from "../utils/composeClasses";
import { SinglyLinkedList, SinglyLinkedNode } from "./SinglyLinkedList";
import { ISinglyLinkedNode, IStack, SinglyLinkedNodeConstructor, StackConstructor } from "./types";

class StackBase<Value> {
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
}

StackBase.prototype.add = SinglyLinkedList.prototype.unshift as any;
StackBase.prototype.remove = SinglyLinkedList.prototype.shift;

const Stack = composeClasses<StackConstructor<any>>({
    BaseClass: StackBase,
    ComposeWith: SinglyLinkedList,
    methodNames: ['_getNodeAt', '_reconsile'],
});

export const getStackClass = <Value>(): StackConstructor<Value> => {
    return Stack;
}

export const createStack = <Value>(): IStack<Value> => {
    return new Stack()
}