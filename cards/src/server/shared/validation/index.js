export class Validator {
    constructor() {
        this._errors = [];
    }

    _push(error) {
        if (error instanceof Validator) {
            for (let message of error._errors)
                this._errors.push(message);
        } else {
            this._errors.push(error);
        }
    }    

    get didFail() {
        return this._errors.length > 0;
    }

    get didSucceed() {
        return this._errors.length == 0;
    }    

    get message() {
        return this._errors.join(" ");
    }

    assert(condition, error) {
        if (condition)
            return;

        this._push(error);
    }    

    static fail(error) {
        const validator = new Validator();
        validator._push(error);
        return validator;
    }

    static succeed() {
        return new Validator();
    }
}