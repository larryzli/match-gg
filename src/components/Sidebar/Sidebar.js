// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
// IMPORT ICONS
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
    faListUl,
    // faUsers,
    faSearch,
    faClipboard,
    // faInbox,
    faSignInAlt,
    faSignOutAlt,
    faGift
} from "@fortawesome/fontawesome-free-solid";
// IMPORT STYLES
import "./Sidebar.css";
// IMPORT REDUX FUNCTIONS
import { retrieveUser, userLogout } from "../../ducks/userReducer";

class Sidebar extends Component {
    componentDidMount() {
        this.props.retrieveUser();
    }
    render() {
        console.log(this.props);
        return (
            <div className="sidebar-container">
                <div className="site-logo">
                    <Link to="/" className="ui-link">
                        MATCH.<span>GG</span>
                    </Link>
                </div>

                <div className="sidebar-links-container">
                    <NavLink
                        className="sidebar-link"
                        activeClassName="active-link"
                        to="/discover"
                    >
                        <FontAwesomeIcon className="nav-icon" icon={faSearch} />
                        Discover
                    </NavLink>
                    {this.props.users.user.user_id ? (
                        <NavLink
                            className="sidebar-link"
                            activeClassName="active-link"
                            to="/dashboard"
                        >
                            <FontAwesomeIcon
                                className="nav-icon"
                                icon={faListUl}
                            />
                            Dashboard
                        </NavLink>
                    ) : null}
                    {this.props.users.user.user_id ? (
                        <NavLink
                            className="sidebar-link"
                            activeClassName="active-link"
                            to="/manage"
                        >
                            <FontAwesomeIcon
                                className="nav-icon"
                                icon={faClipboard}
                            />
                            Manage
                        </NavLink>
                    ) : null}
                    {/* <NavLink
                        className="sidebar-link"
                        activeClassName="active-link"
                        to="/teams"
                    >
                        <FontAwesomeIcon className="nav-icon" icon={faUsers} />
                        Teams
                    </NavLink>
                    <NavLink
                        className="sidebar-link"
                        activeClassName="active-link"
                        to="/invites"
                    >
                        <FontAwesomeIcon className="nav-icon" icon={faInbox} />
                        Invites
                    </NavLink> */}
                    <NavLink
                        className="sidebar-link"
                        activeClassName="active-link"
                        to="/donate"
                    >
                        <FontAwesomeIcon className="nav-icon" icon={faGift} />
                        Donate
                    </NavLink>
                </div>
                <div className="sidebar-links-container dev">
                    <div className="sidebar-link">- - DEV LINKS - -</div>
                    <NavLink className="sidebar-link" to="/brackets">
                        Example Bracket
                    </NavLink>
                    <NavLink className="sidebar-link" to="/about">
                        About
                    </NavLink>
                    <div className="sidebar-link">Get User</div>
                    <NavLink className="sidebar-link" to="/">
                        <FontAwesomeIcon
                            className="nav-icon"
                            icon={faSignInAlt}
                        />
                        Login
                    </NavLink>
                    <NavLink className="sidebar-link logout" to="/">
                        <FontAwesomeIcon
                            className="nav-icon"
                            icon={faSignOutAlt}
                        />
                        Logout
                    </NavLink>
                </div>
                {this.props.users.user.user_id ? (
                    <div className="user-info-container">
                        <span>{this.props.users.user.alias}</span>
                        <Link to="/discover" className="ui-link">
                            <FontAwesomeIcon
                                className="logout"
                                icon={faSignOutAlt}
                                onClick={e => this.props.userLogout()}
                            />
                        </Link>
                    </div>
                ) : (
                    <div className="user-info-container">
                        <span>Guest</span>
                        <FontAwesomeIcon
                            className="login"
                            icon={faSignInAlt}
                            onClick={() =>
                                (window.location = process.env.REACT_APP_LOGIN)
                            }
                        />
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps, { retrieveUser, userLogout })(Sidebar);
