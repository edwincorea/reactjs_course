import "./lobby.scss";

import React, {Component} from "react";

class LobbyContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <p>Lobby!</p>;
    }
}

class LobbySidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <p>Lobby Sidebar!</p>;
    }    
}

export default {
    main: LobbyContainer,
    sidebar: LobbySidebar
};