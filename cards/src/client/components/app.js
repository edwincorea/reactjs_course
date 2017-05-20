import "./app.scss";

import React from "react";
import {ContainerBase} from "../lib/component";
import dialogTypes from "./dialogs";

class AppContainer extends ContainerBase {
    constructor(props) {
        super(props);
        this._click = this._click.bind(this);
    }

    componentDidMount(){
        const {stores: {app}} = this.context;

        this.subscribe(app.dialogs$, (dialogs) => this.setState({dialogs}));
    }

    render() {
        const {main, sidebar} = this.props;
        console.log(this.state && this.state.dialogs);

        return (
            <div className={`c-application`}>
                <div className="inner">
                    <div className="sidebar">
                        {sidebar}
                    </div>
                    <div className="main">
                        {main}
                    </div>
                </div>
            </div>
        );
    }

    _click() {
        console.log("Clicked! :)");
    }
} 

export default AppContainer;