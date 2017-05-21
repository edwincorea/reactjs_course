import {Validator} from "./index";
//Any valid letter, digit, dash or underscore, length from 3-20.
export const NAME_REGEX = /^[\w\d-_]{3,20}$/;

export function validateName(name) {
    if (!NAME_REGEX.test(name))
        return Validator.fail("Invalid username");

    return Validator.succeed();
}

