import { getQueueClass } from "./LinkedList/Queue";

const Queue = getQueueClass<number>();

// class Queue<Value> extends getQueueClass<Value>() {}

const q = new Queue();
console.log('length', q.length);
q.add(1);
q.add(2);
q.add(3);
console.log('length', q.length);
console.log(q.remove());
console.log(q.remove());
console.log(q.remove());
console.log(q.remove());