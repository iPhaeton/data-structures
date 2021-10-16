import { createQueue } from "./LinkedList/Queue";
import { createStack } from "./LinkedList/Stack";

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

const s = createStack<number>();
console.log('length', s.length);
s.add(1);
s.add(2);
s.add(3);
console.log('length', s.length);
console.log(s.remove());
console.log(s.remove());
console.log(s.remove());
console.log(s.remove());
