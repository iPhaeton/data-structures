import { INode, ISinglyLinkedList } from "./types";

export class Node<Value = any> implements INode<Value> {
    private _value: Value;
    private _next: INode<Value> | null;

    constructor(value: Value) {
        this._value = value;
        this._next = null;
    };

    get value(): Value {
        return this._value;
    }

    get next(): INode<Value> | null {
        return this._next;
    }

    set next(next: INode<Value> | null) {
        this._next = next;
    }
};

export class SinglyLinkedList<Value = any> implements ISinglyLinkedList<Value> {
    push(node: INode<Value>): void { };

    pop(): void { };

    insert(node: INode<Value>): void { };

    shift(): void { };
}