import { PriorityQueue } from "./PriorityQueue";

describe('PriorityQueue', () => {
    it('should enqueue and dequeue a value according to its priority', () => {
        const queue = new PriorityQueue<string>();

        queue.enqueue('Value 1', 2);
        queue.enqueue('Value 2', 1);
        queue.enqueue('Value 3', 3);

        expect(queue.dequeue()).toBe('Value 2');

        queue.enqueue('Value 4', 0);
        queue.enqueue('Value 5', 5);

        expect(queue.dequeue()).toBe('Value 4');
        expect(queue.dequeue()).toBe('Value 1');
    });

    it('should dequeue undefined, if the queue is empty', () => {
        const queue = new PriorityQueue<string>();

        expect(queue.dequeue()).toBe(undefined);
    })
})