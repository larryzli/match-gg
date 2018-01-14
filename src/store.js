import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from "./ducks/userReducer";
import bracketReducer from "./ducks/bracketReducer";
const rootReducer = combineReducers({
    users: userReducer,
    brackets: bracketReducer
});

const store = createStore(rootReducer, applyMiddleware(promiseMiddleware()));

export default store;
