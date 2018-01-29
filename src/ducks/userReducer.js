// ----- DEPENDENCIES ----- //
import axios from "axios";

// ----- SET INITIAL STATE ----- //
const initialState = {
    // TEMP USER
    user: {},
    userLoading: false,
    userError: false,

    userLoggingOut: false,
    userLogoutError: false
};

// ----- ACTION TYPES ----- //
const RETRIEVE_USER = "RETRIEVE_USER";
const USER_LOGOUT = "USER_LOGOUT";

// ------ ACTION CREATORS ----- //
export function retrieveUser() {
    return {
        type: RETRIEVE_USER,
        payload: axios
            .get("/api/me/")
            .then(response => response.data)
            .catch(console.log)
        // .catch(() => (window.location = process.env.REACT_APP_LOGIN))
    };
}

export function userLogout() {
    return {
        type: USER_LOGOUT,
        payload: axios
            .get("/logout")
            .then(response => response)
            .catch(console.log)
    };
}

// ----- REDUCER ----- //
export default function reducer(state = initialState, action) {
    switch (action.type) {
        // RETRIEVE USER DATA
        case `${RETRIEVE_USER}_PENDING`:
            return Object.assign({}, state, { userLoading: true });
        case `${RETRIEVE_USER}_FULFILLED`:
            return Object.assign({}, state, {
                user: action.payload,
                userLoading: false
            });
        case `${RETRIEVE_USER}_REJECTED`:
            return Object.assign({}, state, {
                didError: true
            });
        // LOGOUT
        case `${USER_LOGOUT}_PENDING`:
            return Object.assign({}, state, { userLoggingOut: true });
        case `${USER_LOGOUT}_FULFILLED`:
            return Object.assign({}, state, {
                user: {},
                userLoggingOut: false
            });
        case `${USER_LOGOUT}_REJECTED`:
            return Object.assign({}, state, {
                userLogoutError: true
            });

        default:
            return state;
    }
}
