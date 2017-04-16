import "./lobby.scss";

import React, {Component} from "react";
import Chat from "./chat";

class LobbyContainer extends Component {
    constructor(props) {
        super(props);

        this._joinGame = this._joinGame.bind(this);
        this._sendMessage = this._sendMessage.bind(this);
    }

    _joinGame(game) {
        console.log(`TODO: Join Game ${game.title}`);        
    }

    _sendMessage(message) {
        console.log(`TODO: Sending ${message}`);        
    }

    render() {
        //in the future get games from a different source such as an API
        const games = [
            {title: "Game 1", id: 1, players: ["player1", "player2", "player3"]},
            {title: "Game 2", id: 2, players: ["player4", "player5", "player6"]},
            {title: "Game 3", id: 3, players: ["player7", "player8", "player9"]},
            {title: "Game 4", id: 4, players: ["player10", "player11", "player12"]},
        ];

        const opSendMessage = {can: true, inProgress: false};
        const messages = [
            {index: 1, name: "Person1", message: "Test1"},
            {index: 2, name: "Person2", message: "Test2"},
            {index: 3, name: "Person3", message: "Test3"},
            {index: 4, name: "Person4", message: "Test4"},
            {index: 5, name: "Person5", message: "Test5"}
        ];
        
        return (
            <div className="c-lobby">
                <GameList games={games} joinGame={this._joinGame} />
                <Chat                 
                    messages={messages}
                    opSendMessage={opSendMessage}
                    sendMessage = {this._sendMessage} />
            </div>
        );
    }
}

class LobbySidebar extends Component {
    constructor(props) {
        super(props);

        this._login = this._login.bind(this);
        this._createGame = this._createGame.bind(this);
    }

    _login() {
        console.log("TODO: Implement Login");
    }

    _createGame() {
        console.log("TODO: Create Game");
    }

    render() {
        const canLogin = true;
        const canCreateGame = true;
        const createGameInProgress = false;

        return (
            <section className="c-lobby-sidebar">
                <div className="m-sidebar-buttons">
                    {!canLogin ? null : 
                        <button className="m-button primary" onClick={this._login}>Login</button>}
                    {!canCreateGame ? null : 
                        <button 
                            className="m-button good"
                            onClick={this._createGame}
                            disabled={createGameInProgress}>
                            Create Game
                        </button>}                        
                </div>
            </section>
        );
    }    
}

//stateless component
function GameList({games, joinGame}) {
    return (
        <section className="c-game-list">
            {games.length > 0 ? null : 
                <div className="no-games">There are no games yet :(</div>}
            
            {games.map(g => 
                <div className="game" key={g.id} onClick={() => joinGame(g)}>
                    <div className="title">{g.title}</div>
                    <div className="players">
                        {g.players.join(", ")}
                    </div>
                    <div className="join-game">Join Game</div>
                </div>)}
        </section>
    );
}

export default {
    main: LobbyContainer,
    sidebar: LobbySidebar
};