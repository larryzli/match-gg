// ----- DEPENDENCIES ----- //
import axios from "axios";

// ----- SET INITIAL STATE ----- //
const initialState = {
    // CREATE BRACKET
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
    bracketTeams: [],
    bracketCreating: false,
    bracketCreateError: false,
    bracketParticipantType: "player",

    //SINGLE BRACKET
    bracketInfo: [],
    bracketLoading: false,
    bracketError: false,

    // BRACKET LIST
    bracketList: [],
    bracketListLoading: false,
    bracketListError: false
};

// ----- ACTION TYPES ----- //
// GET BRACKET LIST BY CREATOR
const RETRIEVE_BRACKETS_BY_CREATOR = "RETRIEVE_BRACKETS_BY_CREATOR";

// GET PUBLIC BRACKET LIST
const RETRIEVE_PUBLIC_BRACKETS = "RETRIEVE_PUBLIC_BRACKETS";

// LOAD SINGLE BRACKET
const RETRIEVE_BRACKET_DATA = "RETRIEVE_BRACKET_DATA";

// CREATE NEW BRACKET
const CREATE_BRACKET = "CREATE_BRACKET";
const HANDLE_TEXT_CHANGE = "HANDLE_TEXT_CHANGE";
const HANDLE_DATE_CHANGE = "HANDLE_DATE_CHANGE";
const HANDLE_TIME_CHANGE = "HANDLE_TIME_CHANGE";
const HANDLE_FORMAT_CHANGE = "HANDLE_FORMAT_CHANGE";
const HANDLE_BESTOF_CHANGE = "HANDLE_BESTOF_CHANGE";
const HANDLE_INVITE_ONLY_CHANGE = "HANDLE_INVITE_ONLY_CHANGE";
const HANDLE_HAS_PASSWORD_CHANGE = "HANDLE_HAS_PASSWORD_CHANGE";
const HANDLE_PARTICIPANT_TYPE_CHANGE = "HANDLE_PARTICIPANT_TYPE_CHANGE";

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
            .then(response => response.data)
            .catch(console.log)
    };
}

// CREATE NEW BRACKET
export function createBracket(bracketData) {
    return {
        type: CREATE_BRACKET,
        payload: axios
            .post("/api/manage/brackets", bracketData)
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

        // CREATE BRACKET
        case `${CREATE_BRACKET}_PENDING`:
            return Object.assign({}, state, { bracketCreating: true });
        case `${CREATE_BRACKET}_FULFILLED`:
            return Object.assign({}, state, {
                bracketID: action.payload,
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
                bracketCreating: false,
                bracketParticipantType: "player"
            });
        case `${CREATE_BRACKET}_REJECTED`:
            return Object.assign({}, state, { bracketCreateError: true });

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
                bracketInfo: action.payload,
                bracketLoading: false
            });
        case `${RETRIEVE_BRACKET_DATA}_REJECTED`:
            return Object.assign({}, state, { bracketError: true });

        default:
            return state;
    }
}
