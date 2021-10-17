import { createQueue } from "../LinkedList/Queue";
import { IQueue } from "../LinkedList/types";
import { IGraph, IGraphNode } from "./types";

export interface TraverseBFSParams<Value> {
    _Queue?: () => IQueue<IGraphNode<Value>>;
    _Set?: () => Set<IGraphNode<Value>>;
}

export function* traverseBFS<Value>(
    graph: IGraph<Value>,
    { _Queue = createQueue, _Set = () => new Set() }: TraverseBFSParams<Value> = {}
): Generator<IGraphNode<Value>, undefined, undefined> {
    const visited = _Set();
    const queue = _Queue();

    for (const currentRoot of graph.nodes) {
        if (!visited.has(currentRoot)) {
            queue.add(currentRoot);
        };

        while (queue.length) {
            const node = queue.remove() as IGraphNode<Value>;
            visited.add(node);
            node.adjacent.forEach(adjNode => {
                if (!visited.has(adjNode)) {
                    queue.add(adjNode)
                };
            });
            yield node;
        };
    }

    return;
};

export interface TraverseDFSParams<Value> {
    _Set?: () => Set<IGraphNode<Value>>;
}

interface TraverseDFSContext<Value> {
    visited: Set<IGraphNode<Value>>;
}

function* traverseDFSPreOrderNode<Value>(node: IGraphNode<Value>, context: TraverseDFSContext<Value>): Generator<IGraphNode<Value>, undefined, undefined> {
    yield node;
    for (const adjNode of node.adjacent) {
        if (!context.visited.has(adjNode)) {
            context.visited.add(adjNode);
            yield* traverseDFSPreOrderNode(adjNode, context);
        }
    };
    return;
}

export function* traverseDFSPreOrder<Value>(graph: IGraph<Value>, { _Set = () => new Set() }: TraverseDFSParams<Value> = {}): Generator<IGraphNode<Value>, undefined, undefined> {
    const context = { visited: _Set() };

    for (const currentRoot of graph.nodes) {
        if (!context.visited.has(currentRoot)) {
            context.visited.add(currentRoot);
            for (const node of traverseDFSPreOrderNode(currentRoot, context)) {
                yield node;
            };
        };
    };

    return;
};