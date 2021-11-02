import { dijkstra } from "./dijkstra";
import { Graph } from "./Graph";
import { GraphNode } from "./GraphNode";

describe('dijkstra', () => {
    it('should perform the Dijkstra algorithm correctly', () => {
        const node1 = new GraphNode<string, string>('A', 'A');
        const node2 = new GraphNode<string, string>('B', 'B');
        const node3 = new GraphNode<string, string>('C', 'C');
        const node4 = new GraphNode<string, string>('D', 'D');

        const graph = Graph.fromArray<string, string>([
            [node1, [node2, node3], [3, 7]],
            [node2, [node1, node3, node4], [1, 3, 1]],
            [node3, [node4], [1]],
            [node4, [node3], [1]],
        ]);

        const result = dijkstra('A', graph);

        expect(result).toEqual(new Map([
            ['A', { parent: null, cost: 0 }],
            ['B', { parent: 'A', cost: 3 }],
            ['C', { parent: 'D', cost: 5 }],
            ['D', { parent: 'B', cost: 4 }],
        ]));
    });
});