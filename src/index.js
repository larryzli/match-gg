// IMPORT DEPENDENCIES
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
// IMPORT MATERIAL UI STYLE
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import merge from "lodash.merge";
// IMPORT STYLING
import "./index.css";
// IMPORT MAIN COMPONENT
import App from "./App";
// IMPORT REDUX STORE
import store from "./store";

const muiTheme = {
    palette: {
        textColor: "#FFFFFF",
        primary1Color: "#7986cb",
        primary2Color: "#7986cb",
        primary3Color: "#7986cb",
        accent1Color: "#FFFFFF",
        accent2Color: "#FFFFFF",
        accent3Color: "#FFFFFF",
        // pickerHeaderColor: "#5c6bc0",
        alternateTextColor: "#FFFFFF",
        // secondaryTextColor: "#FFFFFF"
        disabledColor: "#5b5b5b"
    },
    tableRow: {
        hoverColor: "#5b5b5b",
        borderColor: "#222222",
        backgroundColor: "#3A3A3A"
    },
    tableHeaderColumn: {
        textColor: "#7986cb"
    },
    textField: {
        floatingLabelColor: "#9a9a9a"
    },
    tabs: {
        backgroundColor: "#3A3A3A"
    },
    inkBar: {
        backgroundColor: "#7986cb"
    }
};

const theme = merge(darkBaseTheme, muiTheme);

ReactDOM.render(
    // CONNECT APP TO REDUX AND STORE
    <Provider store={store}>
        <Router>
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                <App />
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById("root")
);
