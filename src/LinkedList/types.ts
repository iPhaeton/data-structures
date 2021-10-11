export interface ISinglyLinkedNode<Value> {
    value: Value;
    next: ISinglyLinkedNode<Value> | null;
}

export interface SinglyLinkedNodeConstructor<Value> {
    new(value: Value): ISinglyLinkedNode<Value>;
}

export interface IDoublyLinkedNode<Value> {
    value: Value;
    next: IDoublyLinkedNode<Value> | null;
    prev: IDoublyLinkedNode<Value> | null;
}

export interface DoublyLinkedNodeConstructor<Value> {
    new(value: Value): IDoublyLinkedNode<Value>;
}

export interface ILinkedList<Value> {
    length: number;
    head: Value | undefined;
    tail: Value | undefined;
    push: (value: Value) => ILinkedList<Value>;
    pop: () => Value | undefined;
    unshift: (value: Value) => ILinkedList<Value>;
    shift: () => Value | undefined;
    get: (index: number) => Value | undefined;
    set: (index: number, value: Value) => boolean;
    insert: (index: number, value: Value) => boolean;
    remove: (index: number) => Value | undefined;
    reverse: () => ILinkedList<Value>;
    print: () => string;
    [Symbol.iterator]: any;
}

export interface LinkedListConstructor<Value> {
    new(): ILinkedList<Value>
}

export interface IQueue<Value> {
    length: number;
    add: (value: Value) => IQueue<Value>;
    remove: () => Value | undefined;
}

export interface QueueConstructor<Value> {
    new(): IQueue<Value>;
}

export interface IStack<Value> {
    length: number;
    add: (value: Value) => IQueue<Value>;
    remove: () => Value | undefined;
}

export interface StackConstructor<Value> {
    new(): IStack<Value>;
}
