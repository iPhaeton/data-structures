export interface INode<Value> {
    value: Value;
    next: INode<Value> | null;
}

export interface ISinglyLinkedList<Value> {
    length: number;
    push: (node: INode<Value>) => void;
    pop: () => INode<Value> | null;
    insert: (node: INode<Value>) => void;
    shift: () => INode<Value> | null;
    get: (index: number) => INode<Value> | null; 
    head: () => INode<Value> | null;
    tail: () => INode<Value> | null;
}