import { createQueue } from "./LinkedList/Queue";

const q = createQueue<number>();
console.log('length', q.length);
q.add(1);
q.add(2);
q.add(3);
console.log('length', q.length);
console.log(q.remove());
console.log(q.remove());
console.log(q.remove());
console.log(q.remove());