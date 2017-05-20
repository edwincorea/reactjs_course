export * from "../server/shared/actions";

// -------------------------------
// App Store
export const DIALOG_SET = "DIALOG_SET";
//action factory
export const dialogSet = (id, isOpen, props = {}) => {
    return { type: DIALOG_SET, id, isOpen, props }; 
};

export const DIALOG_LOGIN = "DIALOG_LOGIN";

