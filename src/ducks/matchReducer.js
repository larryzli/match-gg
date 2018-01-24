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
    matchLoadingError: false
};

// ----- ACTION TYPES ----- //
const RETRIEVE_MATCH_DATA = "RETRIEVE_MATCH_DATA";

// ------ ACTION CREATORS ----- //
export function retrieveMatchData(match_id) {
    return {
        type: RETRIEVE_MATCH_DATA,
        payload: axios
            .get(`/api/match/${match_id}`)
            .then(response => response.data[0])
            .catch(console.log)
    };
}

// ----- REDUCER ----- //
export default function reducer(state = initialState, action) {
    switch (action.type) {
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

        default:
            return state;
    }
}
