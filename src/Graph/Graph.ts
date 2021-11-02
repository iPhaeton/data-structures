import { GraphNode } from "./GraphNode";
import { GraphNodeConstructor, GraphNodesArray, IGraph, IGraphNode } from "./types";

export class Graph<ID, Value> implements IGraph<ID, Value> {
    private _nodes: Map<ID, IGraphNode<ID, Value>>;

    constructor() {
        this._nodes = new Map();
    };

    get nodes(): IterableIterator<IGraphNode<ID, Value>> {
        return this._nodes.values();
    }

    get size(): number {
        return this._nodes.size;
    }

    add(node: IGraphNode<ID, Value>): Graph<ID, Value> {
        if (!this._nodes.get(node.id)) {
            this._nodes.set(node.id, node);
        }
        return this;
    }

    get(id: ID): IGraphNode<ID, Value> | undefined {
        return this._nodes.get(id);
    }

    remove(id: ID): Value | undefined {
        const nodeToDelete = this.get(id);

        if (nodeToDelete) {
            this._nodes.delete(id);
            for (const node of this.nodes) {
                node.remove(nodeToDelete);
            }
        }

        return nodeToDelete?.value;
    }

    addEdge(id1: ID, id2: ID, weight: number = 1): Graph<ID, Value> {
        const node1 = this.get(id1);
        const node2 = this.get(id2);
        if (node1 && node2) {
            node1.add(node2, weight);
        }
        return this;
    }

    removeEdge(id1: ID, id2: ID): Graph<ID, Value> {
        const node1 = this.get(id1);
        const node2 = this.get(id2);
        if (node1 && node2) {
            node1?.remove(node2);
        }
        return this;
    }

    // TODO: The nodes should be copied, not mutated.
    static fromArray<ID, Value>(array: GraphNodesArray<ID, Value>, _Node: GraphNodeConstructor<ID, Value> = GraphNode as GraphNodeConstructor<ID, Value>): Graph<ID, Value> {
        const graph = new Graph<ID, Value>();

        if (!array.length) {
            return graph;
        }

        const copies = new Map();
        for (const [node, adjacent = [], weights = []] of array) {
            let copy: IGraphNode<ID, Value>;
            if (copies.has(node)) {
                copy = copies.get(node);
            } else {
                copy = _Node.copy(node);
                copies.set(node, copy);
            }
            graph.add(copy);

            for (let i = 0; i < adjacent.length; i++) {
                const adjacentNode = adjacent[i];
                const weight = weights[i];
                let adjacentCopy: IGraphNode<ID, Value>;
                if (copies.has(adjacentNode)) {
                    adjacentCopy = copies.get(adjacentNode);
                } else {
                    adjacentCopy = _Node.copy(adjacentNode);
                    copies.set(adjacentNode, adjacentCopy);
                }
                copy.adjacent.set(adjacentCopy, weight);
            };
        };

        return graph;
    };
}