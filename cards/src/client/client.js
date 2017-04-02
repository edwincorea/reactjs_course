import "./client.scss";

import React from "react";
import ReactDom from "react-dom";

import {Router, browserHistory as history} from "react-router";

//------------------------------------------------------
// Render
function main() {
    const routes = require("./routes").default();
    ReactDom.render(        
        <Router history={history}>
            {routes}
        </Router>, 
        document.getElementById("mount"));
}

//------------------------------------------------------
// Misc
if (module.hot) {
    module.hot.accept("./routes", () => {
        main();
    });    
}

//------------------------------------------------------
// Go!
main();

