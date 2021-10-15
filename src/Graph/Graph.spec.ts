import { Graph } from "./Graph";
import { GraphNode } from "./GraphNode";

describe('Graph', () => {
    it('should create a graph from an array of nodes', () => {
        const node1 = new GraphNode<number>(1);
        const node2 = new GraphNode<number>(2);
        const node3 = new GraphNode<number>(3);
        const node4 = new GraphNode<number>(4);

        const graph = Graph.fromArray([
            [node1, [node2, node3]],
            [node2, [node1]],
            [node3, [node2, node4]],
        ]);

        expect(graph.nodes).toEqual([node1, node2, node3]);
        expect(node1.adjacent).toEqual(new Set([node2, node3]));
        expect(node2.adjacent).toEqual(new Set([node1]));
        expect(node3.adjacent).toEqual(new Set([node2, node4]));
    })
});