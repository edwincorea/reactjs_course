import "./client.scss";

import React from "react";
import ReactDom from "react-dom";

import {Router, browserHistory as history} from "react-router";

import {Dispatcher} from "shared/dispatcher"; //shared is a webpack alias pointing to /src/server/shared/
import * as A from "./actions";
import {StoreProvider} from "./lib/component";
import createStores from "./stores";

//------------------------------------------------------
// Services
const dispatcher = new Dispatcher();
const services = {dispatcher};

//------------------------------------------------------
// Stores
const stores = createStores(services);

//------------------------------------------------------
// Render
function main() {
    const routes = require("./routes").default();
    ReactDom.render(
        <StoreProvider stores={stores} services={services}>
            <Router history={history}>
                {routes}
            </Router>
        </StoreProvider>, 
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

