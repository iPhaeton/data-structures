export interface IBSTNode<Value> {
    value: Value;
    parent: IBSTNode<Value> | null;
    left: IBSTNode<Value> | null;
    right: IBSTNode<Value> | null;
    _checkRI: () => null;
}

export interface IBSTNodeConstructor<Value> {
    new(value: Value): IBSTNode<Value>;
}

export interface IBST<Value> {
    root: IBSTNode<Value> | null;
    size: number;
    insert: (v: Value) => Value;
    find: (v: Value) => Value | undefined;
    _checkRI: () => null;
}

export type BSTTraverseOrder = 'pre' | 'in' | 'post';