import { createQueue } from "../LinkedList/Queue";
import { IQueue } from "../LinkedList/types";
import { DFSOrder, IGraph, IGraphNode } from "./types";

export interface TraverseBFSParams<ID, Value> {
    _Queue?: () => IQueue<IGraphNode<ID, Value>>;
    _Set?: () => Set<IGraphNode<ID, Value>>;
}

export function* traverseBFS<ID, Value>(
    graph: IGraph<ID, Value>,
    { _Queue = createQueue, _Set = () => new Set() }: TraverseBFSParams<ID, Value> = {}
): Generator<IGraphNode<ID, Value>, undefined, undefined> {
    const visited = _Set();
    const queue = _Queue();

    for (const currentRoot of graph.nodes) {
        if (!visited.has(currentRoot)) {
            queue.add(currentRoot);
        };

        while (queue.length) {
            const node = queue.remove() as IGraphNode<ID, Value>;
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

export interface TraverseDFSParams<ID, Value> {
    _Set?: () => Set<IGraphNode<ID, Value>>;
}

interface TraverseDFSContext<ID, Value> {
    order: 'pre' | 'post';
    visited: Set<IGraphNode<ID, Value>>;
}

function* traverseDFSNode<ID, Value>(node: IGraphNode<ID, Value>, context: TraverseDFSContext<ID, Value>): Generator<IGraphNode<ID, Value>, undefined, undefined> {
    const { order, visited } = context;

    if (order === 'pre') {
        yield node;
    }

    for (const adjNode of node.adjacent) {
        if (!visited.has(adjNode)) {
            visited.add(adjNode);
            yield* traverseDFSNode(adjNode, context);
        }
    };

    if (order === 'post') {
        yield node;
    }

    return;
}

export function* traverseDFS<ID, Value>(graph: IGraph<ID, Value>, order: DFSOrder, {_Set = () => new Set() }: TraverseDFSParams<ID, Value> = {}): Generator<IGraphNode<ID, Value>, undefined, undefined> {
    const context = { order, visited: _Set() };

    for (const currentRoot of graph.nodes) {
        if (!context.visited.has(currentRoot)) {
            context.visited.add(currentRoot);
            for (const node of traverseDFSNode(currentRoot, context)) {
                yield node;
            };
        };
    };

    return;
};