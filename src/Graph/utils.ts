import { ShortestPathResult } from "./types";

export const buildPath = <ID>(shortestPathResult: ShortestPathResult<ID>, endId: ID): ID[] => {
    const path = [endId];
    let parent = shortestPathResult.get(endId)?.parent;
    while (parent) {
        path.push(parent);
        parent = shortestPathResult.get(parent)?.parent;
    }
    return path.reverse();
};