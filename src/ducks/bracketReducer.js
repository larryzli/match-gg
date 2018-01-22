// ----- DEPENDENCIES ----- //
import axios from "axios";

// ----- SET INITIAL STATE ----- //
const initialState = {
    // BRACKET INFO
    bracketID: null,
    bracketName: "",
    bracketDescription: "",
    bracketSubject: "",
    bracketStartDate: {},
    bracketStartTime: {},
    bracketImageURL: "",
    bracketFormat: "single-elimination",
    bracketTeamSizeLimit: 1,
    bracketRandomizeSeeds: false,
    bracketRandomizeTeams: false,
    bracketInviteOnly: false,
    bracketBestOf: 1,
    bracketFinalsBestOf: 1,
    bracketHasPassword: false,
    bracketMaxTeams: null,
    bracketStatus: "draft",
    bracketParticipantType: "player",

    // BRACKET PARTICIPANTS
    bracketParticipants: [],
    bracketInvited: [],

    // CREATE BRACKET
    bracketCreating: false,
    bracketCreateError: false,

    // EDIT BRACKET
    bracketEditing: false,
    bracketEditError: false,

    // UPDATE STATUS
    bracketPublishing: false,
    bracketPublishError: false,

    // DELETE BRACKET
    bracketDeleting: false,
    bracketDeleteError: false,

    // SINGLE BRACKET LOAD
    bracketLoading: false,
    bracketError: false,

    // BRACKET LIST
    bracketList: [],
    bracketListLoading: false,
    bracketListError: false,

    // PLAYER JOINING BRACKET
    playerJoining: false,
    playerJoinError: false,

    // BRACKET PLAYERS
    bracketPlayersLoading: false,
    bracketPlayersError: false
};

// ----- ACTION TYPES ----- //
// GET BRACKET LIST BY CREATOR
const RETRIEVE_BRACKETS_BY_CREATOR = "RETRIEVE_BRACKETS_BY_CREATOR";

// GET PUBLIC BRACKET LIST
const RETRIEVE_PUBLIC_BRACKETS = "RETRIEVE_PUBLIC_BRACKETS";

// LOAD SINGLE BRACKET
const RETRIEVE_BRACKET_DATA = "RETRIEVE_BRACKET_DATA";

// MANAGE BRACKET
const RESET_INITIAL = "RESET_INITIAL";
const CREATE_BRACKET = "CREATE_BRACKET";
const EDIT_BRACKET = "EDIT_BRACKET";
const DELETE_BRACKET = "DELETE BRACKET";
const HANDLE_TEXT_CHANGE = "HANDLE_TEXT_CHANGE";
const HANDLE_DATE_CHANGE = "HANDLE_DATE_CHANGE";
const HANDLE_TIME_CHANGE = "HANDLE_TIME_CHANGE";
const HANDLE_FORMAT_CHANGE = "HANDLE_FORMAT_CHANGE";
const HANDLE_BESTOF_CHANGE = "HANDLE_BESTOF_CHANGE";
const HANDLE_INVITE_ONLY_CHANGE = "HANDLE_INVITE_ONLY_CHANGE";
const HANDLE_HAS_PASSWORD_CHANGE = "HANDLE_HAS_PASSWORD_CHANGE";
const HANDLE_PARTICIPANT_TYPE_CHANGE = "HANDLE_PARTICIPANT_TYPE_CHANGE";
const PUBLISH_BRACKET = "PUBLISH_BRACKET";

// MANAGE PARTICIPANTS
const PLAYER_JOIN_BRACKET = "PLAYER_JOIN_BRACKET";
const RETRIEVE_BRACKET_PLAYERS = "RETRIEVE_BRACKET_PLAYERS";

// ------ ACTION CREATORS ----- //
// GET PUBLIC BRACKETS
export function retrievePublicBrackets() {
    return {
        type: RETRIEVE_PUBLIC_BRACKETS,
        payload: axios
            .get("/api/brackets")
            .then(response => response.data)
            .catch(console.log)
    };
}

// GET BRACKET BY ID
export function retrieveBracketData(bracketID) {
    return {
        type: RETRIEVE_BRACKET_DATA,
        payload: axios
            .get(`/api/bracket/${bracketID}`)
            .then(response => response.data[0])
            .catch(console.log)
    };
}
// RESET INTIAL VALUES FOR SINGLE BRACKET
export function resetInitial() {
    return {
        type: RESET_INITIAL,
        payload: null
    };
}

// CREATE NEW BRACKET
export function createBracket(bracketData) {
    return {
        type: CREATE_BRACKET,
        payload: axios
            .post("/api/manage/brackets", bracketData)
            .then(response => response.data[0])
            .catch(console.log)
    };
}

// EDIT BRACKET DATA
export function editBracket(bracketID, bracketData) {
    return {
        type: EDIT_BRACKET,
        payload: axios
            .put(`/api/bracket/${bracketID}/edit`, bracketData)
            .then(response => response)
            .catch(console.log)
    };
}

// PUBLISH BRACKET
export function publishBracket(bracketID) {
    return {
        type: PUBLISH_BRACKET,
        payload: axios
            .put(`/api/bracket/${bracketID}/status`, { newStatus: "ready" })
            .then(response => response.data[0].status)
            .catch(console.log)
    };
}

// DELETE BRACKET
export function deleteBracket(bracketID) {
    return {
        type: DELETE_BRACKET,
        payload: axios
            .delete(`/api/bracket/${bracketID}`)
            .then(response => response)
            .catch(console.log)
    };
}

// GET A CREATOR'S BRACKETS
export function getCreatorBrackets() {
    return {
        type: RETRIEVE_BRACKETS_BY_CREATOR,
        payload: axios
            .get("/api/manage/brackets")
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .catch(console.log)
    };
}

// PLAYER JOINS BRACKET
export function playerJoinBracket(bracketID) {
    return {
        type: PLAYER_JOIN_BRACKET,
        payload: axios
            .post(`/api/player/join/${bracketID}`)
            .then(response => response.data)
            .catch(console.log)
    };
}

// RETRIEVE ALL PLAYERS
export function retrieveBracketPlayers(bracketID) {
    return {
        type: RETRIEVE_BRACKET_PLAYERS,
        payload: axios
            .get(`/api/bracket/${bracketID}/players`)
            .then(response => response.data)
            .catch(console.log)
    };
}

// CHANGE HANDLERS
export function handleTextChange(propName, value) {
    return {
        type: HANDLE_TEXT_CHANGE,
        payload: { propName, value }
    };
}
export function handleDateChange(event, date) {
    return {
        type: HANDLE_DATE_CHANGE,
        payload: date
    };
}
export function handleTimeChange(event, date) {
    return {
        type: HANDLE_TIME_CHANGE,
        payload: date
    };
}
export function handleFormatChange(event, value) {
    return {
        type: HANDLE_FORMAT_CHANGE,
        payload: value
    };
}
export function handleBestOfChange(event, value) {
    return {
        type: HANDLE_BESTOF_CHANGE,
        payload: value
    };
}
export function handleInviteOnlyChange() {
    return {
        type: HANDLE_INVITE_ONLY_CHANGE,
        payload: null
    };
}
export function handleHasPasswordChange() {
    return {
        type: HANDLE_HAS_PASSWORD_CHANGE,
        payload: null
    };
}
export function handleParticipantTypeChange(event, value) {
    return {
        type: HANDLE_PARTICIPANT_TYPE_CHANGE,
        payload: value
    };
}

// ----- REDUCER ----- //
export default function reducer(state = initialState, action) {
    switch (action.type) {
        // CHANGE HANDLERS
        case `${HANDLE_TEXT_CHANGE}`:
            return Object.assign({}, state, {
                [action.payload.propName]: action.payload.value
            });
        case `${HANDLE_DATE_CHANGE}`:
            return Object.assign({}, state, {
                bracketStartDate: action.payload
            });
        case `${HANDLE_TIME_CHANGE}`:
            return Object.assign({}, state, {
                bracketStartTime: action.payload
            });
        case `${HANDLE_FORMAT_CHANGE}`:
            return Object.assign({}, state, {
                bracketFormat: action.payload
            });
        case `${HANDLE_BESTOF_CHANGE}`:
            return Object.assign({}, state, {
                bracketBestOf: action.payload
            });
        case `${HANDLE_INVITE_ONLY_CHANGE}`:
            return Object.assign({}, state, {
                bracketInviteOnly: !state.bracketInviteOnly
            });
        case `${HANDLE_HAS_PASSWORD_CHANGE}`:
            return Object.assign({}, state, {
                bracketHasPassword: !state.bracketHasPassword
            });
        case `${HANDLE_PARTICIPANT_TYPE_CHANGE}`:
            return Object.assign({}, state, {
                bracketParticipantType: action.payload
            });

        // RESET INITIAL
        case `${RESET_INITIAL}`:
            return Object.assign({}, state, {
                bracketID: null,
                bracketName: "",
                bracketDescription: "",
                bracketSubject: "",
                bracketStartDate: {},
                bracketStartTime: {},
                bracketImageURL: "",
                bracketFormat: "single-elimination",
                bracketTeamSizeLimit: 1,
                bracketRandomizeSeeds: false,
                bracketRandomizeTeams: false,
                bracketInviteOnly: false,
                bracketBestOf: 1,
                bracketFinalsBestOf: 1,
                bracketHasPassword: false,
                bracketMaxTeams: null,
                bracketStatus: "draft",
                bracketParticipantType: "player"
            });

        // CREATE BRACKET
        case `${CREATE_BRACKET}_PENDING`:
            return Object.assign({}, state, { bracketCreating: true });
        case `${CREATE_BRACKET}_FULFILLED`:
            return Object.assign({}, state, {
                bracketID: action.payload.bracket_id
            });
        case `${CREATE_BRACKET}_REJECTED`:
            return Object.assign({}, state, { bracketCreateError: true });

        // EDIT BRACKET DATA
        case `${EDIT_BRACKET}_PENDING`:
            return Object.assign({}, state, { bracketEditing: true });
        case `${EDIT_BRACKET}_FULFILLED`:
            return Object.assign({}, state, { bracketEditing: false });
        case `${EDIT_BRACKET}_REJECTED`:
            return Object.assign({}, state, { bracketEditError: true });

        // PUBLISH BRACKET
        case `${PUBLISH_BRACKET}_PENDING`:
            return Object.assign({}, state, { bracketPublishing: true });
        case `${PUBLISH_BRACKET}_FULFILLED`:
            return Object.assign({}, state, {
                bracketPublishing: false,
                bracketStatus: action.payload
            });
        case `${PUBLISH_BRACKET}_REJECTED`:
            return Object.assign({}, state, { bracketPublishError: true });

        // DELETE BRACKET
        case `${DELETE_BRACKET}_PENDING`:
            return Object.assign({}, state, { bracketDeleting: true });
        case `${DELETE_BRACKET}_FULFILLED`:
            return Object.assign({}, state, { bracketDeleting: false });
        case `${DELETE_BRACKET}_REJECTED`:
            return Object.assign({}, state, { bracketDeleteError: true });

        // GET BRACKETS BY CREATOR
        case `${RETRIEVE_BRACKETS_BY_CREATOR}_PENDING`:
            return Object.assign({}, state, { bracketListLoading: true });
        case `${RETRIEVE_BRACKETS_BY_CREATOR}_FULFILLED`:
            return Object.assign({}, state, {
                bracketList: action.payload,
                bracketListLoading: false
            });
        case `${RETRIEVE_BRACKETS_BY_CREATOR}_REJECTED`:
            return Object.assign({}, state, { bracketListError: true });

        // GET PUBLIC BRACKETS
        case `${RETRIEVE_PUBLIC_BRACKETS}_PENDING`:
            return Object.assign({}, state, { bracketListLoading: true });
        case `${RETRIEVE_PUBLIC_BRACKETS}_FULFILLED`:
            return Object.assign({}, state, {
                bracketList: action.payload,
                bracketListLoading: false
            });
        case `${RETRIEVE_PUBLIC_BRACKETS}_REJECTED`:
            return Object.assign({}, state, { bracketListError: true });

        // GET SINGLE BRACKET BY BRACKET ID
        case `${RETRIEVE_BRACKET_DATA}_PENDING`:
            return Object.assign({}, state, { bracketLoading: true });
        case `${RETRIEVE_BRACKET_DATA}_FULFILLED`:
            return Object.assign({}, state, {
                bracketID: action.payload.bracket_id,
                bracketName: action.payload.bracket_name,
                bracketDescription: action.payload.description,
                bracketSubject: action.payload.subject,
                bracketStartDate: new Date(action.payload.start_date),
                bracketStartTime: new Date(action.payload.start_time),
                bracketImageURL: action.payload.image_url,
                bracketFormat: action.payload.format,
                bracketTeamSizeLimit: action.payload.team_size,
                bracketRandomizeSeeds: action.payload.randomize_seeds,
                bracketRandomizeTeams: action.payload.randomize_teams,
                bracketInviteOnly: action.payload.invite_only,
                bracketBestOf: action.payload.best_of,
                bracketFinalsBestOf: action.payload.finals_best_of,
                bracketHasPassword: action.payload.has_password,
                bracketMaxTeams: action.payload.max_teams,
                bracketStatus: action.payload.status,
                bracketParticipantType: action.payload.participant_type,

                bracketLoading: false
            });
        case `${RETRIEVE_BRACKET_DATA}_REJECTED`:
            return Object.assign({}, state, { bracketError: true });

        // JOIN BRACKET AS PLAYER
        case `${PLAYER_JOIN_BRACKET}_PENDING`:
            return Object.assign({}, state, { playerJoining: true });
        case `${PLAYER_JOIN_BRACKET}_FULFILLED`:
            return Object.assign({}, state, {
                bracketParticipants: action.payload,
                playerJoining: false
            });
        case `${PLAYER_JOIN_BRACKET}_REJECTED`:
            return Object.assign({}, state, { playerJoinError: true });

        // RETRIEVE ALL PLAYERS FOR BRACKET
        case `${RETRIEVE_BRACKET_PLAYERS}_PENDING`:
            return Object.assign({}, state, { bracketPlayersLoading: true });
        case `${RETRIEVE_BRACKET_PLAYERS}_FULFILLED`:
            return Object.assign({}, state, {
                bracketParticipants: action.payload,
                bracketPlayersLoading: false
            });
        case `${RETRIEVE_BRACKET_PLAYERS}_REJECTED`:
            return Object.assign({}, state, { bracketPlayersError: true });

        default:
            return state;
    }
}
