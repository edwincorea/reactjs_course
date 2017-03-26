import "./client.scss";

import ReactDom from "react-dom";

function main() {
    //AppContainer is reloaded everytime main is called
    //const AppContainer = require("./components/app").default;
    //ReactDom.render(<AppContainer />, document.getElementById("mount"));

    const routes = require("./routes").default();
    ReactDom.render(routes, document.getElementById("mount"));
}

main();

if (module.hot) {
    //problem #2: handle hmr of routes instead of single components.
    //Solution: accept routes instead of single component
    
    //triggered whenever the module or one of its dependencies changes
    // module.hot.accept("./components/app", () => {
    //     main();
    // });

    module.hot.accept("./routes", () => {
        main();
    });    
}
