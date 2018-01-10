// IMPORT DEPENDENCIES
import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import routes from "./routes";

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
                <header className="App-header">
                    <h1 className="App-title">Match.gg</h1>
                    {/* <a href="http://localhost:3001/auth">Login</a> */}
                    <Link to="/">
                        <button>HOME</button>
                    </Link>
                    <Link to="/brackets">
                        <button>BRACKET</button>
                    </Link>
                    <Link to="/login">
                        <button>LOGIN PAGE</button>
                    </Link>
                </header>
                {routes}
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(App));
