import "./game.scss";

import React from "react";
import {ContainerBase} from "../lib/component";

class GameContainer extends ContainerBase {
    constructor(props) {
        super(props);
    }

    render() {
        return <p>Game!</p>;
    }
}

class GameSidebar extends ContainerBase {
    constructor(props) {
        super(props);
    }

    render() {
        return <p>Game Sidebar!</p>;
    }
}

export default {
    main: GameContainer,
    sidebar: GameSidebar
};