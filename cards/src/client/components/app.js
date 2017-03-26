import "./app.scss";

import React, {Component} from "react";

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this._click = this._click.bind(this);
    }

    render() {
        return (
            <section>
                <h1>Hello World</h1>
                <button onClick={this._click}>I am button please click</button>
            </section>
        );
    }

    _click() {
        console.log("Clicked! :)");
    }
} 

export default AppContainer;