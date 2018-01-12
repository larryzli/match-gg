// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
// IMPORT ICONS
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
    faList,
    faUsers,
    faSearch,
    faClipboard,
    faInbox,
    faSignInAlt,
    faSignOutAlt
} from "@fortawesome/fontawesome-free-solid";
// IMPORT STYLES
import "./Sidebar.css";
// IMPORT REDUX FUNCTIONS
import { retrieveUser } from "../../ducks/userReducer";

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar-container">
                <div className="site-logo">
                    MATCH.<span>GG</span>
                </div>
                <div className="sidebar-links-container">
                    <NavLink
                        className="sidebar-link"
                        activeClassName="active-link"
                        to="/dashboard"
                    >
                        <FontAwesomeIcon className="nav-icon" icon={faList} />
                        Dashboard
                    </NavLink>
                    <NavLink
                        className="sidebar-link"
                        activeClassName="active-link"
                        to="/discover"
                    >
                        <FontAwesomeIcon className="nav-icon" icon={faSearch} />
                        Discover
                    </NavLink>
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
                    <NavLink
                        className="sidebar-link"
                        activeClassName="active-link"
                        to="/brackets"
                    >
                        <FontAwesomeIcon className="nav-icon" icon={faUsers} />
                        Teams
                    </NavLink>
                    <NavLink
                        className="sidebar-link"
                        activeClassName="active-link"
                        to="/brackets"
                    >
                        <FontAwesomeIcon className="nav-icon" icon={faInbox} />
                        Invites
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps, { retrieveUser })(Sidebar);
