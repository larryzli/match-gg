// DEPENDENCIES
import axios from "axios";

// SET INITIAL STATE
const initialState = {
    user: {},
    userLoading: false,
    userError: false,
    userType: ""
};

// ACTION TYPES
const RETRIEVE_USER = "RETRIEVE_USER";
const SET_USER_TYPE = "SET_USER_TYPE";

// ACTION CREATORS
export function retrieveUser() {
    return {
        type: RETRIEVE_USER,
        payload: axios
            .get("/api/me")
            .then(response => response.data)
            .catch(console.log)
    };
}
export function setUserType(userType) {
    return {
        type: SET_USER_TYPE,
        payload: userType
    };
}

// REDUCER
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
                // userLoading: false,
                didError: true
            });

        // SET USER TYPE OF ORGANIZER OR PLAYER
        case SET_USER_TYPE:
            return Object.assign({}, state, { userType: action.payload });

        default:
            return state;
    }
}
