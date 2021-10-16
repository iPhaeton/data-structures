import { AdjacentStorageConstructor, IAdjacentStorage, IGraphNode } from "./types";

export class GraphNode<Value> implements IGraphNode<Value> {
    private _adjacent: IAdjacentStorage<Value>;

    constructor(private _value: Value, _AdjacentStorage: AdjacentStorageConstructor<Value> = Set) {
        this._adjacent = new _AdjacentStorage();
    }

    get value(): Value {
        return this._value;
    }

    set value(_value: Value) {
        this._value = _value;
    }

    get adjacent(): IAdjacentStorage<Value> {
        return this._adjacent;
    }

    static copy<Value>(node: IGraphNode<Value>, _AdjacentStorage: AdjacentStorageConstructor<Value> = Set): GraphNode<Value> {
        return new GraphNode(node.value, _AdjacentStorage);
    }
}