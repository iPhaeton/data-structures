export interface IPriorityQueueNode<Value> {
    value: Value;
    priority: number;
};

export interface PriorityQueueNodeConstructor<Value> {
    new(v: Value, p: number): IPriorityQueueNode<Value>;
}

export interface IPriorityQueue<Value> {
    enqueue: (v: Value, p: number) => Value;
    dequeue: () => Value | undefined;
};

export interface IPriorityQueueBaseDS<Value> {
    insert: (v: Value) => Value;
    extract: () => Value | undefined;
}