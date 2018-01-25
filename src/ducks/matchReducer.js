// ----- DEPENDENCIES ----- //
import axios from "axios";

// ----- SET INITIAL STATE ----- //
const initialState = {
    matchID: null,
    team1ID: null,
    team1Name: "",
    team2Name: "",
    team2ID: null,
    team1Score: 0,
    team2Score: 0,
    matchBestOf: 1,
    matchCompleted: false,
    matchWinnerID: null,
    matchRoundID: null,
    matchRoundName: "",
    matchRoundNumber: null,
    matchBracketID: null,
    matchBracketName: "",
    nextMatchID: null,

    matchLoading: false,
    matchLoadingError: false,

    matchUpdating: false,
    matchUpdatingError: false,

    matchAutoCompleting: false,
    matchAutoCompleteError: false
};

// ----- ACTION TYPES ----- //
// MATCH DATA
const RETRIEVE_MATCH_DATA = "RETRIEVE_MATCH_DATA";
const UPDATE_MATCH_DATA = "UPDATE_MATCH_DATA";
// CHANGE HANDLERS
const HANDLE_TEAM1_SCORE_CHANGE = "HANDLE_TEAM1_SCORE_CHANGE";
const HANDLE_TEAM2_SCORE_CHANGE = "HANDLE_TEAM2_SCORE_CHANGE";
const HANDLE_COMPLETE_CHANGE = "HANDLE_COMPLETE_CHANGE";
const HANDLE_WINNER_CHANGE = "HANDLE_WINNER_CHANGE";
// AUTOCOMPLETE MATCH
const MATCH_AUTOCOMPLETE = "MATCH_AUTOCOMPLETE";

// ------ ACTION CREATORS ----- //
// GET MATCH INFO
export function retrieveMatchData(match_id) {
    return {
        type: RETRIEVE_MATCH_DATA,
        payload: axios
            .get(`/api/match/${match_id}`)
            .then(response => response.data[0])
            .catch(console.log)
    };
}
export function updateMatchData(matchID, matchData) {
    return {
        type: UPDATE_MATCH_DATA,
        payload: axios
            .put(`/api/match/${matchID}`, matchData)
            .then(response => response)
            .catch(console.log)
    };
}
// CHANGE HANDLERS
export function handleScore1Change(event, value) {
    if (!value) {
        value = 0;
    }
    return {
        type: HANDLE_TEAM1_SCORE_CHANGE,
        payload: value
    };
}
export function handleScore2Change(event, value) {
    if (!value) {
        value = 0;
    }
    return {
        type: HANDLE_TEAM2_SCORE_CHANGE,
        payload: value
    };
}
export function handleCompleteChange() {
    return {
        type: HANDLE_COMPLETE_CHANGE,
        payload: null
    };
}
export function handleWinnerChange(event, value) {
    return {
        type: HANDLE_WINNER_CHANGE,
        payload: value
    };
}

// AUTOCOMPLETE MATCH
export function matchAutoComplete(matchID) {
    return {
        type: MATCH_AUTOCOMPLETE,
        payload: axios
            .put(`/api/match/${matchID}/autocomplete`)
            .then(response => response)
            .catch(console.log)
    };
}

// ----- REDUCER ----- //
export default function reducer(state = initialState, action) {
    switch (action.type) {
        // CHANGE HANDLERS
        case `${HANDLE_TEAM1_SCORE_CHANGE}`:
            return Object.assign({}, state, {
                team1Score: action.payload
            });
        case `${HANDLE_TEAM2_SCORE_CHANGE}`:
            return Object.assign({}, state, {
                team2Score: action.payload
            });
        case `${HANDLE_COMPLETE_CHANGE}`:
            return Object.assign({}, state, {
                matchCompleted: !state.matchCompleted
            });
        case `${HANDLE_WINNER_CHANGE}`:
            return Object.assign({}, state, {
                matchWinnerID: action.payload
            });
        // RETRIEVE MATCH DATA
        case `${RETRIEVE_MATCH_DATA}_PENDING`:
            return Object.assign({}, state, { matchLoading: true });
        case `${RETRIEVE_MATCH_DATA}_FULFILLED`:
            return Object.assign({}, state, {
                matchID: action.payload.match_id,
                team1ID: action.payload.team1_id,
                team1Name: action.payload.team1_name,
                team1Score: action.payload.team1_score,
                team2ID: action.payload.team2_id,
                team2Name: action.payload.team2_name,
                team2Score: action.payload.team2_score,
                matchBestOf: action.payload.next_match
                    ? action.payload.best_of
                    : action.payload.finals_best_of,
                matchCompleted: action.payload.completed,
                matchWinnerID: action.payload.winner_team_id,
                matchRoundID: action.payload.round_id,
                matchRoundName: action.payload.round_name,
                matchRoundNumber: action.payload.round_number,
                matchBracketID: action.payload.bracket_id,
                matchBracketName: action.payload.bracket_name,
                nextMatchID: action.payload.next_match,
                matchLoading: false
            });
        case `${RETRIEVE_MATCH_DATA}_REJECTED`:
            return Object.assign({}, state, {
                matchLoadingError: true
            });

        // UPDATE MATCH DATA
        case `${UPDATE_MATCH_DATA}_PENDING`:
            return Object.assign({}, state, { matchUpdating: true });
        case `${UPDATE_MATCH_DATA}_FULFILLED`:
            return Object.assign({}, state, {
                matchUpdating: false
            });
        case `${UPDATE_MATCH_DATA}_REJECTED`:
            return Object.assign({}, state, {
                matchUpdatingError: true
            });

        // AUTOCOMPLETE MATCH
        case `${MATCH_AUTOCOMPLETE}_PENDING`:
            return Object.assign({}, state, { matchAutoCompleting: true });
        case `${MATCH_AUTOCOMPLETE}_FULFILLED`:
            return Object.assign({}, state, {
                matchAutoCompleting: false
            });
        case `${MATCH_AUTOCOMPLETE}_REJECTED`:
            return Object.assign({}, state, {
                matchAutoCompleteError: true
            });

        default:
            return state;
    }
}
