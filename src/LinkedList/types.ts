export interface ISinglyLinkedNode<Value> {
    value: Value;
    next: ISinglyLinkedNode<Value> | null;
}

export interface ILinkedList<Value> {
    length: number;
    push: (value: Value) => ILinkedList<Value>;
    pop: () => Value | undefined;
    unshift: (value: Value) => ILinkedList<Value>;
    shift: () => Value | undefined;
    get: (index: number) => Value | undefined; 
    head: Value | undefined;
    tail: Value | undefined;
}

export interface SinglyLinkedNodeConstructor<Value> {
    new (value: Value): ISinglyLinkedNode<Value>;
}