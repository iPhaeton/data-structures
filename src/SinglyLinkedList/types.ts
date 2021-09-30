export interface INode<Value> {
    value: Value;
    next: INode<Value> | null;
}

export interface ISinglyLinkedList<Value> {
    push: (node: INode<Value>) => void;
    pop: () => void;
    insert: (node: INode<Value>) => void;
    shift: () => void;
}