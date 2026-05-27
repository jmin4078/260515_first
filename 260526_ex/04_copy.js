const a={ b:{c:1234}}
const b= a;
a.b["d"] = 5678;
console.log(a,b);

//얕은 복사
const c = {...a};
a["e"]=8765;
console.log(a,b,c);
a["b"]["f"] = "abcd";
console.log(a,b,c);

const jsonStr = JSON.stringify(a);
const jsonObj = JSON.parse(jsonStr);
console.log(jsonObj);
a["b"]["g"]=true;
console.log(a,b,c,"jsonObj",jsonObj);