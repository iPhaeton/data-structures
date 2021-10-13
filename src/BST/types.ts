export interface IBSTNode<Value> {
    value: Value;
    left: IBSTNode<Value> | null;
    right: IBSTNode<Value> | null;
}