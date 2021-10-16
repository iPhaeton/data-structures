import { Graph } from "./Graph/Graph";
import { GraphNode } from "./Graph/GraphNode";
import { traverseBFS } from "./Graph/utils";

const node1 = new GraphNode<number>(1);
const node2 = new GraphNode<number>(2);
const node3 = new GraphNode<number>(3);
const node4 = new GraphNode<number>(4);

const graph = Graph.fromArray([
    [node1, [node2, node3]],
    [node2, [node1]],
    [node3, [node2, node4]],
]);

for (const node of traverseBFS(graph)) {
    console.log(node.value);
};