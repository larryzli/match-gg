// IMPORT DEPENDENCIES
import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

// IMPORT REDUCERS
import userReducer from "./ducks/userReducer";
import bracketReducer from "./ducks/bracketReducer";
import matchReducer from "./ducks/matchReducer";

// COMBINE REDUCERS
const rootReducer = combineReducers({
    users: userReducer,
    brackets: bracketReducer,
    matches: matchReducer
});

// CREATE STORE
const store = createStore(rootReducer, applyMiddleware(promiseMiddleware()));

// EXPORT STORE
export default store;
