//Anonymous function
(function () {
    console.log("함수 존재");
})();             

//함수 표현식
const f= function (fn){
    fn();
console.log("난 존재한다");
};
f(function(){
    console.log("공부싫어"); //함수를 값으로 넣어서 실행
});

a(); //선언전에도. 
//hoisting(감아올리기) -> let, const. function -> let,const 를 통해 표현식. 익명함수로 올려라.
function a(){
    console.log("hoihoihoisting");
}



//화살표 함수.
//하스켈, 리스프, 스칼라, 클로저
(function () {})
//핵심은 입력과 출력 
const af = () => 0;
af();
console.log(af());
const af2 = (a) => console.log(`실행결과 : ${a}`);
console.log(af2(1));

const af3 = (a) => {
    a++;
    a *=2;
    return a;
};
console.log(af3(100));