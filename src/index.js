// IMPORT DEPENDENCIES
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
// IMPORT STYLING
import "./index.css";
// IMPORT MAIN COMPONENT
import App from "./App";
// IMPORT REDUX STORE
import store from "./store";

ReactDOM.render(
    // CONNECT APP TO REDUX AND STORE
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);
