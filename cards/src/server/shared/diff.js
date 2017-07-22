import _ from "lodash";

//used to determine if nothing in the diff changed
export const IS_UNCHANGED = Symbol("Is Unchanged"); 

export const makeDiff = (before, after, location = "") => {
    if (_.isArray(after))
        return makeDiffArray(before, after, location);

    if (_.isObject(after))
        return makeDiffObject(before, after, location);

    return makeDiffScalar(before, after);    
};

export const makeDiffArray = (before, after, location = "") => {
    return IS_UNCHANGED;
};

export const makeDiffObject = (before, after, location = "") => {
    return IS_UNCHANGED;
};

export const makeDiffScalar = (before, after) => {
    return before !== after ? after : IS_UNCHANGED;
};

export const mergeDiff = (base, diff, location = "") => {
    return base;
};