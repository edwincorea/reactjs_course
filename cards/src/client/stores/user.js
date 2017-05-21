import {Observable, BehaviorSubject} from "rxjs";

import {validateName} from "shared/validation/user";
import {mapOp$} from "shared/observable";
import * as A from "../actions";

//fake user request object
const defaultDetails = {
    isLoggedIn: false,
    id: null,
    name: null
};

export default class UserStore {
    constructor({dispatcher}){
        // BehaviorSubject: consumer-producer values. 
        // For now it is used because there is no connection to server.
        this.details$ = new BehaviorSubject(defaultDetails);

        //copies every value from details to UserStore.
        this.details$.subscribe(details =>
            Object.keys(details).forEach(k => this[k] = details[k]));

        dispatcher.onRequest({
            [A.USER_LOGIN]: (action) => {
                const validator = validateName(action.name);
                if (validator.didFail){
                    dispatcher.fail(action, validator.message);
                    return;
                }

                //fake success response from login request
                dispatcher.succeed(action);
                this.details$.next({
                    isLoggedIn: true,
                    id: 333,
                    name: action.name
                });
            }
        });
        
        this.opLogin$ = mapOp$(
            dispatcher.on$(A.USER_LOGIN),
            this.details$.map(details => !details.isLoggedIn)); //can        
    }
}