import _ from "lodash";

//instruct webpack to package up every single .js file in dialogs directory, 
//not included subdirectories
const context = require.context("./", false, /\.js$/);
const components = context
    .keys()
    .filter(name => name.indexOf("index") == -1) //filter out current file
    .map(name => context(name).default);//load module at runtime 

//now convert array of objects into object
// [{id: 1, component: comp1}, {id: 2, component: comp2}]
// {1: comp1, 2: comp2}
export default _.zipObject(
    components.map(c => c.id),
    components.map(c => c.component));