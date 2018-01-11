// IMPORT DEPENDENCIES
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
// IMPORT ICONS
import ExitToApp from "material-ui-icons/ExitToApp";
import Search from "material-ui-icons/Search";
import DashIcon from "material-ui-icons/Dashboard";
import Add from "material-ui-icons/Add";
import Group from "material-ui-icons/Group";
import Inbox from "material-ui-icons/Inbox";
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
                        <DashIcon className="nav-icon" />Dashboard
                    </NavLink>
                    <NavLink
                        className="sidebar-link"
                        activeClassName="active-link"
                        to="/brackets"
                    >
                        <Search className="nav-icon" />Discover
                    </NavLink>
                    <NavLink
                        className="sidebar-link"
                        activeClassName="active-link"
                        to="/brackets"
                    >
                        <Add className="nav-icon" />Create
                    </NavLink>
                    <NavLink
                        className="sidebar-link"
                        activeClassName="active-link"
                        to="/brackets"
                    >
                        <Group className="nav-icon" />Teams
                    </NavLink>
                    <NavLink
                        className="sidebar-link"
                        activeClassName="active-link"
                        to="/brackets"
                    >
                        <Inbox className="nav-icon" />Invites
                    </NavLink>
                </div>
                <div className="sidebar-links-container dev">
                    <div className="sidebar-link">- - DEV LINKS - -</div>
                    <NavLink className="sidebar-link" to="/about">
                        About
                    </NavLink>
                    <div className="sidebar-link">Get User</div>
                    <NavLink className="sidebar-link" to="/">
                        Login
                    </NavLink>
                    <NavLink className="sidebar-link logout" to="/">
                        <ExitToApp className="nav-icon" />Logout
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
