export interface ISinglyLonkedNode<Value> {
    value: Value;
    next: ISinglyLonkedNode<Value> | null;
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