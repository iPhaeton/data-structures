import { Graph } from "./Graph";
import { GraphNode } from "./GraphNode";
import { IGraphNode } from "./types";

const valuesArray = <ID, Value>(nodes: IGraphNode<ID, Value>[]): Value[] => nodes.map(n => n.value);

describe('Graph', () => {
    it('should create a graph from an array of nodes', () => {
        const node1 = new GraphNode<number, number>(1, 1);
        const node2 = new GraphNode<number, number>(2, 2);
        const node3 = new GraphNode<number, number>(3, 3);
        const node4 = new GraphNode<number, number>(4, 4);

        const graph = Graph.fromArray([
            [node1, [node2, node3]],
            [node2, [node1]],
            [node3, [node2, node4]],
        ]);

        const nodes = [...graph.nodes];

        expect(valuesArray(nodes)).toEqual(valuesArray([node1, node2, node3]));
        expect(valuesArray([...nodes[0].adjacent])).toEqual(valuesArray([node2, node3]));
        expect(valuesArray([...nodes[1].adjacent])).toEqual(valuesArray([node1]));
        expect(valuesArray([...nodes[2].adjacent])).toEqual(valuesArray([node2, node4]));
    })
});