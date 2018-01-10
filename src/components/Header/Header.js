// IMPORT DEPENDENCIES
import React, { Component } from "react";
import ExitToApp from "material-ui-icons/ExitToApp";
// IMPORT STYLES
import "./Header.css";

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="site-logo">Match.gg</div>
                <div className="user-controls">
                    <div className="logout">
                        <ExitToApp />
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
