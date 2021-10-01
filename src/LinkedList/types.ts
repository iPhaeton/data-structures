export interface ISinglyLinkedNode<Value> {
    value: Value;
    next: ISinglyLinkedNode<Value> | null;
}

export interface ILinkedList<Node> {
    length: number;
    push: (node: Node) => void;
    pop: () => Node | null;
    insert: (node: Node) => void;
    shift: () => Node | null;
    get: (index: number) => Node | null; 
    head: () => Node | null;
    tail: () => Node | null;
}