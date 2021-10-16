import { Graph } from "./Graph";
import { GraphNode } from "./GraphNode";
import { IGraphNode } from "./types";

const valuesArray = <Value>(nodes: IGraphNode<Value>[]): Value[] => nodes.map(n => n.value);

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

        expect(valuesArray(graph.nodes)).toEqual(valuesArray([node1, node2, node3]));
        expect(valuesArray([...graph.nodes[0].adjacent])).toEqual(valuesArray([node2, node3]));
        expect(valuesArray([...graph.nodes[1].adjacent])).toEqual(valuesArray([node1]));
        expect(valuesArray([...graph.nodes[2].adjacent])).toEqual(valuesArray([node2, node4]));
    })
});