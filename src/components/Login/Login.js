// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { connect } from "react-redux";
// IMPORT STYLE
import "./Login.css";
// IMPORT REDUX FUNCTIONS
import { setUserType } from "../../ducks/userReducer";

// COMPONENT
class Login extends Component {
    render() {
        return (
            <div className="login-container">
                <div className="login-welcome">
                    Welcome to <div id="login-site-name">MATCH.GG</div>
                </div>
                <div className="login-box">
                    <div className="login-box-text">I AM</div>
                    {/* <div className="login-button-container"> */}
                    <a href={process.env.REACT_APP_LOGIN}>
                        <button
                            className="login-button"
                            onClick={() => this.props.setUserType("organizer")}
                        >
                            AN ORGANIZER
                        </button>
                    </a>
                    <a href={process.env.REACT_APP_LOGIN}>
                        <button
                            className="login-button"
                            onClick={() => this.props.setUserType("player")}
                        >
                            A PLAYER
                        </button>
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
export default connect(mapStateToProps, { setUserType })(Login);
