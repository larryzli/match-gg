// IMPORT DEPENDENCIES
import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import Routes from "./Routes";

class App extends Component {
    getUser() {
        console.log("button clicked");
        axios
            .get("/api/me")
            .then(response => {
                console.log(response);
            })
            .catch(console.log);
    }

    render() {
        return (
            <div className="App">
                <Routes />
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(App));
