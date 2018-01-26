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
                    {/* <NavLink
                        className="sidebar-link"
                        activeClassName="active-link"
                        to="/dashboard"
                    > */}
                    <div className="sidebar-link">
                        <FontAwesomeIcon className="nav-icon" icon={faListUl} />
                        Dashboard
                    </div>
                    {/* </NavLink> */}
                    {/* <NavLink
                        className="sidebar-link"
                        activeClassName="active-link"
                        to="/manage"
                    > */}
                    <div className="sidebar-link">
                        <FontAwesomeIcon
                            className="nav-icon"
                            icon={faClipboard}
                        />
                        Manage
                    </div>
                    {/* </NavLink> */}
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
                <div className="user-info-container">
                    <span>Login</span>
                    <Link to="/" className="ui-link">
                        <FontAwesomeIcon
                            className="logout"
                            icon={faSignInAlt}
                            onClick={e => this.props.userLogout()}
                        />
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps, { retrieveUser, userLogout })(Sidebar);
