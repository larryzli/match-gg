// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// IMPORT STYLE
import "./Login.css";
// IMPORT REDUX FUNCTIONS

// COMPONENT
class Login extends Component {
    render() {
        return (
            <div className="login-container">
                <div className="login-welcome">
                    Welcome to{" "}
                    <div id="login-site-name">
                        [ BRACK<span> IT</span> ]
                    </div>
                </div>
                <div className="login-box">
                    <div className="login-box-text">Ready to rumble?</div>
                    {/* <div className="login-button-container"> */}
                    <a href={process.env.REACT_APP_LOGIN}>
                        <button className="login-button">LOGIN / SIGNUP</button>
                    </a>
                </div>
            </div>
        );
    }
}

// CONNECT TO REDUX
const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps)(Login);
