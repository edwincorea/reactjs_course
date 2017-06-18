import _ from "lodash";
import {Observable, BehaviorSubject} from "rxjs";
import {mapOp$} from "shared/observable";
import * as A from "../actions";

//dummy data
const defaultView = {
    id: 42,
    title: "Player1's Game",
    step: A.STEP_SETUP,
    options: {
        scoreLimit: 5,
        sets: ["1ed"]
    },
    players: [
        {id: 1, name: "Player1", score: 3, isCzar: false, isPlaying: false, isWinner: true},
        {id: 2, name: "Player2", score: 1, isCzar: false, isPlaying: true, isWinner: false},
        {id: 3, name: "Player3", score: 4, isCzar: true, isPlaying: false, isWinner: false},
        {id: 4, name: "Player4", score: 2, isCzar: false, isPlaying: false, isWinner: false}
    ],
    messages: [
        {index: 1, name: "Player1", message: "Message1"},
        {index: 2, name: "Player1", message: "Message2"},
        {index: 3, name: "Player1", message: "Message3"},
        {index: 4, name: "Player1", message: "Message4"}],
    round: null,
    timer: null
};

const defaultPlayerView = {
    id: 1,
    hand: [],
    stack: null
};

export default class GameStore {
    constructor({dispatcher}, user) {
        dispatcher.onRequest({
            [A.GAME_CREATE]: action => {
                dispatcher.succeed(action);
                dispatcher.succeed(A.gameJoin(42));
            },
            [A.GAME_JOIN]: action => dispatcher.succeed(action),
            [A.GAME_SET_OPTIONS]: action =>  dispatcher.succeed(action),
            [A.GAME_START]: action =>  dispatcher.succeed(action),
            [A.GAME_SELECT_CARD]: action =>  dispatcher.succeed(action),
            [A.GAME_SELECT_STACK]: action =>  dispatcher.succeed(action),
            [A.GAME_SEND_MESSAGE]: action =>  dispatcher.succeed(action)
        });

        this.view$ = new BehaviorSubject(defaultView);
        this.player$ = new BehaviorSubject(defaultPlayerView);

        const isLoggedIn$ = user.details$.map(u => u.isLoggedIn);

        this.opCreateGame$ = mapOp$(
            dispatcher.on$(A.GAME_CREATE),
            isLoggedIn$);

        this.opJoinGame$ = mapOp$(
            dispatcher.on$(A.GAME_JOIN));

        this.opSetOptions$ = mapOp$(
            dispatcher.on$(A.GAME_SET_OPTIONS),
            isLoggedIn$);

        this.opStart$ = mapOp$(
            dispatcher.on$(A.GAME_START),
            isLoggedIn$);  

        const playerAndGame$ = Observable.combineLatest(this.view$, this.player$);

        this.opSelectCard$ = mapOp$(
            dispatcher.on$(A.GAME_SELECT_CARD),
            playerAndGame$.map(([game, player]) => {
                const ourPlayer = _.find(game.players, {id: player.id});
                return ourPlayer && game.step == A.STEP_CHOOSE_WHITES && ourPlayer.isPlaying;
            }));

        this.opSelectStack$ = mapOp$(
            dispatcher.on$(A.GAME_SELECT_STACK),
            playerAndGame$.map(([game, player]) => {
                const ourPlayer = _.find(game.players, {id: player.id});
                return ourPlayer && game.step == A.STEP_JUDGE_STACKS && ourPlayer.isCzar;
            }));        

        this.opSendMessage$ = mapOp$(
            dispatcher.on$(A.GAME_SEND_MESSAGE),
            isLoggedIn$
        );
    }        
}