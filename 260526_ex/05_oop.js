const v= "동적키";
const v2="이미 있는 변수값";

const o1 = {
    name: "price",
    name2:"price",
    myFun: function(){
        console.log("myFun");
    },
    myFun2: function(){
        console.log("myFun2");
    },
    myFun3: function(){
        console.log("myFun3");
    },
    [v] : "total",
};
console.log(o1);
o1.myFun();

//프로토타입
function Student(name, major){
    this.name=name;
    this.major = major;
}



