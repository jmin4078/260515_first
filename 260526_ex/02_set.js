const m = new Map();
m.set("a",1234);
m.set("b",1234);
console.log(m);
m.set("a", 5678);

console.log(m);
//a라는 키는 중복 안됨. a에 들어가는 값은 중복될 수 있다.

const s = new Set();
s.add(1234); //키가 없다
console.log(s); //값이 곧 키다 -> 중복을 허용하지 않는다. 값에도
// .

