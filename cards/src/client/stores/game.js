import {mapOp$} from "shared/observable";
import * as A from "../actions";

export default class GameStore {
    constructor({dispatcher}, user) {
        const isLoggedIn$ = user.details$.map(u => u.isLoggedIn);

        this.opCreateGame$ = mapOp$(
            dispatcher.on$(A.GAME_CREATE),
            isLoggedIn$);

        this.opJoinGame$ = mapOp$(
            dispatcher.on$(A.GAME_JOIN));
    }
        
}