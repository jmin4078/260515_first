//고차함수 함수를 받거나 리턴하는 경우'

//sort
const a = [1, 3, 13, 55, 21];
console.log(a.sort());

console.log(a);
function compare(a,b){
    
    return a-b; //내림차순 b-a
}

console.log(a.sort(compare));

