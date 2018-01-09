import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";

import BracketViewer from "./components/BracketViewer/BracketViewer";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <h1 className="App-title">Match.gg</h1>
                </header>
                <BracketViewer />
            </div>
        );
    }
}

export default App;
