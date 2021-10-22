import { PriorityQueueNode } from "./PriorityQueueNode";

describe('PriorityQueueNode', () => {
    const value = 'Test value';
    const priority = 2;
    let node: PriorityQueueNode<string>;
    beforeAll(() => {
        node = new PriorityQueueNode<string>(value, priority);
    });

    it('should have value', () => {
        expect(node.value).toBe(value);
    });

    it('should have priority', () => {
        expect(node.priority).toBe(priority);
    });
});