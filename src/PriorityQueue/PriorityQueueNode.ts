import { IPriorityQueueNode } from "./types";

export class PriorityQueueNode<Value> implements IPriorityQueueNode<Value> {
    constructor(
        private readonly _value: Value,
        private readonly _priority: number,
    ) {};

    get value(): Value {
        return this._value;
    }

    get priority(): number {
        return this._priority;
    }
}