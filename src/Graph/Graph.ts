import { GraphNodesArray, IGraph, IGraphNode } from "./types";

export class Graph<Value> implements IGraph<Value> {
    private _nodes: IGraphNode<Value>[];

    constructor() {
        this._nodes = [];
    };

    get nodes(): IGraphNode<Value>[] {
        return this._nodes;
    }

    add(node: IGraphNode<Value>): Graph<Value> {
        this._nodes.push(node);
        return this;
    }

    // TODO: The nodes should be copied, not mutated.
    static fromArray<Value>(array: GraphNodesArray<Value>): Graph<Value> {
        const graph = new Graph<Value>();

        if (!array.length) {
            return graph;
        }

        for (const [node, adjacent = []] of array) {
            graph.add(node);
            adjacent.forEach(adjacentNode => node.adjacent.add(adjacentNode));
        }

        return graph;
    };
}