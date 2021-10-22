import { Heap } from "src/Heap/Heap";
import { PriorityQueueNode } from "./PriorityQueueNode";
import { IPriorityQueue, IPriorityQueueBaseDS, IPriorityQueueNode, PriorityQueueNodeConstructor } from "./types";

const priorityQueueComparisonFn = <Value>(
    a: IPriorityQueueNode<Value>,
    b: IPriorityQueueNode<Value>,
) => a.priority - b.priority;

export class PriorityQueue<Value> implements IPriorityQueue<Value> {
    constructor(
        private readonly _baseDS: IPriorityQueueBaseDS<IPriorityQueueNode<Value>> =
            new Heap<IPriorityQueueNode<Value>>('min', priorityQueueComparisonFn),
        private readonly _Node: PriorityQueueNodeConstructor<Value> = PriorityQueueNode,
    ) { };

    enqueue(value: Value, priority: number): Value {
        const node = new this._Node(value, priority);
        this._baseDS.insert(node);
        return node.value;
    }

    dequeue(): Value | undefined {
        const node = this._baseDS.extract();
        return node?.value;
    }
};