import "./app.scss";

import React, {Component} from "react";

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this._click = this._click.bind(this);
    }

    render() {
        const {main, sidebar} = this.props;

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