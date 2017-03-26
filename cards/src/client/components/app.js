import "./app.scss";

import React, {Component} from "react";

class AppContainer extends Component {
    //problem #1: everytime component gets reloaded, it is remounted.
    //Solution: 
    //1. react-hot-loader/babel in .babelrc
    //2. react-hot-loader/patch in webpack.config.js
    componentDidMount() {
        console.log("Component hierarchy is recreated!");
    }    

    render() {
        return <h1>Hello World!</h1>;
    }
} 

export default AppContainer;