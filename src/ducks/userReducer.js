// ----- DEPENDENCIES ----- //
import axios from "axios";

// ----- SET INITIAL STATE ----- //
const initialState = {
    user: {},
    userLoading: false,
    userError: false
};

// ----- ACTION TYPES ----- //
const RETRIEVE_USER = "RETRIEVE_USER";

// ------ ACTION CREATORS ----- //
export function retrieveUser() {
    return {
        type: RETRIEVE_USER,
        payload: axios
            .get("/api/me")
            .then(response => response.data)
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
                // userLoading: false,
                didError: true
            });

        default:
            return state;
    }
}
