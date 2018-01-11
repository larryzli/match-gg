// IMPORT DEPENDENCIES
import React, { Component } from "react";
import ExitToApp from "material-ui-icons/ExitToApp";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
// IMPORT STYLES
import "./Header.css";
// IMPORT REDUX FUNCTIONS
import { retrieveUser } from "../../ducks/userReducer";

class Header extends Component {
    componentDidMount() {
        // if (!this.props.user.hasOwnProperty("user_id")) {
        //     console.log("retrieving user");
        this.props.retrieveUser();
        // }
    }
    getUserData() {
        console.log(this.props.user);
    }
    render() {
        return (
            <header className="header">
                <div className="site-logo">
                    MATCH.<span>GG</span>
                </div>
                <div className="temp-nav">
                    <Link to="/">
                        <button>LOGIN</button>
                    </Link>
                    <Link to="/about">
                        <button>INFO</button>
                    </Link>
                    <Link to="/dashboard">
                        <button>DASHBOARD</button>
                    </Link>
                    <Link to="/brackets">
                        <button>BRACKET</button>
                    </Link>
                    <button onClick={() => this.getUserData()}>
                        USER INFO
                    </button>
                </div>
                <div className="user-controls">
                    <div className="logout">
                        <ExitToApp />
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps, { retrieveUser })(Header);
