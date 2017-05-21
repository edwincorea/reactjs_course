import {Observable} from "rxjs";

import {Validator} from "shared/validation";
import {validateMessage} from "shared/validation/chat";
import {mapOp$} from "shared/observable";
import * as A from "../actions";

const defaultView = {
    messages: [
        {index: 1, name: "Person1", message: "Test1"},
        {index: 2, name: "Person2", message: "Test2"},
        {index: 3, name: "Person3", message: "Test3"},
        {index: 4, name: "Person4", message: "Test4"},
        {index: 5, name: "Person5", message: "Test5"}
    ],
    games: [
        {title: "Game 1", id: 1, players: ["player1", "player2", "player3"]},
        {title: "Game 2", id: 2, players: ["player4", "player5", "player6"]},
        {title: "Game 3", id: 3, players: ["player7", "player8", "player9"]},
        {title: "Game 4", id: 4, players: ["player10", "player11", "player12"]},
    ]
};

export default class LobbyStore {
    constructor({dispatcher}, user) {
        this.view$ = Observable.of(defaultView);

        dispatcher.onRequest({
            [A.LOBBY_JOIN]: action => dispatcher.succeed(action),
            
            [A.LOBBY_SEND_MESSAGE]: action => {
                const validator = new Validator();
                if (!user.isLoggedIn)
                    validator._push("You must be logged in");                    

                validator._push(validateMessage(action.message));

                if (validator.didFail) {
                    dispatcher.fail(action, validator.message);
                    return;
                }

                //ToDo: send to socket
            }
        });

        this.opSendMessage$ = mapOp$(
            dispatcher.on$(A.LOBBY_SEND_MESSAGE),
            user.details$.map(u => u.isLoggedIn));
    }
    
}