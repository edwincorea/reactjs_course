const test = "test1";
console.log(`Hello ${test}`);

const obj = {hei: 1};
const obj2 = {...obj, prop: 2};
console.log(obj2);

class AppComponent {
    static PropTypes = {
        test: "1"
    }
}

console.log(<AppComponent />);

const a = 1;
switch (a){
    case 1: 
        console.log("1");
        break;
}


